"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, Sparkles, Trash2, X } from "lucide-react";
import { useT } from "@/lib/i18n";
import { useChatEngine } from "@/lib/chat";
import { cn, formatTime } from "@/lib/utils";

export function AIChatFloating() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const { messages, typing, send, clear, quickQuestions, hasMessages } = useChatEngine();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll on new content.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
  }, [open]);

  const submit = () => {
    if (!input.trim()) return;
    void send(input);
    setInput("");
  };

  return (
    <>
      {/* Launcher */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label={open ? t.ai.closeAssistant : t.ai.openAssistant}
        className="fixed bottom-[84px] right-4 z-[90] flex h-13 w-13 items-center justify-center rounded-full bg-accent text-background shadow-lg shadow-accent/30 lg:bottom-6 lg:right-6"
        style={{ height: 52, width: 52 }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-5 w-5" aria-hidden />
            </motion.span>
          ) : (
            <motion.span key="bot" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <Bot className="h-6 w-6" aria-hidden />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-background" aria-hidden />
        )}
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label={t.ai.assistantName}
            className="fixed bottom-[148px] right-4 z-[91] flex h-[480px] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border-strong bg-card shadow-2xl shadow-black/50 lg:bottom-[92px] lg:right-6"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <Sparkles className="h-4 w-4" aria-hidden />
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-card" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{t.ai.assistantName}</p>
                <p className="truncate text-[11px] text-muted">{typing ? t.chat.typing : t.chat.online}</p>
              </div>
              {hasMessages && (
                <button
                  onClick={clear}
                  title={t.chat.clearChat}
                  aria-label={t.chat.clearChat}
                  className="rounded-md p-1.5 text-muted hover:bg-white/[0.06] hover:text-foreground"
                >
                  <Trash2 className="h-4 w-4" aria-hidden />
                </button>
              )}
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              {!hasMessages && (
                <div className="rounded-xl bg-input-bg p-3 text-sm leading-relaxed text-muted">
                  {t.ai.greeting}
                </div>
              )}
              {messages.map((m) => (
                <div key={m.id} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                      m.role === "user"
                        ? "rounded-br-sm bg-accent font-medium text-background"
                        : "rounded-bl-sm bg-input-bg text-foreground",
                    )}
                  >
                    {m.text}
                    <span className={cn("mt-1 block text-right text-[9px]", m.role === "user" ? "text-background/60" : "text-faint")}>
                      {formatTime(new Date(m.time)).slice(0, 5)}
                    </span>
                  </div>
                </div>
              ))}
              {typing && <TypingDots label={t.chat.typing} />}
            </div>

            {/* Quick questions */}
            {!hasMessages && (
              <div className="flex flex-wrap gap-1.5 px-4 pb-2">
                {quickQuestions.slice(0, 3).map((q) => (
                  <button
                    key={q}
                    onClick={() => void send(q)}
                    className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="border-t border-border p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submit();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t.chat.placeholder}
                  aria-label={t.chat.placeholder}
                  className="h-10 min-w-0 flex-1 rounded-xl border border-border bg-input-bg px-3.5 text-sm outline-none transition-colors placeholder:text-faint focus:border-accent"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || typing}
                  aria-label={t.chat.send}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-background transition-opacity hover:brightness-110 disabled:opacity-40"
                >
                  <Send className="h-4 w-4" aria-hidden />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function TypingDots({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-2" aria-live="polite">
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-input-bg px-3.5 py-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted"
            style={{ animationDelay: `${i * 150}ms` }}
            aria-hidden
          />
        ))}
      </div>
      {label && <span className="text-[11px] text-faint">{label}</span>}
    </div>
  );
}
