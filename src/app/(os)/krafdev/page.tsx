import type { Metadata } from "next";
import Link from "next/link";
import {
  Layout,
  ShoppingCart,
  Gauge,
  Palette,
  Search,
  ArrowRight,
  Check,
  Globe,
  Smartphone,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import { profile, socials } from "@/data/profile";
import { projects } from "@/data/projects";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "KRAFDEV Digital Technology Studio — Jasa Pembuatan Website Profesional",
  description:
    "KRAFDEV Digital Technology Studio — jasa pembuatan website profesional di Indonesia. Layanan company profile, landing page, e-commerce, dashboard web app, UI/UX design, dan SEO untuk bisnis Anda. Founder Muhammad Lutfi Andika. Gratis konsultasi via WhatsApp.",
  keywords: [
    "jasa pembuatan website",
    "jasa pembuatan website profesional",
    "pembuatan website murah",
    "jasa web development",
    "company profile website",
    "landing page bisnis",
    "toko online",
    "e-commerce website",
    "jasa dashboard website",
    "web application development",
    "UI/UX design",
    "jasa SEO website",
    "web developer Indonesia",
    "KRAFDEV",
    "KRAFDEV Digital Technology Studio",
  ],
  alternates: { canonical: "/krafdev" },
  openGraph: {
    type: "website",
    url: `${siteUrl}/krafdev`,
    title: "KRAFDEV Digital Technology Studio — Jasa Pembuatan Website Profesional",
    description:
      "Bangun website profesional untuk bisnis Anda bersama KRAFDEV Digital Technology Studio: company profile, landing page, e-commerce, dashboard, UI/UX design, dan SEO.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "KRAFDEV Digital Technology Studio" }],
  },
};

const services = [
  {
    icon: Layout,
    title: "Company Profile",
    desc: "Website profil perusahaan yang membangun kredibilitas dan memperkenalkan bisnis Anda secara profesional.",
  },
  {
    icon: Globe,
    title: "Landing Page",
    desc: "Halaman promosi yang fokus mengubah pengunjung menjadi calon pelanggan untuk produk atau campaign Anda.",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce / Toko Online",
    desc: "Platform jualan online dengan katalog produk, keranjang, dan pembayaran yang mudah digunakan.",
  },
  {
    icon: Gauge,
    title: "Dashboard & Web App",
    desc: "Aplikasi web dan dashboard monitoring data yang membantu operasional bisnis Anda lebih efisien.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    desc: "Desain antarmuka yang modern, menarik, dan mudah dipakai untuk meningkatkan pengalaman pengguna.",
  },
  {
    icon: Search,
    title: "SEO & Performa",
    desc: "Optimasi website agar mudah ditemukan di Google dan tampil cepat di semua perangkat.",
  },
];

const process = [
  {
    step: "01",
    title: "Konsultasi",
    desc: "Diskusikan kebutuhan, tujuan, dan konsep website bisnis Anda secara gratis.",
  },
  {
    step: "02",
    title: "Desain & Perencanaan",
    desc: "Kami siapkan desain UI/UX dan struktur konten sebelum mulai membangun.",
  },
  {
    step: "03",
    title: "Pengembangan",
    desc: "Website dibangun secara responsif, cepat, dan aman dengan teknologi modern.",
  },
  {
    step: "04",
    title: "Launch & Dukungan",
    desc: "Website diluncurkan dan didukung dengan maintenance agar tetap prima.",
  },
];

const whyPoints = [
  "Desain modern & profesional",
  "Responsive di semua perangkat",
  "Kecepatan & performa tinggi",
  "SEO friendly",
  "Aman & scalable",
  "Harga transparan & terjangkau",
];

