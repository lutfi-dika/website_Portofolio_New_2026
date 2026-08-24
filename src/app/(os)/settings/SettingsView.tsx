"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Accessibility,
  Contrast,
  Gauge,
  Languages,
  Monitor,
  Moon,
  MousePointer2,
  Palette,
  RotateCcw,
  Sparkles,
  Sun,
  Type,
  Waves,
} from "lucide-react";
import { PageHeader } from "@/components/os/DashboardWidget";
import { Modal } from "@/components/os/Lightbox";
import { useSettings, type Accent, type Density, type Theme } from "@/lib/settings";
import { useI18n } from "@/lib/i18n";
import { useToast } from "@/lib/toast";
import { cn } from "@/lib/utils";

function LanguageButton({ lang, label }: { lang: "id" | "en"; label: string }) {
  const { locale, setLocale } = useI18n();
  return (
    <button
      role="radio"
      aria-checked={locale === lang}
      aria-label={label}
      onClick={() => setLocale(lang)}
      className={cn(
        "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
        locale === lang ? "bg-accent-soft text-accent" : "text-muted hover:text-foreground",
      )}
    >
      <Languages className="h-3.5 w-3.5" aria-hidden />
      {label}
    </button>
  );
}

const THEMES: { value: Theme; icon: typeof Sun; labelKey: "themeDark" | "themeLight" | "themeSystem" }[] = [
  { value: "dark", icon: Moon, labelKey: "themeDark" },
  { value: "light", icon: Sun, labelKey: "themeLight" },
  { value: "system", icon: Monitor, labelKey: "themeSystem" },
];

const ACCENTS: Accent[] = ["blue", "purple", "green", "orange", "red"];
const DENSITIES: Density[] = ["comfortable", "compact"];

