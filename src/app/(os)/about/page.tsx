import type { Metadata } from "next";
import { AboutView } from "./AboutView";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "About Muhammad Lutfi Andika — Frontend Developer & Web Developer student at SMK Telekomunikasi Telesandi Bekasi.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutView />;
}
