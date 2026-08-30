import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/site";
import { ResumeView } from "./ResumeView";

export const metadata: Metadata = {
  title: "Resume & CV",
  description: `Resume profesional ${profile.name} — ${profile.role} dan owner ${profile.business}. Berisi pengalaman, skills, project, prestasi, dan sertifikat. Footer: include pengalaman magang Bank Syariah Indonesia sebagai Web Developer / IT intern.`,
  keywords: [
    "resume Muhammad Lutfi Andika",
    "CV web developer",
    "resume frontend developer Indonesia",
    "curriculum vitae web developer",
    "pengalaman kerja web developer",
    profile.name,
    profile.business,
  ],
  alternates: { canonical: "/resume" },
  openGraph: {
    type: "website",
    url: `${siteUrl}/resume`,
    title: `Resume ${profile.name} | ${profile.role}`,
    description: `CV dan resume profesional ${profile.name}: pengalaman, skills, project, prestasi, dan sertifikat.`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function ResumePage() {
  const resumeSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `Resume ${profile.name}`,
    url: `${siteUrl}/resume`,
    inLanguage: ["id", "en"],
    mainEntity: {
      "@type": "Person",
      name: profile.name,
      url: siteUrl,
      jobTitle: profile.role,
      worksFor: { "@type": "Organization", name: profile.business },
      alumniOf: { "@type": "EducationalOrganization", name: profile.school },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(resumeSchema) }}
      />
      <ResumeView />
    </>
  );
}
