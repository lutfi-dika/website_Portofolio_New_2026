import type { Metadata } from "next";
import { AchievementsView } from "./AchievementsView";

export const metadata: Metadata = {
  title: "Achievements",
  description: "Milestones and achievements of Muhammad Lutfi Andika.",
  alternates: { canonical: "/achievements" },
};

export default function AchievementsPage() {
  return <AchievementsView />;
}
