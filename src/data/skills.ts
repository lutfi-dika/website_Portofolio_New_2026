export type SkillCategory = "frontend" | "frameworks" | "backend" | "tools";
export type SkillLevel = "comfortable" | "learning" | "exploring";

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
 * Levels:
 *   comfortable — used in real projects, confident with the basics
 *   learning    — currently studying, have some hands-on experience
 *   exploring   — just getting started, know the fundamentals
 */
export const skillGroups: SkillGroup[] = [
  {
    category: "frontend",
    skills: [
      { name: "HTML", icon: "html", color: "#e34f26", level: "comfortable" },
      { name: "CSS", icon: "css", color: "#2965f1", level: "comfortable" },
      { name: "JavaScript", icon: "javascript", color: "#f7df1e", level: "comfortable" },
      { name: "React", icon: "react", color: "#61dafb", level: "comfortable" },
      { name: "TypeScript", icon: "typescript", color: "#3178c6", level: "comfortable" },
    ],
  },
  {
    category: "frameworks",
    skills: [
      { name: "Tailwind CSS", icon: "tailwind", color: "#38b2ac", level: "comfortable" },
      { name: "Bootstrap", icon: "bootstrap", color: "#7952b3", level: "comfortable" },
      { name: "Next.js", icon: "nextjs", color: "#e2e8f0", level: "comfortable" },
      { name: "UIverse", icon: "uiverse", color: "#6366f1", level: "exploring" },
      { name: "AOS Animation", icon: "aos", color: "#22c55e", level: "exploring" },
      { name: "Flowbite", icon: "flowbite", color: "#0ea5e9", level: "exploring" },
    ],
  },
  {
    category: "backend",
    skills: [
      { name: "PHP", icon: "php", color: "#777bb4", level: "comfortable" },
      { name: "MySQL", icon: "mysql", color: "#4479a1", level: "comfortable" },
      { name: "phpMyAdmin", icon: "phpmyadmin", color: "#f39c12", level: "exploring" },
      { name: "Laravel", icon: "laravel", color: "#ff2d20", level: "learning" },
    ],
  },
  {
    category: "tools",
    skills: [
      { name: "Git", icon: "git", color: "#f05032", level: "comfortable" },
      { name: "GitHub", icon: "github-skill", color: "#24292f", level: "comfortable" },
      { name: "VS Code", icon: "vscode", color: "#007acc", level: "comfortable" },
      { name: "Vercel", icon: "vercel", color: "#e2e8f0", level: "comfortable" },
    ],
  },
];
