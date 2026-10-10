import { categoryLabels, products } from '../src/data/products';
import { needsWebSearch } from '../src/lib/needsSearch';

/**
 * POST /api/chat — Vercel serverless function (also reused by the Vite dev
 * plugin in vite.config.ts, so `pnpm dev` serves the same handler).
 *
 * No dependencies: plain fetch to Groq's OpenAI-compatible endpoint.
 * GROQ_API_KEY is read from process.env on the server only — never with a
 * VITE_ prefix and never imported into anything under src/.
 */

// ── Model (one constant, easy to change) ─────────────────────────────────────
// Smaller default for speed; switch to 'openai/gpt-oss-120b' for higher quality.
const GROQ_MODEL = 'openai/gpt-oss-20b';
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const UPSTREAM_TIMEOUT_MS = 25_000;
const RETRY_DELAY_MS = 1000;

// ── Limits ────────────────────────────────────────────────────────────────────
const MAX_MESSAGES = 20;
const MAX_CHARS_PER_MESSAGE = 1000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 15;

// Minimal structural types for the Node req/res objects Vercel passes in.
// (Keeps this file free of the @vercel/node dependency.)
interface ChatRequest {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
  socket?: { remoteAddress?: string };
}

interface ChatResponse {
  status(code: number): ChatResponse;
  json(obj: unknown): void;
  setHeader(name: string, value: string): void;
}

interface ClientMessage {
  role: 'user' | 'assistant';
  content: string;
}

// ── In-memory rate limit per IP (per server instance) ────────────────────────
const hitsByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hitsByIp.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  // Guard against unbounded growth if many distinct IPs hit one instance.
  if (hitsByIp.size > 5000) hitsByIp.clear();
  hitsByIp.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

function clientIp(req: ChatRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  const first = Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(',')[0];
  const ip = (first ?? '').trim() || req.socket?.remoteAddress || 'unknown';
  return ip;
}

// ── System prompt ────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are the shopping assistant for the I.VOLT website. You help customers choose UPS systems, inverters, batteries, solar systems and UPS accessories.

Language: reply in simple, friendly English. Only switch to Hindi or Hinglish if the user writes in it. Keep answers short and easy to scan.

How to help:
1. If the need is unclear, ask a few short questions, not all at once: where it will be used (home / shop / office / factory), which appliances and their approximate watts, how many hours of backup are needed, how often power cuts happen, single or three phase, and for solar the roof space and daily usage.
2. Use these rough formulas and show the working briefly, and always call the results estimates:
   - Total load (W) = sum of appliance watts.
   - Inverter/UPS size (VA) is about total load / 0.8, plus 20-25% headroom.
   - Battery capacity (Ah) is about (load W x backup hours) / (battery voltage x usable depth of discharge x inverter efficiency). Use roughly 50% usable for flat plate and 60-70% for tubular lead-acid, 80-90% for lithium, and about 85% efficiency.
   - Solar size (kW) is about daily energy use (kWh) / (4-5 sun hours x 0.75).
