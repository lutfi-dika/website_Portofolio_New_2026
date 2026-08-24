import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { GitHubView } from "./GitHubView";

export const metadata: Metadata = {
  title: "GitHub",
  description: `GitHub dashboard of Muhammad Lutfi Andika (@${profile.githubUsername}) — live repository stats, languages, and recent activity.`,
  alternates: { canonical: "/github" },
};

export default function GitHubPage() {
  return <GitHubView />;
}
