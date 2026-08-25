"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { askLutfiAI } from "@/lib/ai/engine";
import { useI18n } from "@/lib/i18n";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  time: number;
}

const STORAGE_KEY = "lutfi.chat";
/** Fired (same tab) whenever either chat view writes new messages. */
const CHAT_UPDATED = "lutfi.chat.updated";

function loadMessages(): ChatMessage[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as ChatMessage[];
  } catch {
    /* noop */
  }
  return [];
}

/** Shared chat engine for both the floating AI panel and the /chat page. */
export function useChatEngine() {
  const { t, locale } = useI18n();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typing, setTyping] = useState(false);
  /** Mirror of the latest message list — keeps async appends correct. */
  const messagesRef = useRef<ChatMessage[]>([]);

  // Hydrate once on mount.
  useEffect(() => {
    const loaded = loadMessages();
    messagesRef.current = loaded;
    setMessages(loaded);
  }, []);

  // Stay in sync with the other chat surface (same tab & other tabs).
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY || e.key === null) {
        const loaded = loadMessages();
        messagesRef.current = loaded;
        setMessages(loaded);
      }
    };
    const onUpdated = () => {
      const loaded = loadMessages();
      messagesRef.current = loaded;
      setMessages(loaded);
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener(CHAT_UPDATED, onUpdated);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(CHAT_UPDATED, onUpdated);
    };
  }, []);

  const persist = useCallback((next: ChatMessage[]) => {
    messagesRef.current = next;
    setMessages(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event(CHAT_UPDATED));
    } catch {
      /* noop */
    }
  }, []);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || typing) return;

      const userMsg: ChatMessage = {
        id: `m-${Date.now()}`,
        role: "user",
        text: trimmed,
        time: Date.now(),
      };
      persist([...messagesRef.current, userMsg]);
      setTyping(true);

      const answer = await askLutfiAI(trimmed, locale);
      // Small delay so the typing indicator is perceivable.
      await new Promise((r) => setTimeout(r, 350));

      setTyping(false);
      persist([
        ...messagesRef.current,
        {
          id: `m-${Date.now()}-a`,
          role: "assistant",
          text: answer,
          time: Date.now(),
        },
      ]);
    },
    [persist, typing, locale],
  );

  const clear = useCallback(() => {
    persist([]);
    setTyping(false);
  }, [persist]);

  const quickQuestions = useMemo(
    () => [
      t.ai.suggestions.whoIs,
      t.ai.suggestions.skills,
      t.ai.suggestions.projects,
      t.ai.suggestions.tech,
      t.ai.suggestions.pkl,
      t.ai.suggestions.contact,
    ],
    [t],
  );

  return { messages, typing, send, clear, quickQuestions, hasMessages: messages.length > 0 };
}
