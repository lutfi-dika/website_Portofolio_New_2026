import type { Metadata } from "next";
import { ExperienceView } from "./ExperienceView";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Work experience of Muhammad Lutfi Andika — Web Developer / IT intern at Bank Syariah Indonesia, KCP Bekasi Tambun 1.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return <ExperienceView />;
}
