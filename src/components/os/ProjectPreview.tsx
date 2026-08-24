"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

/**
 * Original generative preview artwork per project — no external images.
 * Each variant draws an abstract, stylized UI of the project type.
 */
export function ProjectPreview({
  project,
  className,
  animated = true,
}: {
  project: Project;
  className?: string;
  animated?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={cn("relative overflow-hidden rounded-xl border border-border", className)}
      style={{
        background: `linear-gradient(135deg, ${project.accent}14, transparent 55%), var(--surface)`,
      }}
    >
      {/* window chrome */}
      <div className="flex items-center gap-1.5 border-b border-border bg-card/60 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-red-400/70" />
        <span className="h-2 w-2 rounded-full bg-amber-400/70" />
        <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
        <span
          className="ml-2 h-3 flex-1 rounded-full opacity-40"
          style={{ background: `${project.accent}33` }}
        />
      </div>

      <div className="relative aspect-[16/9] p-4">
        {project.preview === "landing" && <LandingArt accent={project.accent} accent2={project.accent2} animated={animated} />}
        {project.preview === "dashboard" && <DashboardArt accent={project.accent} accent2={project.accent2} animated={animated} />}
        {project.preview === "learning" && <LearningArt accent={project.accent} accent2={project.accent2} animated={animated} />}
        {project.preview === "studio" && <StudioArt accent={project.accent} accent2={project.accent2} animated={animated} />}

        {/* glow */}
        <div
          className="pointer-events-none absolute -bottom-10 left-1/2 h-24 w-2/3 -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: `${project.accent}22` }}
        />
      </div>
    </div>
  );
}

type ArtProps = { accent: string; accent2: string; animated: boolean };

function LandingArt({ accent, accent2, animated }: ArtProps) {
  const anim = animated ? { y: [0, -5, 0] } : {};
  const trans = animated ? { duration: 4, repeat: Infinity, ease: "easeInOut" as const } : {};
  return (
    <div className="flex h-full gap-3">
      <div className="flex w-1/2 flex-col justify-center gap-2">
        <motion.div animate={anim} transition={trans} className="space-y-1.5">
          <div className="h-2.5 w-4/5 rounded" style={{ backgroundColor: accent }} />
          <div className="h-2.5 w-3/5 rounded" style={{ backgroundColor: accent2 }} />
        </motion.div>
        <div className="h-1.5 w-full rounded bg-white/[0.07]" />
        <div className="h-1.5 w-4/5 rounded bg-white/[0.07]" />
        <div className="mt-2 flex gap-1.5">
          <div className="h-4 w-12 rounded" style={{ backgroundColor: accent }} />
          <div className="h-4 w-12 rounded border border-white/15" />
        </div>
      </div>
      <div className="relative flex w-1/2 items-center justify-center">
        <div className="absolute inset-x-4 inset-y-1 rotate-3 rounded-lg border border-white/[0.08] bg-card/80" />
        <div className="absolute inset-x-6 inset-y-3 rounded-lg border border-white/[0.1] bg-card/90 p-2">
          <div className="grid grid-cols-3 gap-1">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-4 rounded-sm" style={{ backgroundColor: i % 2 ? `${accent}30` : `${accent2}25` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardArt({ accent, accent2, animated }: ArtProps) {
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex gap-2">
        {[accent, accent2].map((c, i) => (
          <div key={i} className="h-8 flex-1 rounded-md border border-white/[0.06] p-1.5" style={{ background: `${c}12` }}>
            <div className="h-1 w-2/3 rounded" style={{ backgroundColor: c }} />
            <div className="mt-1 h-1.5 w-1/3 rounded bg-white/20" />
          </div>
        ))}
      </div>
      <div className="flex flex-1 gap-2">
        <div className="w-1/4 space-y-1 rounded-md border border-white/[0.06] p-1.5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-1.5 rounded" style={{ backgroundColor: i === 1 ? accent : "rgba(255,255,255,0.08)" }} />
          ))}
        </div>
        <div className="flex flex-1 items-end gap-1 rounded-md border border-white/[0.06] p-2">
          {[35, 55, 40, 70, 52, 85, 64, 95, 78].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 4 }}
              animate={{ height: `${h}%` }}
              transition={animated ? { delay: i * 0.05, duration: 0.7 } : {}}
              className="w-full rounded-t"
              style={{ background: `linear-gradient(to top, ${accent}, ${accent2}88)` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function LearningArt({ accent, accent2 }: ArtProps) {
  return (
    <div className="flex h-full gap-2.5">
      <div className="w-1/4 space-y-1.5 rounded-md border border-white/[0.06] p-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-sm" style={{ backgroundColor: i < 3 ? accent : "rgba(255,255,255,0.12)" }} />
            <div className="h-1 flex-1 rounded" style={{ backgroundColor: i < 3 ? `${accent}50` : "rgba(255,255,255,0.07)" }} />
          </div>
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="relative flex-1 overflow-hidden rounded-md border border-white/[0.06]" style={{ background: `linear-gradient(120deg, ${accent2}18, transparent)` }}>
          <div className="absolute left-2 top-2 h-3 w-3 rounded-full border-2" style={{ borderColor: accent }} />
          <div className="absolute bottom-2 left-2 right-2 h-1 rounded" style={{ backgroundColor: `${accent}45` }} />
        </div>
        <div className="flex gap-1.5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-6 flex-1 rounded-md border border-white/[0.06]" style={{ background: `${accent2}12` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StudioArt({ accent, accent2, animated }: ArtProps) {
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden">
      <motion.div
        animate={animated ? { scale: [1, 1.06, 1], rotate: [0, 4, 0] } : {}}
        transition={animated ? { duration: 6, repeat: Infinity, ease: "easeInOut" as const } : {}}
        className="absolute left-6 top-3 h-16 w-16 rounded-2xl"
        style={{ background: `linear-gradient(135deg, ${accent}, transparent)` }}
      />
      <motion.div
        animate={animated ? { scale: [1.05, 1, 1.05], rotate: [0, -6, 0] } : {}}
        transition={animated ? { duration: 7, repeat: Infinity, ease: "easeInOut" as const } : {}}
        className="absolute bottom-2 right-8 h-12 w-12 rounded-xl"
        style={{ background: `linear-gradient(135deg, ${accent2}, transparent)` }}
      />
      <div className="z-10 text-center">
        <p className="font-display text-xl font-black tracking-tight text-white/90">W</p>
        <div className="mx-auto mt-1.5 h-1 w-10 rounded" style={{ backgroundColor: accent }} />
      </div>
      <div className="absolute inset-x-6 bottom-3 h-px" style={{ background: `linear-gradient(to right, transparent, ${accent}66, transparent)` }} />
    </div>
  );
}
