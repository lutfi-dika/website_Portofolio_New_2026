"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Cpu,
  FolderKanban,
  Mail,
  ExternalLink,
} from "lucide-react";
import { stats } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { currentlyLearning } from "@/data/currently-building";
import { TechIcon } from "@/components/icons";
import { HeroCard } from "@/components/os/HeroCard";
import { GitHubCard } from "@/components/os/GitHubCard";
import { useT } from "@/lib/i18n";

const STAT_ICONS = { folder: FolderKanban, cpu: Cpu, briefcase: Briefcase };

export default function DashboardPage() {
  const t = useT();
  const router = useRouter();

  const projectCount = projects.length;
  const techCount = skillGroups.reduce((n, g) => n + g.skills.length, 0);

  const featuredProject = projects[0];
  const secondaryProjects = projects.slice(1, 3);

  return (
    <div className="space-y-6">
      {/* Hero */}
      <HeroCard />

      {/* Quick actions */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08 }}
        className="flex flex-wrap gap-2"
      >
        <Link
          href="/projects"
          className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium transition-all hover:border-accent/40 hover:text-accent"
        >
          <FolderKanban className="h-4 w-4" aria-hidden />
          {t.dashboard.viewProjects}
        </Link>
        <Link
          href="/skills"
          className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium transition-all hover:border-accent/40 hover:text-accent"
        >
          <Cpu className="h-4 w-4" aria-hidden />
          Skills
        </Link>
        <Link
          href="/github"
          className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium transition-all hover:border-accent/40 hover:text-accent"
        >
          <ExternalLink className="h-4 w-4" aria-hidden />
          GitHub
        </Link>
        <button
          onClick={() => router.push("/resume")}
          className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium transition-all hover:border-accent/40 hover:text-accent"
        >
          {t.dashboard.downloadCV}
        </button>
        <Link
          href="/contact"
          className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium transition-all hover:border-accent/40 hover:text-accent"
        >
          <Mail className="h-4 w-4" aria-hidden />
          {t.dashboard.contactMe}
        </Link>
      </motion.div>

      {/* Stats */}
      <section aria-label="Stats">
        <div className="grid grid-cols-3 gap-3">
          {stats.map((s, i) => {
            const Icon = STAT_ICONS[s.icon as keyof typeof STAT_ICONS];
            return (
              <motion.div
                key={s.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 + i * 0.05 }}
                className="rounded-xl border border-border bg-card p-4"
              >
                <Icon className="mb-2 h-4 w-4 text-accent" aria-hidden />
                <p className="font-display text-2xl font-bold leading-none">
                  {s.key === "projects"
                    ? projectCount
                    : s.key === "technologies"
                      ? techCount
                      : s.value}
                  {s.suffix}
                  {"unit" in s && s.unit === "months" && (
                    <span className="ml-1 text-xs font-medium text-muted">
                      {t.dashboard.stats.months}
                    </span>
                  )}
                </p>
                <p className="mt-1 text-xs text-muted">
                  {t.dashboard.stats[s.key as keyof typeof t.dashboard.stats]}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Featured Projects */}
      <section aria-label="Projects">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
            {t.dashboard.recentProjects}
          </span>
          <Link href="/projects" className="inline-flex items-center gap-1 text-xs text-accent hover:underline">
            {t.common.viewAll}
            <ArrowRight className="h-3 w-3" aria-hidden />
          </Link>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          {/* Featured project */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <Link
              href={`/projects/${featuredProject.slug}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-accent/40"
            >
              <div
                className="h-40 w-full"
                style={{
                  background: `linear-gradient(135deg, ${featuredProject.accent}12, ${featuredProject.accent2}06, var(--card))`,
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
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.18 + i * 0.06 }}
              >
                <Link
                  href={`/projects/${p.slug}`}
                  className="group flex h-full items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-all hover:border-accent/40"
                >
                  <div
                    className="h-14 w-14 shrink-0 rounded-xl"
                    style={{
                      background: `linear-gradient(135deg, ${p.accent}18, var(--card))`,
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
                    className="h-4 w-4 shrink-0 text-faint transition-all group-hover:text-accent"
                    aria-hidden
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Currently Learning + GitHub */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Currently Learning */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-border bg-card p-5"
        >
          <span className="mb-3 block font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
            {t.dashboard.currentlyLearning}
          </span>
          <div className="space-y-2">
            {currentlyLearning.map((item) => (
              <li
                key={item.name}
                className="flex items-center gap-2.5 rounded-lg border border-border p-2.5 transition-colors hover:border-accent/40"
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
        </motion.section>

        {/* GitHub */}
        <GitHubCard />
      </div>
    </div>
  );
}
