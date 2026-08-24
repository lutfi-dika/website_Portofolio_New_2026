"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Grid2x2, X } from "lucide-react";
import { mobileMoreItems, mobileNavItems } from "@/lib/navigation";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();
  const t = useT();
  const [moreOpen, setMoreOpen] = useState(false);

  // Close the sheet on navigation.
  useEffect(() => setMoreOpen(false), [pathname]);

  return (
    <>
      <AnimatePresence>
        {moreOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
              onClick={() => setMoreOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 z-50 rounded-t-2xl border-t border-border bg-card pb-[calc(env(safe-area-inset-bottom)+76px)] shadow-2xl lg:hidden"
              role="dialog"
              aria-label={t.common.more}
            >
              <div className="flex items-center justify-between px-4 pt-4">
                <p className="text-sm font-semibold">{t.common.more}</p>
                <button
                  onClick={() => setMoreOpen(false)}
                  className="rounded-lg p-1.5 text-muted hover:bg-white/[0.06] hover:text-foreground"
                  aria-label={t.common.close}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-4 gap-1 p-3">
                {mobileMoreItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex flex-col items-center gap-1.5 rounded-xl px-2 py-3 text-center text-[11px]",
                        pathname.startsWith(item.href)
                          ? "bg-accent-soft text-accent"
                          : "text-muted hover:bg-white/[0.05] hover:text-foreground",
                      )}
                    >
                      <Icon className="h-5 w-5" aria-hidden />
                      {t.nav[item.labelKey]}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <nav
        aria-label="Mobile navigation"
        className="fixed inset-x-0 bottom-0 z-40 flex h-[64px] items-stretch border-t border-border bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
      >
        {mobileNavItems.map((item) => {
          const active =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative flex flex-1 flex-col items-center justify-center gap-1 text-[10px]",
                active ? "text-accent" : "text-muted",
              )}
            >
              {active && (
                <motion.span
                  layoutId="mobile-active"
                  className="absolute top-0 h-0.5 w-8 rounded-full bg-accent"
                />
              )}
              <Icon className="h-5 w-5" aria-hidden />
              {t.nav[item.labelKey]}
            </Link>
          );
        })}
        <button
          onClick={() => setMoreOpen(true)}
          className="relative flex flex-1 flex-col items-center justify-center gap-1 text-[10px] text-muted"
          aria-expanded={moreOpen}
        >
          <Grid2x2 className="h-5 w-5" aria-hidden />
          {t.common.more}
        </button>
      </nav>
    </>
  );
}

export function useSheetRef() {
  return useRef<HTMLDivElement>(null);
}
