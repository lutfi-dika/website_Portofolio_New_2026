"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  Briefcase,
  Download,
  GraduationCap,
  Loader2,
  Mail,
  MapPin,
  Star,
  User,
  Wrench,
} from "lucide-react";
import { profile, stats, socials } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { certificates } from "@/data/certificates";
import { experiences, educationHistory } from "@/data/experience";
import { PageHeader } from "@/components/os/DashboardWidget";
import { useT, useI18n } from "@/lib/i18n";
import { AnimatedCounter } from "@/components/os/widgets";

export function ResumeView() {
  const t = useT();
  const { locale } = useI18n();
  const printRef = useRef<HTMLDivElement>(null);
  const [generating, setGenerating] = useState(false);

  const techCount = skillGroups.reduce((n, g) => n + g.skills.length, 0);
  const projectCount = projects.length;

  const handleDownload = async () => {
    if (!printRef.current || generating) return;
    setGenerating(true);

    const el = printRef.current;

    try {
      // Clone element, append to body visibly for html2canvas
      const clone = el.cloneNode(true) as HTMLElement;
      clone.removeAttribute("aria-hidden");
      clone.style.cssText =
        "position:fixed;left:0;top:0;width:210mm;padding:15mm;z-index:99999;background:#fff;opacity:0.01;pointer-events:none;";
      document.body.appendChild(clone);

      // Wait for browser to fully render the clone
      await new Promise((r) => setTimeout(r, 300));

      const html2pdf = (await import("html2pdf.js")).default;
      await html2pdf()
        .set({
          margin: [10, 10, 10, 10],
          filename: "CV-Muhammad-Lutfi-Andika.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            letterRendering: true,
            backgroundColor: "#ffffff",
          },
          jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "portrait",
          },
        })
        .from(clone)
        .save();

      document.body.removeChild(clone);
    } catch {
      window.print();
    } finally {
      setGenerating(false);
    }
  };

  /* ── Visible dashboard sections ─────────────────────────── */
  const sections = [
    {
      id: "profile",
      icon: User,
      title: t.resume.profile,
      content: (
        <div className="space-y-3">
          <p className="text-sm leading-relaxed text-muted">{t.about.bio}</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm text-muted">
              <MapPin className="h-4 w-4 text-accent" aria-hidden />
              {profile.location}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted">
              <Mail className="h-4 w-4 text-accent" aria-hidden />
              {profile.email}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted">
              <Briefcase className="h-4 w-4 text-accent" aria-hidden />
              {t.about.role}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted">
              <GraduationCap className="h-4 w-4 text-accent" aria-hidden />
              {profile.school}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "experience",
      icon: Briefcase,
      title: t.experience.title,
      content: (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="rounded-xl border border-border p-4 transition-colors hover:border-accent/40"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-display text-sm font-bold">
                    {t.experience.roles[exp.roleKey as keyof typeof t.experience.roles]}
                  </h3>
                  <p className="text-xs text-accent">{exp.company}</p>
                  <p className="text-[10px] text-faint">{exp.location}</p>
                </div>
                <span className="shrink-0 rounded-md border border-border px-2 py-0.5 font-mono text-[10px] text-faint">
                  {exp.period}
                </span>
              </div>
              <ul className="mt-2 space-y-1">
                {exp.activitiesKeys.map((key) => (
                  <li
                    key={key}
                    className="flex items-start gap-2 text-xs text-muted"
                  >
                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                    {t.experience.activitiesList[key as keyof typeof t.experience.activitiesList]}
                  </li>
                ))}
              </ul>
              <div className="mt-2 flex flex-wrap gap-1">
                {exp.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-border px-1.5 py-0.5 font-mono text-[10px] text-faint"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "education",
      icon: GraduationCap,
      title: t.experience.educationTitle,
      content: (
        <div className="space-y-3">
          {educationHistory.map((edu) => (
            <div
              key={edu.id}
              className="rounded-xl border border-border p-4 transition-colors hover:border-accent/40"
            >
              <h3 className="font-display text-sm font-bold">{edu.school}</h3>
              {edu.major && <p className="text-xs text-accent">{edu.major}</p>}
              <p className="mt-1 font-mono text-[10px] text-faint">{edu.period}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {edu.focusKeys.map((key) => (
                  <span
                    key={key}
                    className="rounded-md border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted"
                  >
                    {t.experience.educationFocus[key as keyof typeof t.experience.educationFocus]}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "skills",
      icon: Wrench,
      title: t.skills.title,
      content: (
        <div className="space-y-4">
          {skillGroups.map((group) => (
            <div key={group.category}>
              <h3 className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-faint">
                {t.skills.categories[group.category]}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1 text-xs text-muted transition-colors hover:border-accent/40"
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: skill.color }}
                      aria-hidden
                    />
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "projects",
      icon: Star,
      title: t.projects.title,
      content: (
        <div className="space-y-3">
          {projects.slice(0, 5).map((project) => (
            <div
              key={project.slug}
              className="rounded-xl border border-border p-4 transition-colors hover:border-accent/40"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-display text-sm font-bold">{project.title}</h3>
                  <p className="text-xs text-accent">
                    {t.projects.categories[project.category]} · {project.year}
                  </p>
                </div>
                {project.status === "in-progress" && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/10 px-2 py-0.5 text-[10px] font-medium text-amber-300">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-300" />
                    {t.dashboard.inProgress}
                  </span>
                )}
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-border px-1.5 py-0.5 font-mono text-[10px] text-faint"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "certificates",
      icon: Award,
      title: t.certificates.title,
      content: (
        <div className="space-y-3">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="flex items-center gap-3 rounded-xl border border-border p-4 transition-colors hover:border-accent/40"
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${cert.accent}1a`, color: cert.accent }}
              >
                <Award className="h-5 w-5" aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-bold">
                  {t.certificates.items[cert.titleKey as keyof typeof t.certificates.items]}
                </h3>
                <p className="text-xs text-muted">
                  {cert.issuer} · {cert.year}
                </p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ];

  /* ── Printable resume data ──────────────────────────────── */
  const github = socials.find((s) => s.icon === "github");

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader title={t.resume.title} subtitle={t.resume.subtitle} />

      {/* Stats banner */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4"
      >
        {stats.map((s, i) => (
          <div
            key={s.key}
            className="rounded-xl border border-border bg-card p-4 text-center"
          >
            <p className="font-display text-2xl font-bold">
              <AnimatedCounter
                value={
                  s.key === "projects"
                    ? projectCount
                    : s.key === "technologies"
                      ? techCount
                      : s.value
                }
                suffix={s.suffix}
              />
            </p>
            <p className="mt-1 text-xs text-muted">
              {t.dashboard.stats[s.key as keyof typeof t.dashboard.stats]}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Resume sections (dashboard view) */}
      <div className="space-y-4">
        {sections.map((section, i) => (
          <motion.section
            key={section.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-2xl border border-border bg-card p-5"
          >
            <div className="mb-4 flex items-center gap-2">
              <section.icon className="h-4 w-4 text-accent" aria-hidden />
              <span className="section-label">{section.title}</span>
            </div>
            {section.content}
          </motion.section>
        ))}
      </div>

      {/* Download CV */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 flex justify-center"
      >
        <button
          onClick={handleDownload}
          disabled={generating}
          className="flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-background transition-all hover:brightness-110 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60"
        >
          {generating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              {t.resume.generatingPdf}
            </>
          ) : (
            <>
              <Download className="h-4 w-4" aria-hidden />
              {t.resume.downloadCv}
            </>
          )}
        </button>
      </motion.div>

      {/* ── Hidden printable resume (captured by html2pdf) ── */}
      <div
        ref={printRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          top: 0,
          width: "210mm",
          padding: "15mm",
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: "10pt",
          lineHeight: 1.5,
          color: "#1a1a2e",
          background: "#ffffff",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "12pt", borderBottom: "2pt solid #8b5cf6", paddingBottom: "8pt" }}>
          <h1 style={{ fontSize: "18pt", fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>
            {profile.name}
          </h1>
          <p style={{ fontSize: "10pt", color: "#8b5cf6", fontWeight: 600, margin: "2pt 0 0" }}>
            {profile.role}
          </p>
          <div style={{ display: "flex", gap: "12pt", marginTop: "4pt", fontSize: "8pt", color: "#555" }}>
            <span>{profile.location}</span>
            <span>|</span>
            <span>{profile.email}</span>
            {github && (
              <>
                <span>|</span>
                <span>github.com/{profile.githubUsername}</span>
              </>
            )}
          </div>
        </div>

        {/* Professional Summary */}
        <section style={{ marginBottom: "10pt" }}>
          <h2 style={sectionHeadingStyle}>{t.resume.professionalSummary.toUpperCase()}</h2>
          <p style={{ fontSize: "9pt", color: "#333", margin: 0 }}>{profile.bio}</p>
        </section>

        {/* Experience */}
        <section style={{ marginBottom: "10pt" }}>
          <h2 style={sectionHeadingStyle}>{t.experience.title.toUpperCase()}</h2>
          {experiences.map((exp) => (
            <div key={exp.id} style={{ marginBottom: "8pt" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div>
                  <strong style={{ fontSize: "10pt" }}>
                    {t.experience.roles[exp.roleKey as keyof typeof t.experience.roles]}
                  </strong>
                  <span style={{ fontSize: "9pt", color: "#8b5cf6", marginLeft: "6pt" }}>
                    — {exp.company}
                  </span>
                </div>
                <span style={{ fontSize: "8pt", color: "#777", fontStyle: "italic" }}>{exp.period}</span>
              </div>
              <p style={{ fontSize: "8pt", color: "#777", margin: "1pt 0 3pt" }}>{exp.location}</p>
              <ul style={{ margin: "0 0 3pt 14pt", padding: 0, fontSize: "9pt", color: "#333" }}>
                {exp.activitiesKeys.map((key) => (
                  <li key={key} style={{ marginBottom: "1pt" }}>
                    {t.experience.activitiesList[key as keyof typeof t.experience.activitiesList]}
                  </li>
                ))}
              </ul>
              <div style={{ display: "flex", gap: "4pt", flexWrap: "wrap" }}>
                {exp.stack.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontSize: "7pt",
                      padding: "1pt 5pt",
                      border: "0.5pt solid #ddd",
                      borderRadius: "3pt",
                      color: "#555",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Education */}
        <section style={{ marginBottom: "10pt" }}>
          <h2 style={sectionHeadingStyle}>{t.experience.educationTitle.toUpperCase()}</h2>
          {educationHistory.map((edu) => (
            <div key={edu.id} style={{ marginBottom: "6pt" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <strong style={{ fontSize: "10pt" }}>{edu.school}</strong>
                <span style={{ fontSize: "8pt", color: "#777", fontStyle: "italic" }}>{edu.period}</span>
              </div>
              {edu.major && <p style={{ fontSize: "9pt", color: "#8b5cf6", margin: "1pt 0" }}>{edu.major}</p>}
              <div style={{ display: "flex", gap: "4pt", flexWrap: "wrap", marginTop: "2pt" }}>
                {edu.focusKeys.map((key) => (
                  <span
                    key={key}
                    style={{
                      fontSize: "7pt",
                      padding: "1pt 5pt",
                      border: "0.5pt solid #ddd",
                      borderRadius: "3pt",
                      color: "#555",
                    }}
                  >
                    {t.experience.educationFocus[key as keyof typeof t.experience.educationFocus]}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Skills */}
        <section style={{ marginBottom: "10pt" }}>
          <h2 style={sectionHeadingStyle}>{t.skills.title.toUpperCase()}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6pt" }}>
            {skillGroups.map((group) => (
              <div key={group.category}>
                <p style={{ fontSize: "8pt", fontWeight: 700, color: "#8b5cf6", margin: "0 0 2pt", textTransform: "uppercase" }}>
                  {t.skills.categories[group.category]}
                </p>
                <p style={{ fontSize: "8pt", color: "#333", margin: 0 }}>
                  {group.skills.map((s) => s.name).join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section style={{ marginBottom: "10pt" }}>
          <h2 style={sectionHeadingStyle}>{t.projects.title.toUpperCase()}</h2>
          {projects.slice(0, 6).map((project) => (
            <div key={project.slug} style={{ marginBottom: "5pt" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <strong style={{ fontSize: "9pt" }}>{project.title}</strong>
                <span style={{ fontSize: "8pt", color: "#777" }}>
                  {t.projects.categories[project.category]} · {project.year}
                </span>
              </div>
              <p style={{ fontSize: "8pt", color: "#555", margin: "1pt 0 0" }}>
                {t.projectDetails[project.descriptionKey as keyof typeof t.projectDetails] as string}
              </p>
              <div style={{ display: "flex", gap: "3pt", flexWrap: "wrap", marginTop: "2pt" }}>
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontSize: "7pt",
                      padding: "1pt 4pt",
                      border: "0.5pt solid #ddd",
                      borderRadius: "3pt",
                      color: "#555",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Certificates */}
        <section style={{ marginBottom: "10pt" }}>
          <h2 style={sectionHeadingStyle}>{t.certificates.title.toUpperCase()}</h2>
          {certificates.map((cert) => (
            <div key={cert.id} style={{ marginBottom: "4pt", display: "flex", justifyContent: "space-between" }}>
              <div>
                <strong style={{ fontSize: "9pt" }}>
                  {t.certificates.items[cert.titleKey as keyof typeof t.certificates.items]}
                </strong>
                <span style={{ fontSize: "8pt", color: "#555", marginLeft: "4pt" }}>
                  — {cert.issuer}
                </span>
              </div>
              <span style={{ fontSize: "8pt", color: "#777", fontStyle: "italic" }}>{cert.year}</span>
            </div>
          ))}
        </section>

        {/* Footer */}
        <div
          style={{
            borderTop: "1pt solid #e5e7eb",
            paddingTop: "6pt",
            marginTop: "8pt",
            fontSize: "7pt",
            color: "#999",
            textAlign: "center",
          }}
        >
          {t.resume.generatedFrom} · {new Date().toLocaleDateString("id-ID")}
        </div>
      </div>
    </div>
  );
}

/* Heading style for printable sections */
const sectionHeadingStyle: React.CSSProperties = {
  fontSize: "10pt",
  fontWeight: 700,
  color: "#1a1a2e",
  borderBottom: "1pt solid #e5e7eb",
  paddingBottom: "3pt",
  marginBottom: "6pt",
  marginTop: 0,
  letterSpacing: "0.05em",
};
