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
import { experiences, educationHistory } from "@/data/experience";
import { PageHeader } from "@/components/os/DashboardWidget";
import { useT } from "@/lib/i18n";
import { AnimatedCounter } from "@/components/os/widgets";

// Data sertifikat
const myCertificates = [
  {
    id: "1",
    titleKey: "itechnoCup",
    fallbackTitle: "Itecnho Cup 2025 - Juara 3 Lomba Frontend",
    issuer: "Itechno Cup",
    year: "2025",
    accent: "#38bdf8",
    image: "/certificates/itechno-cup-2025.jpeg",
  },
  {
    id: "2",
    titleKey: "cyberHeist",
    fallbackTitle: "Peserta Lomba Clash of Cyber Heist",
    issuer: "Cyber Security",
    year: "2026",
    accent: "#38bdf8",
    image: "/certificates/clash-of-cyber-heist.jpeg",
  },
  {
    id: "3",
    titleKey: "icomFeast",
    fallbackTitle: "Juara 3 Icom Feast 2026 Bidang Front End Dev",
    issuer: "Icom Feast",
    year: "2026",
    accent: "#38bdf8",
    image: "/certificates/icom-feast-2026.jpeg",
  },
  {
    id: "4",
    titleKey: "idnBoarding",
    fallbackTitle: "Peserta Lomba IDN Boarding School Web Dev",
    issuer: "IDN Boarding School",
    year: "2026",
    accent: "#38bdf8",
    image: "/certificates/idn-boarding-school.jpeg",
  },
  {
    id: "5",
    titleKey: "lksKompetisi",
    fallbackTitle:
      "LKS Lomba Kompetisi Siswa Bidang Lomba Cyber Scecurity 2026",
    issuer: "LKS SMK",
    year: "2026",
    accent: "#38bdf8",
    image: "/certificates/LKS-lomba-kompetisi.jpeg",
  },
  {
    id: "6",
    titleKey: "piagamPenghargaan",
    fallbackTitle: "Piagam Penghargaan Siswa Berprestasi ",
    issuer: "Sekolah / Instansi",
    year: "2026",
    accent: "#38bdf8",
    image: "/certificates/Piagam Penghargaan.jpeg",
  },
];

