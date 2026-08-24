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

export type Theme = "dark" | "light" | "system";
export type Accent = "blue" | "purple" | "green" | "orange" | "red";
export type Density = "comfortable" | "compact";

export interface Effects {
  animations: boolean;
  backgroundGlow: boolean;
  glass: boolean;
  customCursor: boolean;
}

export interface Accessibility {
  reducedMotion: boolean;
  largeText: boolean;
  highContrast: boolean;
}

interface SettingsValue {
  theme: Theme;
  accent: Accent;
  density: Density;
  sidebarCollapsed: boolean;
  effects: Effects;
  a11y: Accessibility;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  setAccent: (a: Accent) => void;
  cycleAccent: () => void;
  setDensity: (d: Density) => void;
  setSidebarCollapsed: (v: boolean | ((p: boolean) => boolean)) => void;
  setEffect: (key: keyof Effects, v: boolean) => void;
  setA11y: (key: keyof Accessibility, v: boolean) => void;
  resetAll: () => void;
}

const ACCENTS: Accent[] = ["blue", "purple", "green", "orange", "red"];

const DEFAULTS = {
  theme: "dark" as Theme,
  accent: "blue" as Accent,
  density: "comfortable" as Density,
  sidebarCollapsed: false,
  effects: { animations: true, backgroundGlow: true, glass: true, customCursor: true },
  a11y: { reducedMotion: false, largeText: false, highContrast: false },
};

const SettingsContext = createContext<SettingsValue | null>(null);

function readLS<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeLS(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* noop */
  }
}

/** Apply every setting to the <html> element via data attributes. */
function applyToDOM(
  theme: Theme,
  accent: Accent,
  density: Density,
  effects: Effects,
  a11y: Accessibility,
) {
  const root = document.documentElement;
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const resolved = theme === "system" ? (systemDark ? "dark" : "light") : theme;

  root.dataset.theme = resolved;
  root.dataset.accent = accent;
  root.dataset.density = density;
  root.dataset.glow = effects.backgroundGlow ? "on" : "off";
  root.dataset.glass = effects.glass ? "on" : "off";
  root.dataset.cursor = effects.customCursor ? "on" : "off";
  root.dataset.largeText = a11y.largeText ? "on" : "off";
  root.dataset.contrast = a11y.highContrast ? "on" : "off";

  const reduce =
    a11y.reducedMotion ||
    !effects.animations ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  root.dataset.motion = reduce ? "reduced" : "full";
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(DEFAULTS.theme);
  const [accent, setAccentState] = useState<Accent>(DEFAULTS.accent);
  const [density, setDensityState] = useState<Density>(DEFAULTS.density);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(DEFAULTS.sidebarCollapsed);
  const [effects, setEffects] = useState<Effects>(DEFAULTS.effects);
  const [a11y, setA11yState] = useState<Accessibility>(DEFAULTS.a11y);

  // Hydrate from localStorage once.
  useEffect(() => {
    const stored = readLS<
      Partial<{
        theme: Theme;
        accent: Accent;
        density: Density;
        sidebarCollapsed: boolean;
        effects: Effects;
        a11y: Accessibility;
      }> | null
    >("lutfi.settings", null);
    if (stored) {
      setThemeState(stored.theme ?? DEFAULTS.theme);
      setAccentState(stored.accent ?? DEFAULTS.accent);
      setDensityState(stored.density ?? DEFAULTS.density);
      setSidebarCollapsed(stored.sidebarCollapsed ?? DEFAULTS.sidebarCollapsed);
      setEffects({ ...DEFAULTS.effects, ...stored.effects });
      setA11yState({ ...DEFAULTS.a11y, ...stored.a11y });
    } else {
      // First visit: apply immediately (script in layout already set theme).
      applyToDOM(theme, accent, density, effects, a11y);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist + apply whenever anything changes.
  useEffect(() => {
    writeLS("lutfi.settings", { theme, accent, density, sidebarCollapsed, effects, a11y });
    applyToDOM(theme, accent, density, effects, a11y);
  }, [theme, accent, density, sidebarCollapsed, effects, a11y]);

  // React to OS color-scheme changes when theme === system.
  useEffect(() => {
    if (theme !== "system") return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyToDOM(theme, accent, density, effects, a11y);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [theme, accent, density, effects, a11y]);

  const setTheme = useCallback((t: Theme) => setThemeState(t), []);
  const toggleTheme = useCallback(
    () =>
      setThemeState((prev) => {
        const current =
          prev === "system"
            ? window.matchMedia("(prefers-color-scheme: dark)").matches
              ? "dark"
              : "light"
            : prev;
        return current === "dark" ? "light" : "dark";
      }),
    [],
  );
  const setAccent = useCallback((a: Accent) => setAccentState(a), []);
  const cycleAccent = useCallback(
    () => setAccentState((prev) => ACCENTS[(ACCENTS.indexOf(prev) + 1) % ACCENTS.length]),
    [],
  );
  const setEffect = useCallback(
    (key: keyof Effects, v: boolean) => setEffects((prev) => ({ ...prev, [key]: v })),
    [],
  );
  const setA11y = useCallback(
    (key: keyof Accessibility, v: boolean) => setA11yState((prev) => ({ ...prev, [key]: v })),
    [],
  );
  const resetAll = useCallback(() => {
    setThemeState(DEFAULTS.theme);
    setAccentState(DEFAULTS.accent);
    setDensityState(DEFAULTS.density);
    setSidebarCollapsed(DEFAULTS.sidebarCollapsed);
    setEffects(DEFAULTS.effects);
    setA11yState(DEFAULTS.a11y);
  }, []);

  const value = useMemo<SettingsValue>(
    () => ({
      theme,
      accent,
      density,
      sidebarCollapsed,
      effects,
      a11y,
      setTheme,
      toggleTheme,
      setAccent,
      cycleAccent,
      setDensity: setDensityState,
      setSidebarCollapsed,
      setEffect,
      setA11y,
      resetAll,
    }),
    [
      theme,
      accent,
      density,
      sidebarCollapsed,
      effects,
      a11y,
      setTheme,
      toggleTheme,
      setAccent,
      cycleAccent,
      setEffect,
      setA11y,
      resetAll,
    ],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used inside SettingsProvider");
  return ctx;
}
