"use client";

import { motion } from "framer-motion";
import { TechIcon } from "@/components/icons";
import type { Skill } from "@/data/skills";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** Modern skill tile: brand icon + radial level gauge + usage count. */
export function SkillCard({ skill, index = 0 }: { skill: Skill; index?: number }) {
  const t = useT();

  const levelLabel =
    skill.level >= 90
      ? t.skills.levelLabels.expert
      : skill.level >= 80
        ? t.skills.levelLabels.advanced
        : skill.level >= 70
          ? t.skills.levelLabels.intermediate
          : t.skills.levelLabels.beginner;

  const R = 15;
  const C = 2 * Math.PI * R;
  const filled = (skill.level / 100) * C;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.25) }}
      whileHover={{ y: -4 }}
      className="group flex items-center gap-3.5 rounded-xl border border-border bg-card p-3.5 transition-colors hover:border-accent/40"
    >
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
        style={{ backgroundColor: `${skill.color}1a`, color: skill.color }}
      >
        <TechIcon name={skill.icon} className="h-6 w-6" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{skill.name}</p>
        <p className="truncate text-[11px] text-muted">
          {skill.projectsUsed > 0
            ? `${skill.projectsUsed} ${t.nav.projects.toLowerCase()}`
            : levelLabel}
        </p>
      </div>

      {/* Radial gauge */}
      <div
        className="relative h-10 w-10 shrink-0"
        role="img"
        aria-label={`${skill.name}: ${levelLabel} (${skill.level}%)`}
      >
        <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
          <circle cx="18" cy="18" r={R} fill="none" stroke="currentColor" strokeWidth="3" className="text-white/[0.07]" />
          <motion.circle
            cx="18"
            cy="18"
            r={R}
            fill="none"
            stroke={skill.color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={C}
            initial={{ strokeDashoffset: C }}
            whileInView={{ strokeDashoffset: C - filled }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-mono text-[9px] font-bold">
          {skill.level}
        </span>
      </div>

      <span className={cn("sr-only")}>{t.skills.level}: {levelLabel}</span>
    </motion.div>
  );
}
