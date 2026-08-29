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
    tech: ["React.JS", "Tailwind.css", "Google Maps", "Framer Motion", "PWA", "Open Graph", "React Router", "Prioty Hints", "Vercel", "SEO"],
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
    tech: ["React", "Laravel", "MySQL", "Tailwind CSS"],
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
    tech: ["React", "Tailwind CSS", "JavaScript"],
    github: "https://github.com/lutfi-dika",
    demo: "https://undangan-pernikahan-zulfian-irya.vercel.app/",
    preview: "landing",
    accent: "#f472b6",
    accent2: "#fb7185",
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
