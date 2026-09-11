export type ActivityType =
  | "project"
  | "learning"
  | "github"
  | "portfolio"
  | "milestone";

export interface ActivityItem {
  id: string;
  date: string;
  /** translation key */
  titleKey: string;
  /** translation key (optional detail line) */
  descriptionKey?: string;
  type: ActivityType;
}

export const activities: ActivityItem[] = [
  {
    id: "act-lutfi-dev",
    date: "2026-08-24",
    titleKey: "actPortfolioUpdated",
    descriptionKey: "actPortfolioUpdatedDesc",
    type: "portfolio",
  },
  {
    id: "act-bsi-dashboard",
    date: "2026-07-12",
    titleKey: "actBsiDashboard",
    descriptionKey: "actBsiDashboardDesc",
    type: "project",
  },
  {
    id: "act-company-profile-bsi-kcp-bekasi-tambun1",
    date: "2026-06-28",
    titleKey: "actBsiCompanyProfile",
    descriptionKey: "actCompanyProfileDesc",
    type: "project",
  },
  {
    id: "act-learning-next",
    date: "2026-06-15",
    titleKey: "actLearningNext",
    descriptionKey: "actLearningNextDesc",
    type: "learning",
  },
  {
    id: "act-learning-Laravel",
    date: "2026-05-30",
    titleKey: "actLearningLaravel",
    descriptionKey: "actLearningLaravelDesc",
    type: "learning",
  },
  {
    id: "act-learning-cybersecurity",
    date: "2026-05-12",
    titleKey: "actLearningCyberSecurity",
    descriptionKey: "actLearningCyberSecurityDesc", // <-- typo diperbaiki
    type: "learning",
  },
  {
    id: "act-new-project",
    date: "2026-04-20",
    titleKey: "actNewProject",
    descriptionKey: "actNewProjectDesc",
    type: "project",
  },
  {
    id: "act-github",
    date: "2026-04-05",
    titleKey: "actGithubUpdated",
    descriptionKey: "actGithubUpdatedDesc",
    type: "github",
  },
];