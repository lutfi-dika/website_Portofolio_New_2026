"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { initialNotifications, type AppNotification } from "@/data/notifications";

/* ──────────────────────────── Notifications ─────────────────────────── */

interface NotificationsValue {
  notifications: AppNotification[];
  unreadCount: number;
  markRead: (id: string) => void;
  markAllRead: () => void;
  clearAll: () => void;
}

const NotificationsContext = createContext<NotificationsValue | null>(null);

function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("lutfi.notifications");
      if (raw) setNotifications(JSON.parse(raw) as AppNotification[]);
      else {
        setNotifications(initialNotifications as unknown as AppNotification[]);
        window.localStorage.setItem(
          "lutfi.notifications",
          JSON.stringify(initialNotifications),
        );
      }
    } catch {
      setNotifications(initialNotifications as unknown as AppNotification[]);
    }
  }, []);

  const persist = useCallback((next: AppNotification[]) => {
    setNotifications(next);
    try {
      window.localStorage.setItem("lutfi.notifications", JSON.stringify(next));
    } catch {
      /* noop */
    }
  }, []);

  const value = useMemo<NotificationsValue>(
    () => ({
      notifications,
      unreadCount: notifications.filter((n) => !n.read).length,
      markRead: (id) =>
        persist(notifications.map((n) => (n.id === id ? { ...n, read: true } : n))),
      markAllRead: () => persist(notifications.map((n) => ({ ...n, read: true }))),
      clearAll: () => persist([]),
    }),
    [notifications, persist],
  );

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
}

export function useNotifications() {
  const ctx = useContext(NotificationsContext);
  if (!ctx) throw new Error("useNotifications must be used inside AppStateProvider");
  return ctx;
}

/* ───────────────────────────── Saved projects ───────────────────────── */

interface SavedValue {
  savedSlugs: string[];
  isSaved: (slug: string) => boolean;
  toggleSaved: (slug: string) => boolean; // returns new state
}

const SavedContext = createContext<SavedValue | null>(null);

function SavedProvider({ children }: { children: ReactNode }) {
  const [savedSlugs, setSaved] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("lutfi.saved");
      if (raw) setSaved(JSON.parse(raw) as string[]);
    } catch {
      /* noop */
    }
  }, []);

  const toggle = useCallback(
    (slug: string) => {
      let nowSaved = false;
      setSaved((prev) => {
        const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
        nowSaved = next.includes(slug);
        try {
          window.localStorage.setItem("lutfi.saved", JSON.stringify(next));
        } catch {
          /* noop */
        }
        return next;
      });
      return nowSaved;
    },
    [],
  );

  const value = useMemo<SavedValue>(
    () => ({
      savedSlugs,
      isSaved: (slug) => savedSlugs.includes(slug),
      toggleSaved: toggle,
    }),
    [savedSlugs, toggle],
  );

  return <SavedContext.Provider value={value}>{children}</SavedContext.Provider>;
}

export function useSaved() {
  const ctx = useContext(SavedContext);
  if (!ctx) throw new Error("useSaved must be used inside AppStateProvider");
  return ctx;
}

/* ────────────────────────────── Contact inbox ───────────────────────── */

export interface InboxMessage {
  id: string;
  sender: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: "unread" | "read" | "replied" | "archived";
}

interface InboxValue {
  messages: InboxMessage[];
  addMessage: (m: Omit<InboxMessage, "id" | "date" | "status">) => void;
  setStatus: (id: string, status: InboxMessage["status"]) => void;
  remove: (id: string) => void;
}

const InboxContext = createContext<InboxValue | null>(null);

function InboxProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<InboxMessage[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("lutfi.inbox");
      if (raw) setMessages(JSON.parse(raw) as InboxMessage[]);
    } catch {
      /* noop */
    }
  }, []);

  const persist = useCallback((next: InboxMessage[]) => {
    setMessages(next);
    try {
      window.localStorage.setItem("lutfi.inbox", JSON.stringify(next));
    } catch {
      /* noop */
    }
  }, []);

  /**
   * Mock/local backend for the contact form.
   * Architecture note: swap this provider's internals with real API calls
   * (POST /api/messages + GET /api/messages) when a backend exists —
   * the consuming UI only depends on this context interface.
   */
  const value = useMemo<InboxValue>(
    () => ({
      messages,
      addMessage: (m) =>
        persist([
          {
            ...m,
            id: `msg-${Date.now()}`,
            date: new Date().toISOString(),
            status: "unread",
          },
          ...messages,
        ]),
      setStatus: (id, status) =>
        persist(messages.map((msg) => (msg.id === id ? { ...msg, status } : msg))),
      remove: (id) => persist(messages.filter((msg) => msg.id !== id)),
    }),
    [messages, persist],
  );

  return <InboxContext.Provider value={value}>{children}</InboxContext.Provider>;
}

export function useInbox() {
  const ctx = useContext(InboxContext);
  if (!ctx) throw new Error("useInbox must be used inside AppStateProvider");
  return ctx;
}

/* ────────────────────────────── Root wrapper ────────────────────────── */

export function AppStateProvider({ children }: { children: ReactNode }) {
  return (
    <NotificationsProvider>
      <SavedProvider>
        <InboxProvider>{children}</InboxProvider>
      </SavedProvider>
    </NotificationsProvider>
  );
}
