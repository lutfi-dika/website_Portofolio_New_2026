export interface AppNotification {
  id: string;
  /** translation key */
  titleKey: string;
  /** translation key */
  messageKey: string;
  date: string;
  read: boolean;
  type: "info" | "project" | "learning" | "welcome";
}

export const initialNotifications: AppNotification[] = [
  {
    id: "notif-welcome",
    titleKey: "notifWelcomeTitle",
    messageKey: "notifWelcomeMsg",
    date: "2026-08-24",
    read: false,
    type: "welcome",
  },
  {
    id: "notif-learning",
    titleKey: "notifLearningTitle",
    messageKey: "notifLearningMsg",
    date: "2026-08-20",
    read: false,
    type: "learning",
  },
  {
    id: "notif-portfolio",
    titleKey: "notifPortfolioTitle",
    messageKey: "notifPortfolioMsg",
    date: "2026-08-24",
    read: false,
    type: "project",
  },
  {
    id: "notif-project-added",
    titleKey: "notifProjectTitle",
    messageKey: "notifProjectMsg",
    date: "2026-07-12",
    read: true,
    type: "project",
  },
];
