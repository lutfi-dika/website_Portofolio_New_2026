"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, GraduationCap } from "lucide-react";
import {
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa6";
import { profile, socials } from "@/data/profile";
import { useT } from "@/lib/i18n";

const SOCIAL_ICONS = {
  github: FaGithub,
  email: FaEnvelope,
  instagram: FaInstagram,
  whatsapp: FaWhatsapp,
  linkedin: FaLinkedinIn,
} as const;

export function ProfileCard() {
  const t = useT();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-lg"
    >
      {/* accent wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full blur-3xl"
        style={{ background: "var(--accent-soft)" }}
      />

      <div className="relative flex flex-col items-center text-center">
        {/* Profile Image Avatar - Diperbesar menjadi h-40 w-40 (160px) */}
        <div className="relative">
          <div className="group relative h-80 w-60 overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_0_48px_-8px_var(--accent)]">
            <Image
              src="/images/logo.jpeg"
              alt={profile.name}
              width={160}
              height={160}
              priority
              className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-0"
            />
            <span className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <Image
                src="/images/Logo-Animasi.jpeg"
                alt={`${profile.name} Logo`}
                width={160}
                height={160}
                className="h-full w-full object-cover"
              />
            </span>
          </div>
          <span
            className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-emerald-400 ring-[4px] ring-card"
            title={t.dashboard.availableForProjects}
            aria-label={t.dashboard.availableForProjects}
          />
        </div>

        <h3 className="mt-5 font-display text-xl font-bold leading-tight">
          {profile.name}
        </h3>
        <p className="mt-1 text-base text-accent">
          {profile.role.split(" & ")[0]}
        </p>

        <div className="mt-4 space-y-1.5 text-sm text-muted">
          <p className="flex items-center justify-center gap-2">
            <MapPin className="h-4 w-4" aria-hidden />
            {profile.location}
          </p>
          <p className="flex items-center justify-center gap-2">
            <GraduationCap className="h-4 w-4" aria-hidden />
            {t.about.student}
          </p>
        </div>

        <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-1.5 text-xs font-medium text-emerald-300">
          <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
          {t.dashboard.availableForProjects}
        </p>

        <ul className="mt-6 flex gap-3" aria-label="Social links">
          {socials.map((s) => {
            const Icon = SOCIAL_ICONS[s.icon as keyof typeof SOCIAL_ICONS];
            return (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
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
