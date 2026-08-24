"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, CheckCheck, Send, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/os/DashboardWidget";
import { Modal } from "@/components/os/Lightbox";
import { useChatEngine } from "@/lib/chat";
import { useI18n } from "@/lib/i18n";

export function ChatView() {
  const { t, locale } = useI18n();
  const { messages, typing: isTyping, send: sendMessage, clear: reset } = useChatEngine();
  const [input, setInput] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages.length, isTyping]);

  const submit = () => {
    const text = input.trim();
    if (!text) return;
    void sendMessage(text);
    setInput("");
  };

  return (
    <div className="mx-auto flex h-[calc(100dvh-13rem)] max-w-3xl flex-col sm:h-[calc(100dvh-11rem)]">
      <PageHeader
        title={t.chat.title}
        subtitle={t.chat.subtitle}
        actions={
          <>
            <span className="hidden items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-medium text-emerald-300 sm:inline-flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {t.chat.online}
            </span>
            <button
              onClick={() => setConfirmOpen(true)}
              className="flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-xs font-medium text-muted transition-colors hover:border-red-400/40 hover:text-red-300"
            >
              <Trash2 className="h-3.5 w-3.5" aria-hidden />
              {t.chat.clearChat}
            </button>
          </>
        }
      />

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 space-y-4 overflow-y-auto rounded-2xl border border-border bg-card/60 p-4"
        role="log"
        aria-live="polite"
        aria-label={t.chat.title}
      >
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[85%] sm:max-w-[70%] ${msg.role === "user" ? "text-right" : ""}`}>
              <div
                className={`inline-block rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "rounded-br-md bg-accent text-background"
                    : "rounded-bl-md border border-border bg-surface"
                }`}
              >
                {msg.text.split("\n\n").map((para: string, i: number) => (
                  <p key={i} className={i > 0 ? "mt-2" : undefined}>
                    {para}
                  </p>
                ))}
              </div>
              <div className="mt-1 flex items-center justify-end gap-1 pr-1 text-[10px] text-faint">
                {new Date(msg.time).toLocaleTimeString(locale === "id" ? "id-ID" : "en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                {msg.role === "user" && <CheckCheck className="h-3 w-3 text-accent" aria-hidden />}
                {msg.role === "assistant" && <Check className="h-3 w-3" aria-hidden />}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start" aria-label={t.chat.typing}>
            <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-border bg-surface px-4 py-3">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.15 }}
                  className="h-1.5 w-1.5 rounded-full bg-accent"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick questions */}
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {Object.values(t.ai.suggestions).map((q) => (
          <button
            key={q}
            onClick={() => void sendMessage(q)}
            className="shrink-0 rounded-full border border-border px-3.5 py-1.5 text-xs text-muted transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="mt-3 flex items-end gap-2"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          rows={1}
          placeholder={t.chat.placeholder}
          aria-label={t.chat.send}
          className="max-h-32 min-h-[44px] flex-1 resize-none rounded-2xl border border-border bg-input-bg px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-faint focus:border-accent"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          aria-label={t.chat.send}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent text-background transition-all hover:brightness-110 active:scale-95 disabled:pointer-events-none disabled:opacity-40"
        >
          <Send className="h-4 w-4" aria-hidden />
        </button>
      </form>

      <p className="mt-2 text-center text-[10px] text-faint">{t.ai.poweredBy}</p>

      {/* Clear confirm */}
      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} title={t.chat.clearConfirm}>
        <div className="flex justify-end gap-2 pt-1">
          <button
            onClick={() => setConfirmOpen(false)}
            className="rounded-xl border border-border px-4 py-2 text-sm text-muted hover:text-foreground"
          >
            {t.common.close}
          </button>
          <button
            onClick={() => {
              reset();
              setConfirmOpen(false);
            }}
            className="rounded-xl bg-red-500/90 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500"
          >
            {t.chat.clearChat}
          </button>
        </div>
      </Modal>
    </div>
  );
}
