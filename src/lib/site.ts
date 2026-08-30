import { projects } from "@/data/projects";

/** Canonical site URL — override via NEXT_PUBLIC_SITE_URL in production. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://lutfiandika.my.id"
).replace(/\/$/, "");

/** All indexable routes of the dashboard. */
export const siteRoutes = [
  "/",
  "/krafdev",
  "/overview",
  "/about",
  "/skills",
  "/experience",
  "/resume",
  "/projects",
  ...projects.map((p) => `/projects/${p.slug}`),
  "/certificates",
  "/achievements",
  "/github",
  "/activity",
  "/chat",
  "/inbox",
  "/saved",
  "/settings",
  "/contact",
  "/shortcuts",
] as const;

/**
 * Public, crawl-worthy routes. App-like utility pages (settings, saved,
 * shortcuts, chat, inbox, activity, github, maintenance) are excluded from
 * the sitemap so search engines index the content that provides real value.
 */
export const indexableRoutes = [
  "/",
  "/krafdev",
  "/about",
  "/skills",
  "/experience",
  "/resume",
  "/projects",
  ...projects.map((p) => `/projects/${p.slug}`),
  "/certificates",
  "/achievements",
  "/contact",
] as const;
