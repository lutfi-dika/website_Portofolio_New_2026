import type { Metadata } from "next";
import { SettingsView } from "./SettingsView";

export const metadata: Metadata = {
  title: "Settings",
  description: "Customize the appearance, language, and accessibility of the KRAFDEV portfolio.",
  alternates: { canonical: "/settings" },
};

export default function SettingsPage() {
  return <SettingsView />;
}
