"use client";

import { motion } from "framer-motion";
import { Code2, Cpu, ExternalLink, LayoutDashboard, Palette, Target } from "lucide-react";
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
    <div className="mx-auto max-w-5xl">
      <PageHeader title={t.about.title} subtitle={t.about.subtitle} />

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Main content */}
        <div className="space-y-4 lg:col-span-2">
          {/* Bio */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <p className="text-sm leading-relaxed text-foreground">{t.about.bio}</p>

            <dl className="mt-5 grid gap-4 border-t border-border pt-5 sm:grid-cols-3">
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

          {/* Business — Webkraf Digital Studio */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <h2 className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-faint">
              {t.about.businessTitle}
            </h2>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 text-lg font-bold text-white">
                W
              </div>
              <div className="flex-1">
                <h3 className="font-display text-base font-bold">{profile.business}</h3>
                <p className="mt-0.5 text-xs text-accent">{profile.businessRole}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {t.about.businessDesc}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Company Profile", "Landing Page", "E-Commerce", "Dashboard", "UI/UX Design"].map(
                    (service) => (
                      <span
                        key={service}
                        className="rounded-lg border border-border px-2.5 py-1 text-[11px] text-muted"
                      >
                        {service}
                      </span>
                    ),
                  )}
                </div>
                <a
                  href="https://webkraf-digital-studio.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:brightness-110"
                >
                  {t.about.businessCta}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
              </div>
            </div>
          </motion.section>

          {/* Interests */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <h2 className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-faint">
              {t.about.interestsTitle}
            </h2>
            <div className="flex flex-wrap gap-2">
              {interests.map((i) => {
                const Icon = INTEREST_ICONS[i.icon as keyof typeof INTEREST_ICONS];
                return (
                  <span
                    key={i.key}
                    className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted"
                  >
                    <Icon className="h-4 w-4 text-accent" aria-hidden />
                    {t.about.interests[i.key as keyof typeof t.about.interests]}
                  </span>
                );
              })}
            </div>
          </motion.section>

          {/* Goals */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <h2 className="mb-2 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-faint">
              <Target className="h-3.5 w-3.5 text-accent" aria-hidden />
              {t.about.goalsTitle}
            </h2>
            <p className="text-sm leading-relaxed text-muted">{t.about.goalsText}</p>
          </motion.section>

          {/* Journey */}
          <section className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-faint">
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
