export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  credentialId?: string;
  /** image or PDF url for the preview modal */
  fileUrl: string;
  externalUrl?: string;
  accent: string;
}

/**
 * CERTIFICATES — real certificates & competition results.
 * Sources: Lutfi's live portfolio (MY-PORTOFOLIO-NEW) and physical certificates.
 * Images are self-hosted in /public/certificates.
 */
export const certificates: Certificate[] = [
  {
    id: "itechno-cup-2025",
    title: "3rd Place — Front Developer Finalist",
    issuer: "ITECHNO CUP 2025",
    year: "2025",
    fileUrl: "/certificates/itechno-cup-2025.jpeg",
    accent: "#ffcc00",
  },
  {
    id: "icom-feast-2026",
    title: "3rd Place — Front Developer",
    issuer: "ICOM FEAST 2026",
    year: "2026",
    fileUrl: "/certificates/icom-feast-2026.jpeg",
    accent: "#e91e63",
  },
  {
    id: "clash-of-cyber-heist",
    title: "Participant Certificate",
    issuer: "Clash of Cyber Heist",
    year: "—",
    fileUrl: "/certificates/clash-of-cyber-heist.jpeg",
    accent: "#4285F4",
  },
  {
    id: "idn-boarding-school",
    title: "Participant Certificate",
    issuer: "IDN Boarding School",
    year: "—",
    fileUrl: "/certificates/idn-boarding-school.jpeg",
    accent: "#5eb562",
  },
];
