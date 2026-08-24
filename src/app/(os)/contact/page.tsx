import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { ContactView } from "./ContactView";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with Muhammad Lutfi Andika — ${profile.email}, WhatsApp, GitHub, Instagram, and LinkedIn.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactView />;
}
