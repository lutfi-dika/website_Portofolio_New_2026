import type { Metadata } from "next";
import { AchievementsView } from "./AchievementsView";
import { profile } from "@/data/profile";
import { achievements } from "@/data/achievements";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Prestasi & Pencapaian",
  description:
    "Prestasi Muhammad Lutfi Andika — owner KRAFDEV Digital Technology Studio: Juara 3 Frontend Developer ITECHNO CUP 2025, Juara 3 Frontend Developer ICOM FEAST 2026, LKS bidang Cyber Security, dan Web Developer Intern di Bank Syariah Indonesia. Founder KRAFDEV.",
  keywords: [
    "prestasi Muhammad Lutfi Andika",
    "Muhammad Lutfi Andika achievements",
    "Juara 3 ITECHNO CUP 2025",
    "Juara 3 ICOM FEAST 2026",
    "LKS cyber security Jawa Barat",
    "owner KRAFDEV Digital Technology Studio",
    "frontend developer lomba",
    "Web Developer intern Bank Syariah Indonesia",
    "profil web developer Indonesia",
  ],
  alternates: { canonical: "/achievements" },
  openGraph: {
    type: "website",
    url: `${siteUrl}/achievements`,
    title: "Prestasi Muhammad Lutfi Andika | Owner KRAFDEV Digital Technology Studio",
    description:
      "Juara 3 Frontend Developer ITECHNO CUP 2025, ICOM FEAST 2026, LKS Cyber Security, dan Web Developer Intern BSI. Founder KRAFDEV Digital Technology Studio.",
  },
};

export default function AchievementsPage() {
  const awardList = achievements.filter((a) => a.type === "competition");

  return (
    <>
      <AchievementsView />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: `Prestasi ${profile.name}`,
            description:
              "Daftar prestasi dan pencapaian Muhammad Lutfi Andika sebagai pemilik KRAFDEV Digital Technology Studio dan web developer.",
            url: `${siteUrl}/achievements`,
            itemListElement: awardList.map((a, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "CreativeWork",
                name: a.titleKey,
                yearCreated: a.year,
              },
            })),
          }),
        }}
      />
    </>
  );
}
