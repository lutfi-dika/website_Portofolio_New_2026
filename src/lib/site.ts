/** Canonical site URL — override via NEXT_PUBLIC_SITE_URL in production. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://lutfi-dev.vercel.app"
).replace(/\/$/, "");

/** All indexable routes of the dashboard. */
export const siteRoutes = [
  "/",
  "/overview",
  "/about",
  "/skills",
  "/experience",
  "/projects",
  "/projects/bsi-company-profile",
  "/projects/bsi-multi-role-dashboard",
  "/projects/educare",
  "/projects/webkraf-digital-studio",
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
