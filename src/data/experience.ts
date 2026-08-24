export interface EducationItem {
  id: string;
  school: string;
  /** e.g. major/jurusan — optional for lower levels */
  major?: string;
  period: string;
  place: string;
  /** translation keys under experience.educationFocus */
  focusKeys: string[];
}

/**
 * Education history, oldest first.
 * Jaya Suti Abadi = yayasan pendidikan di Tambun Selatan, Bekasi (SD/SMP/SMA).
 */
export const educationHistory: EducationItem[] = [
  {
    id: "jaya-suti-abadi",
    school: "Jaya Suti Abadi",
    period: "2021 — 2024",
    place: "Tambun Selatan, Bekasi, Indonesia",
    focusKeys: ["organizationFocus"],
  },
  {
    id: "smk-telesandi",
    school: "SMK Telekomunikasi Telesandi Bekasi",
    major: "Teknik Komputer dan Jaringan",
    period: "2023 — 2026",
    place: "Bekasi, West Java, Indonesia",
    focusKeys: ["webDevFocus", "networkFocus", "softwareEngFocus"],
  },
];

export interface ExperienceItem {
  id: string;
  period: string;
  roleKey: string;
  company: string;
  location: string;
  typeKey: string;
  /** translation keys for activity bullets */
  activitiesKeys: string[];
  stack: string[];
}

export const experiences: ExperienceItem[] = [
  {
    id: "bsi-pkl",
    period: "2026",
    roleKey: "webDeveloperIt",
    company: "Bank Syariah Indonesia",
    location: "KCP Bekasi Tambun 1",
    typeKey: "pkl",
    activitiesKeys: [
      "websiteDevelopment",
      "dashboardDevelopment",
      "uiImplementation",
      "database",
      "testing",
      "documentation",
    ],
    stack: ["Next.js", "React", "Laravel", "MySQL", "Tailwind CSS"],
  },
];
