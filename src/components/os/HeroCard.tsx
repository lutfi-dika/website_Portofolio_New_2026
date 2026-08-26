"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { useT } from "@/lib/i18n";

export function HeroCard() {
  const t = useT();

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8 lg:p-10"
      aria-label={profile.name}
    >
      <div className="relative flex flex-col gap-6">
        {/* Role label */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
            <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
            Frontend Developer &middot; Web Developer
          </span>
        </div>

        {/* Main heading */}
        <div className="max-w-2xl">
          <h1 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[42px]">
            Hi, I&apos;m <span className="text-accent">{profile.shortName}</span>.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            {t.dashboard.heroTagline}
          </p>

          {/* Personal touch */}
          <p className="mt-3 font-mono text-xs text-faint">
            Based in {profile.location} &middot; Currently learning Laravel
          </p>

          {/* CTAs */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-[0.98]"
            >
              {t.dashboard.viewProjects}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-muted transition-all hover:border-border-strong hover:text-foreground active:scale-[0.98]"
            >
              <Mail className="h-4 w-4" aria-hidden />
              {t.dashboard.contactMe}
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
