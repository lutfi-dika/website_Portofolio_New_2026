// ============================================================
// 1. INTERFACE / TIPE DATA
// ============================================================

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

// ============================================================
// 2. DATA PENDIDIKAN
// ============================================================

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

// ============================================================
// 3. DATA PENGALAMAN (roleKey sudah diubah)
// ============================================================

export const experiences: ExperienceItem[] = [
  // --- Pengalaman 1: Dashboard Internal (PKL) ---
  {
    id: "bsi-pkl",
    period: "2026",
    roleKey: "dashboardMultiRole", // <-- UBAH dari webDeveloperIt
    company: "Bank Syariah Indonesia",
    location: "KCP Bekasi Tambun 1    ",
    typeKey: "pkl",
    activitiesKeys: [
      "websiteDevelopment",
      "dashboardDevelopment",
      "uiImplementation",
      "database",
      "testing",
      "documentation",
    ],
    stack: [
      "PHP",
      "MySQL",
      "Tailwind CSS",
      "JavaScript",
      "Chart.js",
      "Font Awesome",
      "PDF",
      "Excel",
      "Email",
      "WhatsApp OTP",
    ],
  },

  // --- Pengalaman 2: Company Profile (Proyek) ---
  {
    id: "bsi-pkl-cp",
    period: "2026",
    roleKey: "frontendWebDev",
    company: "Bank Syariah Indonesia",
    location: "KCP Bekasi Tambun 1",
    typeKey: "project",
    activitiesKeys: [
      "uiImplementation",
      "responsiveDesign",
      "seoOptimization",
      "performanceOptimization",
      "pwaImplementation",
      "deployment",
    ],
    stack: [
      "React.js",
      "Tailwind CSS",
      "Google Maps",
      "Framer Motion",
      "PWA",
      "Open Graph",
      "React Router",
      "Priority Hints",
      "GitHub",
      "Vercel",
    ],
  },
];

// ============================================================
// 4. OBJEK TRANSLASI (BAHASA INDONESIA) - KEY ikut diubah
// ============================================================

export const translations = {
  experience: {
    title: "Pengalaman",
    subtitle: "Pengalaman kerja dan organisasi yang membentuk kemampuan saya.",
    educationTitle: "Pendidikan",
    activities: "Aktivitas",

    // Terjemahan untuk roleKey (KEY sudah diganti semua)
    roles: {
      dashboardMultiRole: "Dashboard Multi Role", // <-- UBAH dari webDeveloperIt
      frontendWebDev: "Frontend Web Developer",
    },

    // Terjemahan untuk typeKey
    types: {
      pkl: "Praktik Kerja Lapangan",
      project: "Pengembangan Proyek",
    },

    // Terjemahan untuk activitiesKeys
    activitiesList: {
      // Aktivitas Dashboard Internal
      websiteDevelopment: "Pengembangan & pemeliharaan fitur website internal",
      dashboardDevelopment: "Membangun antarmuka dashboard untuk monitoring data & operasional",
      database: "Merancang & mengembangkan skema database relasional (MySQL)",
      testing: "Pengujian fungsional dan perbaikan bug sebelum rilis",
      documentation: "Penulisan dokumentasi teknis untuk tim pengembangan",

      // Aktivitas Company Profile
      uiImplementation: "Implementasi UI/UX modern dari desain Figma",
      responsiveDesign: "Membangun tampilan responsif untuk berbagai ukuran perangkat (mobile, tablet, desktop)",
      seoOptimization: "Optimasi mesin pencari (SEO) menggunakan Open Graph, Meta Tags, & Priority Hints",
      performanceOptimization: "Optimasi performa website (Code Splitting, Lazy Loading, & caching)",
      pwaImplementation: "Implementasi Progressive Web App (PWA) untuk akses offline & pengalaman seperti aplikasi native",
      deployment: "Proses deployment ke Vercel serta manajemen versi kode menggunakan GitHub",
    },

    // Terjemahan untuk educationFocus
    educationFocus: {
      webDevFocus: "Web Development",
      networkFocus: "Jaringan Komputer",
      softwareEngFocus: "Dasar Rekayasa Perangkat Lunak",
      organizationFocus: "Organisasi",
    },
  },
};

// ============================================================
// 5. EXPORT SEMUA DALAM SATU OBJEK
// ============================================================

export const config = {
  educationHistory,
  experiences,
  translations,
};