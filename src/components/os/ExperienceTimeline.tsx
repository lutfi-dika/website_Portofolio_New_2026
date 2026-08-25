"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { experiences, educationHistory } from "@/data/experience";
import { useT } from "@/lib/i18n";

/** Animated vertical timeline for experience + education. */
export function ExperienceTimeline() {
  const t = useT();

  return (
    <div className="relative">
      {/* rail */}
      <motion.span
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        aria-hidden
        className="absolute bottom-2 left-[19px] top-2 w-px origin-top bg-gradient-to-b from-accent via-border to-transparent"
      />

      <ol className="space-y-6">
        {experiences.map((exp) => (
          <motion.li
            key={exp.id}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45 }}
            className="relative pl-14"
          >
            <span className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-xl border border-accent/40 bg-accent-soft text-accent">
              <Briefcase className="h-5 w-5" aria-hidden />
            </span>

            <div className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-accent/30">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="font-display text-lg font-bold">{t.experience.roles[exp.roleKey as keyof typeof t.experience.roles]}</h3>
                  <p className="text-sm text-muted">
                    {exp.company} · {exp.location}
                  </p>
                </div>
                <span className="rounded-full border border-accent/40 bg-accent-soft px-3 py-1 font-mono text-xs text-accent">
                  {exp.period}
                </span>
              </div>
              <p className="mt-1 text-xs uppercase tracking-wider text-faint">
                {t.experience.roles[exp.typeKey as keyof typeof t.experience.roles]}
              </p>

              <h4 className="mt-4 font-mono text-[11px] font-semibold uppercase tracking-widest text-faint">
                {t.experience.activities}
              </h4>
              <ul className="mt-2 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
                {exp.activitiesKeys.map((key) => (
                  <li key={key} className="flex items-start gap-2 text-sm text-muted">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    {t.experience.activitiesList[key as keyof typeof t.experience.activitiesList]}
                  </li>
                ))}
              </ul>

              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tech stack">
                {exp.stack.map((s) => (
                  <li key={s} className="rounded-md border border-border px-2 py-0.5 font-mono text-[10px] text-muted">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </motion.li>
        ))}

        {/* Education section */}
        <li className="relative pl-14 pt-2">
          <h2 className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
            <GraduationCap className="h-3.5 w-3.5 text-accent" aria-hidden />
            {t.experience.educationTitle}
          </h2>
        </li>

        {educationHistory.map((edu) => (
          <motion.li
            key={edu.id}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45 }}
            className="relative pl-14"
          >
            <span className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-input-bg text-muted">
              <GraduationCap className="h-5 w-5" aria-hidden />
            </span>
            <div className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-accent/30">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="font-display text-lg font-bold">{edu.school}</h3>
                  <p className="text-sm text-muted">
                    {edu.major ? `${edu.major} · ` : ""}
                    {edu.place}
                  </p>
                </div>
                <span className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted">
                  {edu.period}
                </span>
              </div>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {edu.focusKeys.map((f) => (
                  <li
                    key={f}
                    className="rounded-md border border-border px-2 py-0.5 text-[11px] text-muted"
                  >
                    {t.experience.educationFocus[f as keyof typeof t.experience.educationFocus]}
                  </li>
                ))}
              </ul>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

/** Journey timeline used on /about. */
export function JourneyTimeline({
  items,
}: {
  items: { year: string; title: string; description: string }[];
}) {
  return (
    <div className="relative">
      <motion.span
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        aria-hidden
        className="absolute bottom-3 left-[7px] top-3 w-px origin-top bg-gradient-to-b from-accent to-transparent"
      />
      <ol className="space-y-6">
        {items.map((item, i) => (
          <motion.li
            key={`${item.year}-${i}`}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="relative pl-8"
          >
            <span
              aria-hidden
              className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-accent bg-background"
            >
              <span className="absolute inset-[3px] rounded-full bg-accent" />
            </span>
            <p className="font-mono text-xs text-accent">{item.year}</p>
            <h4 className="mt-0.5 font-semibold">{item.title}</h4>
            <p className="mt-0.5 text-sm leading-relaxed text-muted">{item.description}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