export default function KrafdevPage() {
  const featured = projects.slice(0, 6);

  return (
    <div className="mx-auto max-w-7xl space-y-16">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 sm:p-12 lg:p-16">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {profile.business}
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Jasa Pembuatan Website Profesional untuk Bisnis Anda
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            KRAFDEV Digital Technology Studio membantu bisnis di Indonesia membangun website yang
            menarik, cepat, dan mudah ditemukan — dari company profile, landing page, e-commerce,
            dashboard, hingga UI/UX design dan SEO. Dibangun langsung oleh founder{" "}
            <span className="font-medium text-foreground">Muhammad Lutfi Andika</span>.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://wa.me/6285135977841?text=Halo%20KRAFDEV%2C%20saya%20ingin%20konsultasi%20pembuatan%20website"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-[0.98]"
            >
              Konsultasi Gratis <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-semibold text-muted transition-all hover:border-border-strong hover:text-foreground"
            >
              Lihat Portofolio
            </Link>
          </div>
          <p className="mt-6 font-mono text-xs text-faint">
            {profile.location} · Available for Projects · Respons cepat via WhatsApp
          </p>
        </div>
      </section>

      {/* Services */}
      <section aria-label="Layanan">
        <div className="mb-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
            Layanan Kami
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight">
            Solusi Digital Lengkap untuk Bisnis Anda
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            Dari membangun dari nol sampai mengoptimasi website yang sudah ada — kami siap membantu
            kebutuhan digital bisnis Anda.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent/40"
            >
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <s.icon className="h-5 w-5" />
              </span>
              <h3 className="font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why KRAFDEV */}
      <section aria-label="Mengapa KRAFDEV">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
              Mengapa KRAFDEV
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight">
              Website Profesional, Cepat, dan Terpercaya
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Setiap website yang kami bangun didesain dengan teknologi web modern (React, Next.js,
              Tailwind CSS) sehingga cepat, aman, dan mudah dikembangkan di masa depan.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {whyPoints.map((point) => (
                <li key={point} className="flex items-center gap-2.5 text-sm text-muted">
                  <Check className="h-4 w-4 shrink-0 text-accent" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: ShieldCheck, num: "100%", label: "Responsive" },
              { icon: Rocket, num: "Cepat", label: "Loading" },
              { icon: Smartphone, num: "SEO", label: "Friendly" },
            ].map((f) => (
              <div
                key={f.label}
                className="flex flex-col items-center rounded-2xl border border-border bg-card p-5 text-center"
              >
                <f.icon className="mb-3 h-6 w-6 text-accent" />
                <span className="font-display text-lg font-bold">{f.num}</span>
                <span className="text-xs text-muted">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section aria-label="Proses">
        <div className="mb-6 text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
            Proses Pengerjaan
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight">
            Empat Langkah Menuju Website Impian
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p) => (
            <div key={p.step} className="rounded-2xl border border-border bg-card p-6">
              <span className="font-mono text-2xl font-bold text-accent">{p.step}</span>
              <h3 className="mt-3 font-display text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Selected work */}
      <section aria-label="Portofolio">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
              Portofolio
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight">
              Beberapa Project Terbaik Kami
            </h2>
          </div>
          <Link
            href="/projects"
            className="hidden items-center gap-1 text-sm font-medium text-accent hover:underline sm:inline-flex"
          >
            Semua Project <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent/40"
            >
              <div
                className="mb-4 h-24 w-full rounded-xl"
                style={{
                  background: `linear-gradient(135deg, ${p.accent}22, ${p.accent2}08, var(--card))`,
                }}
              />
              <span className="font-mono text-[10px] uppercase tracking-wider text-faint">
                {p.category} · {p.year}
              </span>
              <h3 className="mt-1 font-display text-base font-semibold group-hover:text-accent">
                {p.title}
              </h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.tech.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-border px-1.5 py-0.5 font-mono text-[10px] text-faint"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden rounded-3xl border border-accent/30 bg-accent/10 p-8 text-center sm:p-12">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            Siap Membangun Website untuk Bisnis Anda?
          </h2>
          <p className="mt-3 text-sm text-muted sm:text-base">
            Konsultasi dulu gratis. Ceritakan kebutuhan bisnis Anda dan kami bantu wujudkan solusi
            digital terbaiknya.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/6285135977841?text=Halo%20KRAFDEV%2C%20saya%20ingin%20konsultasi%20pembuatan%20website"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-[0.98]"
            >
              Chat WhatsApp <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${profile.email}?subject=Konsultasi%20Pembuatan%20Website`}
              className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-muted transition-all hover:border-border-strong hover:text-foreground"
            >
              Email Kami
            </a>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 font-mono text-[11px] text-faint">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* JSON-LD for this business page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "Web Development",
            provider: {
              "@type": "Organization",
              name: profile.business,
              url: siteUrl,
              founder: { "@type": "Person", name: profile.name },
            },
            areaServed: { "@type": "Country", name: "Indonesia" },
            availableLanguage: ["id", "en"],
            description:
              "Jasa pembuatan website profesional: company profile, landing page, e-commerce, dashboard web app, UI/UX design, dan SEO.",
          }),
        }}
      />
    </div>
  );
}
