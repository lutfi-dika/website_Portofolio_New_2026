import { NextRequest, NextResponse } from "next/server";
import { portfolioContext } from "@/lib/ai/engine";

// OpenAI-compatible chat completions endpoint.
// Works with OpenAI, Groq, or any OpenAI-compatible provider.
export async function POST(req: NextRequest) {
  const apiKey = process.env.AI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "AI API key not configured" },
      { status: 501 }
    );
  }

  let body: { question?: string; locale?: string } = {};
  try {
    body = await req.json();
  } catch {
    // ignore malformed JSON, handled below
  }

  const question = (body.question || "").trim();
  const locale = body.locale === "en" ? "en" : "id";
  if (!question) {
    return NextResponse.json({ error: "question required" }, { status: 400 });
  }

  const baseURL = (process.env.AI_BASE_URL || "https://api.openai.com/v1").replace(/\/$/, "");
  const model = process.env.AI_MODEL || "gpt-4o-mini";
  const lang = locale === "id" ? "Bahasa Indonesia" : "English";

  const system = [
    `You are Lutfi's helpful AI assistant on his portfolio website. You ARE also a general AI assistant. You are a separate assistant, NOT Lutfi himself. Never claim to be Lutfi or write as if you are Lutfi.`,
    `Answer ONLY in ${lang}. Keep it concise (2-4 short sentences), unless the user explicitly asks for detail.`,
    ``,
    `GENERAL QUESTIONS / KNOWLEDGE:`,
    `- Answer ANY question freely as a capable AI assistant, even if it is NOT about Lutfi.`,
    `- This covers general knowledge, programming help, explanations, opinions, tips, math, language, small talk, etc. Feel free to answer these accurately and helpfully.`,
    ``,
    `QUESTIONS ABOUT LUTFI (facts about the portfolio owner):`,
    `- Use ONLY the facts in the PORTFOLIO CONTEXT below. Do not invent or guess facts about Lutfi.`,
    `- If a question about Lutfi is not answered by that context, say you don't have that information and suggest what you CAN help with (skills, projects, experience, contact).`,
    `- When telling facts ABOUT Lutfi (his name, role, projects, etc.), you may say "Lutfi is...", "he is...", "his project...". Do NOT use first-person ("I am Lutfi...", "my project...") for Lutfi's identity.`,
    ``,
    `WRITING / CREATING REQUESTS:`,
    `- When the user asks you to WRITE or CREATE something (a bio, an intro, a caption, a description, a CV, content, etc.), treat it as a request for YOU to produce that content as a helpful assistant. If it is about Lutfi, write it ABOUT Lutfi using the facts below (do not impersonate him) and you may start with something like "Berikut bio singkat untuk website Anda:". If it is general, just create the requested content normally.`,
    ``,
    `--- PORTFOLIO CONTEXT (facts about Lutfi) ---`,
    portfolioContext(),
  ].join("\n");

  let res: Response;
  try {
    res = await fetch(`${baseURL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: system },
          { role: "user", content: question },
        ],
        temperature: 0.4,
      }),
    });
  } catch (e) {
    return NextResponse.json(
      { error: `Could not reach LLM provider: ${String(e)}` },
      { status: 502 }
    );
  }

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json(
      { error: `LLM request failed (${res.status}): ${text.slice(0, 500)}` },
      { status: 502 }
    );
  }

  const data = await res.json();
  const content: string = data?.choices?.[0]?.message?.content ?? "";
  return NextResponse.json({ answer: content.trim() });
}
