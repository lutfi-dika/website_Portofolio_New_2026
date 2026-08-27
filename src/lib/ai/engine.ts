import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { experiences } from "@/data/experience";
import { contactChannels } from "@/data/contact";

/**
 * Lutfi AI — answer engine.
 *
 * Architecture: answers are produced by an `AIProvider`. The default
 * `LocalProvider` matches questions against portfolio data only — it never
 * invents facts and replies with a fallback when it doesn't know.
 *
 * To plug in an LLM later: implement `AIProvider` (e.g. OpenAIProvider that
 * calls /api/ai with the portfolio context below as system prompt) and
 * register it in `getProvider()`. No UI changes required.
 */

export interface AIProvider {
  name: string;
  answer(question: string, locale: "id" | "en"): Promise<string>;
}

const FALLBACK = {
  id: "Maaf, informasi tersebut belum tersedia. Coba tanyakan tentang skill, project, pengalaman, atau cara menghubungi Lutfi!",
  en: "Sorry, that information is not available yet. Try asking about skills, projects, experience, or how to contact Lutfi!",
};

/** Compact portfolio context — also usable as an LLM system prompt. */
export function portfolioContext(): string {
  const skills = skillGroups.flatMap((g) => g.skills.map((s) => s.name)).join(", ");
  const proj = projects
    .map((p) => `${p.title} (${p.tech.join(", ")})`)
    .join("; ");
  const exp = experiences
    .map((e) => `${e.roleKey} at ${e.company}, ${e.location} (${e.period})`)
    .join("; ");
  return [
    `Name: ${profile.name}. Role: ${profile.role}. Location: ${profile.location}.`,
    `Education: ${profile.school} — ${profile.major}.`,
    `Bio: ${profile.bio}`,
    `Skills: ${skills}.`,
    `Projects: ${proj}.`,
    `Experience: ${exp}. Currently building: BSI Multi-Role Dashboard (~80%).`,
    `Business: ${profile.business} — ${profile.businessRole}.`,
    `Contact: email ${profile.email}, WhatsApp ${contactChannels[1].href}, GitHub https://github.com/${profile.githubUsername}.`,
  ].join("\n");
}

type Intent =
  | "whois"
  | "skills"
  | "projects"
  | "tech"
  | "pkl"
  | "contact"
  | "education"
  | "location"
  | "learning"
  | "business"
  | "services"
  | "availability"
  | "greeting"
  | "thanks"
  | "unknown";

function detectIntent(q: string): Intent {
  const s = q.toLowerCase();
  const has = (...words: string[]) => words.some((w) => s.includes(w));

  if (has("halo", "hai", "hi", "hello", "hey", "pagi", "siang", "sore", "malam", "yo", "oi")) return "greeting";
  if (has("terima kasih", "thanks", "thank", "makasih", "thx")) return "thanks";
  if (has("siapa", "who is", "who are", "tentang", "about", "perkenal", "intro")) return "whois";
  if (has("skill", "keahlian", "kemampuan", "able to", "capability")) return "skills";
  if (has("project", "proyek", "portfolio", "portofolio", "karya", "built", "buat")) return "projects";
  if (has("teknologi", "technology", "stack", "tools", "pakai apa")) return "tech";
  if (has("pkl", "magang", "intern", "bsi", "bank syariah", "praktik kerja", "pengalaman kerja", "work experience")) return "pkl";
  if (has("kontak", "contact", "hubungi", "email", "whatsapp", "reach", "menghubungi")) return "contact";
  if (has("sekolah", "school", "smk", "pendidikan", "education", "belajar di mana")) return "education";
  if (has("tinggal", "domisili", "lokasi", "where", "lokasinya", "alamat")) return "location";
  if (has("sedang belajar", "currently learning", "lagi belajar")) return "learning";
  if (has("webkraf", "studio", "bisnis", "business", "usaha", "jasa website", "web development service")) return "business";
  if (has("jasa", "service", "bisa buat", "can you build", "landing page", "company profile", "e-commerce", "dashboard", "ui ux", "design")) return "services";
  if (has("tersedia", "available", "open for", "buka project", "ready", "kosong", "sibuk")) return "availability";
  return "unknown";
}

const LocalProvider: AIProvider = {
  name: "local",

  async answer(question, locale) {
    // Simulate thinking latency so the typing indicator feels natural.
    await new Promise((r) => setTimeout(r, 500 + Math.random() * 600));
    return answerSync(question, locale);
  },
};

