"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Bookmark, Check, CircleDashed, Share2 } from "lucide-react";
import type { Project } from "@/data/projects";
import { useT } from "@/lib/i18n";
import { useSaved } from "@/lib/store";
import { useToast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import { ProjectPreview } from "./ProjectPreview";

export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const t = useT();
  const { isSaved, toggleSaved } = useSaved();
  const toast = useToast();
  const saved = isSaved(project.slug);

  const share = async () => {
    const url = `${window.location.origin}/projects/${project.slug}`;
    try {
      await navigator.clipboard.writeText(url);
      toast(t.projects.linkCopied, "success");
    } catch {
      toast(t.errors.somethingWrong, "error");
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.3) }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_16px_48px_-20px_var(--accent-soft)]"
    >
      {/* Preview */}
      <Link
        href={`/projects/${project.slug}`}
        className="relative block p-3 pb-0"
        aria-label={project.title}
      >
        <ProjectPreview project={project} className="transition-transform duration-500 group-hover:scale-[1.015]" />
        <span className="absolute left-5 top-5 rounded-md border border-border bg-background/80 px-2 py-0.5 font-mono text-[10px] text-muted backdrop-blur">
          {project.index}
        </span>
        <StatusBadge project={project} />
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <p className="font-mono text-[10px] uppercase tracking-widest text-faint">
          {t.projects.categories[project.category]} · {project.year}
        </p>
        <Link href={`/projects/${project.slug}`} className="mt-1">
          <h3 className="font-display text-lg font-bold leading-snug transition-colors group-hover:text-accent">
            {project.title}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">
          {t.projectDetails[project.descriptionKey as keyof typeof t.projectDetails] as string}
        </p>

        {/* Tech chips */}
        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label={t.projects.techStack}>
          {project.tech.map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-border px-2 py-0.5 font-mono text-[10px] text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="mt-4 flex items-center gap-1 border-t border-border pt-3">
          <Link
            href={`/projects/${project.slug}`}
            className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-accent transition-colors hover:bg-accent-soft"
          >
            {t.projects.viewDetail}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
          <div className="flex-1" />
          <button
            onClick={() => {
              const now = toggleSaved(project.slug);
              toast(now ? t.toast.projectSaved : t.toast.projectUnsaved, now ? "success" : "info");
            }}
            aria-pressed={saved}
            title={saved ? t.projects.savedLabel : t.projects.save}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-white/[0.06]",
              saved ? "text-accent" : "text-muted",
            )}
          >
            {saved ? <Bookmark className="h-4 w-4 fill-current" aria-hidden /> : <Bookmark className="h-4 w-4" aria-hidden />}
          </button>
          <button
            onClick={() => void share()}
            title={t.projects.share}
            aria-label={t.projects.share}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-white/[0.06]"
          >
            <Share2 className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export function StatusBadge({ project }: { project: Project }) {
  const t = useT();
  return (
    <span
      className={cn(
        "absolute right-5 top-5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium backdrop-blur",
        project.status === "completed" && "bg-emerald-400/15 text-emerald-300",
        project.status === "in-progress" && "bg-amber-400/15 text-amber-300",
        project.status === "archived" && "bg-white/10 text-muted",
      )}
    >
      {project.status === "completed" ? (
        <Check className="h-3 w-3" aria-hidden />
      ) : (
        <CircleDashed className="h-3 w-3" aria-hidden />
      )}
      {t.projects.statuses[project.status]}
    </span>
  );
}
