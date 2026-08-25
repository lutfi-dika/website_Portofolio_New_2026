import {
  LayoutDashboard,
  User,
  Wrench,
  Briefcase,
  FolderKanban,
  Award,
  Trophy,
  Activity,
  MessageSquare,
  Settings,
  Mail,
  Inbox,
  Bookmark,
  Keyboard,
  FileText,
  type LucideIcon,
} from "lucide-react";
import { GithubBrandIcon } from "@/components/icons";

export interface NavItem {
  href: string;
  /** key inside t.nav */
  labelKey:
    | "dashboard"
    | "overview"
    | "about"
    | "skills"
    | "experience"
    | "resume"
    | "projects"
    | "certificates"
    | "achievements"
    | "github"
    | "activityPage"
    | "chat"
    | "notifications"
    | "settings"
    | "contact"
    | "inbox"
    | "saved"
    | "shortcuts";
  icon: LucideIcon;
}

export interface NavSection {
  /** key inside t.nav */
  titleKey: "main" | "profile" | "work" | "activity" | "system";
  items: NavItem[];
}

/**
 * Sidebar information architecture — personal developer workspace,
 * not an admin template. The dashboard home IS the overview.
 */
export const navSections: NavSection[] = [
  {
    titleKey: "main",
    items: [{ href: "/", labelKey: "dashboard", icon: LayoutDashboard }],
  },
  {
    titleKey: "profile",
    items: [
      { href: "/about", labelKey: "about", icon: User },
      { href: "/skills", labelKey: "skills", icon: Wrench },
      { href: "/experience", labelKey: "experience", icon: Briefcase },
      { href: "/resume", labelKey: "resume", icon: FileText },
    ],
  },
  {
    titleKey: "work",
    items: [
      { href: "/projects", labelKey: "projects", icon: FolderKanban },
      { href: "/certificates", labelKey: "certificates", icon: Award },
      { href: "/achievements", labelKey: "achievements", icon: Trophy },
    ],
  },
  {
    titleKey: "activity",
    items: [
      { href: "/github", labelKey: "github", icon: GithubBrandIcon },
      { href: "/activity", labelKey: "activityPage", icon: Activity },
      { href: "/chat", labelKey: "chat", icon: MessageSquare },
    ],
  },
  {
    titleKey: "system",
    items: [
      { href: "/settings", labelKey: "settings", icon: Settings },
      { href: "/contact", labelKey: "contact", icon: Mail },
    ],
  },
];

/** Utility pages reachable via command palette & contextual links only. */
export const extraRoutes: NavItem[] = [
  { href: "/overview", labelKey: "overview", icon: LayoutDashboard },
  { href: "/inbox", labelKey: "inbox", icon: Inbox },
  { href: "/saved", labelKey: "saved", icon: Bookmark },
  { href: "/shortcuts", labelKey: "shortcuts", icon: Keyboard },
];

/** Flat list used by command palette / search / breadcrumbs. */
export const allNavItems: NavItem[] = [
  ...navSections.flatMap((s) => s.items),
  ...extraRoutes,
];

export const mobileNavItems = [
  { href: "/", labelKey: "dashboard" as const, icon: LayoutDashboard },
  { href: "/projects", labelKey: "projects" as const, icon: FolderKanban },
  { href: "/chat", labelKey: "chat" as const, icon: MessageSquare },
  { href: "/activity", labelKey: "activityPage" as const, icon: Activity },
];

export const mobileMoreItems: NavItem[] = [
  { href: "/about", labelKey: "about", icon: User },
  { href: "/skills", labelKey: "skills", icon: Wrench },
  { href: "/experience", labelKey: "experience", icon: Briefcase },
  { href: "/resume", labelKey: "resume", icon: FileText },
  { href: "/certificates", labelKey: "certificates", icon: Award },
  { href: "/github", labelKey: "github", icon: GithubBrandIcon },
  { href: "/settings", labelKey: "settings", icon: Settings },
  { href: "/contact", labelKey: "contact", icon: Mail },
  { href: "/inbox", labelKey: "inbox", icon: Inbox },
  { href: "/saved", labelKey: "saved", icon: Bookmark },
];
