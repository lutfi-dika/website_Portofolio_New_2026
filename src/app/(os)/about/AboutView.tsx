"use client";

import { motion } from "framer-motion";
import { Code2, Cpu, LayoutDashboard, Palette, Target } from "lucide-react";
import { profile, interests } from "@/data/profile";
import { journey } from "@/data/journey";
import { PageHeader } from "@/components/os/DashboardWidget";
import { ProfileCard } from "@/components/os/ProfileCard";
import { JourneyTimeline } from "@/components/os/ExperienceTimeline";
import { useT } from "@/lib/i18n";

const INTEREST_ICONS = { code: Code2, layout: LayoutDashboard, palette: Palette, cpu: Cpu };

export function AboutView() {
  const t = useT();

  const journeyItems = journey.map((j) => ({
    year: j.year,
    title: t.about.journey[j.titleKey as keyof typeof t.about.journey],
    description: t.about.journey[j.descriptionKey as keyof typeof t.about.journey],
  }));

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader title={t.about.title} subtitle={t.about.subtitle} />

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Bio column */}
        <div className="space-y-4 lg:col-span-2">
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <h2 className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
              {t.about.bioTitle}
            </h2>
            <p className="text-base leading-relaxed text-foreground">{profile.bio}</p>

            <dl className="mt-6 grid gap-4 border-t border-border pt-5 sm:grid-cols-3">
              <div>
                <dt className="text-[11px] uppercase tracking-wider text-faint">{t.about.locationLabel}</dt>
                <dd className="mt-1 text-sm font-medium">{profile.location}</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-wider text-faint">{t.about.educationLabel}</dt>
                <dd className="mt-1 text-sm font-medium">
                  {t.about.student} — {profile.major}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-wider text-faint">{t.about.statusLabel}</dt>
                <dd className="mt-1 flex items-center gap-1.5 text-sm font-medium text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
                  {t.dashboard.availableForProjects}
                </dd>
              </div>
            </dl>
          </motion.section>

          {/* Interests */}
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <h2 className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
              {t.about.interestsTitle}
            </h2>
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {interests.map((i, idx) => {
                const Icon = INTEREST_ICONS[i.icon as keyof typeof INTEREST_ICONS];
                return (
                  <motion.li
                    key={i.key}
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.06 }}
                    className="flex items-center gap-3 rounded-xl border border-border p-3.5 transition-colors hover:border-accent/40"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                      <Icon className="h-4.5 w-4.5 h-[18px] w-[18px]" aria-hidden />
                    </span>
                    <span className="text-sm font-medium">
                      {t.about.interests[i.key as keyof typeof t.about.interests]}
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </motion.section>

          {/* Goals */}
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden rounded-2xl border border-border bg-card p-6"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full blur-3xl"
              style={{ background: "var(--accent-soft)" }}
            />
            <h2 className="mb-3 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
              <Target className="h-3.5 w-3.5 text-accent" aria-hidden />
              {t.about.goalsTitle}
            </h2>
            <p className="max-w-xl leading-relaxed text-muted">{t.about.goalsText}</p>
          </motion.section>

          {/* Journey timeline */}
          <section className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
              {t.about.journeyTitle}
            </h2>
            <JourneyTimeline items={journeyItems} />
          </section>
        </div>

        {/* Profile card */}
        <div>
          <ProfileCard />
        </div>
      </div>
    </div>
  );
}
