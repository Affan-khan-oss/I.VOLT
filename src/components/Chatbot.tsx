import { useEffect, useRef, useState } from 'react';
import type { Product } from '../data/products';
import { EnquiryModal } from './EnquiryModal';
import { ChatError, sendChat, type ChatApiMessage } from '../lib/chatClient';
import { needsWebSearch } from '../lib/needsSearch';

interface ChatMsg {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const STORAGE_KEY = 'ivolt-chat-messages-v2';

const WELCOME_TEXT =
  "Hi! I'm the **I.VOLT Assistant**. I can help you choose a UPS, inverter, battery or solar system. Tap a suggestion below or type your question.";

const QUICK_REPLIES = [
  'Suggest a UPS for my home',
  'Inverter + battery sizing',
  'Calculate my solar load',
  'Rough budget idea',
];

/** Generic product used when opening an enquiry straight from the chat. */
const CHAT_ENQUIRY_PRODUCT: Product = {
  id: 'chat-general-enquiry',
  name: 'General Enquiry (Chatbot)',
  category: 'accessories',
  image: '/images/products/placeholder.svg',
  specs: [],
  description: 'General enquiry started from the I.VOLT Assistant chat.',
};

function uid(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Minimal markdown: **bold**, [links](https://…), bullet/numbered lists, newlines. */
function renderMarkdown(src: string): string {
  let html = escapeHtml(src);
  html = html.replace(
    /\[([^\]]+)\]\((https?:[^)\s]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="underline font-medium">$1</a>',
  );
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  const lines = html.split('\n');
  let out = '';
  let inList = false;
  for (const line of lines) {
    const m = line.match(/^\s*(?:[-*•]|\d+[.)])\s+(.*)$/);
    if (m) {
      if (!inList) {
        out += '<ul class="list-disc pl-5 space-y-1 my-1">';
        inList = true;
      }
      out += `<li>${m[1]}</li>`;
    } else {
      if (inList) {
        out += '</ul>';
        inList = false;
      }
      out += line.trim() === '' ? '<div class="h-2"></div>' : `${line}<br/>`;
    }
  }
  if (inList) out += '</ul>';
  return out.replace(/<br\/>$/, '');
}

function loadMessages(): ChatMsg[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as ChatMsg[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // Storage unavailable — fall through to the welcome message.
  }
  return [{ id: 'welcome', role: 'assistant', content: WELCOME_TEXT }];
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>(loadMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ChatError | null>(null);
  const [showEnquiry, setShowEnquiry] = useState(false);
  // Whether the in-flight request is expected to run a web search (same rule
  // as the server). Drives the "Searching the web…" indicator honestly.
  const [searching, setSearching] = useState(false);
  // True once the current request has been waiting for 4+ seconds.
  const [slowWait, setSlowWait] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);

  const hasUserMessage = messages.some((m) => m.role === 'user');

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // Ignore quota / privacy-mode failures.
    }
  }, [messages]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el && open) el.scrollTop = el.scrollHeight;
  }, [messages, loading, error, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    else fabRef.current?.focus();
  }, [open]);

  // Auto-grow the textarea up to ~4 rows.
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 96)}px`;
  }, [input, open]);

  // Flip to the "slow wait" indicator text after 4 seconds of loading.
  useEffect(() => {
    if (!loading) {
      setSlowWait(false);
      return;
    }
    const t = setTimeout(() => setSlowWait(true), 4000);
    return () => clearTimeout(t);
  }, [loading]);

  // Close the chat window on Escape (the enquiry modal handles its own Esc).
  useEffect(() => {
    if (!open || showEnquiry) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        setOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, showEnquiry]);

  const doSend = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const userMsg: ChatMsg = { id: uid(), role: 'user', content: trimmed };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput('');
    setLoading(true);
    setSlowWait(false);
    setSearching(needsWebSearch(trimmed));
    setError(null);
    const history: ChatApiMessage[] = next.map((m) => ({ role: m.role, content: m.content }));
    try {
      const reply = await sendChat(history);
      setMessages((prev) => [...prev, { id: uid(), role: 'assistant', content: reply }]);
    } catch (e) {
      setError(
        e instanceof ChatError
          ? e
          : new ChatError('Something went wrong. Please retry.', { code: 'server' }),
      );
    } finally {
      setLoading(false);
    }
  };

  const retry = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);
    const history: ChatApiMessage[] = messages.map((m) => ({ role: m.role, content: m.content }));
    try {
      const reply = await sendChat(history);
      setMessages((prev) => [...prev, { id: uid(), role: 'assistant', content: reply }]);
    } catch (e) {
      setError(
        e instanceof ChatError
          ? e
          : new ChatError('Something went wrong. Please retry.', { code: 'server' }),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed z-40 bottom-3 right-3 left-2 sm:left-auto sm:bottom-6 sm:right-6 flex flex-col items-end gap-3 sm:gap-4">
        {open && (
          <section
            role="dialog"
            aria-label="I.VOLT Assistant chat"
            className="flex flex-col bg-white rounded-2xl shadow-2xl border border-[#E2E8F0] overflow-hidden w-full sm:w-[380px] h-[calc(100dvh-170px)] sm:h-[min(600px,calc(100dvh-220px))]"
          >
            {/* Header — fixed height, single line */}
            <div className="bg-[#0B1D3A] text-white pl-4 pr-2 h-16 flex items-center gap-3 shrink-0">
              <span
                aria-hidden="true"
                className="w-9 h-9 rounded-full bg-[#F5C518] text-[#0B1D3A] font-black flex items-center justify-center text-sm shrink-0"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                V
              </span>
              <div className="flex-1 min-w-0">
                <h2
                  className="font-bold text-sm leading-tight truncate"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  I.VOLT Assistant
                </h2>
                <p className="text-[#94A3B8] text-xs leading-tight truncate">
                  Ask me about UPS, inverters, batteries &amp; solar
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowEnquiry(true)}
                aria-label="Open enquiry form"
                className="h-9 px-3 inline-flex items-center justify-center bg-[#F5C518] hover:bg-[#D4A517] text-[#0B1D3A] text-xs font-bold rounded-full transition-colors shrink-0"
              >
                Enquiry
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="min-w-10 min-h-10 p-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors shrink-0 flex items-center justify-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              role="log"
              aria-live="polite"
              aria-label="Chat messages"
              className="flex-1 min-h-0 overflow-y-auto px-3 py-3 space-y-3 bg-white"
            >
              {messages.map((m) =>
                m.role === 'user' ? (
                  <div key={m.id} className="flex justify-end">
                    <p className="max-w-[85%] bg-[#F5C518] text-[#0B1D3A] text-sm leading-relaxed rounded-2xl rounded-br-md px-3 py-2 whitespace-pre-wrap break-words">
                      {m.content}
                    </p>
                  </div>
                ) : (
                  <div key={m.id} className="flex justify-start">
                    <div className="max-w-[85%] bg-[#F1F5F9] text-[#0B1D3A] text-sm leading-relaxed rounded-2xl rounded-bl-md px-3 py-2 break-words">
                      <span dangerouslySetInnerHTML={{ __html: renderMarkdown(m.content) }} />
                    </div>
                  </div>
                ),
              )}

              {loading && (
                <div className="flex justify-start">
                  <div
                    role="status"
                    aria-label={slowWait && searching ? 'Searching the web' : 'Thinking'}
                    className="bg-[#F1F5F9] rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-2"
                  >
                    <span className="flex gap-1.5" aria-hidden="true">
                      {[0, 150, 300].map((delay) => (
                        <span
                          key={delay}
                          style={{ animationDelay: `${delay}ms` }}
                          className="w-2 h-2 rounded-full bg-[#64748B] animate-bounce"
                        />
                      ))}
                    </span>
                    <span className="text-xs text-[#64748B] font-medium">
                      {slowWait && searching ? 'Searching the web…' : 'Thinking…'}
                    </span>
                  </div>
                </div>
              )}

              {error && !loading && (
                <div className="flex justify-start">
                  <div
                    role="alert"
                    className="max-w-[85%] bg-red-50 border border-red-200 text-[#0B1D3A] text-sm rounded-2xl rounded-bl-md px-3 py-2"
                  >
                    <p className="mb-2">{error.message}</p>
                    <button
                      type="button"
                      onClick={retry}
                      className="px-4 py-1.5 bg-[#F5C518] hover:bg-[#D4A517] text-[#0B1D3A] text-xs font-bold rounded-xl transition-colors"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick replies — wrap, hidden after the first user message */}
            {!hasUserMessage && (
              <div aria-label="Quick replies" className="flex flex-wrap gap-2 px-3 py-2 bg-white border-t border-[#F1F5F9] shrink-0">
                {QUICK_REPLIES.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    disabled={loading}
                    onClick={() => doSend(chip)}
                    className="text-xs font-medium border border-[#E2E8F0] rounded-full px-3 py-1.5 text-[#0B1D3A] hover:border-[#F5C518] hover:bg-[#FFFBEA] transition-colors disabled:opacity-50"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                doSend(input);
              }}
              className="border-t border-[#E2E8F0] p-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] flex gap-2 items-end bg-white shrink-0"
            >
              <label htmlFor="ivolt-chat-input" className="sr-only">
                Type your message
              </label>
              <textarea
                id="ivolt-chat-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                    e.preventDefault();
                    doSend(input);
                  }
                }}
                rows={1}
                placeholder="Type your question..."
                aria-label="Type your question"
                className="flex-1 border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-sm text-[#0B1D3A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#0B1D3A] resize-none overflow-y-auto"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                aria-label="Send message"
                className="h-11 px-4 bg-[#F5C518] hover:bg-[#D4A517] disabled:opacity-40 text-[#0B1D3A] text-sm font-bold rounded-xl transition-colors shrink-0"
              >
                Send
              </button>
            </form>
          </section>
        )}

        {/* Floating button */}
        <button
          ref={fabRef}
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? 'Close I.VOLT Assistant chat' : 'Open I.VOLT Assistant chat'}
          className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-[#F5C518] hover:bg-[#D4A517] text-[#0B1D3A] shadow-xl hover:shadow-[#F5C518]/30 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 shrink-0"
        >
          {open ? (
            <svg className="w-[18px] h-[18px] sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-[18px] h-[18px] sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h8m-8 4h5m7-2a9 9 0 01-13.2 7.9L4 21l1.2-3.6A9 9 0 1120 12z"
              />
            </svg>
          )}
        </button>
      </div>

      {showEnquiry && (
        <EnquiryModal product={CHAT_ENQUIRY_PRODUCT} onClose={() => setShowEnquiry(false)} />
      )}
    </>
  );
}
