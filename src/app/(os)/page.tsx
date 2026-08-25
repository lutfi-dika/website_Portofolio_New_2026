"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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
  Command,
  ExternalLink,
} from "lucide-react";
import { stats } from "@/data/profile";
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
import { useT, useI18n } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";

const STAT_ICONS = { folder: FolderKanban, cpu: Cpu, briefcase: Briefcase };

export default function DashboardPage() {
  const t = useT();
  const { locale } = useI18n();
  const router = useRouter();

  const downloadCV = () => router.push("/resume");

  const projectCount = projects.length;
  const techCount = skillGroups.reduce((n, g) => n + g.skills.length, 0);

  const featuredProject = projects[0];
  const secondaryProjects = projects.slice(1, 3);

  const commandActions = [
    { label: t.dashboard.viewProjects, href: "/projects", icon: FolderKanban },
    { label: "Explore Skills", href: "/skills", icon: Cpu },
    { label: "Open GitHub", href: "/github", icon: ExternalLink },
    { label: t.dashboard.downloadCV, onClick: downloadCV, icon: Download },
    { label: t.dashboard.contactMe, href: "/contact", icon: Mail },
  ];

  return (
    <div className="space-y-6">
      {/* Hero */}
      <HeroCard />

      {/* Command Center */}
      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="rounded-2xl border border-border bg-card p-5"
      >
        <div className="mb-4 flex items-center gap-2">
          <Command className="h-3.5 w-3.5 text-accent" aria-hidden />
          <span className="section-label">Command Center</span>
          <kbd className="ml-auto rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-faint">
            Ctrl K
          </kbd>
        </div>
        <div className="flex flex-wrap gap-2">
          {commandActions.map((a) => {
            const content = (
              <>
                <a.icon className="h-3.5 w-3.5" aria-hidden />
                <span>{a.label}</span>
              </>
            );
            const cls =
              "flex items-center gap-2 rounded-lg border border-border bg-input-bg px-3 py-2 text-xs font-medium transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent active:scale-[0.98]";
            return a.href ? (
              <Magnetic key={a.label}>
                <Link href={a.href} className={cls}>
                  {content}
                </Link>
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
      </motion.section>

      {/* Stats */}
      <section aria-label="Stats">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map((s, i) => {
            const Icon = STAT_ICONS[s.icon as keyof typeof STAT_ICONS];
            return (
              <motion.div
                key={s.key}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="group rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-accent/30"
              >
                <Icon className="mb-3 h-4 w-4 text-accent" aria-hidden />
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
          {/* Currently learning */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.21 }}
            className="group rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-accent/30"
          >
            <BookOpen className="mb-3 h-4 w-4 text-accent" aria-hidden />
            <p className="truncate font-display text-xl font-bold leading-none sm:text-2xl">
              Next.js
            </p>
            <p className="mt-1.5 truncate text-xs text-muted">{t.dashboard.stats.learning}</p>
          </motion.div>
        </div>
      </section>

      {/* Featured Project + Secondary Projects */}
      <section aria-label="Projects">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderKanban className="h-3.5 w-3.5 text-accent" aria-hidden />
            <span className="section-label">{t.dashboard.recentProjects}</span>
          </div>
          <Link href="/projects" className="inline-flex items-center gap-1 text-xs text-accent hover:underline">
            {t.common.viewAll}
            <ArrowRight className="h-3 w-3" aria-hidden />
          </Link>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          {/* Featured project */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <Link
              href={`/projects/${featuredProject.slug}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-accent/40"
            >
              {/* Preview gradient */}
              <div
                className="h-48 w-full"
                style={{
                  background: `linear-gradient(135deg, ${featuredProject.accent}15, ${featuredProject.accent2}08, var(--card))`,
                }}
              />
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-faint">{featuredProject.index}</span>
                  <span className="h-1 w-1 rounded-full bg-faint" aria-hidden />
                  <span className="font-mono text-xs text-faint">{featuredProject.category}</span>
                  <span className="h-1 w-1 rounded-full bg-faint" aria-hidden />
                  <span className="font-mono text-xs text-faint">{featuredProject.year}</span>
                  {featuredProject.status === "in-progress" && (
                    <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-amber-400/10 px-2 py-0.5 text-[10px] font-medium text-amber-300">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-300" />
                      {t.dashboard.inProgress}
                    </span>
                  )}
                </div>
                <h3 className="mt-2 font-display text-lg font-bold group-hover:text-accent">
                  {featuredProject.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted">
                  {t.projectDetails[featuredProject.descriptionKey as keyof typeof t.projectDetails] as string}
                </p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {featuredProject.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-border px-1.5 py-0.5 font-mono text-[10px] text-faint"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <span className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-medium text-accent group-hover:underline">
                  View Project <ArrowUpRight className="h-3 w-3" aria-hidden />
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Secondary projects */}
          <div className="flex flex-col gap-4">
            {secondaryProjects.map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
              >
                <Link
                  href={`/projects/${p.slug}`}
                  className="group flex h-full items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-accent/40"
                >
                  <div
                    className="h-16 w-16 shrink-0 rounded-xl"
                    style={{
                      background: `linear-gradient(135deg, ${p.accent}20, var(--card))`,
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-faint">{p.index}</span>
                      <h3 className="truncate font-display text-sm font-semibold group-hover:text-accent">
                        {p.title}
                      </h3>
                      {p.status === "in-progress" && (
                        <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-amber-300" />
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 12-column grid for right rail */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Currently Building */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-5"
        >
          <section className="flex h-full flex-col rounded-2xl border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="section-label">{t.dashboard.currentlyBuilding}</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/10 px-2 py-0.5 text-[10px] font-medium text-amber-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-300" aria-hidden />
                {t.dashboard.inProgress}
              </span>
            </div>

            <div>
              <h3 className="font-display text-lg font-bold leading-snug">
                {currentlyBuilding.project}
              </h3>
              <p className="mt-0.5 text-xs text-muted">{currentlyBuilding.client}</p>
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
                className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]"
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
          </section>
        </motion.div>

        {/* Clock + Weather + Currently Learning */}
        <div className="flex flex-col gap-4 lg:col-span-7">
          <DashboardWidget title={t.dashboard.widgets.clock}>
            <DigitalClock />
          </DashboardWidget>

          <DashboardWidget title={t.dashboard.widgets.weather}>
            <WeatherWidget />
          </DashboardWidget>

          <DashboardWidget title={t.dashboard.currentlyLearning}>
            <div className="grid grid-cols-2 gap-2">
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
            </div>
          </DashboardWidget>
        </div>

        {/* Activity + GitHub */}
        <div className="flex flex-col gap-4 lg:col-span-8">
          <DashboardWidget
            title={t.activity.title}
            action={
              <Link href="/activity" className="text-xs text-accent hover:underline">
                {t.common.viewAll}
              </Link>
            }
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
        </div>

        <div className="lg:col-span-4">
          <GitHubCard />
        </div>
      </div>
    </div>
  );
}
