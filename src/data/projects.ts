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
    tech: ["Next.js", "React", "Tailwind CSS", "JavaScript"],
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
    slug: "educare",
    index: "03",
    title: "EduCare",
    category: "fullstack",
    status: "completed",
    year: "2025",
    descriptionKey: "educare",
    features: ["auth", "materials", "quiz", "video"],
    tech: ["PHP", "MySQL", "JavaScript", "HTML", "CSS"],
    github: "https://github.com/lutfi-dika",
    demo: "#",
    preview: "learning",
    accent: "#34d399",
    accent2: "#22d3ee",
  },
  {
    slug: "smk-telesandi",
    index: "04",
    title: "SMK Telekomunikasi Telesandi",
    category: "frontend",
    status: "completed",
    year: "2025",
    descriptionKey: "smkTelesandi",
    features: ["responsive", "animation", "cleanUi"],
    tech: ["React", "CSS", "AOS Animation"],
    github: "https://github.com/lutfi-dika/SMK-TELEKOMUNIKASI-TELESANDI-BEKASI",
    demo: "https://lutfi-dika.github.io/SMK-TELEKOMUNIKASI-TELESANDI-BEKASI/",
    preview: "landing",
    accent: "#60a5fa",
    accent2: "#3b82f6",
  },
  {
    slug: "d-dishop",
    index: "05",
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
    slug: "cakralogy",
    index: "06",
    title: "CakraLogy",
    category: "frontend",
    status: "completed",
    year: "2025",
    descriptionKey: "cakralogy",
    features: ["animation", "interactiveUi", "responsive"],
    tech: ["React", "CSS", "AOS Animation"],
    github: "https://github.com/lutfi-dika/cakralogy",
    demo: "https://lutfi-dika.github.io/cakralogy/",
    preview: "landing",
    accent: "#34d399",
    accent2: "#10b981",
  },
  {
    slug: "webkraf-digital-studio",
    index: "07",
    title: "Webkraf",
    category: "frontend",
    status: "completed",
    year: "2025",
    descriptionKey: "webkraf",
    features: ["animation", "scrollMotion", "interactiveUi", "responsive"],
    tech: ["React", "CSS", "AOS Animation"],
    github: "https://github.com/lutfi-dika/Website-Kreatif",
    demo: "https://lutfi-dika.github.io/Website-Kreatif/",
    preview: "studio",
    accent: "#fb923c",
    accent2: "#f472b6",
  },
  {
    slug: "portofolio-v1",
    index: "08",
    title: "Portofolio Website v1",
    category: "frontend",
    status: "completed",
    year: "2025",
    descriptionKey: "portofolioV1",
    features: ["responsive", "cleanUi"],
    tech: ["React", "CSS"],
    github: "https://github.com/lutfi-dika",
    demo: "https://website-portofolio-andika.netlify.app/",
    preview: "landing",
    accent: "#a78bfa",
    accent2: "#8b5cf6",
  },
  {
    slug: "legacy-portfolio",
    index: "09",
    title: "My Legacy Portfolio",
    category: "frontend",
    status: "archived",
    year: "2025",
    descriptionKey: "legacyPortfolio",
    features: ["responsive", "cleanUi"],
    tech: ["React", "CSS"],
    github: "https://github.com/lutfi-dika/MY-Portofolio",
    demo: "https://lutfi-dika.github.io/MY-Portofolio/",
    preview: "landing",
    accent: "#94a3b8",
    accent2: "#64748b",
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
