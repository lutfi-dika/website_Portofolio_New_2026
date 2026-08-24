import type { Metadata } from "next";
import { ShortcutsView } from "./ShortcutsView";

export const metadata: Metadata = {
  title: "Keyboard Shortcuts",
  description: "Navigate LUTFI.DEV faster with keyboard shortcuts.",
  alternates: { canonical: "/shortcuts" },
};

export default function ShortcutsPage() {
  return <ShortcutsView />;
}
