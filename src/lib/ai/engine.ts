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
  id: "Maaf, informasi tersebut belum tersedia.",
  en: "Sorry, that information is not available yet.",
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
  | "unknown";

function detectIntent(q: string): Intent {
  const s = q.toLowerCase();
  const has = (...words: string[]) => words.some((w) => s.includes(w));

  if (has("siapa", "who is", "who are", "tentang", "about", "perkenal", "intro")) return "whois";
  if (has("skill", "keahlian", "kemampuan", "able to", "capability")) return "skills";
  if (has("project", "proyek", "portfolio", "portofolio", "karya", "built", "buat")) return "projects";
  if (has("teknologi", "technology", "stack", "tools", "pakai apa")) return "tech";
  if (has("pkl", "magang", "intern", "bsi", "bank syariah", "praktik kerja")) return "pkl";
  if (has("kontak", "contact", "hubungi", "email", "whatsapp", "reach", "menghubungi")) return "contact";
  if (has("sekolah", "school", "smk", "pendidikan", "education", "belajar di mana")) return "education";
  if (has("tinggal", "domisili", "lokasi", "where", "lokasinya", "alamat")) return "location";
  if (has("sedang belajar", "currently learning", "lagi belajar")) return "learning";
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
    case "whois":
      return id
        ? `${profile.name} — ${profile.role} dari ${profile.location}. Siswa ${profile.school} yang fokus membangun website modern, responsive, dan interaktif. Saat ini terbuka untuk project baru.`
        : `${profile.name} — ${profile.role} based in ${profile.location}. A student at ${profile.school} focused on building modern, responsive, interactive websites. Currently open for new projects.`;

    case "skills": {
      const top = skillGroups[0].skills.slice(0, 5).map((s) => s.name).join(", ");
      const backend = skillGroups[1].skills.map((s) => s.name).join(", ");
      return id
        ? `Skill utamanya di frontend: ${top}. Untuk backend menguasai dasar ${backend}. Lengkapnya ada di halaman Skills ya!`
        : `Core frontend skills: ${top}. On the backend he knows the fundamentals of ${backend}. Check the Skills page for the full list!`;
    }

    case "projects":
      return id
        ? `Project utamanya: ${projects.map((p) => p.title).join(", ")}. Semua detail ada di halaman Projects — bisa difilter per kategori dan status.`
        : `Main projects: ${projects.map((p) => p.title).join(", ")}. Full details are on the Projects page — filterable by category and status.`;

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
        ? `Bisa hubungi lewat email di ${profile.email}, WhatsApp, Instagram, atau LinkedIn. Link lengkapnya ada di halaman Kontak — atau langsung isi form di sana.`
        : `You can reach out via email at ${profile.email}, WhatsApp, Instagram, or LinkedIn. All links are on the Contact page — or just fill in the form there.`;

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
