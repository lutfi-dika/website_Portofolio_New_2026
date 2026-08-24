"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastItem {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastValue {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastValue | null>(null);

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
} as const;

const STYLES: Record<ToastType, string> = {
  success: "text-emerald-400",
  error: "text-red-400",
  warning: "text-amber-400",
  info: "text-sky-400",
};

let nextId = 1;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (message: string, type: ToastType = "success") => {
      const id = nextId++;
      setToasts((prev) => [...prev.slice(-3), { id, type, message }]);
      window.setTimeout(() => dismiss(id), 3800);
    },
    [dismiss],
  );

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed bottom-4 right-4 z-[200] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-2 sm:bottom-6 sm:right-6"
      >
        <AnimatePresence>
          {toasts.map((item) => {
            const Icon = ICONS[item.type];
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className={cn(
                  "pointer-events-auto flex items-start gap-3 rounded-xl border border-border bg-card/95 p-3.5 shadow-xl shadow-black/30 backdrop-blur",
                  "[html[data-glass='off']_&]:backdrop-blur-none",
                )}
              >
                <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", STYLES[item.type])} aria-hidden />
                <p className="flex-1 text-sm leading-snug text-foreground">{item.message}</p>
                <button
                  onClick={() => dismiss(item.id)}
                  className="rounded-md p-1 text-muted transition-colors hover:bg-white/5 hover:text-foreground"
                  aria-label="Dismiss"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx.toast;
}
