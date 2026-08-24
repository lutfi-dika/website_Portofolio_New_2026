import type { MetadataRoute } from "next";
import { siteUrl, siteRoutes } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return siteRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route.startsWith("/projects/") ? 0.8 : 0.7,
  }));
}
