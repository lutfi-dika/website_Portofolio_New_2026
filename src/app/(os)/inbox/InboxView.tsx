"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Archive,
  ArchiveRestore,
  ArrowLeft,
  Inbox as InboxIcon,
  Mail,
  Reply,
  Trash2,
} from "lucide-react";
import { PageHeader, EmptyState } from "@/components/os/DashboardWidget";
import { useInbox, type InboxMessage } from "@/lib/store";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Filter = "all" | "unread" | "read" | "archived";

export function InboxView() {
  const { t, locale } = useI18n();
  const { messages, setStatus, remove } = useInbox();
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (filter === "archived") return messages.filter((m) => m.status === "archived");
    if (filter === "unread") return messages.filter((m) => m.status === "unread");
    if (filter === "read")
      return messages.filter((m) => m.status === "read" || m.status === "replied");
    return messages.filter((m) => m.status !== "archived");
  }, [messages, filter]);

  const selected = messages.find((m) => m.id === selectedId) ?? null;

  const openMessage = (msg: InboxMessage) => {
    setSelectedId(msg.id);
    if (msg.status === "unread") setStatus(msg.id, "read");
  };

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader title={t.inbox.title} subtitle={t.inbox.subtitle} />

      <div className="mb-4 flex flex-wrap gap-2">
        {(
          [
            ["all", t.inbox.filterAll],
            ["unread", t.inbox.filterUnread],
            ["read", t.inbox.filterRead],
            ["archived", t.inbox.filterArchived],
          ] as [Filter, string][]
        ).map(([f, label]) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all",
              filter === f
                ? "border-accent bg-accent-soft text-accent"
                : "border-border text-muted hover:border-border-strong hover:text-foreground",
            )}
          >
            {label}
            {f === "unread" && messages.some((m) => m.status === "unread") && (
              <span className="ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-accent font-mono text-[9px] text-background">
                {messages.filter((m) => m.status === "unread").length}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[380px_1fr]">
        {/* List */}
        <div className={cn("space-y-2", selected && "hidden lg:block")} role="list">
          {filtered.length === 0 ? (
            <EmptyState
              icon={<InboxIcon className="h-5 w-5" aria-hidden />}
              title={t.inbox.empty}
              hint={t.inbox.emptyHint}
              action={
                <a
                  href="/contact"
                  className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-background hover:brightness-110"
                >
                  {t.contact.formTitle}
                </a>
              }
            />
          ) : (
            filtered.map((msg) => (
              <motion.button
                layout
                key={msg.id}
                role="listitem"
                onClick={() => openMessage(msg)}
                className={cn(
                  "w-full rounded-xl border p-3.5 text-left transition-colors",
                  selectedId === msg.id
                    ? "border-accent/50 bg-accent-soft/50"
                    : "border-border bg-card hover:border-border-strong",
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <span
                    className={cn(
                      "truncate text-sm",
                      msg.status === "unread" ? "font-bold text-foreground" : "font-medium text-muted",
                    )}
                  >
                    {msg.sender}
                  </span>
                  <time dateTime={msg.date} className="shrink-0 text-[10px] text-faint">
                    {new Date(msg.date).toLocaleDateString(locale === "id" ? "id-ID" : "en-US", {
                      day: "numeric",
                      month: "short",
                    })}
                  </time>
                </div>
                <p
                  className={cn(
                    "mt-0.5 truncate text-xs",
                    msg.status === "unread" ? "font-semibold text-accent" : "text-muted",
                  )}
                >
                  {msg.subject}
                </p>
                <p className="mt-0.5 truncate text-[11px] text-faint">{msg.message}</p>
                {msg.status !== "archived" && msg.status !== "replied" && (
                  <span
                    aria-hidden
                    className={cn("mt-2 block h-1.5 w-1.5 rounded-full", msg.status === "unread" ? "bg-accent" : "bg-transparent")}
                  />
                )}
              </motion.button>
            ))
          )}
        </div>

        {/* Detail */}
        <AnimatePresence mode="wait">
          {selected ? (
            <motion.article
              key={selected.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <button
                onClick={() => setSelectedId(null)}
                className="mb-4 flex items-center gap-1.5 text-xs text-faint transition-colors hover:text-foreground lg:hidden"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
                {t.common.back}
              </button>

              <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-4">
                <div>
                  <h2 className="font-display text-lg font-bold">{selected.subject}</h2>
                  <p className="mt-1 text-sm text-muted">
                    <span className="font-medium text-foreground">{selected.sender}</span>{" "}
                    <span className="text-faint">&lt;{selected.email}&gt;</span>
                  </p>
                  <time dateTime={selected.date} className="text-xs text-faint">
                    {new Date(selected.date).toLocaleString(locale === "id" ? "id-ID" : "en-US")}
                  </time>
                </div>
                <span className="rounded-full border border-border px-2.5 py-1 text-[10px] uppercase tracking-wider text-faint">
                  {t.inbox.statusLabels[selected.status]}
                </span>
              </header>

              <p className="whitespace-pre-wrap py-5 text-sm leading-relaxed text-muted">
                {selected.message}
              </p>

              <footer className="flex flex-wrap gap-2 border-t border-border pt-4">
                <a
                  href={`mailto:${selected.email}?subject=${encodeURIComponent(`Re: ${selected.subject}`)}`}
                  onClick={() => setStatus(selected.id, "replied")}
                  className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-background hover:brightness-110"
                >
                  <Reply className="h-4 w-4" aria-hidden />
                  {t.inbox.replyVia} Email
                </a>
                <button
                  onClick={() =>
                    setStatus(selected.id, selected.status === "archived" ? "read" : "archived")
                  }
                  className="flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm text-muted hover:text-foreground"
                >
                  {selected.status === "archived" ? (
                    <>
                      <ArchiveRestore className="h-4 w-4" aria-hidden />
                      {t.inbox.unarchive}
                    </>
                  ) : (
                    <>
                      <Archive className="h-4 w-4" aria-hidden />
                      {t.inbox.archive}
                    </>
                  )}
                </button>
                {selected.status !== "archived" && (
                  <button
                    onClick={() => setStatus(selected.id, "unread")}
                    className="flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm text-muted hover:text-foreground"
                  >
                    <Mail className="h-4 w-4" aria-hidden />
                    {t.inbox.markUnread}
                  </button>
                )}
                <button
                  onClick={() => {
                    remove(selected.id);
                    setSelectedId(null);
                  }}
                  className="flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm text-red-300 hover:border-red-400/40 hover:bg-red-400/5"
                >
                  <Trash2 className="h-4 w-4" aria-hidden />
                  {t.inbox.delete}
                </button>
              </footer>
            </motion.article>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="hidden flex-col items-center justify-center rounded-2xl border border-dashed border-border text-center lg:flex"
            >
              <Mail className="mb-3 h-8 w-8 text-faint" aria-hidden />
              <p className="text-sm text-muted">{t.inbox.selectMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
