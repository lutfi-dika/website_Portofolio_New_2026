export type ProjectStatus = "completed" | "in-progress" | "archived";
export type ProjectCategory = "frontend" | "backend" | "fullstack" | "uiux";

export interface Project {
  slug: string;
  index: string;
  title: string;
  category: ProjectCategory;
  status: ProjectStatus;
  year: string;
  /** translation keys */
  descriptionKey: string;
  features: string[];
  tech: string[];
  github: string;
  demo: string;
  /** key of the generated SVG/CSS preview artwork */
  preview: "landing" | "dashboard" | "learning" | "studio";
  accent: string;
  accent2: string;
}

/**
 * PROJECTS — real work by Lutfi with live URLs where available.
 * Sources: his live portfolio (MY-PORTOFOLIO-NEW) + verified GitHub repos.
 */
export const projects: Project[] = [
  {
    slug: "bsi-company-profile",
    index: "01",
    title: "BSI Company Profile",
    category: "frontend",
    status: "completed",
    year: "2026",
    descriptionKey: "bsiCompanyProfile",
    features: ["responsive", "seo", "cleanUi", "performance"],
    tech: ["React.JS", "Tailwind.css", "Google Maps", "Framer Motion", "PWA", "Open Graph", "React Router", "Priority Hints", "Vercel", "SEO"],
    github: "https://github.com/lutfi-dika",
    demo: "https://bsi-kcp-tambun-bekasi.vercel.app",
    preview: "landing",
    accent: "#22d3ee",
    accent2: "#0ea5e9",
  },
  {
    slug: "bsi-multi-role-dashboard",
    index: "02",
    title: "BSI Multi-Role Dashboard",
    category: "fullstack",
    status: "in-progress",
    year: "2026",
    descriptionKey: "bsiDashboard",
    features: ["multiRole", "monitoring", "crud", "database"],
    tech: [
      "PHP 8.1+",
      "MySQL",
      "Tailwind CSS",
      "Chart.js",
      "Font Awesome 6",
      "PHPMailer",
      "FPDF",
      "Fonnte API",
    ],
    github: "https://github.com/lutfi-dika",
    demo: "#",
    preview: "dashboard",
    accent: "#a78bfa",
    accent2: "#8b5cf6",
  },
  {
    slug: "d-dishop",
    index: "03",
    title: "D&DiShop",
    category: "frontend",
    status: "completed",
    year: "2025",
    descriptionKey: "dDishop",
    features: ["responsive", "cleanUi", "performance"],
    tech: ["React", "CSS"],
    github: "https://github.com/lutfi-dika/Website-D-DiShop",
    demo: "https://websiteddishop.netlify.app/",
    preview: "studio",
    accent: "#f472b6",
    accent2: "#fb7185",
  },
  {
    slug: "undangan-pernikahan-zulfian-irya",
    index: "04",
    title: "Undangan Pernikahan Zulfian & Irya",
    category: "frontend",
    status: "completed",
    year: "2026",
    descriptionKey: "weddingInvitation",
    features: ["responsive", "animation", "interactiveUi", "performance"],
    tech: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Google Fonts",
      "SVG",
      "localStorage",
      "IntersectionObserver",
      "CSS Animations",
    ],
    github: "https://github.com/lutfi-dika",
    demo: "https://undangan-pernikahan-zulfian-irya.vercel.app/",
    preview: "landing",
    accent: "#f472b6",
    accent2: "#fb7185",
  },
  {
    slug: "ekonexa-management-ekonomi",
    index: "05",
    title: "EKONEXA Management Ekonomi",
    category: "fullstack",
    status: "completed",
    year: "2026",
    descriptionKey: "ekonexaManagementEkonomi",
    features: [
      "responsive",
      "financialManagement",
      "transactionManagement",
      "budgetPlanning",
      "authentication",
      "interactiveUi",
    ],
    tech: [
      "PHP 8.2+",
      "Laravel 12",
      "Laravel Breeze",
      "Tailwind CSS 3",
      "Alpine.js",
      "Axios",
      "MySQL",
      "Vite 7",
    ],
    github: "https://github.com/lutfi-dika",
    demo: "http://management.krafdevdigitaltechnologystudio.my.id/",
    preview: "dashboard",
    accent: "#111827",
    accent2: "#374151",
  },
  {
    slug: "educare",
    index: "06",
    title: "Educare",
    category: "fullstack",
    status: "completed",
    year: "2026",
    descriptionKey: "educare",
    features: [
      "responsive",
      "cleanUi",
      "performance",
      "authentication",
      "multiRole",
      "quiz",
      "certificate",
      "darkMode",
    ],
    tech: [
      "Laravel 12",
      "PHP 8.2+",
      "Blade",
      "Tailwind CSS v4",
      "Vite 7",
      "SQLite",
      "Axios",
    ],
    github: "https://github.com/lutfi-dika/EdUCare-",
    demo: "http://educare-timkodinginaja.page.gd",
    preview: "dashboard",
    accent: "#22c55e",
    accent2: "#16a34a",
  },
  {
    slug: "krafdev-digital-technology-studio",
    index: "07",
    title: "KRAFDEV Digital Technology Studio",
    category: "fullstack",
    status: "completed",
    year: "2026",
    descriptionKey: "krafdevDigitalTechnologyStudio",
    features: ["responsive", "seo", "cleanUi", "performance", "darkMode"],
    tech: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Framer Motion",
      "Lucide React",
      "next-themes",
      "Google Sheets CSV",
      "Vercel",
    ],
    github: "https://github.com/lutfi-dika/KRAFDEV-Digital-Technology-Studio",
    demo: "https://krafdevdigitaltechnologystudio.my.id/",
    preview: "landing",
    accent: "#0ea5e9",
    accent2: "#0284c7",
  },
  {
    slug: "absensi-sekolah",
    index: "08",
    title: "Absensi Sekolah",
    category: "fullstack",
    status: "completed",
    year: "2026",
    descriptionKey: "absensiSekolah",
    features: [
      "responsive",
      "multiRole",
      "authentication",
      "crud",
      "database",
      "qrCode",
      "gpsTracking",
      "realTimeMonitoring",
      "darkMode",
    ],
    tech: [
      "Laravel 12",
      "PHP 8.2+",
      "React 19",
      "Inertia.js v2",
      "TypeScript",
      "Tailwind CSS v4",
      "shadcn/ui",
      "Lucide React",
      "MySQL",
      "Vite 6",
      "Ziggy",
    ],
    github: "https://github.com/lutfi-dika/Absensi-Sekolah-",
    demo: "#",
    preview: "dashboard",
    accent: "#3b82f6",
    accent2: "#2563eb",
  },
  ];

export const projectCategories: ("all" | ProjectCategory)[] = [
  "all",
  "frontend",
  "backend",
  "fullstack",
  "uiux",
];

export const projectStatuses: ("all" | ProjectStatus)[] = [
  "all",
  "completed",
  "in-progress",
  "archived",
];
