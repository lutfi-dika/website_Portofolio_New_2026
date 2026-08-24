"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import {
  projects,
  projectCategories,
  projectStatuses,
  type Project,
} from "@/data/projects";
import { ProjectCard } from "@/components/os/ProjectCard";
import { PageHeader, EmptyState } from "@/components/os/DashboardWidget";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type SortKey = "newest" | "oldest" | "name";

export function ProjectsView() {
  const t = useT();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof projectCategories)[number]>("all");
  const [status, setStatus] = useState<(typeof projectStatuses)[number]>("all");
  const [tech, setTech] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("newest");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const allTech = useMemo(
    () => Array.from(new Set(projects.flatMap((p) => p.tech))).sort(),
    [],
  );

  const filtered = useMemo(() => {
    let list: Project[] = [...projects];
    const q = query.trim().toLowerCase();

    if (q) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.tech.some((tech) => tech.toLowerCase().includes(q)) ||
          t.projects.categories[p.category].toLowerCase().includes(q),
      );
    }
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (status !== "all") list = list.filter((p) => p.status === status);
    if (tech !== "all") list = list.filter((p) => p.tech.includes(tech));

    list.sort((a, b) => {
      if (sort === "name") return a.title.localeCompare(b.title);
      const cmp = b.year.localeCompare(a.year); // newest first by year
      return sort === "newest" ? cmp : -cmp;
    });
    return list;
  }, [query, category, status, tech, sort, t]);

  const resetAll = () => {
    setQuery("");
    setCategory("all");
    setStatus("all");
    setTech("all");
    setSort("newest");
  };

  const hasActiveFilters =
    query !== "" || category !== "all" || status !== "all" || tech !== "all";

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        title={t.projects.title}
        subtitle={t.projects.subtitle}
        actions={
          <button
            onClick={() => setFiltersOpen((v) => !v)}
            aria-expanded={filtersOpen}
            className={cn(
              "flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium transition-colors",
              hasActiveFilters
                ? "border-accent bg-accent-soft text-accent"
                : "border-border text-muted hover:text-foreground",
            )}
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden />
            {t.projects.filters}
          </button>
        }
      />

      {/* Search row */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative min-w-0 flex-1 sm:max-w-md">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" aria-hidden />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.projects.searchPlaceholder}
            aria-label={t.projects.searchPlaceholder}
            className="h-10 w-full rounded-xl border border-border bg-input-bg pl-10 pr-9 text-sm outline-none transition-colors placeholder:text-faint focus:border-accent"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label={t.common.close}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-faint hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <select
          value={tech}
          onChange={(e) => setTech(e.target.value)}
          aria-label={`${t.projects.techStack} filter`}
          className="h-10 rounded-xl border border-border bg-input-bg px-3 text-sm outline-none focus:border-accent"
        >
          <option value="all">{t.projects.techStack}: {t.projects.categories.all}</option>
          {allTech.map((techItem) => (
            <option key={techItem} value={techItem}>
              {techItem}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          aria-label={t.projects.sort}
          className="h-10 rounded-xl border border-border bg-input-bg px-3 text-sm outline-none focus:border-accent"
        >
          <option value="newest">{t.projects.sortNewest}</option>
          <option value="oldest">{t.projects.sortOldest}</option>
          <option value="name">{t.projects.sortName}</option>
        </select>
      </div>

      {/* Filter panel */}
      <AnimatePresence>
        {filtersOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mb-4 grid gap-4 rounded-2xl border border-border bg-card p-4 sm:grid-cols-2">
              <fieldset>
                <legend className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-faint">
                  {t.projects.category}
                </legend>
                <div className="flex flex-wrap gap-2">
                  {projectCategories.map((c) => (
                    <FilterChip key={c} active={category === c} onClick={() => setCategory(c)}>
                      {t.projects.categories[c]}
                    </FilterChip>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-faint">
                  {t.projects.status}
                </legend>
                <div className="flex flex-wrap gap-2">
                  {projectStatuses.map((s) => (
                    <FilterChip key={s} active={status === s} onClick={() => setStatus(s)}>
                      {t.projects.statuses[s]}
                    </FilterChip>
                  ))}
                </div>
              </fieldset>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result count */}
      <p className="mb-4 font-mono text-xs text-faint" role="status">
        {filtered.length} / {projects.length}
        {hasActiveFilters && (
          <>
            {" · "}
            <button onClick={resetAll} className="text-accent hover:underline">
              {t.errors.tryAgain}
            </button>
          </>
        )}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<Search className="h-5 w-5" aria-hidden />}
          title={t.projects.empty}
          hint={t.projects.emptyHint}
          action={
            <button
              onClick={resetAll}
              className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-background transition-transform hover:brightness-110 active:scale-[0.98]"
            >
              {t.errors.tryAgain}
            </button>
          }
        />
      ) : (
        <motion.div layout className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3 py-1 text-xs font-medium transition-all",
        active
          ? "border-accent bg-accent-soft text-accent"
          : "border-border text-muted hover:border-border-strong hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
