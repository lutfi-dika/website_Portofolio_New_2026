"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, GraduationCap } from "lucide-react";
import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa6";
import { profile, socials } from "@/data/profile";
import { useT } from "@/lib/i18n";

const SOCIAL_ICONS = {
  github: FaGithub,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  whatsapp: FaWhatsapp,
} as const;

export function ProfileCard() {
  const t = useT();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="relative overflow-hidden rounded-2xl border border-border bg-card p-6"
    >
      {/* accent wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl"
        style={{ background: "var(--accent-soft)" }}
      />

      <div className="relative flex flex-col items-center text-center">
        {/* Profile Image Avatar */}
        <div className="relative">
          <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_0_36px_-8px_var(--accent)]">
            <Image
              src="/logo.jpeg"
              alt={profile.name}
              width={80}
              height={80}
              priority
              className="h-full w-full object-cover"
            />
          </div>
          <span
            className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-400 ring-[3px] ring-card"
            title={t.dashboard.availableForProjects}
            aria-label={t.dashboard.availableForProjects}
          />
        </div>

        <h3 className="mt-4 font-display text-lg font-bold leading-tight">
          {profile.name}
        </h3>
        <p className="text-sm text-accent">{profile.role.split(" & ")[0]}</p>

        <div className="mt-3 space-y-1 text-xs text-muted">
          <p className="flex items-center justify-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            {profile.location}
          </p>
          <p className="flex items-center justify-center gap-1.5">
            <GraduationCap className="h-3.5 w-3.5" aria-hidden />
            {t.about.student}
          </p>
        </div>

        <p className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-medium text-emerald-300">
          <span
            className="h-1.5 w-1.5 rounded-full bg-emerald-400"
            aria-hidden
          />
          {t.dashboard.availableForProjects}
        </p>

        <ul className="mt-5 flex gap-2" aria-label="Social links">
          {socials.map((s) => {
            const Icon = SOCIAL_ICONS[s.icon as keyof typeof SOCIAL_ICONS];
            return (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-muted transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.div>
  );
}
