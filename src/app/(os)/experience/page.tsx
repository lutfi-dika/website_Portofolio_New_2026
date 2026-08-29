import type { Metadata } from "next";
import { ExperienceView } from "./ExperienceView";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pengalaman",
  description:
    "Pengalaman dan keahlian Muhammad Lutfi Andika — owner KRAFDEV Digital Technology Studio. Web Developer / IT intern di Bank Syariah Indonesia KCP Bekasi Tambun 1, membangun website & dashboard internal.",
  keywords: [
    "pengalaman Muhammad Lutfi Andika",
    "web developer intern",
    "pengalaman web developer Bank Syariah Indonesia",
    "owner KRAFDEV Digital Technology Studio",
    "pengalaman frontend developer",
    "IT intern BSI",
    "KRAFDEV Digital Technology Studio",
  ],
  alternates: { canonical: "/experience" },
  openGraph: {
    type: "website",
    url: `${siteUrl}/experience`,
    title: `Pengalaman ${profile.name} | ${profile.business}`,
    description:
      "Web Developer / IT intern di Bank Syariah Indonesia dan owner KRAFDEV Digital Technology Studio.",
  },
};

export default function ExperiencePage() {
  return <ExperienceView />;
}
