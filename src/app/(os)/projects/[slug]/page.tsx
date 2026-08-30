import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { profile, socials } from "@/data/profile";
import { siteUrl } from "@/lib/site";
import { ProjectDetailView } from "./ProjectDetailView";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project" };

  const fullUrl = `${siteUrl}/projects/${project.slug}`;
  const title = `${project.title} | Project ${profile.name}`;
  const description =
    project.demo && project.demo !== "#"
      ? `${project.title} — project web development oleh ${profile.name} (${profile.business}). Dibangun dengan ${project.tech.join(", ")}. ${project.status === "in-progress" ? "Masih dalam pengembangan." : "Status: selesai."}`
      : `${project.title} — project web development oleh ${profile.name} (${profile.business}). Dibangun dengan ${project.tech.join(", ")}.`;

  return {
    title: project.title,
    description,
    keywords: [
      ...project.tech,
      project.category,
      "web development project",
      "project Muhammad Lutfi Andika",
      "project website Indonesia",
      profile.name,
      profile.business,
    ],
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "website",
      url: fullUrl,
      title,
      description,
      siteName: `${profile.business} — Web Development Studio`,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: project.title,
    description: `${project.title} — project yang dibangun dengan ${project.tech.join(", ")} oleh ${profile.name}.`,
    url: `${siteUrl}/projects/${project.slug}`,
    applicationCategory: "WebApplication",
    operatingSystem: "Web",
    inLanguage: ["id", "en"],
    author: {
      "@type": "Person",
      name: profile.name,
      url: siteUrl,
    },
    creator: {
      "@type": "Organization",
      name: profile.business,
      url: siteUrl,
    },
    ...(project.demo && project.demo !== "#"
      ? {
          installUrl: project.demo,
          offers: {
            "@type": "Offer",
            url: project.demo,
            availability: "https://schema.org/InStock",
            price: "0",
            priceCurrency: "IDR",
          },
        }
      : {}),
    ...(project.github
      ? {
          codeRepository: project.github,
        }
      : {}),
    sameAs: socials
      .filter((s) => ["github", "instagram", "linkedin"].includes(s.icon))
      .map((s) => s.href),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />
      <ProjectDetailView slug={slug} />
    </>
  );
}
