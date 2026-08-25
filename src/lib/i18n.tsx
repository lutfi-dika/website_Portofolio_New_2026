"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { id, type Dictionary } from "@/data/translations/id";
import { en } from "@/data/translations/en";

export type Locale = "id" | "en";

interface I18nValue {
  locale: Locale;
  t: Dictionary;
  setLocale: (l: Locale) => void;
  toggleLocale: () => void;
}

const DICTS: Record<Locale, Dictionary> = { id, en };
const I18nContext = createContext<I18nValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("id");

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("lutfi.locale");
      if (!raw) return;
      let value = raw;
      try {
        value = JSON.parse(raw) as string;
      } catch {
        /* legacy/plain value */
      }
      if (value === "en" || value === "id") setLocaleState(value);
    } catch {
      /* noop */
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem("lutfi.locale", l);
    } catch {
      /* noop */
    }
    document.documentElement.lang = l;
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "id" ? "en" : "id");
  }, [locale, setLocale]);

  // Keep <html lang> in sync after hydration.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  /** tiny interpolation helper: t.foo.replace("{count}", n) */
  const value = useMemo<I18nValue>(
    () => ({
      locale,
      t: DICTS[locale],
      setLocale,
      toggleLocale,
    }),
    [locale, setLocale, toggleLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside LanguageProvider");
  return ctx;
}

/** Shorthand: const t = useT(); then t.nav.dashboard */
export function useT(): Dictionary {
  return useI18n().t;
}

/** Replace {placeholders} in a translation string. */
export function interpolate(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    vars[key] !== undefined ? String(vars[key]) : `{${key}}`,
  );
}
