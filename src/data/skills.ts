export type SkillCategory = "frontend" | "frameworks" | "backend" | "tools";

export interface Skill {
  name: string;
  icon: string;
  color: string;
  /** 0–100 self-assessed proficiency */
  level: number;
  /** how many portfolio projects use this technology */
  projectsUsed: number;
}

export interface SkillGroup {
  category: SkillCategory;
  skills: Skill[];
}

/**
 * Mirrors the stack on Lutfi's live portfolio (MY-PORTOFOLIO-NEW):
 * Frontend Mastery · Frameworks & Libraries · Backend & Systems · Tools & Platforms.
 * Level mapping — Advanced ≈ 80–90 · Intermediate ≈ 70–76 · being studied ≈ 35.
 * Next.js / MySQL / Vercel kept: factually used by the BSI projects listed here.
 */
export const skillGroups: SkillGroup[] = [
  {
    category: "frontend",
    skills: [
      { name: "HTML", icon: "html", color: "#e34f26", level: 88, projectsUsed: 9 },
      { name: "CSS", icon: "css", color: "#2965f1", level: 88, projectsUsed: 9 },
      { name: "JavaScript", icon: "javascript", color: "#f7df1e", level: 86, projectsUsed: 5 },
      { name: "React", icon: "react", color: "#61dafb", level: 86, projectsUsed: 7 },
      { name: "TypeScript", icon: "typescript", color: "#3178c6", level: 82, projectsUsed: 3 },
    ],
  },
  {
    category: "frameworks",
    skills: [
      { name: "Tailwind CSS", icon: "tailwind", color: "#38b2ac", level: 85, projectsUsed: 3 },
      { name: "Bootstrap", icon: "bootstrap", color: "#7952b3", level: 82, projectsUsed: 2 },
      { name: "Next.js", icon: "nextjs", color: "#e2e8f0", level: 80, projectsUsed: 1 },
      { name: "UIverse", icon: "uiverse", color: "#6366f1", level: 72, projectsUsed: 0 },
      { name: "AOS Animation", icon: "aos", color: "#22c55e", level: 72, projectsUsed: 3 },
      { name: "Flowbite", icon: "flowbite", color: "#0ea5e9", level: 70, projectsUsed: 0 },
      { name: "GeeksHelp", icon: "geekshelp", color: "#10b981", level: 70, projectsUsed: 0 },
    ],
  },
  {
    category: "backend",
    skills: [
      { name: "PHP", icon: "php", color: "#777bb4", level: 84, projectsUsed: 2 },
      { name: "MySQL", icon: "mysql", color: "#4479a1", level: 76, projectsUsed: 2 },
      { name: "phpMyAdmin", icon: "phpmyadmin", color: "#f39c12", level: 72, projectsUsed: 2 },
      /** being studied */
      { name: "Laravel", icon: "laravel", color: "#ff2d20", level: 35, projectsUsed: 1 },
    ],
  },
  {
    category: "tools",
    skills: [
      { name: "Git", icon: "git", color: "#f05032", level: 85, projectsUsed: 9 },
      { name: "GitHub", icon: "github-skill", color: "#24292f", level: 85, projectsUsed: 9 },
      { name: "VS Code", icon: "vscode", color: "#007acc", level: 84, projectsUsed: 0 },
      { name: "Vercel", icon: "vercel", color: "#e2e8f0", level: 78, projectsUsed: 1 },
    ],
  },
];
