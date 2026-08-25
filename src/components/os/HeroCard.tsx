"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Terminal, Sparkles } from "lucide-react";
import { profile } from "@/data/profile";
import { useT } from "@/lib/i18n";

const codeLines = [
  { indent: 0, text: "const developer = {", color: "text-foreground" },
  { indent: 1, text: 'name: "Muhammad Lutfi Andika",', color: "text-emerald-400" },
  { indent: 1, text: 'role: "Frontend Developer",', color: "text-emerald-400" },
  { indent: 1, text: 'location: "Bekasi, Indonesia",', color: "text-emerald-400" },
  { indent: 1, text: 'status: "available",', color: "text-emerald-400" },
  { indent: 0, text: "};", color: "text-foreground" },
  { indent: 0, text: "", color: "" },
  { indent: 0, text: "const mission = () => {", color: "text-purple-400" },
  { indent: 1, text: "return buildDigitalExperiences({", color: "text-foreground" },
  { indent: 2, text: 'quality: "premium",', color: "text-amber-400" },
  { indent: 2, text: 'focus: "frontend",', color: "text-amber-400" },
  { indent: 2, text: "passion: Infinity,", color: "text-accent" },
  { indent: 1, text: "});", color: "text-foreground" },
  { indent: 0, text: "};", color: "text-foreground" },
];

export function HeroCard() {
  const t = useT();
  const [visibleLines, setVisibleLines] = useState(0);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 11) setGreeting(t.dashboard.greetingMorning);
    else if (hour < 15) setGreeting(t.dashboard.greetingAfternoon);
    else if (hour < 19) setGreeting(t.dashboard.greetingEvening);
    else setGreeting(t.dashboard.greetingNight);
  }, [t]);

  useEffect(() => {
    if (document.documentElement.dataset.motion === "reduced") {
      setVisibleLines(codeLines.length);
      return;
    }
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= codeLines.length) clearInterval(timer);
    }, 120);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-2xl border border-border bg-card"
      aria-label={profile.name}
    >
      {/* Ambient visuals: grid + glow orb */}
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div
        className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--accent) 20%, transparent), transparent 65%)",
        }}
        aria-hidden
      />

      <div className="relative flex flex-col gap-8 p-6 sm:p-8 lg:p-10">
        {/* Top label */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="section-label text-emerald-400">
            {t.dashboard.availableForProjects}
          </span>
        </div>

        <div className="flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
          {/* Left: info */}
          <div className="max-w-2xl">
            <h1 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[42px]">
              {greeting.split(",")[0]},{" "}
              <span className="text-gradient">{profile.shortName}</span>
              <span className="text-muted"> 👋</span>
            </h1>
            <p className="mt-3 font-mono text-sm text-muted sm:text-base">{profile.role}</p>
            <p className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-border bg-input-bg px-3 py-1 text-xs text-muted">
              <Sparkles className="h-3 w-3 text-accent" aria-hidden />
              {t.dashboard.ownerBusiness}
            </p>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              {t.dashboard.heroTagline}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all active:scale-[0.98]"
                style={{
                  background: "linear-gradient(135deg, var(--accent), var(--accent-strong))",
                  boxShadow: "0 0 20px -4px var(--accent-soft)",
                }}
              >
                {t.dashboard.viewProjects}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-input-bg px-5 py-2.5 text-sm font-semibold transition-all hover:border-border-strong hover:text-accent active:scale-[0.98]"
              >
                <Mail className="h-4 w-4" aria-hidden />
                {t.dashboard.contactMe}
              </Link>
            </div>
          </div>

          {/* Right: Code window */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="hidden w-full max-w-md shrink-0 xl:block"
            aria-hidden
          >
            <div className="overflow-hidden rounded-xl border border-border bg-[#0c0c0e] shadow-2xl shadow-black/40">
              {/* Window header */}
              <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 text-center">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-faint">
                    <Terminal className="h-3 w-3" aria-hidden />
                    developer.ts
                  </span>
                </div>
              </div>

              {/* Code content */}
              <div className="p-4 font-mono text-[13px] leading-[1.7]">
                {codeLines.slice(0, visibleLines).map((line, i) => (
                  <div key={i} className="flex">
                    <span className="mr-4 w-5 shrink-0 select-none text-right text-faint/50">
                      {i + 1}
                    </span>
                    <span className={`${line.color} whitespace-pre`}>
                      {"  ".repeat(line.indent)}
                      {line.text}
                    </span>
                  </div>
                ))}
                {visibleLines < codeLines.length && (
                  <div className="flex items-center gap-1">
                    <span className="mr-4 w-5 shrink-0 text-right text-faint/50">
                      {visibleLines + 1}
                    </span>
                    <span className="inline-block h-4 w-2 animate-pulse bg-accent" />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
