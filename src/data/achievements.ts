export interface Achievement {
  id: string;
  /** translation key */
  titleKey: string;
  /** translation key */
  descriptionKey: string;
  year: string;
  type: "project" | "milestone" | "experience" | "competition";
  icon: "rocket" | "building" | "sparkles" | "graduation" | "trophy";
}

/**
 * ACHIEVEMENTS — only real, verifiable milestones from Lutfi's journey.
 * Competition results sourced from his live portfolio & certificates.
 */
export const achievements: Achievement[] = [
  {
    id: "itechno-cup",
    titleKey: "itechnoCupTitle",
    descriptionKey: "itechnoCupDesc",
    year: "2025",
    type: "competition",
    icon: "trophy",
  },
  {
    id: "icom-feast",
    titleKey: "icomFeastTitle",
    descriptionKey: "icomFeastDesc",
    year: "2026",
    type: "competition",
    icon: "trophy",
  },
  {
    id: "lks",
    titleKey: "lksTitle",
    descriptionKey: "lksDesc",
    year: "2026",
    type: "competition",
    icon: "trophy",
  },
  {
    id: "pkl-bsi",
    titleKey: "pklBsiTitle",
    descriptionKey: "pklBsiDesc",
    year: "2026",
    type: "experience",
    icon: "building",
  },
  {
    id: "four-projects",
    titleKey: "fourProjectsTitle",
    descriptionKey: "fourProjectsDesc",
    year: "2025 — 2026",
    type: "project",
    icon: "rocket",
  },
  {
    id: "lutfi-dev",
    titleKey: "lutfiDevTitle",
    descriptionKey: "lutfiDevDesc",
    year: "2026",
    type: "milestone",
    icon: "sparkles",
  },
  {
    id: "web-journey",
    titleKey: "webJourneyTitle",
    descriptionKey: "webJourneyDesc",
    year: "2024",
    type: "milestone",
    icon: "graduation",
  },
];
