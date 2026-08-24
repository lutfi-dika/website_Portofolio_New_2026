"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { navSections } from "@/lib/navigation";
import { PageHeader } from "@/components/os/DashboardWidget";
import { useT } from "@/lib/i18n";
import { skillGroups } from "@/data/skills";
import { projects } from "@/data/projects";
import { achievements } from "@/data/achievements";

export function OverviewView() {
  const t = useT();
  const totalSkills = skillGroups.reduce((acc, g) => acc + g.skills.length, 0);

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader title={t.nav.overview} subtitle={t.dashboard.subtitle} />

      {/* Quick facts */}
      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { value: projects.length, label: t.dashboard.stats.projects },
          { value: totalSkills, label: t.dashboard.stats.technologies },
          { value: achievements.length, label: t.nav.achievements },
          { value: navSections.reduce((a, s) => a + s.items.length, 0), label: t.command.pages },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-2xl border border-border bg-card p-4"
          >
            <p className="font-display text-3xl font-bold">{s.value}</p>
            <p className="mt-1 text-xs text-muted">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Sitemap of the OS */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {navSections.map((section) => (
          <section
            key={section.titleKey}
            className="rounded-2xl border border-border bg-card p-5"
          >
            <h2 className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
              {t.nav[section.titleKey]}
            </h2>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center justify-between rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-accent-soft/60 hover:text-accent"
                  >
                    {t.nav[item.labelKey]}
                    <ArrowUpRight
                      className="h-3.5 w-3.5 text-faint opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
