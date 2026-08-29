import type { Metadata } from "next";
import { ProjectsView } from "./ProjectsView";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    `Project portfolio Muhammad Lutfi Andika — ${projects.slice(0, 5).map((p) => p.title).join(", ")}. Dibangun dengan React, Next.js, Laravel, dan teknologi web modern lainnya.`,
  keywords: [
    "project portfolio",
    "web development projects",
    "react projects",
    "next.js projects",
    "BSI company profile",
    "EduCare",
    "Webkraf Digital Studio",
  ],
  alternates: { canonical: "/projects" },
  openGraph: {
    title: `Projects | Muhammad Lutfi Andika | ${profile.business}`,
    description:
      "Project portfolio Muhammad Lutfi Andika — website development, dashboard, e-commerce, dan UI/UX design.",
    url: `${siteUrl}/projects`,
  },
};

const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Projects — Muhammad Lutfi Andika",
  description: "Project portfolio Muhammad Lutfi Andika. Website development, dashboard, e-commerce, dan UI/UX design.",
  url: `${siteUrl}/projects`,
  author: {
    "@type": "Person",
    name: "Muhammad Lutfi Andika",
  },
  hasPart: projects.map((p) => ({
    "@type": "CreativeWork",
    name: p.title,
    description: `${p.title} — project by Muhammad Lutfi Andika built with ${p.tech.join(", ")}.`,
    url: `${siteUrl}/projects/${p.slug}`,
    about: {
      "@type": "Thing",
      name: p.category,
    },
    author: {
      "@type": "Person",
      name: "Muhammad Lutfi Andika",
    },
  })),
};

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      <ProjectsView />
    </>
  );
}
