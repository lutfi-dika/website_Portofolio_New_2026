import type { Metadata } from "next";
import { CertificatesView } from "./CertificatesView";

export const metadata: Metadata = {
  title: "Certificates",
  description: "Certifications earned by Muhammad Lutfi Andika.",
  alternates: { canonical: "/certificates" },
};

export default function CertificatesPage() {
  return <CertificatesView />;
}
