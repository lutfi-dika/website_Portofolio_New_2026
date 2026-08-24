"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface DashboardWidgetProps {
  title?: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
  /** subtle accent border on hover */
  interactive?: boolean;
  /** optional node rendered at the right of the header */
  action?: React.ReactNode;
}

/** Card container used for every dashboard widget. */
export function DashboardWidget({
  title,
  subtitle,
  className,
  children,
  interactive = false,
  action,
}: DashboardWidgetProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      className={cn(
        "rounded-2xl border border-border bg-card p-5 shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset]",
        interactive &&
          "transition-colors duration-300 hover:border-accent/40 hover:shadow-[0_0_36px_-14px_var(--accent-soft)]",
        className,
      )}
    >
      {(title || subtitle || action) && (
        <header className={cn("flex items-start justify-between gap-3", (title || subtitle) && "mb-4")}>
          <div>
            {title && (
              <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
                {title}
              </h2>
            )}
            {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
          </div>
          {action}
        </header>
      )}
      {children}
    </motion.section>
  );
}

/** Page title block shared by all routes. */
export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mb-6 flex flex-wrap items-end justify-between gap-4"
    >
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </motion.header>
  );
}

/** Empty state used across pages. */
export function EmptyState({
  icon,
  title,
  hint,
  action,
}: {
  icon?: React.ReactNode;
  title: string;
  hint?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border-strong px-6 py-16 text-center">
      {icon && (
        <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-input-bg text-muted">
          {icon}
        </span>
      )}
      <p className="text-sm font-medium">{title}</p>
      {hint && <p className="mt-1 max-w-xs text-xs text-muted">{hint}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

/** Skeleton primitives. */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-lg bg-white/[0.06]", className)} aria-hidden />;
}

export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <Skeleton className="mb-4 h-24 w-full" />
      <Skeleton className="mb-2 h-4 w-2/3" />
      <Skeleton className="h-3 w-1/3" />
    </div>
  );
}
