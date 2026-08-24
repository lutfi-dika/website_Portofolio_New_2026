"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { skillGroups, type SkillCategory } from "@/data/skills";
import { SkillCard } from "@/components/os/SkillCard";
import { PageHeader } from "@/components/os/DashboardWidget";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function SkillsView() {
  const t = useT();
  const [active, setActive] = useState<"all" | SkillCategory>("all");

  const filtered = useMemo(
    () => (active === "all" ? skillGroups : skillGroups.filter((g) => g.category === active)),
    [active],
  );

  const filters: ("all" | SkillCategory)[] = ["all", ...skillGroups.map((g) => g.category)];

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader title={t.skills.title} subtitle={t.skills.subtitle} />

      {/* Category filter */}
      <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label={t.skills.title}>
        {filters.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={active === f}
            onClick={() => setActive(f)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all",
              active === f
                ? "border-accent bg-accent-soft text-accent"
                : "border-border text-muted hover:border-border-strong hover:text-foreground",
            )}
          >
            {f === "all" ? t.skills.all : t.skills.categories[f]}
          </button>
        ))}
      </div>

      <div className="space-y-8">
        {filtered.map((group) => (
          <motion.section
            key={group.category}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="mb-3 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
              <span className="h-px w-5 bg-accent/60" aria-hidden />
              {t.skills.categories[group.category]}
              <span className="text-faint/60">({group.skills.length})</span>
            </h2>
            <div
              className={cn(
                "grid gap-3",
                group.category === "frontend" || active !== "all"
                  ? "sm:grid-cols-2 xl:grid-cols-3"
                  : "sm:grid-cols-2 xl:grid-cols-3",
              )}
            >
              {group.skills.map((skill, i) => (
                <SkillCard key={skill.name} skill={skill} index={i} />
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
}
