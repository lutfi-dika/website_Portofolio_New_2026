import type { Metadata } from "next";
import { SavedView } from "./SavedView";

export const metadata: Metadata = {
  title: "Saved",
  description: "Projects you bookmarked in LUTFI.DEV.",
  alternates: { canonical: "/saved" },
};

export default function SavedPage() {
  return <SavedView />;
}
