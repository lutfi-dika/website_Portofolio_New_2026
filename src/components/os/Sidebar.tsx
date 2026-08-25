"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronsLeft } from "lucide-react";

import { navSections } from "@/lib/navigation";
import { profile } from "@/data/profile";
import { useT } from "@/lib/i18n";
import { useSettings } from "@/lib/settings";
import { cn } from "@/lib/utils";

export const SIDEBAR_W = 260;
export const SIDEBAR_W_COLLAPSED = 72;

export function Sidebar() {
  const pathname = usePathname();
  const t = useT();
  const { sidebarCollapsed, setSidebarCollapsed } = useSettings();

  const collapsed = sidebarCollapsed;

  return (
    <motion.aside
      initial={false}
      animate={{
        width: collapsed ? SIDEBAR_W_COLLAPSED : SIDEBAR_W,
      }}
      transition={{
        duration: 0.28,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="fixed inset-y-0 left-0 z-40 hidden h-svh flex-col border-r border-border bg-surface lg:flex"
      aria-label="Main navigation"
    >
      {/* =========================
          BRAND / LOGO
      ========================== */}
      <div className="flex h-16 shrink-0 items-center border-b border-border px-5">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3"
          aria-label="Lutfi Andika Home"
        >
          {/* LOGO */}
          <span className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-card">
            <Image
              src="/logo.jpeg"
              alt="Lutfi Andika Logo"
              width={32}
              height={32}
              priority
              className="h-full w-full object-cover"
            />
          </span>

          {/* BRAND NAME */}
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="min-w-0"
            >
              <span className="block truncate font-display text-sm font-bold tracking-tight text-foreground">
                LUTFI<span className="text-accent">.DEV</span>
              </span>
              <span className="block truncate text-[10px] leading-tight text-faint">
                {t.brand.tagline}
              </span>
            </motion.span>
          )}
        </Link>
      </div>

      {/* =========================
          NAVIGATION
      ========================== */}
      <nav className="sidebar-scroll flex-1 overflow-y-auto overflow-x-hidden px-3 py-4">
        {navSections.map((section) => (
          <div key={section.titleKey} className="mb-5 last:mb-0">
            {/* SECTION TITLE */}
            {!collapsed && (
              <p className="mb-2 px-2.5 section-label">
                {t.nav[section.titleKey]}
              </p>
            )}

            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                const Icon = item.icon;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      title={collapsed ? t.nav[item.labelKey] : undefined}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-lg border px-2.5 py-2 text-sm transition-all",

                        collapsed && "justify-center border-transparent px-0",

                        active
                          ? "border-accent/20 bg-accent-soft font-medium text-foreground"
                          : "border-transparent text-muted hover:bg-white/[0.04] hover:text-foreground",
                      )}
                    >
                      {/* ACTIVE INDICATOR */}
                      {active && (
                        <motion.span
                          layoutId="sidebar-active"
                          className="absolute inset-y-1.5 -left-px w-[2px] rounded-full bg-accent"
                          transition={{
                            duration: 0.25,
                          }}
                        />
                      )}

                      {/* ICON */}
                      <Icon
                        className={cn(
                          "h-[18px] w-[18px] shrink-0 transition-colors",

                          active
                            ? "text-accent"
                            : "text-faint group-hover:text-muted",
                        )}
                        aria-hidden
                      />

                      {/* MENU TEXT */}
                      {!collapsed && (
                        <span className="truncate">{t.nav[item.labelKey]}</span>
                      )}

                      {/* TOOLTIP */}
                      {collapsed && (
                        <span className="pointer-events-none absolute left-full z-50 ml-3 whitespace-nowrap rounded-md border border-border bg-card px-2.5 py-1.5 text-xs text-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                          {t.nav[item.labelKey]}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* =========================
          PROFILE FOOTER
      ========================== */}
      <div className="shrink-0 border-t border-border p-3">
        <Link
          href="/about"
          className={cn(
            "group flex items-center gap-3 rounded-lg p-1.5 transition-colors hover:bg-white/[0.04]",

            collapsed && "justify-center",
          )}
        >
          {/* PROFILE AVATAR */}
          <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15 font-display text-xs font-bold text-accent ring-1 ring-accent/30">
            ML
            <span
              className="absolute -bottom-0 -right-0 h-2.5 w-2.5 rounded-full border-2 border-surface bg-emerald-400"
              aria-label={t.dashboard.availableForProjects}
            />
          </span>

          {/* PROFILE INFO */}
          {!collapsed && (
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium leading-tight">
                {profile.shortName}
              </span>
              <span className="mt-0.5 flex items-center gap-1.5 text-[11px] leading-tight text-muted">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                  aria-hidden
                />
                {profile.availableFor}
              </span>
            </span>
          )}
        </Link>

        {/* COLLAPSE BUTTON */}
        <button
          onClick={() => setSidebarCollapsed(!collapsed)}
          className={cn(
            "mt-1 flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-muted transition-colors hover:bg-white/[0.04] hover:text-foreground",

            collapsed && "justify-center px-0",
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronsLeft
            className={cn(
              "h-[18px] w-[18px] transition-transform duration-300",

              collapsed && "rotate-180",
            )}
            aria-hidden
          />

          {!collapsed && <span className="text-[10px] text-faint">Ctrl+B</span>}
        </button>
      </div>
    </motion.aside>
  );
}