export function ResumeView() {
  const t = useT();
  const printRef = useRef<HTMLDivElement>(null);
  const avatarImgRef = useRef<HTMLImageElement>(null);
  const certImgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const [generating, setGenerating] = useState(false);

  const techCount = skillGroups.reduce((n, g) => n + g.skills.length, 0);
  const projectCount = projects.length;

  const convertImageToBase64 = (
    imgElement: HTMLImageElement,
  ): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      canvas.width = imgElement.naturalWidth || 300;
      canvas.height = imgElement.naturalHeight || 200;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        try {
          ctx.drawImage(imgElement, 0, 0);
          resolve(canvas.toDataURL("image/jpeg"));
          return;
        } catch (e) {
          console.warn("Gagal konversi canvas gambar:", e);
        }
      }
      resolve(imgElement.src);
    });
  };

  const handleDownload = async () => {
    if (!printRef.current || generating) return;
    setGenerating(true);

    const element = printRef.current;

    try {
      if (avatarImgRef.current) {
        avatarImgRef.current.src = await convertImageToBase64(
          avatarImgRef.current,
        );
      }

      for (let i = 0; i < certImgRefs.current.length; i++) {
        const imgEl = certImgRefs.current[i];
        if (imgEl) {
          imgEl.src = await convertImageToBase64(imgEl);
        }
      }

      element.style.display = "block";
      await new Promise((r) => setTimeout(r, 800));

      const html2pdf = (await import("html2pdf.js")).default;

      const opt = {
        margin: [10, 10, 10, 10] as [number, number, number, number],
        filename: `CV-${profile.name.replace(/\s+/g, "-")}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          logging: false,
          backgroundColor: "#f8fafc",
          windowWidth: 800,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error("PDF generation failed, falling back to print:", err);
      window.print();
    } finally {
      setGenerating(false);
    }
  };

  /* ── Visible dashboard sections ── */
  const sections = [
    {
      id: "profile",
      icon: User,
      title: t.resume.profile,
      content: (
        <div className="space-y-3">
          <p className="text-sm leading-relaxed text-muted text-justify">
            {t.about.bio}
          </p>
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
                    {
                      t.experience.roles[
                        exp.roleKey as keyof typeof t.experience.roles
                      ]
                    }
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
                    className="flex items-start gap-2 text-xs text-muted text-justify"
                  >
                    <span
                      className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent"
                      aria-hidden
                    />
                    {
                      t.experience.activitiesList[
                        key as keyof typeof t.experience.activitiesList
                      ]
                    }
                  </li>
                ))}
              </ul>
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
              {edu.place && (
                <p className="text-xs text-muted">📍 {edu.place}</p>
              )}
              <p className="mt-1 font-mono text-[10px] text-faint">
                {edu.period}
              </p>
              {edu.focusKeys && edu.focusKeys.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {edu.focusKeys.map((key) => (
                    <span key={key} className="rounded px-2 py-0.5 text-[10px]">
                      {t.experience.educationFocus?.[
                        key as keyof typeof t.experience.educationFocus
                      ] || key}
                    </span>
                  ))}
                </div>
              )}
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
              <h3 className="font-display text-sm font-bold">
                {project.title}
              </h3>
              <p className="text-xs text-accent">
                {t.projects.categories[project.category]} · {project.year}
              </p>
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
          {myCertificates.map((cert) => (
            <div
              key={cert.id}
              className="flex items-center gap-3 rounded-xl border border-border p-4 transition-colors hover:border-accent/40"
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl overflow-hidden"
                style={{
                  backgroundColor: `${cert.accent}1a`,
                  color: cert.accent,
                }}
              >
                <img
                  src={cert.image}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-bold">
                  {t.certificates.items[
                    cert.titleKey as keyof typeof t.certificates.items
                  ] || cert.fallbackTitle}
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
        {stats.map((s) => (
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

      {/* Resume sections */}
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

      {/* Download CV Button */}
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

      {/* ── Hidden printable resume (PDF) ── */}
      <div
        style={{
          position: "absolute",
          left: "-9999px",
          top: "0",
          width: "210mm",
          pointerEvents: "none",
          opacity: 0,
        }}
      >
        <div
          ref={printRef}
          style={{
            width: "210mm",
            padding: "15mm 12mm",
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontSize: "10pt",
            lineHeight: 1.5,
            color: "#1e293b",
            background: "#f8fafc",
          }}
        >
          {/* HEADER CARD */}
          <div
            style={{
              background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
              color: "#ffffff",
              borderRadius: "12px",
              padding: "20px 24px",
              marginBottom: "14px",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                <tr>
                  <td
                    style={{
                      width: "150px",
                      verticalAlign: "middle",
                      paddingRight: "20px",
                    }}
                  >
                    <div
                      style={{
                        width: "130px",
                        height: "130px",
                        borderRadius: "50%",
                        overflow: "hidden",
                        border: "3px solid #38bdf8",
                        flexShrink: 0,
                        backgroundColor: "#334155",
                        position: "relative",
                      }}
                    >
                      <img
                        ref={avatarImgRef}
                        src="/images/Logo.jpg"
                        alt={profile.name}
                        crossOrigin="anonymous"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "center",
                          display: "block",
                        }}
                      />
                    </div>
                  </td>
                  <td style={{ verticalAlign: "middle", paddingLeft: "0" }}>
                    <h1
                      style={{
                        fontSize: "22pt",
                        fontWeight: 700,
                        margin: "0 0 4px 0",
                        color: "#ffffff",
                        letterSpacing: "-0.5px",
                      }}
                    >
                      {profile.name}
                    </h1>
                    <p
                      style={{
                        fontSize: "11pt",
                        fontWeight: 600,
                        color: "#38bdf8",
                        margin: "0 0 8px 0",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {profile.role}
                    </p>
                    <div style={{ fontSize: "9pt", color: "#cbd5e1" }}>
                      <span style={{ marginRight: "16px" }}>
                        📍 {profile.location}
                      </span>
                      <span style={{ marginRight: "16px" }}>
                        ✉️ {profile.email}
                      </span>
                      {github && (
                        <span>💻 github.com/{profile.githubUsername}</span>
                      )}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Professional Summary */}
          <div style={pdfCardStyle}>
            <h2 style={pdfHeadingStyle}>
              {t.resume.professionalSummary.toUpperCase()}
            </h2>
            <p
              style={{
                margin: 0,
                color: "#475569",
                fontSize: "9.5pt",
                textAlign: "justify",
              }}
            >
              {profile.bio}
            </p>
          </div>

          {/* Experience */}
          <div style={pdfCardStyle}>
            <h2 style={pdfHeadingStyle}>{t.experience.title.toUpperCase()}</h2>
            {experiences.map((exp) => (
              <div key={exp.id} style={{ marginBottom: "12px" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <tbody>
                    <tr>
                      <td style={{ verticalAlign: "top", padding: 0 }}>
                        <p
                          style={{
                            fontSize: "10.5pt",
                            fontWeight: 700,
                            color: "#1e293b",
                            margin: 0,
                          }}
                        >
                          {
                            t.experience.roles[
                              exp.roleKey as keyof typeof t.experience.roles
                            ]
                          }
                        </p>
                        <p
                          style={{
                            fontSize: "9.5pt",
                            fontWeight: 600,
                            color: "#0284c7",
                            margin: "2px 0 0 0",
                          }}
                        >
                          {exp.company}
                        </p>
                        <p
                          style={{
                            fontSize: "8.5pt",
                            color: "#64748b",
                            margin: "2px 0 0 0",
                          }}
                        >
                          📍 {exp.location}
                        </p>
                      </td>
                      <td
                        style={{
                          verticalAlign: "top",
                          textAlign: "right",
                          padding: 0,
                          width: "120px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "9pt",
                            fontWeight: 700,
                            color: "#0f172a",
                            backgroundColor: "#f1f5f9",
                            padding: "2px 10px",
                            borderRadius: "4px",
                            display: "inline-block",
                          }}
                        >
                          {exp.period}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>

          {/* Education */}
          <div style={pdfCardStyle}>
            <h2 style={pdfHeadingStyle}>
              {t.experience.educationTitle.toUpperCase()}
            </h2>
            {educationHistory.map((edu) => (
              <div key={edu.id} style={{ marginBottom: "14px" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <tbody>
                    <tr>
                      <td style={{ verticalAlign: "top", padding: 0 }}>
                        <p
                          style={{
                            fontSize: "10.5pt",
                            fontWeight: 700,
                            color: "#1e293b",
                            margin: 0,
                          }}
                        >
                          {edu.school}
                        </p>
                        {edu.major && (
                          <p
                            style={{
                              fontSize: "9.5pt",
                              fontWeight: 600,
                              color: "#0284c7",
                              margin: "2px 0 0 0",
                            }}
                          >
                            {edu.major}
                          </p>
                        )}
                        {edu.place && (
                          <p
                            style={{
                              fontSize: "8.5pt",
                              color: "#64748b",
                              margin: "2px 0 0 0",
                            }}
                          >
                            📍 {edu.place}
                          </p>
                        )}
                        {edu.focusKeys && edu.focusKeys.length > 0 && (
                          <div style={{ marginTop: "4px" }}>
                            {edu.focusKeys.map((key) => {
                              const label =
                                t.experience.educationFocus?.[
                                  key as keyof typeof t.experience.educationFocus
                                ] || key;
                              return (
                                <span
                                  key={key}
                                  style={{
                                    display: "inline-block",
                                    background: "#e2e8f0",
                                    color: "#1e293b",
                                    fontSize: "7.5pt",
                                    padding: "1px 8px",
                                    borderRadius: "4px",
                                    marginRight: "4px",
                                    marginBottom: "2px",
                                  }}
                                >
                                  {label}
                                </span>
                              );
                            })}
                          </div>
                        )}
                      </td>
                      <td
                        style={{
                          verticalAlign: "top",
                          textAlign: "right",
                          padding: 0,
                          width: "120px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "9pt",
                            fontWeight: 700,
                            color: "#0f172a",
                            backgroundColor: "#f1f5f9",
                            padding: "2px 10px",
                            borderRadius: "4px",
                            display: "inline-block",
                          }}
                        >
                          {edu.period}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div style={pdfCardStyle}>
            <h2 style={pdfHeadingStyle}>{t.skills.title.toUpperCase()}</h2>
            {skillGroups.map((group, idx) => (
              <div
                key={group.category}
                style={{
                  marginBottom: idx < skillGroups.length - 1 ? "8px" : 0,
                }}
              >
                <p
                  style={{
                    fontSize: "9pt",
                    fontWeight: 700,
                    color: "#0f172a",
                    margin: "0 0 4px 0",
                  }}
                >
                  {t.skills.categories[group.category]}
                </p>
                <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                  {group.skills.map((skill) => (
                    <span key={skill.name} style={pdfBadgeStyle}>
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Certificates */}
          <div style={pdfCardStyle}>
            <h2 style={pdfHeadingStyle}>
              {t.certificates.title.toUpperCase()}
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {myCertificates.map((cert, index) => (
                <div
                  key={cert.id}
                  style={{
                    background: "#f8fafc",
                    padding: "10px 12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                    borderRadius: "6px",
                    border: "1px solid #e2e8f0",
                    width: "100%",
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontSize: "9pt",
                        fontWeight: 700,
                        color: "#1e293b",
                        margin: "0 0 2px 0",
                        lineHeight: 1.2,
                      }}
                    >
                      {t.certificates.items[
                        cert.titleKey as keyof typeof t.certificates.items
                      ] || cert.fallbackTitle}
                    </p>
                    <p style={{ fontSize: "8pt", color: "#64748b", margin: 0 }}>
                      {cert.issuer} ·{" "}
                      <span style={{ fontWeight: 600, color: "#0284c7" }}>
                        {cert.year}
                      </span>
                    </p>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      height: "160px",
                      borderRadius: "4px",
                      overflow: "hidden",
                      backgroundColor: "#f1f5f9",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      ref={(el: HTMLImageElement | null) => {
                        certImgRefs.current[index] = el;
                      }}
                      src={cert.image}
                      alt={cert.fallbackTitle}
                      crossOrigin="anonymous"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        width: "auto",
                        height: "auto",
                        objectFit: "contain",
                        display: "block",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── PDF Styling Helpers ── */
const pdfCardStyle: React.CSSProperties = {
  background: "#ffffff",
  borderRadius: "10px",
  padding: "14px 18px",
  marginBottom: "12px",
};

const pdfHeadingStyle: React.CSSProperties = {
  fontSize: "11pt",
  fontWeight: 700,
  color: "#0f172a",
  borderLeft: "4px solid #38bdf8",
  paddingLeft: "8px",
  margin: "0 0 8px 0",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const pdfBadgeStyle: React.CSSProperties = {
  display: "inline-block",
  background: "#f1f5f9",
  color: "#334155",
  fontSize: "7.5pt",
  fontWeight: 600,
  padding: "2px 6px",
  borderRadius: "4px",
  border: "1px solid #e2e8f0",
};
