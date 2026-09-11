export type SkillCategory =
  | "frontend"
  | "frameworks"
  | "backend"
  | "mobile"
  | "tools";

export type SkillLevel =
  | "comfortable"
  | "learning"
  | "exploring";

export interface Skill {
  name: string;
  icon: string;
  color: string;
  level: SkillLevel;
}

export interface SkillGroup {
  category: SkillCategory;
  skills: Skill[];
}

/**
 * Skills organized by category.
 *
 * Levels:
 *   comfortable — used in real projects, confident with the basics
 *   learning    — currently studying, have some hands-on experience
 *   exploring   — just getting started, know the fundamentals
 */

export const skillGroups: SkillGroup[] = [
  // ==========================================
  // FRONTEND
  // ==========================================
  {
    category: "frontend",
    skills: [
      {
        name: "HTML",
        icon: "html",
        color: "#E34F26",
        level: "comfortable",
      },
      {
        name: "CSS",
        icon: "css",
        color: "#2965F1",
        level: "comfortable",
      },
      {
        name: "JavaScript",
        icon: "javascript",
        color: "#F7DF1E",
        level: "comfortable",
      },
      {
        name: "React",
        icon: "react",
        color: "#61DAFB",
        level: "comfortable",
      },
      {
        name: "TypeScript",
        icon: "typescript",
        color: "#3178C6",
        level: "comfortable",
      },
    ],
  },

  // ==========================================
  // FRAMEWORKS
  // ==========================================
  {
    category: "frameworks",
    skills: [
      {
        name: "Tailwind CSS",
        icon: "tailwind",
        color: "#38B2AC",
        level: "comfortable",
      },
      {
        name: "Bootstrap",
        icon: "bootstrap",
        color: "#7952B3",
        level: "comfortable",
      },
      {
        name: "Next.js",
        icon: "nextjs",
        color: "#000000",
        level: "comfortable",
      },
      {
        name: "UIverse",
        icon: "uiverse",
        color: "#6366F1",
        level: "exploring",
      },
      {
        name: "AOS Animation",
        icon: "aos",
        color: "#22C55E",
        level: "exploring",
      },
      {
        name: "Flowbite",
        icon: "flowbite",
        color: "#0EA5E9",
        level: "exploring",
      },
    ],
  },

  // ==========================================
  // BACKEND
  // ==========================================
  {
    category: "backend",
    skills: [
      {
        name: "PHP",
        icon: "php",
        color: "#777BB4",
        level: "comfortable",
      },
      {
        name: "MySQL",
        icon: "mysql",
        color: "#4479A1",
        level: "comfortable",
      },
      {
        name: "phpMyAdmin",
        icon: "phpmyadmin",
        color: "#F39C12",
        level: "exploring",
      },
      {
        name: "Laravel",
        icon: "laravel",
        color: "#FF2D20",
        level: "learning",
      },
    ],
  },

  // ==========================================
  // MOBILE
  // ==========================================
  {
    category: "mobile",
    skills: [
      {
        name: "Flutter",
        icon: "flutter",
        color: "#02569B",
        level: "learning",
      },
      {
        name: "Dart",
        icon: "dart",
        color: "#0175C2",
        level: "learning",
      },
    ],
  },

  // ==========================================
  // TOOLS
  // ==========================================
  {
    category: "tools",
    skills: [
      {
        name: "Git",
        icon: "git",
        color: "#F05032",
        level: "comfortable",
      },
      {
        name: "GitHub",
        icon: "github",
        color: "#24292F",
        level: "comfortable",
      },
      {
        name: "VS Code",
        icon: "vscode",
        color: "#007ACC",
        level: "comfortable",
      },
      {
        name: "Vercel",
        icon: "vercel",
        color: "#000000",
        level: "comfortable",
      },
    ],
  },
];