export function answerSync(question: string, locale: "id" | "en"): string {
  const intent = detectIntent(question);
  const id = locale === "id";

  switch (intent) {
    case "greeting":
      return id
        ? `Hai! 👋 Saya AI assistant-nya Lutfi. Ada yang bisa saya bantu? Tanya aja tentang skill, project, pengalaman, atau cara menghubungi Lutfi.`
        : `Hi! 👋 I'm Lutfi's AI assistant. How can I help? Feel free to ask about skills, projects, experience, or how to reach Lutfi.`;

    case "thanks":
      return id
        ? `Sama-sama! 😊 Kalau ada pertanyaan lain, langsung tanya aja ya.`
        : `You're welcome! 😊 If you have more questions, just ask away.`;

    case "whois":
      return id
        ? `${profile.name} — ${profile.role} dari ${profile.location}. Siswa ${profile.school} yang fokus membangun website modern, responsive, dan interaktif. Dia juga pemilik ${profile.business} dan saat ini terbuka untuk project baru.`
        : `${profile.name} — ${profile.role} based in ${profile.location}. A student at ${profile.school} focused on building modern, responsive, interactive websites. He also runs ${profile.business} and is currently open for new projects.`;

    case "skills": {
      const top = skillGroups[0].skills.slice(0, 5).map((s) => s.name).join(", ");
      const backend =
        skillGroups.find((g) => g.category === "backend")?.skills.map((s) => s.name).join(", ") ??
        "";
      return id
        ? `Skill utamanya di frontend: ${top}. Untuk backend menguasai dasar ${backend}. Lengkapnya ada di halaman Skills ya!`
        : `Core frontend skills: ${top}. On the backend he knows the fundamentals of ${backend}. Check the Skills page for the full list!`;
    }

    case "projects": {
      const completed = projects.filter((p) => p.status === "completed");
      const inProgress = projects.filter((p) => p.status === "in-progress");
      return id
        ? `Project yang sudah selesai: ${completed.map((p) => p.title).join(", ")}. Sedang dikerjakan: ${inProgress.map((p) => p.title).join(", ") || "tidak ada"}. Semua detail ada di halaman Projects — bisa difilter per kategori dan status.`
        : `Completed projects: ${completed.map((p) => p.title).join(", ")}. Currently working on: ${inProgress.map((p) => p.title).join(", ") || "none"}. Full details are on the Projects page — filterable by category and status.`;
    }

    case "tech": {
      const all = Array.from(new Set(projects.flatMap((p) => p.tech)));
      return id
        ? `Teknologi yang dipakai antara lain: ${all.join(", ")}.`
        : `Technologies used include: ${all.join(", ")}.`;
    }

    case "pkl": {
      const e = experiences[0];
      return id
        ? `PKL dilakukan di ${e.company} — ${e.location} (${e.period}) sebagai Web Developer / IT. Mengerjakan pengembangan website internal, dashboard monitoring, implementasi UI, database MySQL, testing, dan dokumentasi teknis.`
        : `The internship was at ${e.company} — ${e.location} (${e.period}) as Web Developer / IT. Working on internal website development, monitoring dashboards, UI implementation, MySQL databases, testing, and technical documentation.`;
    }

    case "contact":
      return id
        ? `Bisa hubungi lewat email di ${profile.email}, WhatsApp, atau Instagram. Link lengkapnya ada di halaman Kontak — atau langsung isi form di sana.`
        : `You can reach out via email at ${profile.email}, WhatsApp, or Instagram. All links are on the Contact page — or just fill in the form there.`;

    case "education":
      return id
        ? `${profile.name} adalah siswa ${profile.school}, jurusan ${profile.major}, angkatan ${profile.schoolPeriod.split(" — ")[0]}–${profile.schoolPeriod.split(" — ")[1]}.`
        : `${profile.name} is a student at ${profile.school}, majoring in ${profile.major}, class of ${profile.schoolPeriod}.`;

    case "location":
      return id
        ? `Domisili di ${profile.location} — timezone Asia/Jakarta (WIB).`
        : `Based in ${profile.location} — Asia/Jakarta timezone (WIB).`;

    case "learning":
      return id
        ? "Sedang mendalami Next.js, Laravel, UI/UX, dan JavaScript. Progress-nya bisa dilihat di dashboard."
        : "Currently diving into Next.js, Laravel, UI/UX, and JavaScript. Progress is visible on the dashboard.";

    case "business":
      return id
        ? `${profile.business} adalah bisnis web development yang dimiliki Lutfi. Melayani pembuatan website profesional, company profile, landing page, e-commerce, dashboard, hingga UI/UX design. Kunjungi ${contactChannels[0].href.replace("mailto:", "email ")} atau WhatsApp untuk info lebih lanjut.`
        : `${profile.business} is Lutfi's web development business. Services include professional websites, company profiles, landing pages, e-commerce, dashboards, and UI/UX design. Visit ${contactChannels[0].href.replace("mailto:", "email ")} or WhatsApp for more info.`;

    case "services":
      return id
        ? `${profile.business} melayani: Website Development, Company Profile, Landing Page, E-Commerce, Dashboard & Web Application, UI/UX Design, SEO & Performance, dan Maintenance. Mau tanya detail tentang layanan nào?`
        : `${profile.business} offers: Website Development, Company Profile, Landing Page, E-Commerce, Dashboard & Web Application, UI/UX Design, SEO & Performance, and Maintenance. Want to know more about any specific service?`;

    case "availability":
      return id
        ? `Lutfi saat ini terbuka untuk project baru! 🟢 Bisa hubungi lewat WhatsApp atau email di ${profile.email} untuk diskusi kebutuhan project kamu.`
        : `Lutfi is currently open for new projects! 🟢 You can reach out via WhatsApp or email at ${profile.email} to discuss your project needs.`;

    default:
      return FALLBACK[id ? "id" : "en"];
  }
}

/** Provider registry — add real LLM providers here later. */
function getProvider(): AIProvider {
  return LocalProvider;
}

export async function askLutfiAI(question: string, locale: "id" | "en") {
  const provider = getProvider();
  try {
    return await provider.answer(question, locale);
  } catch {
    return FALLBACK[locale === "id" ? "id" : "en"];
  }
}
