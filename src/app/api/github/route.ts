import { NextResponse } from "next/server";

export const revalidate = 900;

/**
 * Server-side GitHub proxy.
 * - Keeps any optional GITHUB_TOKEN out of the client bundle (.env.local).
 * - Caches responses for 15 minutes to stay well within rate limits.
 * Returns `null` payload on failure so the UI can render its fallback state.
 */
export async function GET() {
  const username = process.env.GITHUB_USERNAME ?? "lutfi-dika";
  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "lutfi-dev-portfolio",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  try {
    const [userRes, reposRes, eventsRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { headers, next: { revalidate } }),
      fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
        { headers, next: { revalidate } },
      ),
      fetch(`https://api.github.com/users/${username}/events/public?per_page=8`, {
        headers,
        next: { revalidate },
      }),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      return NextResponse.json({ ok: false }, { status: 200 });
    }

    const user = (await userRes.json()) as {
      login: string;
      name: string | null;
      avatar_url: string;
      bio: string | null;
      followers: number;
      following: number;
      public_repos: number;
      html_url: string;
      created_at: string;
    };

    type Repo = {
      id: number;
      name: string;
      description: string | null;
      html_url: string;
      language: string | null;
      stargazers_count: number;
      forks_count: number;
      updated_at: string;
      fork: boolean;
    };
    const reposAll = (await reposRes.json()) as Repo[];
    const owned = reposAll.filter((r) => !r.fork);
    const recentRepos = owned.slice(0, 6);

    // Language distribution across owned repos.
    const langCount: Record<string, number> = {};
    for (const r of owned) {
      if (r.language) langCount[r.language] = (langCount[r.language] ?? 0) + 1;
    }
    const languages = Object.entries(langCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, count]) => ({ name, count }));

    let events: { id: string; type: string; repo: string; date: string }[] = [];
    if (eventsRes.ok) {
      const raw = (await eventsRes.json()) as {
        id: string;
        type: string;
        repo?: { name: string };
        created_at: string;
      }[];
      events = raw.map((e) => ({
        id: e.id,
        type: e.type.replace("Event", ""),
        repo: e.repo?.name ?? "",
        date: e.created_at,
      }));
    }

    return NextResponse.json({
      ok: true,
      user: {
        username: user.login,
        name: user.name,
        followers: user.followers,
        following: user.following,
        publicRepos: user.public_repos,
        profileUrl: user.html_url,
      },
      stats: {
        stars: owned.reduce((acc, r) => acc + r.stargazers_count, 0),
        forks: owned.reduce((acc, r) => acc + r.forks_count, 0),
      },
      languages,
      recentRepos: recentRepos.map((r) => ({
        name: r.name,
        description: r.description,
        url: r.html_url,
        language: r.language,
        stars: r.stargazers_count,
        forks: r.forks_count,
        updatedAt: r.updated_at,
      })),
      events,
    });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