3. Use web search for current, reliable product information. Name the source of any specification you quote. Prefer products listed on this website; mention outside options only when they clearly fit better.
4. Recommend 1-3 options and explain why each fits the user's requirement.
5. Give a rough budget range in INR when asked or when useful. Always say it is an approximate market range, that prices go up and down, and that the final price must be confirmed with the owner through the Enquiry button. Never state a price as final.
6. Never promise stock, delivery, warranty terms or discounts. Send those questions to the owner via the Enquiry button.
7. For installation, wiring and safety questions, advise using a qualified electrician.
8. Stay on topic and politely decline unrelated requests.
9. If you are unsure or the search fails, say so. Never invent specifications.
10. End useful answers by inviting the user to tap Enquiry for a final quote.`;

// ── Compact catalog context (no prices, no long descriptions) ───────────────
function buildCatalogSummary(): string {
  const lines = products.map((p) => {
    const specs = p.specs
      .slice(0, 4)
      .map((s) => `${s.label}: ${s.value}`)
      .join('; ');
    let line = `- [${p.id}] ${p.name}`;
    if (p.brand) line += ` (${p.brand})`;
    line += ` — ${categoryLabels[p.category]}`;
    if (specs) line += `. ${specs}`;
    if (p.bestFor) line += `. ${p.bestFor}`;
    return line;
  });
  return [
    'Products on this website (recommend these first; never quote a final price):',
    ...lines,
  ].join('\n');
}

// ── Groq call ────────────────────────────────────────────────────────────────
interface UpstreamResult {
  ok: boolean;
  reply: string | null;
  /** HTTP status when the request completed, null on network/timeout failure. */
  status: number | null;
  /** Groq error code/type when provided, for logs only. */
  code: string | null;
  /** Short Groq error message for logs only — never the key or user text. */
  message: string | null;
  timeout: boolean;
  ms: number;
}

async function callGroq(
  apiKey: string,
  system: string,
  messages: ClientMessage[],
  useSearch: boolean,
): Promise<UpstreamResult> {
  const started = Date.now();
  const fail = (partial: Partial<UpstreamResult>): UpstreamResult => ({
    ok: false,
    reply: null,
    status: null,
    code: null,
    message: null,
    timeout: false,
    ms: Date.now() - started,
    ...partial,
  });

  const body: Record<string, unknown> = {
    model: GROQ_MODEL,
    messages: [{ role: 'system', content: system }, ...messages],
    temperature: 0.7,
    max_completion_tokens: 700,
    stream: false,
    reasoning_effort: 'low',
  };
  if (useSearch) {
    // Exact shape per Groq docs: https://console.groq.com/docs/tool-use/built-in-tools/browser-search
    // tool_choice is left at the API default ("auto" when tools are present).
    body.tools = [{ type: 'browser_search' }];
  }

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), UPSTREAM_TIMEOUT_MS);
  try {
    const res = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
      signal: ctrl.signal,
    });
    if (!res.ok) {
      let code: string | null = null;
      let message: string | null = null;
      try {
        const errBody = (await res.json()) as {
          error?: { message?: unknown; type?: unknown; code?: unknown };
        };
        if (typeof errBody?.error?.message === 'string') {
          message = errBody.error.message.slice(0, 200);
        }
        const c = errBody?.error?.code ?? errBody?.error?.type;
        if (typeof c === 'string' || typeof c === 'number') code = String(c);
      } catch {
        // Non-JSON error body — status alone is still logged.
      }
      return fail({ status: res.status, code, message });
    }
    let data: unknown;
    try {
      data = await res.json();
    } catch {
      return fail({ status: res.status });
    }
    // Return only the final answer text — never the reasoning content.
    const content = (data as { choices?: Array<{ message?: { content?: unknown } }> })
      .choices?.[0]?.message?.content;
    if (typeof content !== 'string' || !content.trim()) return fail({ status: res.status });
    return {
      ok: true,
      reply: content.trim(),
      status: res.status,
      code: null,
      message: null,
      timeout: false,
      ms: Date.now() - started,
    };
  } catch (err) {
    return fail({ timeout: err instanceof Error && err.name === 'AbortError' });
  } finally {
    clearTimeout(timer);
  }
}

function logUpstreamFailure(
  r: UpstreamResult,
  opts: { searched: boolean; messages: number; chars: number },
): void {
  // Never log the API key or user message content — only counts and timings.
  console.error(
    `[chat] upstream failed status=${r.status ?? 'none'} timeout=${r.timeout} ` +
      `code=${r.code ?? 'none'} error=${r.message ?? 'none'} ms=${r.ms} ` +
      `searched=${opts.searched} messages=${opts.messages} chars=${opts.chars}`,
  );
}

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

// ── Handler ──────────────────────────────────────────────────────────────────
export default async function handler(req: ChatRequest, res: ChatResponse): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Only POST requests are allowed.' });
    return;
  }

  let rawBody: unknown = req.body;
  if (typeof rawBody === 'string') {
    try {
      rawBody = rawBody ? JSON.parse(rawBody) : {};
    } catch {
      rawBody = {};
    }
  }
  const rawMessages = (rawBody as { messages?: unknown } | null)?.messages;
  if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
    res.status(400).json({ error: 'Please send at least one message.' });
    return;
  }
  if (rawMessages.length > MAX_MESSAGES) {
    res.status(400).json({ error: `Please send at most ${MAX_MESSAGES} messages.` });
    return;
  }

  // Keep only user/assistant roles (the client must not inject "system"),
  // trim content, drop empties, cap length.
  const messages: ClientMessage[] = [];
  for (const item of rawMessages) {
    const role = (item as { role?: unknown })?.role;
    const content = (item as { content?: unknown })?.content;
    if ((role !== 'user' && role !== 'assistant') || typeof content !== 'string') continue;
    const text = content.trim();
    if (!text) continue;
    messages.push({ role, content: text.slice(0, MAX_CHARS_PER_MESSAGE) });
  }
  if (messages.length === 0) {
    res.status(400).json({ error: 'Please send at least one message.' });
    return;
  }

  if (isRateLimited(clientIp(req))) {
    res.status(429).json({ error: 'Too many requests, please wait a moment and try again.' });
    return;
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error('[chat] GROQ_API_KEY is not configured');
    res
      .status(500)
      .json({ error: 'Chat is not configured yet. Please use the Enquiry button to contact the owner.' });
    return;
  }

  const system = `${SYSTEM_PROMPT}\n\n${buildCatalogSummary()}`;
  const counts = {
    messages: messages.length,
    chars: messages.reduce((n, m) => n + m.content.length, 0),
  };

  // Web search only when the last user message actually needs it — simple
  // follow-ups and load calculations are answered from the catalog + formulas.
  const lastUser = [...messages].reverse().find((m) => m.role === 'user');
  const useSearch = lastUser ? needsWebSearch(lastUser.content) : false;

  const isTransient = (r: UpstreamResult) =>
    r.timeout || r.status === 429 || (r.status !== null && r.status >= 500);

  let result = await callGroq(apiKey, system, messages, useSearch);
  if (!result.ok) {
    logUpstreamFailure(result, { searched: useSearch, ...counts });
    if (useSearch) {
      // The search request failed or timed out: retry ONCE without the tool
      // (also covers accounts where browser_search is not enabled).
      if (isTransient(result)) await sleep(RETRY_DELAY_MS);
      result = await callGroq(apiKey, system, messages, false);
      if (!result.ok) logUpstreamFailure(result, { searched: false, ...counts });
    } else if (isTransient(result)) {
      // Plain request hit a transient error: wait briefly, retry once.
      await sleep(RETRY_DELAY_MS);
      result = await callGroq(apiKey, system, messages, false);
      if (!result.ok) logUpstreamFailure(result, { searched: false, ...counts });
    }
  }

  if (!result.ok) {
    if (result.status === 429) {
      res.status(429).json({ error: 'Too many requests, please wait a moment.' });
      return;
    }
    if (result.timeout) {
      res.status(504).json({ error: 'That took too long, please try again.' });
      return;
    }
    res.status(502).json({
      error: 'The assistant is unavailable right now. Please try again or use the Enquiry button.',
    });
    return;
  }

  res.status(200).json({ reply: result.reply, searched: useSearch });
}