export function SettingsView() {
  const t = useI18n().t;
  const s = useSettings();
  const toast = useToast();
  const [resetOpen, setResetOpen] = useState(false);

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title={t.settings.title} subtitle={t.settings.subtitle} />

      <div className="space-y-4">
        {/* ── Appearance ── */}
        <SettingsSection icon={Palette} title={t.settings.appearance}>
          <SettingRow label={t.topbar.theme}>
            <div className="flex gap-1.5 rounded-xl border border-border p-1" role="radiogroup" aria-label={t.topbar.theme}>
              {THEMES.map(({ value, icon: Icon, labelKey }) => (
                <button
                  key={value}
                  role="radio"
                  aria-checked={s.theme === value}
                  onClick={() => s.setTheme(value)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                    s.theme === value ? "bg-accent-soft text-accent" : "text-muted hover:text-foreground",
                  )}
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden />
                  {t.settings[labelKey]}
                </button>
              ))}
            </div>
          </SettingRow>

          <SettingRow label={t.settings.accentColor}>
            <div className="flex items-center gap-2" role="radiogroup" aria-label={t.settings.accentColor}>
              {ACCENTS.map((a) => (
                <button
                  key={a}
                  role="radio"
                  aria-checked={s.accent === a}
                  aria-label={t.accents[a]}
                  onClick={() => s.setAccent(a)}
                  className={cn(
                    "h-7 w-7 rounded-full border-2 transition-transform hover:scale-110",
                    s.accent === a ? "border-foreground scale-110" : "border-transparent",
                  )}
                  style={{ backgroundColor: `var(--accent-${a})` }}
                />
              ))}
            </div>
          </SettingRow>

          <SettingRow label={t.settings.layout}>
            <div className="flex gap-1.5 rounded-xl border border-border p-1" role="radiogroup" aria-label={t.settings.layout}>
              {DENSITIES.map((d) => (
                <button
                  key={d}
                  role="radio"
                  aria-checked={s.density === d}
                  onClick={() => s.setDensity(d)}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                    s.density === d ? "bg-accent-soft text-accent" : "text-muted hover:text-foreground",
                  )}
                >
                  {d === "comfortable" ? t.settings.densityComfortable : t.settings.densityCompact}
                </button>
              ))}
            </div>
          </SettingRow>

          <SettingRow label={t.settings.language}>
            <div className="flex gap-1.5 rounded-xl border border-border p-1" role="radiogroup" aria-label={t.settings.language}>
              {(["id", "en"] as const).map((lang) => (
                <LanguageButton key={lang} lang={lang} label={lang === "id" ? t.meta.langName : "English"} />
              ))}
            </div>
          </SettingRow>
        </SettingsSection>

        {/* ── Interface ── */}
        <SettingsSection icon={Sparkles} title={t.settings.interface}>
          <SettingRow label={t.topbar.sidebar}>
            <div className="flex gap-1.5 rounded-xl border border-border p-1" role="radiogroup" aria-label={t.topbar.sidebar}>
              <button
                role="radio"
                aria-checked={!s.sidebarCollapsed}
                onClick={() => s.setSidebarCollapsed(false)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                  !s.sidebarCollapsed ? "bg-accent-soft text-accent" : "text-muted hover:text-foreground",
                )}
              >
                {t.settings.sidebarExpanded}
              </button>
              <button
                role="radio"
                aria-checked={s.sidebarCollapsed}
                onClick={() => s.setSidebarCollapsed(true)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                  s.sidebarCollapsed ? "bg-accent-soft text-accent" : "text-muted hover:text-foreground",
                )}
              >
                {t.settings.sidebarCollapsed}
              </button>
            </div>
          </SettingRow>
          <ToggleRow
            icon={Gauge}
            label={t.settings.animations}
            checked={s.effects.animations}
            onChange={(v) => s.setEffect("animations", v)}
          />
          <ToggleRow
            icon={Waves}
            label={t.settings.backgroundGlow}
            checked={s.effects.backgroundGlow}
            onChange={(v) => s.setEffect("backgroundGlow", v)}
          />
          <ToggleRow
            icon={Monitor}
            label={t.settings.glassEffect}
            checked={s.effects.glass}
            onChange={(v) => s.setEffect("glass", v)}
          />
          <ToggleRow
            icon={MousePointer2}
            label={t.settings.customCursor}
            checked={s.effects.customCursor}
            onChange={(v) => s.setEffect("customCursor", v)}
          />
        </SettingsSection>

        {/* ── Accessibility ── */}
        <SettingsSection icon={Accessibility} title={t.settings.accessibility}>
          <ToggleRow
            icon={Gauge}
            label={t.settings.reducedMotion}
            checked={s.a11y.reducedMotion}
            onChange={(v) => s.setA11y("reducedMotion", v)}
          />
          <ToggleRow
            icon={Type}
            label={t.settings.largeText}
            checked={s.a11y.largeText}
            onChange={(v) => s.setA11y("largeText", v)}
          />
          <ToggleRow
            icon={Contrast}
            label={t.settings.highContrast}
            checked={s.a11y.highContrast}
            onChange={(v) => s.setA11y("highContrast", v)}
          />
        </SettingsSection>

        {/* ── Reset ── */}
        <section className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-red-400/20 bg-red-400/[0.03] p-5">
          <h3 className="font-semibold">{t.settings.resetAll}</h3>
          <button
            onClick={() => setResetOpen(true)}
            className="flex items-center gap-2 rounded-xl border border-red-400/30 px-4 py-2 text-sm font-medium text-red-300 transition-colors hover:bg-red-400/10"
          >
            <RotateCcw className="h-4 w-4" aria-hidden />
            {t.settings.resetAll}
          </button>
        </section>
      </div>

      <Modal open={resetOpen} onClose={() => setResetOpen(false)} title={t.settings.resetAll}>
        <div className="flex justify-end gap-2 pt-1">
          <button
            onClick={() => setResetOpen(false)}
            className="rounded-xl border border-border px-4 py-2 text-sm text-muted hover:text-foreground"
          >
            {t.common.close}
          </button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              s.resetAll();
              setResetOpen(false);
              toast(t.settings.resetDone, "success");
            }}
            className="rounded-xl bg-red-500/90 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500"
          >
            {t.settings.resetAll}
          </motion.button>
        </div>
      </Modal>
    </div>
  );
}

/* Language button uses context directly to switch locale */

function SettingsSection({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Palette;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-2xl border border-border bg-card"
    >
      <h2 className="flex items-center gap-2 border-b border-border bg-surface/50 px-5 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
        <Icon className="h-3.5 w-3.5 text-accent" aria-hidden />
        {title}
      </h2>
      <div className="divide-y divide-border">{children}</div>
    </motion.section>
  );
}

function SettingRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
      <span className="text-sm font-medium">{label}</span>
      {children}
    </div>
  );
}

function ToggleRow({
  icon: Icon,
  label,
  checked,
  onChange,
}: {
  icon: typeof Waves;
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between px-5 py-4">
      <span className="flex items-center gap-2.5 text-sm font-medium">
        <Icon className="h-4 w-4 text-faint" aria-hidden />
        {label}
      </span>
      <button
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors",
          checked ? "bg-accent" : "bg-white/10",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
            checked ? "translate-x-[22px]" : "translate-x-0.5",
          )}
        />
      </button>
    </div>
  );
}
