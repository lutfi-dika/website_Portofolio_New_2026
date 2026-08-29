import type { Metadata } from "next";
import { CertificatesView } from "./CertificatesView";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sertifikat",
  description:
    "Koleksi sertifikat Muhammad Lutfi Andika — owner KRAFDEV Digital Technology Studio: ITECHNO CUP 2025, ICOM FEAST 2026, LKS, IDN Boarding School, dan Piagam Penghargaan web development.",
  keywords: [
    "sertifikat Muhammad Lutfi Andika",
    "sertifikat frontend developer",
    "ITECHNO CUP 2025 sertifikat",
    "ICOM FEAST 2026 sertifikat",
    "LKS sertifikat",
    "KRAFDEV Digital Technology Studio",
    "sertifikat web developer",
  ],
  alternates: { canonical: "/certificates" },
  openGraph: {
    type: "website",
    url: `${siteUrl}/certificates`,
    title: `Sertifikat ${profile.name} | ${profile.business}`,
    description:
      "Sertifikat prestasi Muhammad Lutfi Andika — ITECHNO CUP, ICOM FEAST, LKS Cyber Security, dan penghargaan lainnya.",
  },
};

export default function CertificatesPage() {
  return <CertificatesView />;
}
