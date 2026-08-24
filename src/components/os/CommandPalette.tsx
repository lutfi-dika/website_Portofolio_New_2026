"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CornerDownLeft,
  Download,
  FileText,
  Globe,
  Moon,
  Palette,
  Search,
} from "lucide-react";
import { allNavItems } from "@/lib/navigation";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { useT, useI18n } from "@/lib/i18n";
import { useSettings } from "@/lib/settings";
import { useToast } from "@/lib/toast";
import { cn } from "@/lib/utils";

type PaletteItem = {
  id: string;
  group: string;
  label: string;
  hint?: string;
  icon: React.ReactNode;
  run: () => void;
};

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const t = useT();
  const { locale, toggleLocale } = useI18n();
  const { toggleTheme, setAccent } = useSettings();

  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
    }
  }, [open]);

  const items = useMemo<PaletteItem[]>(() => {
    const go = (href: string) => () => {
      router.push(href);
      onClose();
    };

    const pageItems: PaletteItem[] = [
      ...allNavItems.map((item) => ({
        id: `page-${item.href}`,
        group: t.command.pages,
        label: t.nav[item.labelKey],
        hint:
          item.href === "/"
            ? "/"
            : item.href,
        icon: <item.icon className="h-4 w-4" aria-hidden />,
        run: go(item.href),
      })),
      {
        id: "page-shortcuts",
        group: t.command.pages,
        label: t.nav.shortcuts,
        hint: "/shortcuts",
        icon: <FileText className="h-4 w-4" aria-hidden />,
        run: go("/shortcuts"),
      },
    ];

    const projectItems: PaletteItem[] = projects.map((p) => ({
      id: `project-${p.slug}`,
      group: t.nav.projects,
      label: p.title,
      hint: t.projects.categories[p.category],
      icon: (
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: p.accent }}
          aria-hidden
        />
      ),
      run: go(`/projects/${p.slug}`),
    }));

    const skillItems: PaletteItem[] = skillGroups
      .flatMap((g) => g.skills)
      .map((s) => ({
        id: `skill-${s.name}`,
        group: t.nav.skills,
        label: s.name,
        hint: t.skills.categories[
          skillGroups.find((g) => g.skills.includes(s))!.category
        ],
        icon: (
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: s.color }}
            aria-hidden
          />
        ),
        run: go("/skills"),
      }));

    const actionItems: PaletteItem[] = [
      {
        id: "action-theme",
        group: t.command.actions,
        label: t.command.toggleDarkMode,
        icon: <Moon className="h-4 w-4" aria-hidden />,
        run: () => {
          toggleTheme();
          onClose();
        },
      },
      {
        id: "action-language",
        group: t.command.actions,
        label: `${t.command.changeLanguage} (${locale.toUpperCase()})`,
        icon: <Globe className="h-4 w-4" aria-hidden />,
        run: () => {
          toggleLocale();
          onClose();
        },
      },
      {
        id: "action-accent",
        group: t.command.actions,
        label: t.command.changeAccent,
        icon: <Palette className="h-4 w-4" aria-hidden />,
        run: () => {
          setAccent(
            (["blue", "purple", "green", "orange", "red"] as const)[
              Math.floor(Math.random() * 5)
            ],
          );
          onClose();
        },
      },
    ];

    return [...pageItems, ...projectItems, ...skillItems, ...actionItems];
  }, [t, locale, router, onClose, toggleLocale, toggleTheme, setAccent]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (it) =>
        it.label.toLowerCase().includes(q) ||
        it.group.toLowerCase().includes(q) ||
        (it.hint ?? "").toLowerCase().includes(q),
    );
  }, [items, query]);

  // Group preserving order.
  const grouped = useMemo(() => {
    const map = new Map<string, PaletteItem[]>();
    for (const it of filtered) {
      const arr = map.get(it.group) ?? [];
      arr.push(it);
      map.set(it.group, arr);
    }
    return Array.from(map.entries());
  }, [filtered]);

  const flat = useMemo(() => grouped.flatMap(([, arr]) => arr), [grouped]);

  useEffect(() => setActiveIndex(0), [query]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, flat.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        flat[activeIndex]?.run();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, flat, activeIndex, onClose]);

  // Keep the active row visible.
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-index="${activeIndex}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  let runningIndex = -1;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-[2px]"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="fixed left-1/2 top-[12vh] z-[101] w-[calc(100vw-2rem)] max-w-xl -translate-x-1/2 overflow-hidden rounded-2xl border border-border-strong bg-card shadow-2xl shadow-black/50"
            role="dialog"
            aria-modal="true"
            aria-label={t.command.title}
          >
            {/* Input */}
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search className="h-4 w-4 shrink-0 text-muted" aria-hidden />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.command.placeholder}
                className="h-13 flex-1 bg-transparent py-4 text-sm outline-none placeholder:text-faint"
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-list"
                aria-activedescendant={`palette-opt-${Math.max(activeIndex, 0)}`}
              />
              <kbd className="hidden rounded border border-border px-1.5 font-mono text-[10px] text-faint sm:block">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div
              ref={listRef}
              id="palette-list"
              role="listbox"
              className="max-h-[46vh] overflow-y-auto p-2"
            >
              {flat.length === 0 ? (
                <p className="flex items-center justify-center gap-2 px-4 py-10 text-sm text-muted">
                  <Download className="h-4 w-4 opacity-0" aria-hidden />
                  {t.command.noResults}
                </p>
              ) : (
                grouped.map(([group, groupItems]) => (
                  <div key={group} className="mb-1">
                    <p className="px-3 pb-1 pt-2 text-[10px] font-semibold tracking-[0.14em] text-faint">
                      {group.toUpperCase()}
                    </p>
                    {groupItems.map((it) => {
                      runningIndex += 1;
                      const idx = runningIndex;
                      return (
                        <button
                          key={it.id}
                          data-index={idx}
                          id={`palette-opt-${idx}`}
                          role="option"
                          aria-selected={idx === activeIndex}
                          onClick={it.run}
                          onMouseEnter={() => setActiveIndex(idx)}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm",
                            idx === activeIndex
                              ? "bg-accent-soft text-foreground"
                              : "text-muted hover:bg-white/[0.04]",
                          )}
                        >
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center [&>svg]:h-4 [&>svg]:w-4">
                            {it.icon}
                          </span>
                          <span className="min-w-0 flex-1 truncate">{it.label}</span>
                          {it.hint && (
                            <span className="shrink-0 truncate font-mono text-[11px] text-faint">
                              {it.hint}
                            </span>
                          )}
                          {idx === activeIndex && (
                            <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden />
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center gap-4 border-t border-border px-4 py-2.5 text-[11px] text-faint">
              <span className="flex items-center gap-1.5">
                <kbd className="rounded border border-border px-1 font-mono">↑↓</kbd>
                {t.command.navigate}
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="rounded border border-border px-1 font-mono">
                  <ArrowRight className="inline h-3 w-3" />
                </kbd>
                {t.command.select}
              </span>
              <span className="ml-auto hidden sm:block">{t.ai.poweredBy}</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/** Helper hook so any component can trigger a toast after palette actions. */
export function useCopyToast() {
  const toast = useToast();
  return toast;
}
