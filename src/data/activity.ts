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
  type: ActivityType;
}

export const activities: ActivityItem[] = [
  {
    id: "act-lutfi-dev",
    titleKey: "actPortfolioUpdated",
    descriptionKey: "actPortfolioUpdatedDesc",
    type: "portfolio",
  },
  {
    id: "act-bsi-dashboard",
    titleKey: "actBsiDashboard",
    descriptionKey: "actBsiDashboardDesc",
    type: "project",
  },
  {
    id: "act-company-profile-bsi-kcp-bekasi-tambun1",
    titleKey: "actBsiCompanyProfile",
    descriptionKey: "actCompanyProfileDesc",
    type: "project",
  },
  {
    id: "act-learning-next",
    titleKey: "actLearningNext",
    descriptionKey: "actLearningNextDesc",
    type: "learning",
  },
  {
    id: "act-learning-Laravel",
    titleKey: "actLearningLaravel",
    descriptionKey: "actLearningLaravelDesc",
    type: "learning",
  },
  {
    id: "act-learning-cybersecurity",
    titleKey: "actLearningCyberSecurity",
    descriptionKey: "actLearningCyberSecurityDesc", // <-- typo diperbaiki
    type: "learning",
  },
  {
    id: "act-new-project",
    titleKey: "actNewProject",
    descriptionKey: "actNewProjectDesc",
    type: "project",
  },
  {
    id: "act-github",
    titleKey: "actGithubUpdated",
    descriptionKey: "actGithubUpdatedDesc",
    type: "github",
  },
];