export interface ChatApiMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export type ChatErrorCode = 'network' | 'server' | 'empty';

export class ChatError extends Error {
  code: ChatErrorCode;
  status?: number;

  constructor(message: string, options: { code: ChatErrorCode; status?: number }) {
    super(message);
    this.name = 'ChatError';
    this.code = options.code;
    this.status = options.status;
  }
}

/**
 * POST chat history to the /api/chat backend and return the assistant reply.
 * Throws ChatError on failure so the UI can show a friendly message + Retry.
 */
export async function sendChat(messages: ChatApiMessage[]): Promise<string> {
  let res: Response;
  try {
    res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });
  } catch {
    throw new ChatError('Could not connect. Please check your internet and retry.', {
      code: 'network',
    });
  }

  if (!res.ok) {
    // The server already returns specific user-facing messages
    // (429 rate limit, 504 timeout, 502 upstream failure) — show them as-is.
    let friendly =
      res.status === 429
        ? 'Too many requests, please wait a moment.'
        : 'Something went wrong. Please retry or use the Enquiry button.';
    try {
      const data = (await res.json()) as { error?: unknown };
      if (typeof data?.error === 'string' && data.error.trim()) friendly = data.error;
    } catch {
      // Keep the generic message when the error body is unreadable.
    }
    throw new ChatError(friendly, { code: 'server', status: res.status });
  }

  let data: unknown;
  try {
    data = await res.json();
  } catch {
    throw new ChatError('Could not understand the reply. Please retry.', {
      code: 'server',
      status: res.status,
    });
  }

  const record = data as Record<string, unknown> | null;
  const text =
    (typeof record?.reply === 'string' && record.reply) ||
    (typeof record?.message === 'string' && record.message) ||
    (typeof record?.text === 'string' && record.text) ||
    '';
  if (!text.trim()) {
    throw new ChatError('Got an empty reply. Please retry.', {
      code: 'empty',
      status: res.status,
    });
  }
  return text;
}
