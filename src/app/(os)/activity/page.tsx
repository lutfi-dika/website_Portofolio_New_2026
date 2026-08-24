import type { Metadata } from "next";
import { ActivityView } from "./ActivityView";

export const metadata: Metadata = {
  title: "Activity",
  description: "Learning log and recent activity of Muhammad Lutfi Andika.",
  alternates: { canonical: "/activity" },
};

export default function ActivityPage() {
  return <ActivityView />;
}
