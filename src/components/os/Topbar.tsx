"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  Check,
  ChevronRight,
  Globe,
  Menu,
  Search,
  Settings,
  SunMoon,
  Trash2,
  User,
} from "lucide-react";
import { allNavItems } from "@/lib/navigation";
import { useT, useI18n, interpolate } from "@/lib/i18n";
import { useSettings } from "@/lib/settings";
import { useNotifications } from "@/lib/store";
import { cn, formatDate } from "@/lib/utils";

export function Topbar({ onOpenSearch }: { onOpenSearch: () => void }) {
  const pathname = usePathname();
  const t = useT();
  const { locale } = useI18n();

  const crumbs = buildCrumbs(pathname, t);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/60 px-4 backdrop-blur-xl lg:px-6">
      {/* Mobile menu handled by MobileHeader; breadcrumb here */}
      <nav aria-label="Breadcrumb" className="min-w-0 flex-1 overflow-hidden">
        <ol className="flex items-center gap-1.5 text-sm">
          <li>
            <Link href="/" className="text-muted transition-colors hover:text-foreground">
              {t.nav.dashboard}
            </Link>
          </li>
          {crumbs.map((c) => (
            <li key={c.href} className="flex min-w-0 items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-faint" aria-hidden />
              <span
                className={cn(
                  "truncate",
                  c.isLast ? "font-medium text-foreground" : "text-muted",
                )}
                aria-current={c.isLast ? "page" : undefined}
              >
                {c.label}
              </span>
            </li>
          ))}
        </ol>
      </nav>

      {/* Global search trigger */}
      <button
        onClick={onOpenSearch}
        className="hidden h-8 w-56 items-center gap-2 rounded-lg border border-border bg-input-bg px-3 text-sm text-muted transition-colors hover:border-border-strong hover:text-foreground md:flex xl:w-72"
        aria-label={t.topbar.search}
      >
        <Search className="h-3.5 w-3.5 shrink-0" aria-hidden />
        <span className="flex-1 truncate text-left text-xs">{t.topbar.searchPlaceholder}</span>
        <kbd className="rounded border border-border px-1 font-mono text-[10px] text-faint">
          Ctrl K
        </kbd>
      </button>

      <button
        onClick={onOpenSearch}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:text-foreground md:hidden"
        aria-label={t.topbar.search}
      >
        <Search className="h-3.5 w-3.5" aria-hidden />
      </button>

      <div className="hidden items-center gap-0.5 sm:flex">
        <LanguageButton />
        <ThemeButton />
      </div>
      <NotificationButton />

      {/* Profile */}
      <Link
        href="/about"
        aria-label={t.topbar.profile}
        className="flex h-8 items-center gap-2 rounded-full border border-border pl-1 pr-2 transition-colors hover:border-border-strong"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-[10px] font-bold text-accent">
          ML
        </span>
        <span className="hidden text-xs font-medium lg:block">Lutfi</span>
      </Link>

      {/* keep locale referenced for i18n lint clarity */}
      <span className="sr-only">{locale}</span>
    </header>
  );
}

function IconBtn({
  label,
  onClick,
  children,
  badge,
}: {
  label: string;
  onClick?: () => void;
  children: React.ReactNode;
  badge?: number;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className="relative flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-white/[0.05] hover:text-foreground"
    >
      {children}
      {!!badge && badge > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-accent px-1 text-[8px] font-bold text-background">
          {badge > 9 ? "9+" : badge}
        </span>
      )}
    </button>
  );
}

function LanguageButton() {
  const { locale, toggleLocale } = useI18n();
  const t = useT();
  return (
    <IconBtn label={t.topbar.language} onClick={toggleLocale}>
      <span className="flex items-center gap-1 text-[10px] font-semibold uppercase">
        <Globe className="h-3.5 w-3.5" aria-hidden />
        {locale === "id" ? "ID" : "EN"}
      </span>
    </IconBtn>
  );
}

function ThemeButton() {
  const { theme, toggleTheme } = useSettings();
  const t = useT();
  return (
    <IconBtn
      label={`${t.topbar.theme}: ${
        theme === "dark" ? t.themeNames.dark : theme === "light" ? t.themeNames.light : t.themeNames.system
      }`}
      onClick={toggleTheme}
    >
      <SunMoon className="h-3.5 w-3.5" aria-hidden />
    </IconBtn>
  );
}

function NotificationButton() {
  const t = useT();
  const { locale } = useI18n();
  const { notifications, unreadCount, markAllRead, markRead, clearAll } = useNotifications();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={ref} className="relative">
      <IconBtn label={t.topbar.notifications} onClick={() => setOpen((v) => !v)} badge={unreadCount}>
        <Bell className="h-3.5 w-3.5" aria-hidden />
      </IconBtn>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-x-3 top-14 z-50 max-h-[70svh] overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/40 sm:absolute sm:inset-x-auto sm:right-0 sm:top-10 sm:w-80"
            role="dialog"
            aria-label={t.notifications.title}
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <p className="text-sm font-semibold">
                {t.notifications.title}
                {unreadCount > 0 && (
                  <span className="ml-2 text-xs font-normal text-accent">
                    {interpolate(t.notifications.unreadCount, { count: unreadCount })}
                  </span>
                )}
              </p>
              <div className="flex gap-1">
                <button
                  onClick={markAllRead}
                  className="rounded-md p-1.5 text-muted hover:bg-white/[0.06] hover:text-foreground"
                  title={t.notifications.markAllRead}
                  aria-label={t.notifications.markAllRead}
                >
                  <Check className="h-4 w-4" />
                </button>
                <button
                  onClick={clearAll}
                  className="rounded-md p-1.5 text-muted hover:bg-white/[0.06] hover:text-foreground"
                  title={t.notifications.clearAll}
                  aria-label={t.notifications.clearAll}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="max-h-[52vh] overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-muted">{t.notifications.empty}</p>
              ) : (
                notifications.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => markRead(n.id)}
                    className={cn(
                      "flex w-full items-start gap-3 border-b border-border px-4 py-3 text-left last:border-0 transition-colors hover:bg-white/[0.04]",
                      !n.read && "bg-accent/[0.04]",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                        n.read ? "bg-transparent ring-1 ring-border-strong" : "bg-accent",
                      )}
                      aria-hidden
                    />
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium">
                        {t.notifications.items[n.titleKey as keyof typeof t.notifications.items]}
                      </span>
                      <span className="mt-0.5 block line-clamp-2 text-xs leading-relaxed text-muted">
                        {t.notifications.items[n.messageKey as keyof typeof t.notifications.items]}
                      </span>
                      <span className="mt-1 block text-[10px] text-faint">{formatDate(n.date, locale)}</span>
                    </span>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Breadcrumb segments resolved from the route map (skips dynamic slugs). */
function buildCrumbs(pathname: string, t: ReturnType<typeof useT>) {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return [];
  const crumbs: { href: string; label: string; isLast: boolean }[] = [];
  let acc = "";
  segments.forEach((seg, i) => {
    acc += `/${seg}`;
    const found = allNavItems.find((it) => it.href === acc);
    crumbs.push({
      href: acc,
      label: found
        ? t.nav[found.labelKey]
        : seg === "shortcuts"
          ? t.nav.shortcuts
          : decodeURIComponent(seg),
      isLast: i === segments.length - 1,
    });
  });
  return crumbs;
}

/* Re-exported for the mobile header */
export { Menu as MenuIcon, Settings as SettingsIcon, User as UserIcon };
