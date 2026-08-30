import type { MetadataRoute } from "next";
import { siteUrl, indexableRoutes } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return indexableRoutes.map((route) => {
    const isHome = route === "/";
    const isKrafdev = route === "/krafdev";
    const isProject = route.startsWith("/projects/");
    const isProjectsIndex = route === "/projects";
    const isAbout = route === "/about";
    const isContact = route === "/contact";

    return {
      url: `${siteUrl}${route}`,
      lastModified: now,
      changeFrequency: isHome
        ? "weekly"
        : isProject
          ? "yearly"
          : isProjectsIndex || isAbout || isKrafdev || isContact
            ? "monthly"
            : "yearly",
      priority: isHome
        ? 1
        : isKrafdev
          ? 0.95
          : isAbout
            ? 0.9
            : isProjectsIndex
              ? 0.9
              : isContact
                ? 0.9
                : isProject
                  ? 0.8
                  : 0.7,
    };
  });
}
