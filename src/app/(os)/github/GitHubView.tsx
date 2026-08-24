"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, GitFork, RefreshCw, Star, Users } from "lucide-react";
import { profile } from "@/data/profile";
import { GithubBrandIcon as GithubIcon } from "@/components/icons";
import { PageHeader, EmptyState, Skeleton } from "@/components/os/DashboardWidget";
import { useI18n } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";

interface GitHubData {
  ok: boolean;
  user: {
    username: string;
    name: string | null;
    followers: number;
    following: number;
    publicRepos: number;
    profileUrl: string;
  };
  stats: { stars: number; forks: number };
  languages: { name: string; count: number }[];
  recentRepos: {
    name: string;
    description: string | null;
    url: string;
    language: string | null;
    stars: number;
    forks: number;
    updatedAt: string;
  }[];
  events: { id: string; type: string; repo: string; date: string }[];
}

const LANG_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  PHP: "#4F5D95",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Python: "#3572A5",
  Shell: "#89e051",
};

export function GitHubView() {
  const { t, locale } = useI18n();
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  const load = () => {
    setLoading(true);
    setFailed(false);
    fetch("/api/github")
      .then((r) => r.json())
      .then((json: GitHubData) => {
        if (json.ok) setData(json);
        else setFailed(true);
      })
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        title={t.github.title}
        subtitle={`@${profile.githubUsername} · ${t.github.subtitle}`}
        actions={
          <>
            <button
              onClick={load}
              className="flex items-center gap-2 rounded-xl border border-border px-3.5 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} aria-hidden />
              {t.github.retry}
            </button>
            <a
              href={`https://github.com/${profile.githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-accent px-3.5 py-2 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5 hover:brightness-110"
            >
              <GithubIcon className="h-4 w-4" aria-hidden />
              {t.github.viewOnGithub}
            </a>
          </>
        }
      />

      {/* Loading skeleton */}
      {loading && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-2xl" />
            ))}
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            <Skeleton className="h-64 rounded-2xl" />
            <Skeleton className="h-64 rounded-2xl lg:col-span-2" />
          </div>
        </div>
      )}

      {/* Fallback — never fake data */}
      {!loading && failed && (
        <EmptyState
          icon={<GithubIcon className="h-5 w-5" aria-hidden />}
          title={t.github.unavailable}
          hint={t.github.unavailableHint}
          action={
            <button
              onClick={load}
              className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-background hover:brightness-110"
            >
              {t.github.retry}
            </button>
          }
        />
      )}

      {!loading && data && (
        <div className="space-y-4">
          {/* Stat cards */}
          <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: t.github.publicRepos, value: data.user.publicRepos },
              { label: t.github.followers, value: data.user.followers },
              { label: t.github.following, value: data.user.following },
              { label: t.github.stars, value: data.stats.stars },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-2xl border border-border bg-card p-4"
              >
                <p className="font-display text-3xl font-bold">{s.value}</p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
                  <Users className="h-3.5 w-3.5 text-faint" aria-hidden />
                  {s.label}
                </p>
              </motion.div>
            ))}
          </section>

          <div className="grid gap-4 lg:grid-cols-3">
            {/* Languages */}
            <section className="rounded-2xl border border-border bg-card p-5" aria-label={t.github.languages}>
              <h2 className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
                {t.github.languages}
              </h2>
              {data.languages.length === 0 ? (
                <p className="text-sm text-muted">{t.github.unavailable}</p>
              ) : (
                <ul className="space-y-3">
                  {data.languages.map((lang) => {
                    const total = data.languages.reduce((a, l) => a + l.count, 0);
                    const pct = Math.round((lang.count / total) * 100);
                    return (
                      <li key={lang.name}>
                        <div className="mb-1 flex justify-between text-xs">
                          <span className="flex items-center gap-1.5">
                            <span
                              className="h-2.5 w-2.5 rounded-full"
                              style={{ backgroundColor: LANG_COLORS[lang.name] ?? "var(--accent)" }}
                              aria-hidden
                            />
                            {lang.name}
                          </span>
                          <span className="font-mono text-faint">{pct}%</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="h-full rounded-full"
                            style={{
                              backgroundColor: LANG_COLORS[lang.name] ?? "var(--accent)",
                            }}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>

            {/* Recent repos */}
            <section
              className="rounded-2xl border border-border bg-card p-5 lg:col-span-2"
              aria-label={t.github.recentRepos}
            >
              <h2 className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
                {t.github.recentRepos}
              </h2>
              {data.recentRepos.length === 0 ? (
                <p className="text-sm text-muted">{t.github.unavailable}</p>
              ) : (
                <ul className="grid gap-3 sm:grid-cols-2">
                  {data.recentRepos.map((repo, i) => (
                    <motion.li
                      key={repo.name}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block h-full rounded-xl border border-border p-4 transition-all hover:-translate-y-0.5 hover:border-accent/40"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="truncate font-mono text-sm font-semibold text-accent">{repo.name}</p>
                          <ExternalLink className="h-3.5 w-3.5 shrink-0 text-faint" aria-hidden />
                        </div>
                        <p className="mt-1 line-clamp-2 min-h-[2rem] text-xs leading-relaxed text-muted">
                          {repo.description ?? "—"}
                        </p>
                        <div className="mt-2.5 flex items-center gap-3 text-[11px] text-faint">
                          {repo.language && (
                            <span className="flex items-center gap-1.5">
                              <span
                                className="h-2 w-2 rounded-full"
                                style={{ backgroundColor: LANG_COLORS[repo.language] ?? "var(--accent)" }}
                                aria-hidden
                              />
                              {repo.language}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3" aria-hidden /> {repo.stars}
                          </span>
                          <span className="flex items-center gap-1">
                            <GitFork className="h-3 w-3" aria-hidden /> {repo.forks}
                          </span>
                          <span className="ml-auto truncate">
                            {formatDate(repo.updatedAt, locale)}
                          </span>
                        </div>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              )}
            </section>
          </div>

          {/* Recent activity events */}
          <section className="rounded-2xl border border-border bg-card p-5" aria-label={t.github.recentActivity}>
            <h2 className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
              {t.github.recentActivity}
            </h2>
            {data.events.length === 0 ? (
              <p className="text-sm text-muted">{t.github.unavailable}</p>
            ) : (
              <ol className="relative space-y-3 pl-6">
                <span aria-hidden className="absolute bottom-2 left-[7px] top-2 w-px bg-border" />
                {data.events.slice(0, 6).map((ev) => (
                  <li key={ev.id} className="relative text-sm">
                    <span
                      aria-hidden
                      className="absolute -left-6 top-1 h-3.5 w-3.5 rounded-full border-2 border-accent bg-background"
                    />
                    <span className="font-medium text-accent">{ev.type}</span>{" "}
                    <span className="font-mono text-xs text-muted">{ev.repo}</span>
                    <span className="ml-2 text-[11px] text-faint">{formatDate(ev.date, locale)}</span>
                  </li>
                ))}
              </ol>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
