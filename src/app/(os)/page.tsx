"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Briefcase,
  Cpu,
  Download,
  FolderKanban,
  Mail,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { stats, profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { currentlyBuilding, currentlyLearning } from "@/data/currently-building";
import { activities } from "@/data/activity";
import { TechIcon } from "@/components/icons";
import {
  AnimatedCounter,
  DigitalClock,
  WeatherWidget,
} from "@/components/os/widgets";
import { DashboardWidget } from "@/components/os/DashboardWidget";
import { HeroCard } from "@/components/os/HeroCard";
import { GitHubCard } from "@/components/os/GitHubCard";
import { Magnetic } from "@/components/os/CustomCursor";
import { useT, useI18n, interpolate } from "@/lib/i18n";
import { useToast } from "@/lib/toast";
import { formatDate } from "@/lib/utils";

const STAT_ICONS = { folder: FolderKanban, cpu: Cpu, briefcase: Briefcase };

export default function DashboardPage() {
  const t = useT();
  const { locale } = useI18n();
  const toast = useToast();

  const greeting =
    new Date().getHours() < 11
      ? t.dashboard.greetingMorning
      : new Date().getHours() < 15
        ? t.dashboard.greetingAfternoon
        : new Date().getHours() < 19
          ? t.dashboard.greetingEvening
          : t.dashboard.greetingNight;

  const today = formatToday(locale);
  const downloadCV = () => toast(t.command.cvUnavailable, "warning");

  const quickActions = [
    { label: t.dashboard.viewProjects, href: "/projects", icon: FolderKanban },
    { label: t.dashboard.downloadCV, onClick: downloadCV, icon: Download },
    { label: t.dashboard.contactMe, href: "/contact", icon: Mail },
    {
      label: t.dashboard.whatsapp,
      href: "https://wa.me/6281234567890",
      icon: null, // WhatsApp brand icon below
    },
  ];

  const recentProjects = projects.slice(0, 3);
  const projectCount = projects.length;
  const techCount = skillGroups.reduce((n, g) => n + g.skills.length, 0);

  return (
    <div>
      {/* Header: greeting + live date */}
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6 flex flex-wrap items-end justify-between gap-3"
      >
        <div>
          <h1 className="font-display text-[26px] font-bold tracking-tight sm:text-3xl">
            {greeting}
          </h1>
          <p className="mt-1 text-sm text-muted">{t.dashboard.subtitle}</p>
        </div>
        <p className="font-mono text-xs capitalize text-faint" suppressHydrationWarning>
          {today}
        </p>
      </motion.header>

      {/* 12-column dashboard grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Hero */}
        <div className="lg:col-span-12">
          <HeroCard />
        </div>

        {/* Honest stats */}
        <section aria-label={t.nav.overview} className="lg:col-span-12">
          <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
            {stats.map((s, i) => {
              const Icon = STAT_ICONS[s.icon as keyof typeof STAT_ICONS];
              return (
                <motion.div
                  key={s.key}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="group rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-accent/40"
                >
                  <Icon className="mb-3 h-5 w-5 text-accent" aria-hidden />
                  <p className="font-display text-3xl font-bold leading-none">
                    <AnimatedCounter
                      value={
                        s.key === "projects"
                          ? projectCount
                          : s.key === "technologies"
                            ? techCount
                            : s.value
                      }
                      suffix={s.suffix}
                    />
                    {"unit" in s && s.unit === "months" && (
                      <span className="ml-1 text-sm font-medium text-muted">
                        {t.dashboard.stats.months}
                      </span>
                    )}
                  </p>
                  <p className="mt-1.5 truncate text-xs text-muted">
                    {t.dashboard.stats[s.key as keyof typeof t.dashboard.stats]}
                  </p>
                </motion.div>
              );
            })}
            {/* Currently learning — a fact, not a number */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.21 }}
              className="group rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-accent/40"
            >
              <BookOpen className="mb-3 h-5 w-5 text-accent" aria-hidden />
              <p className="truncate font-display text-xl font-bold leading-none sm:text-2xl">
                Next.js
              </p>
              <p className="mt-1.5 truncate text-xs text-muted">{t.dashboard.stats.learning}</p>
            </motion.div>
          </div>
        </section>

        {/* Quick actions */}
        <DashboardWidget
          title={t.dashboard.quickActions}
          subtitle={t.dashboard.quickActionsDesc}
          className="lg:col-span-12"
        >
          <div className="flex flex-wrap gap-2.5">
            {quickActions.map((a) => {
              const content = (
                <>
                  {a.icon ? (
                    <a.icon className="h-4 w-4" aria-hidden />
                  ) : (
                    <FaWhatsapp className="h-4 w-4" aria-hidden />
                  )}
                  <span>{a.label}</span>
                </>
              );
              const cls =
                "flex items-center gap-2 rounded-xl border border-border bg-input-bg px-3.5 py-2 text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent active:scale-[0.98]";
              return a.href ? (
                <Magnetic key={a.label}>
                  {a.href.startsWith("http") ? (
                    <a href={a.href} target="_blank" rel="noopener noreferrer" className={cls}>
                      {content}
                    </a>
                  ) : (
                    <Link href={a.href} className={cls}>
                      {content}
                    </Link>
                  )}
                </Magnetic>
              ) : (
                <Magnetic key={a.label}>
                  <button onClick={a.onClick} className={cls}>
                    {content}
                  </button>
                </Magnetic>
              );
            })}
          </div>
        </DashboardWidget>

        {/* Recent projects (main column) */}
        <DashboardWidget
          title={t.dashboard.recentProjects}
          interactive
          action={
            <Link href="/projects" className="inline-flex items-center gap-1 text-xs text-accent hover:underline">
              {t.common.viewAll}
              <ArrowRight className="h-3 w-3" aria-hidden />
            </Link>
          }
          className="lg:col-span-8"
        >
          <ul className="space-y-2.5">
            {recentProjects.map((p, i) => (
              <motion.li
                key={p.slug}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
              >
                <Link
                  href={`/projects/${p.slug}`}
                  className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-input-bg/40 p-3.5 transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:bg-input-bg"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate font-display text-sm font-semibold group-hover:text-accent">
                        {p.title}
                      </h3>
                      {p.status === "in-progress" && (
                        <span
                          className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-amber-300"
                          title={t.dashboard.inProgress}
                          aria-label={t.dashboard.inProgress}
                        />
                      )}
                    </div>
                    <p className="mt-0.5 line-clamp-1 text-xs text-muted">
                      {t.projectDetails[p.descriptionKey as keyof typeof t.projectDetails] as string}
                    </p>
                    <ul className="mt-1.5 flex flex-wrap gap-1" aria-label="Tech">
                      {p.tech.slice(0, 3).map((tech) => (
                        <li
                          key={tech}
                          className="rounded-md border border-border px-1.5 py-0.5 font-mono text-[10px] text-faint"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    aria-hidden
                  />
                </Link>
              </motion.li>
            ))}
          </ul>
        </DashboardWidget>

        {/* Right rail */}
        <div className="flex flex-col gap-4 lg:col-span-4">
          <DashboardWidget title={t.dashboard.currentlyBuilding} interactive>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-lg font-bold leading-snug">
                  {currentlyBuilding.project}
                </h3>
                <p className="mt-0.5 text-xs text-muted">{currentlyBuilding.client}</p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-400/10 px-2.5 py-1 text-[11px] font-medium text-amber-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-300" aria-hidden />
                {t.dashboard.inProgress}
              </span>
            </div>

            <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tech">
              {currentlyBuilding.tech.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md border border-border px-2 py-0.5 font-mono text-[10px] text-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>

            <div className="mt-4">
              <div className="mb-1.5 flex justify-between text-xs">
                <span className="text-muted">{t.dashboard.progress}</span>
                <span className="font-mono font-bold text-accent">{currentlyBuilding.progress}%</span>
              </div>
              <div
                className="h-2 overflow-hidden rounded-full bg-white/[0.06]"
                role="progressbar"
                aria-valuenow={currentlyBuilding.progress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${currentlyBuilding.progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, var(--accent), var(--accent-strong))" }}
                />
              </div>
            </div>
          </DashboardWidget>

          <GitHubCard />

          <DashboardWidget title={t.dashboard.widgets.clock}>
            <DigitalClock />
          </DashboardWidget>

          <DashboardWidget title={t.dashboard.widgets.weather}>
            <WeatherWidget />
          </DashboardWidget>

          <p className="px-1 pb-1 text-center text-[11px] text-faint">
            {interpolate(t.footer.rights, { year: new Date().getFullYear() })} ·{" "}
            {profile.location}
          </p>
        </div>

        {/* Activity timeline */}
        <DashboardWidget
          title={t.activity.title}
          action={
            <Link href="/activity" className="text-xs text-accent hover:underline">
              {t.common.viewAll}
            </Link>
          }
          className="lg:col-span-8"
        >
          <ol className="relative space-y-4 before:absolute before:bottom-1.5 before:left-[5.5px] before:top-1.5 before:w-px before:bg-border">
            {activities.slice(0, 4).map((a) => (
              <li key={a.id} className="relative flex items-start gap-4 pl-0">
                <span className="relative z-10 mt-1.5 h-3 w-3 shrink-0 rounded-full border-2 border-background bg-accent shadow-[0_0_8px_var(--accent)]" aria-hidden />
                <div className="min-w-0 flex-1 rounded-xl border border-transparent px-0.5 py-0.5 transition-colors">
                  <p className="text-sm">{t.activity.items[a.titleKey as keyof typeof t.activity.items] as string}</p>
                  <p className="text-[11px] text-faint">{formatDate(a.date, locale)}</p>
                </div>
              </li>
            ))}
          </ol>
        </DashboardWidget>

        {/* Learning compact list */}
        <DashboardWidget title={t.dashboard.currentlyLearning} className="lg:col-span-4">
          <ul className="space-y-2">
            {currentlyLearning.map((item) => (
              <li
                key={item.name}
                className="flex items-center gap-2.5 rounded-xl border border-border p-2.5 transition-colors hover:border-accent/40"
              >
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${item.color}1a`, color: item.color }}
                >
                  <TechIcon name={item.icon} className="h-4 w-4" />
                </span>
                <span className="truncate text-sm font-medium">{item.name}</span>
              </li>
            ))}
          </ul>
        </DashboardWidget>
      </div>
    </div>
  );
}

/** Localized long date for the header, computed on the client only. */
function formatToday(locale: string): string {
  try {
    return new Intl.DateTimeFormat(
      locale === "id" ? "id-ID" : "en-US",
      { weekday: "long", day: "numeric", month: "long", year: "numeric" },
    ).format(new Date());
  } catch {
    return "";
  }
}
