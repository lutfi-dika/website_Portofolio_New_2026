import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { profile, socials } from "@/data/profile";
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
    "Personal developer portfolio of Muhammad Lutfi Andika — a Developer OS dashboard featuring projects, skills, experience, GitHub stats, and an AI assistant.",
  keywords: [
    "Muhammad Lutfi Andika",
    "LUTFI.DEV",
    "Frontend Developer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "Portfolio",
    "Bekasi",
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    alternateLocale: ["en_US"],
    url: siteUrl,
    siteName: "LUTFI.DEV — Developer Portfolio",
    title: `${profile.name} | LUTFI.DEV`,
    description:
      "Personal developer portfolio of Muhammad Lutfi Andika. A personal developer OS: projects, skills, GitHub dashboard, chat & AI assistant.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | LUTFI.DEV`,
    description: "Personal developer portfolio of Muhammad Lutfi Andika.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [{ url: "/logo.jpeg", type: "image/jpeg" }],
    shortcut: "/logo.jpeg",
    apple: "/logo.jpeg",
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
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Bekasi", addressCountry: "ID" },
  alumniOf: { "@type": "EducationalOrganization", name: profile.school },
  sameAs: socials.map((s) => s.href),
  knowsAbout: ["Web Development", "Frontend Development", "UI/UX Design", "React", "Next.js", "TypeScript"],
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
      </body>
    </html>
  );
}
