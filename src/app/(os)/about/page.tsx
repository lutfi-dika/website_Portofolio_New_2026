import type { Metadata } from "next";
import { AboutView } from "./AboutView";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Me",
  description:
    `Tentang ${profile.name} — Frontend Developer & Web Developer dari Bekasi, Indonesia. Siswa SMK Telekomunikasi Telesandi Bekasi, pemilik Webkraf Digital Studio. Membangun website modern dengan React, Next.js, dan Tailwind CSS.`,
  keywords: [
    "Muhammad Lutfi Andika",
    "tentang saya",
    "about me",
    "frontend developer bekasi",
    "web developer indonesia",
    "Webkraf Digital Studio",
    "SMK Telekomunikasi Telesandi",
  ],
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About Me | ${profile.name} — LUTFI.DEV`,
    description:
      `Frontend Developer & Web Developer dari Bekasi, Indonesia. Pemilik Webkraf Digital Studio.`,
    url: `${siteUrl}/about`,
  },
};

const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: profile.name,
    alternateName: "LUTFI.DEV",
    jobTitle: profile.role,
    description: profile.bio,
    url: siteUrl,
    image: `${siteUrl}/logo.jpeg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bekasi",
      addressCountry: "ID",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: profile.school,
    },
    knowsAbout: [
      "Web Development",
      "Frontend Development",
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "PHP",
      "Laravel",
      "UI/UX Design",
    ],
    worksFor: {
      "@type": "Organization",
      name: profile.business,
    },
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
      <AboutView />
    </>
  );
}
