'use client';

import { useState, useRef, useEffect, useCallback, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquare, X, Send, Copy, Check, Trash2, Bot, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { t } from '@/lib/i18n';
import { useAppStore } from '@/stores/app-store';
import type { Locale } from '@/types';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

/* ------------------------------------------------------------------ */
/*  Simple markdown → HTML parser                                      */
/* ------------------------------------------------------------------ */

function parseMarkdown(text: string): string {
  return text
    .split('\n')
    .map((line) => {
      let out = line;
      // Bold: **text**
      out = out.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      // Italic: *text*
      out = out.replace(/\*(.+?)\*/g, '<em>$1</em>');
      // Inline code: `code`
      out = out.replace(/`(.+?)`/g, '<code class="bg-primary/10 px-1.5 py-0.5 rounded text-xs font-mono">$1</code>');
      return out;
    })
    .join('<br/>');
}

/* ------------------------------------------------------------------ */
/*  Typing indicator (3 bouncing dots)                                  */
/* ------------------------------------------------------------------ */

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-1 py-2">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="inline-block size-1.5 rounded-full bg-primary"
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Single message bubble                                               */
/* ------------------------------------------------------------------ */

function MessageBubble({
  message,
  locale,
  isStreaming,
}: {
  message: ChatMessage;
  locale: Locale;
  isStreaming?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  }, [message.content]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`relative max-w-[85%] ${isUser ? 'max-w-[80%]' : ''}`}>
        {/* Copy button for assistant messages */}
        {!isUser && !isStreaming && message.content && (
          <button
            onClick={handleCopy}
            className="absolute -top-1 right-1 z-10 rounded-md p-1 text-muted-foreground/60 transition-colors hover:text-primary hover:bg-primary/10"
            aria-label={t('chat.copy', locale)}
          >
            {copied ? (
              <Check className="size-3" />
            ) : (
              <Copy className="size-3" />
            )}
          </button>
        )}

        <div
          className={
            isUser
              ? 'rounded-2xl rounded-br-md bg-primary/15 px-4 py-2.5 text-sm leading-relaxed'
              : 'glass rounded-2xl rounded-bl-md px-4 py-2.5 text-sm leading-relaxed'
          }
        >
          {isUser ? (
            <span>{message.content}</span>
          ) : (
            <span dangerouslySetInnerHTML={{ __html: parseMarkdown(message.content) }} />
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main AI Chat component                                             */
/* ------------------------------------------------------------------ */

export function AiChat() {
  const locale = useAppStore((s) => s.locale);
  const chatOpen = useAppStore((s) => s.chatOpen);
  const setChatOpen = useAppStore((s) => s.setChatOpen);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isInitialised = useRef(false);

  /* Initialise welcome message once -------------------------------- */
  useEffect(() => {
    if (!isInitialised.current) {
      isInitialised.current = true;
      setMessages([{ role: 'assistant', content: t('chat.welcome', locale) }]);
    }
  }, [locale]);

  /* Auto-scroll ------------------------------------------------------ */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streaming]);

  /* Auto-resize textarea --------------------------------------------- */
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = `${Math.min(ta.scrollHeight, 4 * 24)}px`;
  }, [input]);

  /* Send message ----------------------------------------------------- */
  const handleSubmit = useCallback(
    async (textOverride?: string) => {
      const text = (textOverride ?? input).trim();
      if (!text || streaming) return;

      setInput('');

      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }

      const userMsg: ChatMessage = { role: 'user', content: text };
      const assistantMsg: ChatMessage = { role: 'assistant', content: '' };

      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setStreaming(true);

      try {
        const history = [...messages, userMsg];
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: history }),
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const reader = res.body?.getReader();
        if (!reader) throw new Error('No readable stream');

        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith('data: ')) continue;
            const data = trimmed.slice(6);
            if (data === '[DONE]') break;
            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                setMessages((prev) => {
                  const updated = [...prev];
                  const last = updated[updated.length - 1];
                  if (last?.role === 'assistant') {
                    updated[updated.length - 1] = {
                      ...last,
                      content: last.content + parsed.content,
                    };
                  }
                  return updated;
                });
              }
            } catch {
              /* skip malformed JSON */
            }
          }
        }
      } catch {
        // Replace the empty assistant message with an error
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last?.role === 'assistant' && !last.content) {
            updated[updated.length - 1] = {
              ...last,
              content:
                'Sorry, I encountered an error processing your request. Please try again.',
            };
          }
          return updated;
        });
      } finally {
        setStreaming(false);
      }
    },
    [input, messages, streaming],
  );

  /* Keyboard submit -------------------------------------------------- */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit],
  );

  /* Clear conversation ----------------------------------------------- */
  const handleClear = useCallback(() => {
    setMessages([{ role: 'assistant', content: t('chat.welcome', locale) }]);
    setInput('');
    setStreaming(false);
  }, [locale]);

  /* Show suggestions only when only the welcome message exists ------- */
  const showSuggestions = messages.length === 1 && messages[0].role === 'assistant';

  const suggestions = [
    t('chat.suggest.1', locale),
    t('chat.suggest.2', locale),
    t('chat.suggest.3', locale),
    t('chat.suggest.4', locale),
  ];

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <>
      {/* Floating toggle button ------------------------------------- */}
      <AnimatePresence>
        <motion.button
          onClick={() => setChatOpen(!chatOpen)}
          className="fixed bottom-6 right-6 z-40 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-shadow hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={chatOpen ? t('common.close', locale) : t('chat.title', locale)}
        >
          {/* Pulse glow ring when closed */}
          {!chatOpen && (
            <motion.span
              className="pointer-events-none absolute inset-0 rounded-full"
              animate={{ boxShadow: ['0 0 0 0 oklch(0.7 0.18 160 / 0.4)', '0 0 0 12px oklch(0.7 0.18 160 / 0)'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            />
          )}

          <AnimatePresence mode="wait">
            {chatOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <X className="size-5" />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <MessageSquare className="size-5" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </AnimatePresence>

      {/* Chat panel -------------------------------------------------- */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            className={
              'fixed z-50 flex flex-col glass shadow-2xl ' +
              'md:bottom-24 md:right-6 md:z-40 md:h-[560px] md:w-[380px] md:rounded-2xl ' +
              'inset-0 h-full w-full rounded-none md:inset-auto'
            }
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header ------------------------------------------------ */}
            <div className="flex h-14 shrink-0 items-center justify-between border-b px-4">
              <div className="flex items-center gap-2">
                <Bot className="size-5 text-primary" />
                <span className="text-sm font-semibold">AtlasHub AI</span>
                <Sparkles className="size-3 text-primary/60" />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClear}
                className="size-8"
                aria-label={t('chat.clear', locale)}
              >
                <Trash2 className="size-4 text-muted-foreground" />
              </Button>
            </div>

            {/* Messages ----------------------------------------------- */}
            <ScrollArea className="flex-1 px-4 py-3">
              <div className="flex flex-col gap-3">
                {messages.map((msg, idx) => {
                  const isLastAssistant =
                    msg.role === 'assistant' && idx === messages.length - 1;
                  return (
                    <MessageBubble
                      key={idx}
                      message={msg}
                      locale={locale}
                      isStreaming={isLastAssistant && streaming}
                    />
                  );
                })}
                {streaming &&
                  messages[messages.length - 1]?.role === 'assistant' &&
                  !messages[messages.length - 1].content && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggested questions ---------------------------------- */}
              {showSuggestions && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="mt-4 flex flex-wrap gap-2"
                >
                  {suggestions.map((q) => (
                    <Button
                      key={q}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => handleSubmit(q)}
                    >
                      {q}
                    </Button>
                  ))}
                </motion.div>
              )}
            </ScrollArea>

            {/* Input area --------------------------------------------- */}
            <div className="flex shrink-0 items-end gap-2 border-t p-3">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t('chat.placeholder', locale)}
                disabled={streaming}
                rows={1}
                className="max-h-24 min-h-[36px] flex-1 resize-none rounded-xl border-0 bg-muted/50 px-3 py-2 text-sm leading-relaxed placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/30 disabled:opacity-50"
              />
              <Button
                size="icon"
                className="size-9 shrink-0 rounded-full"
                onClick={() => handleSubmit()}
                disabled={!input.trim() || streaming}
                aria-label={t('chat.send', locale)}
              >
                <Send className="size-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
