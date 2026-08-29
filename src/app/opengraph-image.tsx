import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "KRAFDEV Digital Technology Studio — Jasa Pembuatan Website Profesional";

async function loadLogo(): Promise<string> {
  try {
    const file = await readFile(path.join(process.cwd(), "public", "Avatar.png"));
    return `data:image/png;base64,${file.toString("base64")}`;
  } catch {
    return "";
  }
}

export default async function OpengraphImage() {
  const logo = await loadLogo();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background: "#04060d",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logo}
              width={96}
              height={96}
              alt=""
              style={{
                width: 96,
                height: 96,
                borderRadius: 9999,
                border: "4px solid #94a3b8",
                objectFit: "cover",
              }}
            />
          ) : (
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 9999,
                background: "#94a3b8",
              }}
            />
          )}
          <p
            style={{
              color: "#94a3b8",
              fontSize: 26,
              letterSpacing: 6,
              textTransform: "uppercase",
              margin: 0,
              fontFamily: "monospace",
            }}
          >
            {profile.business}
          </p>
        </div>

        <h1
          style={{
            marginTop: 28,
            fontSize: 60,
            fontWeight: 700,
            lineHeight: 1.05,
            color: "#f8fafc",
            margin: "28px 0 0",
            maxWidth: 900,
          }}
        >
          Jasa Pembuatan Website Profesional.
        </h1>

        <p
          style={{
            marginTop: 20,
            fontSize: 38,
            margin: "20px 0 0",
            background: "linear-gradient(100deg, #67e8f9, #38bdf8, #a78bfa)",
            backgroundClip: "text",
            color: "transparent",
            fontWeight: 600,
          }}
        >
          Company Profile &middot; Landing Page &middot; E-Commerce &middot; UI/UX &middot; SEO
        </p>

        <p style={{ marginTop: 22, fontSize: 26, color: "#94a3b8", margin: "22px 0 0" }}>
          Founder: Muhammad Lutfi Andika &middot; {profile.business}
        </p>
      </div>
    ),
    size
  );
}
