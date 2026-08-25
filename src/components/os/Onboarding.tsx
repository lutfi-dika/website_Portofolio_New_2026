"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Command, Sparkles } from "lucide-react";
import { useT } from "@/lib/i18n";

const KEY = "lutfi.onboarded";

export function Onboarding() {
  const t = useT();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(KEY)) setOpen(true);
    } catch {
      /* noop */
    }
  }, []);

  const close = () => {
    setOpen(false);
    try {
      window.localStorage.setItem(KEY, "1");
    } catch {
      /* noop */
    }
  };

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-sm"
            aria-hidden
          />
          <div className="fixed inset-0 z-[121] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="onboarding-title"
              className="w-full max-w-md overflow-hidden rounded-2xl border border-border-strong bg-card shadow-2xl shadow-black/50"
            >
              {/* Accent header band */}
              <div
                className="h-20 w-full"
                style={{
                  background:
                    "linear-gradient(120deg, var(--accent) -30%, var(--accent-strong) 45%, transparent 90%)",
                }}
              />
              <div className="p-6">
                <p className="mb-1 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-accent">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden /> LUTFI.DEV OS
                </p>
                <h2 id="onboarding-title" className="font-display text-xl font-bold">
                  {t.onboarding.welcome}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {t.onboarding.description}
                </p>

                <div className="mt-5 flex items-center gap-3 rounded-xl border border-border bg-input-bg px-4 py-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
                    <Command className="h-4 w-4" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-sm font-medium">{t.onboarding.tip1Title}</span>
                    <span className="block text-xs text-muted">{t.onboarding.tip1Desc}</span>
                  </span>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={close}
                    className="flex-1 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-background transition-transform hover:brightness-110 active:scale-[0.98]"
                  >
                    {t.onboarding.explore}
                  </button>
                  <button
                    onClick={close}
                    className="rounded-xl border border-border px-4 py-2.5 text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {t.onboarding.skip}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
