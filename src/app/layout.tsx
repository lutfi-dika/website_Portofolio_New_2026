import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { profile, socials } from "@/data/profile";
import { projects } from "@/data/projects";
import { siteUrl } from "@/lib/site";
import { SettingsProvider } from "@/lib/settings";
import { LanguageProvider } from "@/lib/i18n";
import { ToastProvider } from "@/lib/toast";
import { AppStateProvider } from "@/lib/store";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} | LUTFI.DEV`,
    template: `%s | LUTFI.DEV`,
  },
  description:
    "Personal developer portfolio of Muhammad Lutfi Andika — Frontend Developer & Web Developer from Bekasi, Indonesia. Building modern websites with React, Next.js, Tailwind CSS. Founder of KRAFDEV Digital Technology Studio.",
  keywords: [
    "Muhammad Lutfi Andika",
    "LUTFI.DEV",
    "Frontend Developer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "Tailwind CSS",
    "JavaScript Developer",
    "Portfolio",
    "Bekasi",
    "Indonesia",
    "KRAFDEV Digital Technology Studio",
    "jasa pembuatan website",
    "web development",
    "company profile",
    "landing page",
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  publisher: profile.name,
  alternates: { canonical: "/" },
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    locale: "id_ID",
    alternateLocale: ["en_US"],
    url: siteUrl,
    siteName: "LUTFI.DEV — Developer Portfolio",
    title: `${profile.name} | LUTFI.DEV`,
    description:
      "Personal developer portfolio of Muhammad Lutfi Andika — Frontend Developer & Web Developer. Founder of KRAFDEV Digital Technology Studio. Projects, skills, experience, and AI assistant.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${profile.name} — ${profile.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | LUTFI.DEV`,
    description:
      "Frontend Developer & Web Developer from Bekasi, Indonesia. Founder of KRAFDEV Digital Technology Studio.",
    images: ["/opengraph-image"],
    creator: "@lutfiandika",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/Avatar.png", type: "image/png" }],
    shortcut: "/Avatar.png",
    apple: "/Avatar.png",
  },
  verification: {
    google: "aDpO1RGTuhsjYc7AHePdjiNseGfYSB_K3QGC6AFUjgo",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
  ],
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  alternateName: "LUTFI.DEV",
  jobTitle: profile.role,
  description: profile.bio,
  url: siteUrl,
  image: `${siteUrl}/Avatar.png`,
  email: `mailto:${profile.email}`,
  telephone: "+6281295431853",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bekasi",
    addressRegion: "Jawa Barat",
    addressCountry: "ID",
  },
  nationality: {
    "@type": "Country",
    name: "Indonesia",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: profile.school,
    url: "https://stelecosi.sch.id",
  },
  sameAs: socials
    .filter((s) => ["github", "instagram", "linkedin"].includes(s.icon))
    .map((s) => s.href),
  knowsAbout: [
    "Web Development",
    "Frontend Development",
    "Backend Development",
    "UI/UX Design",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "PHP",
    "Laravel",
    "MySQL",
    "Tailwind CSS",
    "HTML",
    "CSS",
    "Node.js",
    "Git",
    "Figma",
    "Vercel",
  ],
  knowsLanguage: ["id", "en"],
  hasOccupation: [
    {
      "@type": "Occupation",
      name: "Frontend Developer",
      occupationLocation: {
        "@type": "Country",
        name: "Indonesia",
      },
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript"],
    },
    {
      "@type": "Occupation",
      name: "Web Developer",
      occupationLocation: {
        "@type": "Country",
        name: "Indonesia",
      },
      skills: ["PHP", "Laravel", "MySQL", "HTML", "CSS"],
    },
  ],
  worksFor: {
    "@type": "Organization",
    name: "KRAFDEV Digital Technology Studio",
    url: siteUrl,
  },
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "Vocational Education",
    educationalLevel: "Secondary Level",
  },
};

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "KRAFDEV Digital Technology Studio",
  alternateName: "KRAFDEV",
  description:
    "KRAFDEV Digital Technology Studio membantu bisnis membangun website profesional, responsive, cepat, dan scalable. Layanan meliputi website development, company profile, landing page, e-commerce, dashboard, hingga UI/UX design.",
  url: siteUrl,
  image: `${siteUrl}/Avatar.png`,
  email: `mailto:${profile.email}`,
  telephone: "+6281295431853",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bekasi",
    addressRegion: "Jawa Barat",
    addressCountry: "ID",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -6.2349,
    longitude: 106.9896,
  },
  areaServed: {
    "@type": "Country",
    name: "Indonesia",
  },
  founder: {
    "@type": "Person",
    name: profile.name,
    url: siteUrl,
  },
  author: {
    "@type": "Person",
    name: profile.name,
  },
  sameAs: socials
    .filter((s) => ["github", "instagram", "linkedin"].includes(s.icon))
    .map((s) => s.href),
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "Website Development" },
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "Company Profile" },
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "Landing Page" },
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "E-Commerce" },
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "Dashboard & Web Application" },
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "UI/UX Design" },
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "SEO & Performance" },
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "Maintenance" },
    },
  ],
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "00:00",
    closes: "23:59",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "LUTFI.DEV",
  alternateName: "Muhammad Lutfi Andika Portfolio",
  url: siteUrl,
  description:
    "Personal developer portfolio and OS dashboard of Muhammad Lutfi Andika.",
  author: { "@type": "Person", name: profile.name },
  inLanguage: ["id", "en"],
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/projects?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Beranda", item: siteUrl },
    {
      "@type": "ListItem",
      position: 2,
      name: "Tentang",
      item: `${siteUrl}/about`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Proyek",
      item: `${siteUrl}/projects`,
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Kontak",
      item: `${siteUrl}/contact`,
    },
  ],
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: `Tentang ${profile.name}`,
  url: `${siteUrl}/about`,
  description: `Profil, perjalanan, minat, dan tujuan ${profile.name} — ${profile.role} dari ${profile.location}.`,
  mainEntity: {
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    url: siteUrl,
  },
  primaryImageOfPage: `${siteUrl}/Avatar.png`,
};

const projectsSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Proyek Muhammad Lutfi Andika",
  url: `${siteUrl}/projects`,
  description:
    "Kumpulan proyek website dan aplikasi yang dibuat oleh Muhammad Lutfi Andika.",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.title,
      url: `${siteUrl}/projects/${p.slug}`,
      image: `${siteUrl}/opengraph-image`,
    })),
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Siapa Muhammad Lutfi Andika?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Muhammad Lutfi Andika adalah Frontend Developer & Web Developer dari Bekasi, Indonesia. Siswa SMK Telekomunikasi Telesandi Bekasi jurusan Teknik Komputer dan Jaringan. Fokus membangun website modern, responsive, dan interaktif menggunakan React, Next.js, dan Tailwind CSS. Founder dari KRAFDEV Digital Technology Studio.",
      },
    },
    {
      "@type": "Question",
      name: "Apa saja skill Muhammad Lutfi Andika?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Skill utama: React, Next.js, TypeScript, JavaScript, Tailwind CSS, HTML, CSS. Backend: PHP, Laravel, MySQL. Tools: Git, Figma, Vercel, Node.js. Juga menguasai UI/UX Design dan SEO.",
      },
    },
    {
      "@type": "Question",
      name: "Apa itu KRAFDEV Digital Technology Studio?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "KRAFDEV Digital Technology Studio adalah studio web development yang didirikan oleh Muhammad Lutfi Andika. Melayani pembuatan website profesional, company profile, landing page, e-commerce, dashboard, UI/UX design, SEO, dan maintenance.",
      },
    },
    {
      "@type": "Question",
      name: "Project apa saja yang sudah dibuat Muhammad Lutfi Andika?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Project meliputi: BSI Company Profile, BSI Multi-Role Dashboard, EduCare (platform pembelajaran digital), SMK Telekomunikasi Telesandi website, D&DiShop (toko online), CakraLogy, KRAFDEV Digital Technology Studio, Portofolio Website v1, dan My Legacy Portfolio.",
      },
    },
    {
      "@type": "Question",
      name: "Bagaimana cara menghubungi Muhammad Lutfi Andika?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Bisa menghubungi via email di lutfiandika.dev@gmail.com, WhatsApp di +6281295431853, atau Instagram di @303.andika. Form kontak tersedia di halaman Contact portfolio.",
      },
    },
    {
      "@type": "Question",
      name: "Dimana Muhammad Lutfi Andika berdomisili?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Muhammad Lutfi Andika berdomisili di Bekasi, Jawa Barat, Indonesia. Timezone: Asia/Jakarta (WIB).",
      },
    },
    {
      "@type": "Question",
      name: "Apa pengalaman kerja Muhammad Lutfi Andika?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Magang (PKL) sebagai Web Developer / IT di Bank Syariah Indonesia KCP Bekasi Tambun. Mengerjakan pengembangan website internal, dashboard monitoring, implementasi UI, database MySQL, testing, dan dokumentasi teknis.",
      },
    },
  ],
};

/** Runs before hydration to apply the saved theme — prevents flash of wrong theme. */
const themeScript = `
(function(){try{
var s=JSON.parse(localStorage.getItem("lutfi.settings")||"{}");
var t=s.theme||"dark";
if(t==="system"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}
document.documentElement.dataset.theme=t;
document.documentElement.dataset.accent=s.accent||"blue";
document.documentElement.dataset.density=s.density||"comfortable";
var e=s.effects||{};var a=s.a11y||{};
document.documentElement.dataset.glow=e.backgroundGlow===false?"off":"on";
document.documentElement.dataset.glass=e.glass===false?"off":"on";
document.documentElement.dataset.cursor=e.customCursor===false?"off":"on";
document.documentElement.dataset.largeText=a.largeText?"on":"off";
document.documentElement.dataset.contrast=a.highContrast?"on":"off";
var rm=a.reducedMotion||e.animations===false||window.matchMedia("(prefers-reduced-motion: reduce)").matches;
document.documentElement.dataset.motion=rm?"reduced":"full";
var l=localStorage.getItem("lutfi.locale");if(l){try{l=JSON.parse(l);}catch(_){}
if(l==="id"||l==="en"){document.documentElement.lang=l;}else{document.documentElement.lang="id";}}
else{document.documentElement.lang="id";}
}catch(_){document.documentElement.dataset.theme="dark";}})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      data-theme="dark"
      data-accent="blue"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-svh bg-background font-sans text-foreground antialiased">
        <SettingsProvider>
          <LanguageProvider>
            <AppStateProvider>
              <ToastProvider>{children}</ToastProvider>
            </AppStateProvider>
          </LanguageProvider>
        </SettingsProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(professionalServiceSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </body>
    </html>
  );
}
