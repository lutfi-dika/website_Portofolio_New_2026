import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { ProjectDetailView } from "./ProjectDetailView";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: `${project.title} — project by Muhammad Lutfi Andika built with ${project.tech.join(", ")}.`,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  if (!projects.some((p) => p.slug === slug)) notFound();
  return <ProjectDetailView slug={slug} />;
}
