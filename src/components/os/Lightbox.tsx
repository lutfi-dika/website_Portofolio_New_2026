"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * Accessible fullscreen lightbox.
 * Keyboard: ←/→ navigate, Esc close, +/- zoom.
 */
export function Lightbox({
  open,
  onClose,
  items,
  startIndex = 0,
}: {
  open: boolean;
  onClose: () => void;
  /** Renderable screenshot nodes with captions */
  items: { node: React.ReactNode; caption: string }[];
  startIndex?: number;
}) {
  const t = useT();
  const [index, setIndex] = useState(startIndex);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (open) {
      setIndex(startIndex);
      setZoom(1);
    }
  }, [open, startIndex]);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % items.length),
    [items.length],
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + items.length) % items.length),
    [items.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(z + 0.25, 2.5));
      else if (e.key === "-") setZoom((z) => Math.max(z - 0.25, 1));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, next, prev]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] flex flex-col bg-black/90 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={t.projects.screenshots}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-3 text-white/80">
            <p className="text-sm">
              {index + 1} / {items.length}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setZoom((z) => Math.min(z + 0.25, 2.5))}
                aria-label={t.common.zoomIn}
                className="rounded-lg p-2 hover:bg-white/10"
              >
                <ZoomIn className="h-5 w-5" />
              </button>
              <button
                onClick={() => setZoom((z) => Math.max(z - 0.25, 1))}
                aria-label={t.common.zoomOut}
                className="rounded-lg p-2 hover:bg-white/10"
              >
                <ZoomOut className="h-5 w-5" />
              </button>
              <button
                onClick={onClose}
                aria-label={t.common.close}
                className="rounded-lg p-2 hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Stage */}
          <div
            className="flex min-h-0 flex-1 cursor-zoom-in items-center justify-center overflow-auto p-4"
            onClick={() => setZoom((z) => (z >= 2.5 ? 1 : z + 0.25))}
            role="presentation"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: zoom }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ width: "min(90vw, 880px)" }}
                onClick={(e) => e.stopPropagation()}
              >
                {items[index]?.node}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Caption + nav */}
          <div className="flex items-center justify-center gap-4 px-4 py-4">
            <button
              onClick={prev}
              aria-label={t.common.prev}
              className="rounded-lg border border-white/15 p-2 text-white/80 hover:bg-white/10"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <p className="max-w-xs truncate text-sm text-white/70">{items[index]?.caption}</p>
            <button
              onClick={next}
              aria-label={t.common.next}
              className="rounded-lg border border-white/15 p-2 text-white/80 hover:bg-white/10"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Simple accessible modal used for certificate previews etc. */
export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  const t = useT();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[140] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <div className="fixed inset-0 z-[141] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label={title}
              className={cn(
                "w-full max-w-lg overflow-hidden rounded-2xl border border-border-strong bg-card shadow-2xl shadow-black/50",
              )}
            >
              <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
                <h3 className="truncate text-sm font-semibold">{title}</h3>
                <button
                  onClick={onClose}
                  aria-label={t.common.close}
                  className="rounded-md p-1 text-muted hover:bg-white/[0.06] hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="max-h-[70vh] overflow-y-auto p-5">{children}</div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
