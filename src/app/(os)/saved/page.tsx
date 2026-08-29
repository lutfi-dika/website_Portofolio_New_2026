import type { Metadata } from "next";
import { SavedView } from "./SavedView";

export const metadata: Metadata = {
  title: "Saved",
  description: "Projects you bookmarked in the KRAFDEV portfolio.",
  alternates: { canonical: "/saved" },
};

export default function SavedPage() {
  return <SavedView />;
}
