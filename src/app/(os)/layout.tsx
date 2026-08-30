import type { Metadata } from "next";
import { OsShell } from "@/components/os/OsShell";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/site";

/**
 * Route-level default metadata for the dashboard app. The home route ("/")
 * and the "overview" shell share these; every public sub-page overrides with
 * its own dedicated metadata, so these act as a rich fallback.
 */
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${profile.name} | ${profile.role} | ${profile.business}`,
    description: profile.bio,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | ${profile.role} | ${profile.business}`,
    description: profile.bio,
    images: ["/opengraph-image"],
  },
};

export default function OsLayout({ children }: { children: React.ReactNode }) {
  return <OsShell>{children}</OsShell>;
}
