"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, FolderGit2, Rocket, Sparkles, type LucideIcon } from "lucide-react";
import { GithubBrandIcon } from "@/components/icons";
import { activities, type ActivityType } from "@/data/activity";
import { PageHeader } from "@/components/os/DashboardWidget";
import { useI18n } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";

const TYPE_ICONS: Record<ActivityType, LucideIcon> = {
  project: Rocket,
  learning: BookOpen,
  github: GithubBrandIcon,
  portfolio: Sparkles,
  milestone: FolderGit2,
};

const ICON_BG: Record<ActivityType, string> = {
  project: "bg-accent-soft text-accent",
  learning: "bg-emerald-400/10 text-emerald-300",
  github: "bg-white/[0.06] text-muted",
  portfolio: "bg-purple-400/10 text-purple-300",
  milestone: "bg-amber-300/10 text-amber-300",
};

export function ActivityView() {
  const { t, locale } = useI18n();
  const [filter, setFilter] = useState<"all" | ActivityType>("all");

  const types: ("all" | ActivityType)[] = ["all", "portfolio", "project", "learning", "github"];

  const filtered = useMemo(
    () => (filter === "all" ? activities : activities.filter((a) => a.type === filter)),
    [filter],
  );

  const typeLabel = (type: ActivityType) =>
    type === "milestone" ? t.achievements.types.milestone : t.activity.types[type];

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title={t.activity.title} subtitle={t.activity.subtitle} />

      <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label={t.activity.title}>
        {types.map((type) => (
          <button
            key={type}
            role="tab"
            aria-selected={filter === type}
            onClick={() => setFilter(type)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
              filter === type
                ? "border-accent bg-accent-soft text-accent"
                : "border-border text-muted hover:border-border-strong hover:text-foreground"
            }`}
          >
            {type === "all" ? t.skills.all : typeLabel(type)}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <ol className="relative space-y-5 pl-8">
        <span aria-hidden className="absolute bottom-4 left-[11px] top-4 w-px bg-border" />
        {filtered.map((item, i) => {
          const Icon = TYPE_ICONS[item.type];
          return (
            <motion.li
              key={item.id}
              layout
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="relative"
            >
              <span
                aria-hidden
                className={`absolute -left-8 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-border ${ICON_BG[item.type]}`}
              >
                <Icon className="h-3 w-3" />
              </span>
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold leading-snug">{t.activity.items[item.titleKey as keyof typeof t.activity.items]}</h3>
                  <time dateTime={item.date} className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-faint">
                    {formatDate(item.date, locale)}
                  </time>
                </div>
                {item.descriptionKey && (
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {t.activity.items[item.descriptionKey as keyof typeof t.activity.items]}
                  </p>
                )}
                <span className="mt-2 inline-block rounded-full bg-white/[0.05] px-2 py-0.5 text-[10px] uppercase tracking-wider text-faint">
                  {typeLabel(item.type)}
                </span>
              </div>
            </motion.li>
          );
        })}
      </ol>

      {filtered.length === 0 && <p className="py-10 text-center text-sm text-muted">{t.activity.empty}</p>}
    </div>
  );
}
