"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar as CalendarIcon,
  Cloud,
  CloudRain,
  Droplets,
  Sun,
  Wind,
} from "lucide-react";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { DashboardWidgetProps } from "./DashboardWidget";

/* ────────────────────────────── Digital clock ───────────────────────── */

export function DigitalClock() {
  const t = useT();
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = now
    ? new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Asia/Jakarta",
      }).format(now)
    : "--:--:--";

  const date = now
    ? new Intl.DateTimeFormat("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Jakarta",
      }).format(now)
    : "";

  return (
    <div className="flex h-full flex-col justify-center">
      <p className="font-mono text-4xl font-bold tabular-nums tracking-tight text-foreground">
        {time}
      </p>
      <p className="mt-1.5 text-sm capitalize text-muted">{date}</p>
      <p className="mt-0.5 flex items-center gap-1.5 text-xs text-faint">
        <span className="relative flex h-2 w-2" aria-hidden>
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        {t.dashboard.widgets.bekasi} · WIB
      </p>
    </div>
  );
}

/* ───────────────────────────── Mini calendar ────────────────────────── */

export function MiniCalendar() {
  const t = useT();
  const [today] = useState(() => new Date());
  const [viewDate, setViewDate] = useState(() => new Date());

  // Hydration-safe: render calendar grid only after mount.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const cells = useMemo(() => {
    if (!mounted) return [];
    const first = new Date(year, month, 1);
    const startDay = (first.getDay() + 6) % 7; // Monday-first
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const arr: (number | null)[] = Array(startDay).fill(null);
    for (let d = 1; d <= daysInMonth; d++) arr.push(d);
    while (arr.length % 7 !== 0) arr.push(null);
    return arr;
  }, [year, month, mounted]);

  const isToday = (d: number) =>
    today.getDate() === d && today.getMonth() === month && today.getFullYear() === year;

  const weekdayLabels = ["S", "S", "R", "K", "J", "S", "M"]; // Sen-Min (id)
  const monthLabel = new Intl.DateTimeFormat("id-ID", { month: "long", year: "numeric" }).format(
    new Date(year, month, 1),
  );

  return (
    <div className="flex h-full flex-col">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-semibold capitalize">{monthLabel}</p>
        <div className="flex gap-1">
          <button
            onClick={() => setViewDate(new Date(year, month - 1, 1))}
            aria-label={t.common.prev}
            className="rounded-md px-1.5 py-0.5 text-muted hover:bg-white/[0.06] hover:text-foreground"
          >
            ‹
          </button>
          <button
            onClick={() => setViewDate(new Date())}
            aria-label={t.dashboard.widgets.calendar}
            className="rounded-md p-1 text-muted hover:bg-white/[0.06] hover:text-foreground"
          >
            <CalendarIcon className="h-3.5 w-3.5" aria-hidden />
          </button>
          <button
            onClick={() => setViewDate(new Date(year, month + 1, 1))}
            aria-label={t.common.next}
            className="rounded-md px-1.5 py-0.5 text-muted hover:bg-white/[0.06] hover:text-foreground"
          >
            ›
          </button>
        </div>
      </div>
      <div className="grid flex-1 grid-cols-7 content-start gap-y-1 text-center">
        {weekdayLabels.map((d, i) => (
          <span key={`w-${i}`} className="py-1 text-[10px] font-medium text-faint" aria-hidden>
            {d}
          </span>
        ))}
        {mounted &&
          cells.map((d, i) => (
            <span
              key={i}
              className={cn(
                "mx-auto flex h-6 w-6 items-center justify-center rounded-full text-[11px]",
                d === null && "opacity-0",
                d !== null && isToday(d) && "bg-accent font-bold text-background",
                d !== null && !isToday(d) && "text-muted",
              )}
              aria-current={d !== null && isToday(d) ? "date" : undefined}
            >
              {d ?? "·"}
            </span>
          ))}
      </div>
    </div>
  );
}

/* ───────────────────────────── Weather widget ───────────────────────── */

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  code: number;
}

export function WeatherWidget() {
  const t = useT();
  const [data, setData] = useState<WeatherData | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/weather")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(
        (
          json:
            | (WeatherData & { ok: true })
            | { ok: false },
        ) => {
          if (cancelled) return;
          if (!json.ok) setFailed(true);
          else setData(json);
        },
      )
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, []);

  if (failed) {
    return (
      <div className="flex h-full flex-col justify-center">
        <p className="flex items-center gap-2 text-sm text-muted">
          <CloudRain className="h-4 w-4" aria-hidden />
          {t.dashboard.widgets.weatherUnavailable}
        </p>
      </div>
    );
  }
  if (!data) {
    return <WeatherSkeleton />;
  }

  const Icon = data.code === 0 ? Sun : Cloud;
  return (
    <div className="flex h-full flex-col justify-center">
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent">
          <Icon className="h-6 w-6" aria-hidden />
        </span>
        <div>
          <p className="font-display text-3xl font-bold leading-none">{Math.round(data.temperature)}°C</p>
          <p className="mt-1 text-xs text-muted">{t.dashboard.widgets.bekasi}</p>
        </div>
      </div>
      <div className="mt-4 flex gap-5 text-xs text-muted">
        <span className="flex items-center gap-1.5">
          <Droplets className="h-3.5 w-3.5 text-faint" aria-hidden />
          {t.dashboard.widgets.humidity}: {data.humidity}%
        </span>
        <span className="flex items-center gap-1.5">
          <Wind className="h-3.5 w-3.5 text-faint" aria-hidden />
          {t.dashboard.widgets.wind}: {Math.round(data.windSpeed)} km/j
        </span>
      </div>
    </div>
  );
}

function WeatherSkeleton() {
  return (
    <div className="flex h-full animate-pulse items-center gap-4">
      <div className="h-12 w-12 rounded-xl bg-white/[0.06]" />
      <div className="space-y-2">
        <div className="h-6 w-20 rounded bg-white/[0.06]" />
        <div className="h-3 w-28 rounded bg-white/[0.06]" />
      </div>
    </div>
  );
}

/* ───────────────────────────── Animated counter ─────────────────────── */

export function AnimatedCounter({
  value,
  suffix = "",
  duration = 1400,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (document.documentElement.dataset.motion === "reduced") {
      setDisplay(value);
      return;
    }
    const timer = setTimeout(() => setStarted(true), 150);
    return () => clearTimeout(timer);
  }, [value]);

  useEffect(() => {
    if (!started) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, value, duration]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="tabular-nums"
    >
      {display}
      {suffix}
    </motion.span>
  );
}

export type { DashboardWidgetProps };
