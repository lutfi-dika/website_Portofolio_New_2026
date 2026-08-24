export const profile = {
  name: "Muhammad Lutfi Andika",
  shortName: "Lutfi",

  // Personal Branding
  brand: "LUTFI.DEV",
  brandTagline: "Code. Design. Create.",

  role: "Frontend Developer & Web Developer",

  // Personal Information
  location: "Bekasi, Indonesia",
  timezone: "Asia/Jakarta",

  // Education
  school: "SMK Telekomunikasi Telesandi Bekasi",
  major: "Teknik Komputer dan Jaringan",
  schoolPeriod: "2023 — 2026",

  // Contact
  email: "lutfiandika.dev@gmail.com",
  githubUsername: "lutfi-dika",

  // Availability
  availableFor: "Available for Projects",

  // Business / Studio
  business: "Webkraf Digital Studio",
  businessRole: "Owner",

  /**
   * Personal Branding Bio
   */
  bio:
    "Saya adalah Muhammad Lutfi Andika, seorang Web Developer yang menggabungkan code, design, dan creativity untuk membangun pengalaman digital yang modern. Saya fokus pada Front-End Development, Web Development, dan UI/UX, dengan menggunakan teknologi seperti JavaScript, React, Next.js, Tailwind CSS, PHP, dan Laravel. Saya senang mengubah ide menjadi website yang fungsional, responsif, dan memiliki karakter. Melalui LUTFI.DEV dan Webkraf Digital Studio, saya terus belajar, bereksperimen, membangun project, dan berkembang untuk menciptakan solusi digital yang tidak hanya terlihat menarik, tetapi juga memberikan nilai.",

} as const;


/**
 * Social Media
 */
export const socials = [
  {
    label: "GitHub",
    href: "https://github.com/lutfi-dika",
    icon: "github",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/lutfiandika",
    icon: "instagram",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/lutfiandika",
    icon: "linkedin",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/6281234567890",
    icon: "whatsapp",
  },
] as const;


/**
 * Portfolio Statistics
 *
 * Honest counts — never inflate.
 */
export const stats = [
  {
    key: "projects",
    value: 9,
    suffix: "+",
    icon: "folder",
  },
  {
    key: "technologies",
    value: 20,
    suffix: "+",
    icon: "cpu",
  },
  {
    key: "pkl",
    value: 3,
    suffix: "",
    unit: "months",
    icon: "briefcase",
  },
] as const;


/**
 * Interests
 */
export const interests = [
  {
    key: "webdev",
    icon: "code",
  },
  {
    key: "frontend",
    icon: "layout",
  },
  {
    key: "uiux",
    icon: "palette",
  },
  {
    key: "technology",
    icon: "cpu",
  },
] as const;