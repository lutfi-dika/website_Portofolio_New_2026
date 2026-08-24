"use client";

import { motion } from "framer-motion";
import { Building2, GraduationCap, Rocket, Sparkles, Trophy } from "lucide-react";
import { achievements } from "@/data/achievements";
import { PageHeader } from "@/components/os/DashboardWidget";
import { useT } from "@/lib/i18n";

const ICONS = {
  rocket: Rocket,
  building: Building2,
  sparkles: Sparkles,
  graduation: GraduationCap,
  trophy: Trophy,
};

export function AchievementsView() {
  const t = useT();

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader title={t.achievements.title} subtitle={t.achievements.subtitle} />

      <div className="grid gap-4 sm:grid-cols-2">
        {achievements.map((a, i) => {
          const Icon = ICONS[a.icon];
          return (
            <motion.article
              key={a.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-accent/40"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "var(--accent-soft)" }}
              />
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-muted">
                  {a.year}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold leading-snug">
                {t.achievements.items[a.titleKey as keyof typeof t.achievements.items]}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {t.achievements.items[a.descriptionKey as keyof typeof t.achievements.items]}
              </p>
              <p className="mt-3 inline-block rounded-full bg-white/[0.05] px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-faint">
                {t.achievements.types[a.type]}
              </p>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
