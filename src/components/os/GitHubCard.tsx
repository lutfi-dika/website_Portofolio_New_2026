"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, GitFork, Star } from "lucide-react";
import { GithubBrandIcon } from "@/components/icons";
import { profile } from "@/data/profile";
import { useT } from "@/lib/i18n";
import { Skeleton } from "@/components/os/DashboardWidget";

interface GithubSummary {
  ok: boolean;
  user?: {
    username: string;
    followers: number;
    publicRepos: number;
    profileUrl: string;
  };
  stats?: { stars: number; forks: number };
  events?: { date: string }[];
  recentRepos?: { updatedAt: string }[];
}

const WEEKS = 12;

/**
 * Compact GitHub summary for the dashboard.
 * The activity strip is derived ONLY from real API data (events + repo pushes).
 * When the API is unavailable the card shows an explicit fallback — never fake numbers.
 */
export function GitHubCard() {
  const t = useT();
  const [data, setData] = useState<(GithubSummary & { fetchedAt: number }) | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch("/api/github")
      .then((r) => r.json())
      .then((json: GithubSummary) => {
        if (!alive) return;
        if (json?.ok) setData({ ...json, fetchedAt: Date.now() });
        else setFailed(true);
      })
      .catch(() => {
        if (alive) setFailed(true);
      });
    return () => {
      alive = false;
    };
  }, []);

  // Bucket real timestamps into the last 12 weeks.
  const weeks = useMemo(() => {
    if (!data) return [];
    const stamps = [
      ...(data.events ?? []).map((e) => new Date(e.date).getTime()),
      ...(data.recentRepos ?? []).map((r) => new Date(r.updatedAt).getTime()),
    ].filter((n) => Number.isFinite(n));
    if (stamps.length === 0) return [];
    const now = data.fetchedAt;
    const buckets = Array.from({ length: WEEKS }, () => 0);
    for (const ts of stamps) {
      const weeksAgo = Math.floor((now - ts) / (7 * 24 * 3600 * 1000));
      if (weeksAgo >= 0 && weeksAgo < WEEKS) buckets[WEEKS - 1 - weeksAgo]++;
    }
    return buckets;
  }, [data]);

  const maxWeek = Math.max(1, ...weeks);

  return (
    <section
      className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-border-strong"
      aria-label={t.github.title}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-display text-sm font-semibold">
          <GithubBrandIcon className="h-4 w-4 text-accent" aria-hidden />
          {t.github.title}
        </h3>
        <Link
          href="/github"
          className="inline-flex items-center gap-1 text-xs text-accent hover:underline"
        >
          {t.common.viewAll}
          <ArrowUpRight className="h-3 w-3" aria-hidden />
        </Link>
      </div>

      {failed ? (
        <p className="text-sm text-muted">{t.github.unavailable}</p>
      ) : !data ? (
        <div className="space-y-3">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-full" />
          <div className="flex gap-1 pt-1">
            {Array.from({ length: WEEKS }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-full" />
            ))}
          </div>
        </div>
      ) : (
        <>
          <dl className="grid grid-cols-3 gap-2 text-center">
            {[
              { label: t.github.repositories, value: data.user!.publicRepos },
              { label: t.github.followers, value: data.user!.followers },
              { label: t.github.stars, value: data.stats!.stars },
            ].map((m) => (
              <div key={m.label} className="rounded-xl border border-border px-2 py-2.5">
                <dt className="truncate text-[10px] text-muted">{m.label}</dt>
                <dd className="mt-0.5 font-display text-lg font-bold leading-none">{m.value}</dd>
              </div>
            ))}
          </dl>

          {/* Activity strip — real data only */}
          <div className="mt-4">
            <p className="mb-1.5 text-[10px] uppercase tracking-wider text-faint">
              {weeks.length > 0
                ? t.github.contributions
                : `${t.github.contributions} · ${t.github.limitedData}`}
            </p>
            {weeks.length > 0 ? (
              <div className="flex items-end gap-1" aria-hidden>
                {weeks.map((count, i) => (
                  <span
                    key={i}
                    title={`${count}`}
                    className="h-8 flex-1 rounded-[3px] transition-transform hover:scale-y-105"
                    style={{
                      backgroundColor:
                        count === 0
                          ? "color-mix(in oklab, var(--border-strong) 45%, transparent)"
                          : `color-mix(in oklab, var(--accent) ${25 + (count / maxWeek) * 75}%, transparent)`,
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="flex items-end gap-1" aria-hidden>
                {Array.from({ length: WEEKS }).map((_, i) => (
                  <span
                    key={i}
                    className="h-8 flex-1 rounded-[3px] border border-dashed border-border"
                  />
                ))}
              </div>
            )}
          </div>

          <a
            href={`https://github.com/${profile.githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center justify-between gap-2 rounded-xl border border-border px-3.5 py-2.5 text-xs font-medium text-muted transition-colors hover:border-accent/50 hover:text-accent"
          >
            <span className="inline-flex items-center gap-2">
              <Star className="h-3.5 w-3.5" aria-hidden />
              @{data.user!.username}
              <GitFork className="ml-2 h-3.5 w-3.5" aria-hidden />
              {data.stats!.forks}
            </span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </a>
        </>
      )}
    </section>
  );
}
