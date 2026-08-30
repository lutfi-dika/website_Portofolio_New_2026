import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/site";
import { ContactView } from "./ContactView";

export const metadata: Metadata = {
  title: "Contact Muhammad Lutfi Andika",
  description: `Hubungi ${profile.name} — ${profile.business}. Untuk jasa pembuatan website, kolaborasi, atau project web development, kirim email, WhatsApp, atau DM via Instagram dan LinkedIn.`,
  keywords: [
    "contact Muhammad Lutfi Andika",
    "kontak web developer",
    "jasa pembuatan website bekasi",
    "order website",
    "hubungi web developer",
    profile.business,
    profile.email,
  ],
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: `${siteUrl}/contact`,
    title: `Contact ${profile.name} | ${profile.business}`,
    description: `Hubungi ${profile.name} untuk jasa pembuatan website profesional: company profile, landing page, e-commerce, dashboard, UI/UX, dan SEO.`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${profile.name}`,
    url: `${siteUrl}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: profile.business,
      url: siteUrl,
      email: `mailto:${profile.email}`,
      founder: { "@type": "Person", name: profile.name },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: profile.email,
        availableLanguage: ["id", "en"],
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <ContactView />
    </>
  );
}
