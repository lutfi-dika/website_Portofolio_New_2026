import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * App/utility routes that add no unique public value — blocked so Google's
 * crawl budget stays focused on the content pages that matter.
 */
const NOINDEX_PATHS = [
  "/overview",
  "/settings",
  "/inbox",
  "/saved",
  "/shortcuts",
  "/chat",
  "/activity",
  "/github",
  "/maintenance",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: NOINDEX_PATHS,
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: NOINDEX_PATHS,
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
