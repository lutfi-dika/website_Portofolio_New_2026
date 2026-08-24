"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Bookmark } from "lucide-react";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/os/ProjectCard";
import { PageHeader, EmptyState } from "@/components/os/DashboardWidget";
import { useSaved } from "@/lib/store";
import { useT } from "@/lib/i18n";

export function SavedView() {
  const t = useT();
  const { savedSlugs } = useSaved();
  const savedProjects = projects.filter((p) => savedSlugs.includes(p.slug));

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        title={t.saved.title}
        subtitle={`${t.saved.subtitle} (${savedProjects.length})`}
      />

      {savedProjects.length === 0 ? (
        <EmptyState
          icon={<Bookmark className="h-5 w-5" aria-hidden />}
          title={t.saved.empty}
          hint={t.saved.emptyHint}
          action={
            <Link
              href="/projects"
              className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-background transition-transform hover:brightness-110"
            >
              {t.saved.browseProjects} →
            </Link>
          }
        />
      ) : (
        <motion.div layout className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {savedProjects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
