"use client";

import { motion } from "framer-motion";
import { Keyboard } from "lucide-react";
import { PageHeader } from "@/components/os/DashboardWidget";
import { useT } from "@/lib/i18n";

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex min-w-7 items-center justify-center rounded-md border border-border bg-surface px-2 py-1 font-mono text-[11px] font-semibold text-muted shadow-[0_2px_0_0_var(--border)]">
      {children}
    </kbd>
  );
}

export function ShortcutsView() {
  const t = useT();

  const rows: { keys: string[]; label: string }[] = [
    { keys: ["Ctrl", "K"], label: t.shortcuts.items.openSearch },
    { keys: ["G", "→", "D"], label: t.shortcuts.items.goDashboard },
    { keys: ["G", "→", "P"], label: t.shortcuts.items.goProjects },
    { keys: ["G", "→", "S"], label: t.shortcuts.items.goSkills },
    { keys: ["G", "→", "C"], label: t.shortcuts.items.goContact },
    { keys: ["T"], label: t.shortcuts.items.toggleTheme },
    { keys: ["L"], label: t.shortcuts.items.switchLanguage },
    { keys: ["Esc"], label: t.shortcuts.items.closeModal },
  ];

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title={t.shortcuts.title} subtitle={t.shortcuts.subtitle} />

      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-2xl border border-border bg-card"
      >
        <h2 className="flex items-center gap-2 border-b border-border bg-surface/50 px-5 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
          <Keyboard className="h-3.5 w-3.5 text-accent" aria-hidden />
          {t.shortcuts.title}
        </h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[10px] uppercase tracking-wider text-faint">
              <th scope="col" className="px-5 py-2.5 font-medium">{t.shortcuts.action}</th>
              <th scope="col" className="px-5 py-2.5 text-right font-medium">{t.shortcuts.keys}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row) => (
              <tr key={row.label} className="transition-colors hover:bg-white/[0.02]">
                <td className="px-5 py-3">{row.label}</td>
                <td className="px-5 py-3">
                  <span className="flex items-center justify-end gap-1.5">
                    {row.keys.map((k, i) => (
                      <span key={i} className="flex items-center gap-1.5">
                        {i > 0 && k === "→" ? (
                          <span aria-hidden className="text-faint">→</span>
                        ) : (
                          <Kbd>{k}</Kbd>
                        )}
                      </span>
                    ))}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.section>

      <p className="mt-4 text-center text-xs text-faint">{t.ai.poweredBy}</p>
    </div>
  );
}
