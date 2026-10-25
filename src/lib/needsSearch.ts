/**
 * Shared server/client heuristic: does this user message need live web search?
 *
 * Used by api/chat.ts to decide whether to attach Groq's browser_search tool,
 * and by Chatbot.tsx to decide whether the "Searching the web…" indicator is
 * honest after a long wait. Single source of truth — keep both in sync by
 * editing only here.
 *
 * Rule: search only for specific brands, models, sizes, specs, comparisons,
 * availability or market ranges. Simple follow-ups ("1 hour backup") and load
 * calculations ("3 fans + 2 lights") are answered from the catalog + formulas.
 */
const BRANDS = [
  'apc',
  'luminous',
  'microtek',
  'v-guard',
  'vguard',
  'exide',
  'zebronics',
  'numeric',
  'tata',
  'loom',
  'utl',
  'amaron',
  'livguard',
  'havells',
  'polycab',
  'belkin',
  'aulten',
];

const SEARCH_SIGNALS = [
  'spec',
  'warranty',
  'compare',
  'comparison',
  ' vs ',
  'better',
  'review',
  'price',
  'cost',
  'budget',
  'market',
  'buy',
  'available',
  'availability',
  'stock',
  'latest',
  'datasheet',
  'brochure',
  'star rating',
];

// Specific sizes like 150Ah, 1kVA, 550W, 220V. Plain durations ("1 hour") and
// bare counts ("2 fans") intentionally do NOT match.
const SIZE_RE = /\b\d+(?:\.\d+)?\s?(?:kva|va|kwh|kw|wp|ah|wh|hp)\b/i;
const VOLT_WATT_RE = /\b\d+(?:\.\d+)?\s?[vw]\b/i;

export function needsWebSearch(text: string): boolean {
  const t = ` ${text.toLowerCase()} `;
  if (BRANDS.some((b) => t.includes(b))) return true;
  if (SIZE_RE.test(t) || VOLT_WATT_RE.test(t)) return true;
  return SEARCH_SIGNALS.some((s) => t.includes(s));
}
