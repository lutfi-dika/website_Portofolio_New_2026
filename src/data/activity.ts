export type ActivityType =
  | "project"
  | "learning"
  | "github"
  | "portfolio"
  | "milestone";

export interface ActivityItem {
  id: string;
  /** translation key */
  titleKey: string;
  /** translation key (optional detail line) */
  descriptionKey?: string;
  date: string; // ISO-ish display date
  type: ActivityType;
}

export const activities: ActivityItem[] = [
  {
    id: "act-lutfi-dev",
    titleKey: "actPortfolioUpdated",
    descriptionKey: "actPortfolioUpdatedDesc",
    date: "2026-08-24",
    type: "portfolio",
  },
  {
    id: "act-bsi-dashboard",
    titleKey: "actBsiDashboard",
    descriptionKey: "actBsiDashboardDesc",
    date: "2026-08",
    type: "project",
  },
  {
    id: "act-learning-next",
    titleKey: "actLearningNext",
    descriptionKey: "actLearningNextDesc",
    date: "2026-08",
    type: "learning",
  },
  {
    id: "act-new-project",
    titleKey: "actNewProject",
    descriptionKey: "actNewProjectDesc",
    date: "2026-07",
    type: "project",
  },
  {
    id: "act-github",
    titleKey: "actGithubUpdated",
    descriptionKey: "actGithubUpdatedDesc",
    date: "2026-07",
    type: "github",
  },
];
