"use client";

import { motion } from "framer-motion";
import { TechIcon } from "@/components/icons";
import type { Skill } from "@/data/skills";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const LEVEL_STYLES: Record<string, string> = {
  comfortable: "bg-emerald-400/10 text-emerald-400",
  learning: "bg-amber-400/10 text-amber-400",
  exploring: "bg-sky-400/10 text-sky-400",
};

export function SkillCard({
  skill,
  index = 0,
}: {
  skill: Skill;
  index?: number;
}) {
  const t = useT();
  const levelLabel = t.skills.levelLabels[skill.level];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.2) }}
      className="group flex items-center gap-3 rounded-xl border border-border bg-card p-3.5 transition-colors hover:border-accent/40"
    >
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: `${skill.color}1a`, color: skill.color }}
      >
        <TechIcon name={skill.icon} className="h-5 w-5" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{skill.name}</p>
      </div>

      <span
        className={cn(
          "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium",
          LEVEL_STYLES[skill.level],
        )}
      >
        {levelLabel}
      </span>
    </motion.div>
  );
}
