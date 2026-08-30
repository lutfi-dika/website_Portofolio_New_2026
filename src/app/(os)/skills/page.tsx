import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/site";
import { skillGroups } from "@/data/skills";
import { SkillsView } from "./SkillsView";

export const metadata: Metadata = {
  title: "Skills & Teknologi",
  description: `Teknologi dan tools ${profile.name} — ${profile.role}: ${skillGroups
    .flatMap((g) => g.skills)
    .slice(0, 20)
    .map((s) => s.name)
    .join(", ")}.`,
  keywords: [
    "skills Muhammad Lutfi Andika",
    "frontend developer skills",
    "web developer skills",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Laravel",
    "MySQL",
    "web development stack",
    profile.business,
  ],
  alternates: { canonical: "/skills" },
  openGraph: {
    type: "website",
    url: `${siteUrl}/skills`,
    title: `Skills ${profile.name} | ${profile.role}`,
    description: `Teknologi dan tools yang dikuasai ${profile.name} sebagai ${profile.role} dan owner ${profile.business}.`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function SkillsPage() {
  return <SkillsView />;
}
