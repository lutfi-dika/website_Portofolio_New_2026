import type { Metadata } from "next";
import { SkillsView } from "./SkillsView";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Technologies and tools used by Muhammad Lutfi Andika: React, Next.js, TypeScript, Laravel, MySQL, and more.",
  alternates: { canonical: "/skills" },
};

export default function SkillsPage() {
  return <SkillsView />;
}
