"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  Copy,
  ExternalLink,
  Expand,
  Lightbulb,
  ListChecks,
  Share2,
  Target,
} from "lucide-react";
import { projects } from "@/data/projects";
import { GithubBrandIcon as Github } from "@/components/icons";
import { ProjectPreview } from "@/components/os/ProjectPreview";
import { Lightbox, Modal } from "@/components/os/Lightbox";
import { StatusBadge } from "@/components/os/ProjectCard";
import { useT } from "@/lib/i18n";
import { useSaved } from "@/lib/store";
import { useToast } from "@/lib/toast";

export function ProjectDetailView({ slug }: { slug: string }) {
  const t = useT();
  const router = useRouter();
  const { isSaved, toggleSaved } = useSaved();
  const toast = useToast();

  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [shareOpen, setShareOpen] = useState(false);

  const prevProject = useMemo(
    () =>
      index >= 0 ? projects[(index - 1 + projects.length) % projects.length] : undefined,
    [index],
  );
  const nextProject = useMemo(
    () => (index >= 0 ? projects[(index + 1) % projects.length] : undefined),
    [index],
  );

  if (!project || !nextProject || !prevProject) {
    return (
      <div className="mx-auto max-w-xl py-20 text-center">
        <p className="text-muted">{t.errors.notFoundDesc}</p>
        <Link href="/projects" className="mt-4 inline-block text-accent hover:underline">
          ← {t.projects.title}
        </Link>
      </div>
    );
  }

  const saved = isSaved(project.slug);
  const description = t.projectDetails[
    project.descriptionKey as keyof typeof t.projectDetails
  ] as string;

  /* slug → camelCase prefix used by the challenges translation keys */
  const CHALLENGE_PREFIX: Record<string, string> = {
    "bsi-company-profile": "bsiCompanyProfile",
    "bsi-multi-role-dashboard": "bsiDashboard",
    educare: "educare",
    "webkraf-digital-studio": "webkraf",
    "smk-telesandi": "smkTelesandi",
    "d-dishop": "dDishop",
    cakralogy: "cakralogy",
    "portofolio-v1": "portofolioV1",
    "legacy-portfolio": "legacyPortfolio",
  };
  const prefix = CHALLENGE_PREFIX[project.slug] ?? project.slug;
  const challenge =
    t.projectDetails.challenges[`${prefix}Challenge` as keyof typeof t.projectDetails.challenges];
  const solution =
    t.projectDetails.challenges[`${prefix}Solution` as keyof typeof t.projectDetails.challenges];

  /* Screenshot gallery — three generated views of the project art. */
  const screenshots = [
    { caption: `${project.title} — Overview`, scale: 1 },
    { caption: `${project.title} — Detail`, scale: 1.35 },
    { caption: `${project.title} — Mobile`, scale: 0.72 },
  ];

  const shareUrl = () =>
    typeof window !== "undefined"
      ? `${window.location.origin}/projects/${project.slug}`
      : "";

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl());
      toast(t.projects.linkCopied, "success");
    } catch {
      toast(t.errors.somethingWrong, "error");
    }
    setShareOpen(false);
  };

  const openShare = (network: "whatsapp" | "linkedin" | "x") => {
    const url = encodeURIComponent(shareUrl());
    const text = encodeURIComponent(`${project.title} — by ${"Lutfi"}`);
    const hrefs = {
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      x: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
    };
    window.open(hrefs[network], "_blank", "noopener,noreferrer");
    setShareOpen(false);
  };

  return (
    <div className="mx-auto max-w-5xl">
      {/* Back + actions */}
      <div className="mb-6 flex items-center justify-between gap-3">
        <button
          onClick={() => router.push("/projects")}
          className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          {t.projects.title}
        </button>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              const now = toggleSaved(project.slug);
              toast(now ? t.toast.projectSaved : t.toast.projectUnsaved, now ? "success" : "info");
            }}
            aria-pressed={saved}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
              saved
                ? "border-accent bg-accent-soft text-accent"
                : "border-border text-muted hover:text-foreground"
            }`}
          >
            <Bookmark className={`h-3.5 w-3.5 ${saved ? "fill-current" : ""}`} aria-hidden />
            {saved ? t.projects.savedLabel : t.projects.save}
          </button>
          <button
            onClick={() => setShareOpen(true)}
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
          >
            <Share2 className="h-3.5 w-3.5" aria-hidden />
            {t.projects.share}
          </button>
        </div>
      </div>

      {/* Hero preview */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative"
      >
        <ProjectPreview project={project} className="shadow-[0_24px_80px_-32px_var(--accent-soft)]" />
        <span className="absolute left-6 top-6 rounded-md border border-border bg-background/85 px-2.5 py-1 font-mono text-xs text-muted backdrop-blur">
          {project.index}
        </span>
        <div className="absolute right-5 top-5">
          <StatusBadge project={project} />
        </div>
        <button
          onClick={() => {
            setLightboxIndex(0);
            setLightboxOpen(true);
          }}
          className="absolute bottom-5 right-5 flex items-center gap-1.5 rounded-lg border border-border bg-background/85 px-3 py-1.5 text-xs font-medium backdrop-blur transition-colors hover:border-accent hover:text-accent"
        >
          <Expand className="h-3.5 w-3.5" aria-hidden />
          {t.projects.screenshots}
        </button>
      </motion.div>

      {/* Title block */}
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08 }}
        className="mt-6"
      >
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          {t.projects.categories[project.category]} · {project.year}
        </p>
        <h1 className="mt-1 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-3 max-w-3xl leading-relaxed text-muted">{description}</p>

        <div className="mt-5 flex flex-wrap gap-2.5">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
          >
            <Github className="h-4 w-4" aria-hidden />
            GitHub
          </a>
          {project.demo && project.demo !== "#" && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-background transition-all hover:-translate-y-0.5 hover:brightness-110"
            >
              <ExternalLink className="h-4 w-4" aria-hidden />
              {t.projects.liveDemo}
            </a>
          )}
        </div>
      </motion.header>

      {/* Content grid */}
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {/* Features */}
        <section className="rounded-2xl border border-border bg-card p-5 lg:col-span-1">
          <h2 className="mb-3 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
            <ListChecks className="h-3.5 w-3.5 text-accent" aria-hidden />
            {t.projects.features}
          </h2>
          <ul className="space-y-2">
            {project.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-muted">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                {
                  t.projectDetails.features[f as keyof typeof t.projectDetails.features]
                }
              </li>
            ))}
          </ul>
        </section>

        {/* Challenge / Solution */}
        <section className="rounded-2xl border border-border bg-card p-5 lg:col-span-2">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <h2 className="mb-2 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
                <Target className="h-3.5 w-3.5 text-amber-300" aria-hidden />
                {t.projects.challenge}
              </h2>
              <p className="text-sm leading-relaxed text-muted">{challenge}</p>
            </div>
            <div>
              <h2 className="mb-2 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
                <Lightbulb className="h-3.5 w-3.5 text-emerald-300" aria-hidden />
                {t.projects.solution}
              </h2>
              <p className="text-sm leading-relaxed text-muted">{solution}</p>
            </div>
          </div>

          <h3 className="mb-2 mt-6 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
            {t.projects.techStack}
          </h3>
          <ul className="flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <li key={tech} className="rounded-md border border-border px-2.5 py-1 font-mono text-xs text-muted">
                {tech}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Screenshots strip */}
      <section className="mt-4">
        <h2 className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
          {t.projects.screenshots}
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {screenshots.map((shot, i) => (
            <button
              key={shot.caption}
              onClick={() => {
                setLightboxIndex(i);
                setLightboxOpen(true);
              }}
              className="group relative overflow-hidden rounded-xl border border-border text-left transition-colors hover:border-accent/50"
              aria-label={`${t.common.zoomIn}: ${shot.caption}`}
            >
              <div style={{ transform: `scale(${shot.scale})`, transformOrigin: i === 2 ? "left top" : "center" }}>
                <ProjectPreview project={project} animated={false} />
              </div>
              <span className="absolute inset-x-0 bottom-0 truncate bg-background/80 px-3 py-1.5 text-[10px] text-muted backdrop-blur">
                {shot.caption}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Prev / Next project */}
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <Link
          href={`/projects/${prevProject.slug}`}
          className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:border-accent/40"
        >
          <ArrowLeft
            className="h-5 w-5 shrink-0 text-faint transition-transform group-hover:-translate-x-1 group-hover:text-accent"
            aria-hidden
          />
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-widest text-faint">
              {t.projects.prevProject}
            </p>
            <p className="mt-1 truncate font-display text-lg font-bold group-hover:text-accent">
              {prevProject.title}
            </p>
          </div>
        </Link>
        <Link
          href={`/projects/${nextProject.slug}`}
          className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 text-right transition-all hover:border-accent/40"
        >
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-widest text-faint">
              {t.projects.nextProject}
            </p>
            <p className="mt-1 truncate font-display text-lg font-bold group-hover:text-accent">
              {nextProject.title}
            </p>
          </div>
          <ArrowRight
            className="h-5 w-5 shrink-0 text-faint transition-transform group-hover:translate-x-1 group-hover:text-accent"
            aria-hidden
          />
        </Link>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        startIndex={lightboxIndex}
        items={screenshots.map((shot) => ({
          node: (
            <div style={{ transform: `scale(${shot.scale})`, transformOrigin: shot.scale < 1 ? "left top" : "center" }}>
              <ProjectPreview project={project} />
            </div>
          ),
          caption: shot.caption,
        }))}
      />

      {/* Share modal */}
      <Modal open={shareOpen} onClose={() => setShareOpen(false)} title={t.projects.share}>
        <ul className="space-y-2">
          {[
            { label: t.projects.copyLink, icon: Copy, action: copyLink },
            { label: t.projects.shareWhatsapp, icon: null, action: () => openShare("whatsapp") },
            { label: t.projects.shareLinkedin, icon: null, action: () => openShare("linkedin") },
            { label: t.projects.shareX, icon: null, action: () => openShare("x") },
          ].map((item) => (
            <li key={item.label}>
              <button
                onClick={() => void item.action()}
                className="flex w-full items-center gap-3 rounded-xl border border-border px-4 py-3 text-sm transition-colors hover:border-accent hover:text-accent"
              >
                {item.icon ? (
                  <item.icon className="h-4 w-4" aria-hidden />
                ) : (
                  <Share2 className="h-4 w-4" aria-hidden />
                )}
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
}
