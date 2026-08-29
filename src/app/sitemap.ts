import type { MetadataRoute } from "next";
import { siteUrl, siteRoutes } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return siteRoutes.map((route) => {
    const isHome = route === "/";
    const isKrafdev = route === "/krafdev";
    const isProject = route.startsWith("/projects/");
    const isProjectsIndex = route === "/projects";
    const isAbout = route === "/about";

    return {
      url: `${siteUrl}${route}`,
      lastModified: now,
      changeFrequency: isHome
        ? "weekly"
        : isProject
          ? "monthly"
          : isProjectsIndex || isAbout || isKrafdev
            ? "weekly"
            : "monthly",
      priority: isHome
        ? 1
        : isKrafdev
          ? 1
          : isAbout
            ? 0.9
            : isProjectsIndex
              ? 0.9
              : isProject
                ? 0.8
                : 0.7,
    };
  });
}
