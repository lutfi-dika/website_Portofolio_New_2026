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
  email: "lutfiandika33@gmail.com",
  githubUsername: "lutfi-dika",

  // Availability
  availableFor: "Available for Projects",

  // Business / Studio
  business: "KRAFDEV Digital Technology Studio",
  businessRole: "Owner",

  /**
   * Personal Branding Bio
   */
  bio:
    "Saya Muhammad Lutfi Andika, seorang Web Developer yang fokus pada Frontend dan Web Development. Saat ini saya terus belajar dan mengembangkan berbagai project menggunakan JavaScript, React, Next.js, Tailwind CSS, PHP, dan Laravel. Saya memiliki ketertarikan dalam menciptakan website yang tidak hanya menarik secara visual, tetapi juga nyaman, responsif, dan mudah digunakan. Selain mengembangkan diri sebagai developer melalui LUTFI.DEV, saya juga membangun dan mengembangkan KRAFDEV Digital Technology Studio, sebuah bisnis yang bergerak di bidang pembuatan website dan solusi digital. Melalui Webkraf, saya belajar menerapkan kemampuan teknis dan kreativitas dalam mengerjakan project nyata serta membantu kebutuhan digital klien.Bagi saya, setiap project adalah kesempatan untuk belajar, bereksperimen, dan menciptakan sesuatu yang lebih baik.",

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
    label: "Email",
    href: "mailto:lutfiandika33@gmail.com",
    icon: "email",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/3030.andika",
    icon: "instagram",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/6281295431853",
    icon: "whatsapp",
  },
  {
    label: "LinkedIn",
    href: "https://id.linkedin.com/in/lutfi-andika-8709453a2",
    icon: "linkedin",
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