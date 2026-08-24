# LUTFI.DEV — Developer OS Portfolio

Personal developer-dashboard portfolio of **Muhammad Lutfi Andika** — a Frontend Developer & owner of **Webkraf Digital Studio** based in Bekasi, Indonesia.

Built as a "Developer OS": an operating-system-style dashboard experience with a sidebar shell, command palette, live GitHub & weather data, a rule-based AI assistant, and full bilingual support (Indonesian / English).

## Features

- **OS Shell** — collapsible sidebar (260px / 72px), 64px topbar with breadcrumbs, command palette (`Ctrl/Cmd + K`), keyboard shortcuts (`Ctrl+B`, `T`, `L`, `A`, `G` navigation), onboarding tour
- **Dashboard** — hero card, honest stat counters, quick actions, recent projects, currently-building progress, GitHub summary card with real activity strip, activity timeline
- **Bilingual** — full ID/EN translations via a typed dictionary (`src/data/translations`), switchable at runtime
- **Theming** — dark / light / system themes, 5 accent colors, density modes, visual effects toggles (animations, glow, glass, custom cursor), accessibility options (reduced motion, large text, high contrast) — all persisted to `localStorage`
- **Real data only** — GitHub stats via `/api/github` proxy (15-min revalidate), Bekasi weather via Open-Meteo (`/api/weather`); every API has an explicit fallback state, no fabricated numbers
- **AI Chat** — rule-based assistant answering questions about skills, projects, and experience; available both as a page and a floating widget
- **Contact → Inbox** — contact form posts to Formspree and mirrors the message into the local inbox store
- **Projects showcase** — 9 real projects with SSG detail pages, generated preview art, challenge/solution write-ups, save & share actions
- **SEO** — per-route metadata, sitemap.xml, robots.txt, Open Graph image

## Tech Stack

| Layer | Tools |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack), React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Icons | lucide-react, react-icons |

## Getting Started

```bash
# install dependencies
npm install

# run in development
npm run dev

# production build & start
npm run build
npm run start

# lint & typecheck
npm run lint
npx tsc --noEmit
```

Open http://localhost:3000.

### Environment Variables

Create `.env.local` (all optional):

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com   # canonical URL for SEO
GITHUB_USERNAME=lutfi-dika                      # GitHub username for /api/github
GITHUB_TOKEN=ghp_xxx                            # optional; raises GitHub API rate limits
```

Without a token the GitHub API works but is rate-limited; the UI shows its fallback state when that happens.

## Project Structure

```
src/
├── app/
│   ├── (os)/                  # all routes rendered inside the OS shell
│   │   ├── page.tsx           # dashboard home
│   │   ├── overview/          # system overview map
│   │   ├── about/  skills/  experience/  projects/[slug]/
│   │   ├── certificates/  achievements/  github/  activity/
│   │   ├── chat/  inbox/  saved/  settings/  contact/  shortcuts/
│   ├── api/
│   │   ├── github/route.ts    # cached GitHub proxy (revalidate 900s)
│   │   └── weather/route.ts   # Open-Meteo proxy (revalidate 1800s)
│   ├── layout.tsx  globals.css  sitemap.ts  robots.ts
├── components/os/             # Sidebar, Topbar, CommandPalette, cards, widgets…
├── data/                      # ALL content lives here (see below)
├── lib/                       # i18n, settings, stores, chat engine, utils
└── components/icons.tsx       # tech/social brand icon maps
```

## Customizing Content

Everything editable lives in `src/data/`:

- `profile.ts` — name, role, bio, business (Webkraf Digital Studio), stats
- `projects.ts` — projects with slugs, tech stacks, demo/GitHub URLs
- `skills.ts` — skill groups mirroring the real stack (Frontend Mastery, Frameworks & Libraries, Backend & Systems, Tools & Platforms)
- `experience.ts` — work experience + education history timeline
- `certificates.ts` / `achievements.ts` — real certificates & competition results
- `translations/id.ts`, `translations/en.ts` — every user-facing string (keep keys in sync)

Certificate images are self-hosted in `public/certificates/`.

## Keyboard Shortcuts

| Shortcut | Action |
| --- | --- |
| `Ctrl/Cmd + K` | Command palette |
| `Ctrl + B` | Toggle sidebar |
| `T` | Cycle theme (dark / light / system) |
| `L` | Toggle language (ID / EN) |
| `A` | Cycle accent color |
| `G` then `D/P/S/C` | Go to Dashboard / Projects / Skills / Chat |

The full list also lives at `/shortcuts`.

## Deployment

Deploy on Vercel:

1. Push this repository to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Add the environment variables above (optional).
4. Deploy — static pages are prerendered, APIs use ISR caching.

---

Copyright © 2026 Muhammad Lutfi Andika · [LUTFI.DEV](https://github.com/lutfi-dika) · Owner of Webkraf Digital Studio
