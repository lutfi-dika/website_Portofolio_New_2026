"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Sidebar, SIDEBAR_W, SIDEBAR_W_COLLAPSED } from "@/components/os/Sidebar";
import { Topbar } from "@/components/os/Topbar";
import { MobileNav } from "@/components/os/MobileNav";
import { CommandPalette } from "@/components/os/CommandPalette";
import { Onboarding } from "@/components/os/Onboarding";
import { AIChatFloating } from "@/components/os/AIChatFloating";
import { BackgroundFX, MouseGlow } from "@/components/os/BackgroundFX";
import { CustomCursor } from "@/components/os/CustomCursor";
import { ScrollProgress } from "@/components/os/ScrollProgress";
import { BackToTop } from "@/components/os/BackToTop";
import { KonamiEasterEgg } from "@/components/os/KonamiEasterEgg";
import { useSettings } from "@/lib/settings";
import { useI18n } from "@/lib/i18n";

/**
 * Developer OS shell: sidebar + topbar + global shortcuts +
 * command palette + floating AI assistant.
 */
export function OsShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const { sidebarCollapsed, setSidebarCollapsed, toggleTheme, cycleAccent } = useSettings();
  const { toggleLocale } = useI18n();

  /* ── Global keyboard shortcuts ─────────────────────────────── */
  useEffect(() => {
    let gPending = false;
    let gTimer: ReturnType<typeof setTimeout>;

    const go = (path: string) => {
      if (window.location.pathname !== path) router.push(path);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const typing =
        target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;

      // Ctrl/Cmd + K → command palette
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
        return;
      }
      // Ctrl/Cmd + B → toggle sidebar
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        setSidebarCollapsed((v) => !v);
        return;
      }
      if (typing) return;

      // Single-key shortcuts must not fire while a modal/dialog is open.
      if (document.querySelector('[role="dialog"]')) return;

      // G + key sequence navigation
      if (gPending) {
        clearTimeout(gTimer);
        gPending = false;
        const key = e.key.toLowerCase();
        if (key === "d") go("/");
        else if (key === "p") go("/projects");
        else if (key === "s") go("/skills");
        else if (key === "c") go("/contact");
        return;
      }
      if (e.key.toLowerCase() === "g" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        gPending = true;
        gTimer = setTimeout(() => (gPending = false), 900);
        return;
      }

      // T → theme, L → language, A → accent
      if (!e.ctrlKey && !e.metaKey && !e.altKey) {
        const key = e.key.toLowerCase();
        if (key === "t") toggleTheme();
        else if (key === "l") toggleLocale();
        else if (key === "a") cycleAccent();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      clearTimeout(gTimer);
    };
  }, [router, setSidebarCollapsed, toggleTheme, toggleLocale, cycleAccent]);

  return (
    <div className="min-h-svh">
      <ScrollProgress />
      <BackgroundFX />
      <MouseGlow />
      <CustomCursor />
      <Sidebar />

      {/* Content column follows the animated sidebar width */}
      <motion.div
        initial={false}
        animate={{ paddingLeft: sidebarCollapsed ? SIDEBAR_W_COLLAPSED : SIDEBAR_W }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="flex min-h-svh flex-col max-lg:!pl-0"
      >
        <Topbar onOpenSearch={() => setPaletteOpen(true)} />
        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-[1600px] flex-1 px-4 pb-24 pt-6 sm:px-6 lg:px-8 lg:pb-12"
          >
            {children}
          </motion.main>
        </AnimatePresence>

        <footer className="border-t border-border px-6 py-5 pb-24 lg:pb-5">
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="font-display text-sm font-bold tracking-tight text-foreground">
              LUTFI<span className="text-accent">.DEV</span>
            </p>
            <p className="text-xs text-muted">Muhammad Lutfi Andika · Frontend Developer</p>
            <div className="flex gap-4 text-xs text-faint">
              {[
                { label: "GitHub", href: "https://github.com/lutfi-dika" },
                { label: "Instagram", href: "https://instagram.com/lutfiandika" },
                { label: "LinkedIn", href: "https://linkedin.com/in/lutfiandika" },
                { label: "WhatsApp", href: "https://wa.me/6281234567890" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-accent"
                >
                  {s.label}
                </a>
              ))}
            </div>
            <p className="font-mono text-[10px] text-faint">
              © {new Date().getFullYear()} Muhammad Lutfi Andika
            </p>
          </div>
        </footer>
      </motion.div>

      <MobileNav />
      <BackToTop />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <Onboarding />
      <AIChatFloating />
      <KonamiEasterEgg />
    </div>
  );
}
