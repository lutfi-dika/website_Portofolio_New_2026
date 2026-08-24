"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { useT } from "@/lib/i18n";

/**
 * Featured hero card for the dashboard home.
 * Label → name → role → tagline → primary actions + ambient orb visual.
 */
export function HeroCard() {
  const t = useT();

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
            "radial-gradient(circle, color-mix(in oklab, var(--accent) 26%, transparent), transparent 65%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 -bottom-24 h-40 blur-2xl"
        style={{
          background:
            "radial-gradient(60% 100% at 70% 100%, color-mix(in oklab, var(--accent) 14%, transparent), transparent)",
        }}
        aria-hidden
      />

      <div className="relative flex flex-col gap-8 p-6 sm:p-10 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
            <span className="relative flex h-2 w-2">
              <span className="absolute h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative h-2 w-2 rounded-full bg-accent" />
            </span>
            {t.dashboard.availableForProjects}
          </p>

          <h1 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[42px]">
            {profile.name}
          </h1>
          <p className="mt-2 font-mono text-sm text-muted sm:text-base">{profile.role}</p>
          <p className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            {t.dashboard.ownerBusiness}
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            {t.dashboard.heroTagline}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-background transition-transform active:scale-[0.98]"
              style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-strong))" }}
            >
              {t.dashboard.viewProjects}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-input-bg px-5 py-2.5 text-sm font-semibold transition-colors hover:border-border-strong hover:text-accent active:scale-[0.98]"
            >
              <Mail className="h-4 w-4" aria-hidden />
              {t.dashboard.contactMe}
            </Link>
          </div>
        </div>

        {/* Orb visual */}
        <div className="relative mx-auto hidden h-52 w-52 shrink-0 md:block" aria-hidden>
          <div
            className="absolute inset-0 animate-[spin_14s_linear_infinite] rounded-full border border-dashed border-border-strong"
          />
          <div
            className="absolute inset-6 rounded-full border border-border"
            style={{ background: "color-mix(in oklab, var(--accent) 6%, transparent)" }}
          />
          <div
            className="absolute inset-12 rounded-full blur-md"
            style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
          />
          <span className="absolute inset-0 flex items-center justify-center font-display text-xl font-bold tracking-tight">
            L<span className="text-accent">.</span>DEV
          </span>
        </div>
      </div>
    </motion.section>
  );
}
