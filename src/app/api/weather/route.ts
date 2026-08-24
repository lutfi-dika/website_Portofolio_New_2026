import { NextResponse } from "next/server";

export const revalidate = 1800;

/**
 * Weather for Bekasi, Indonesia via Open-Meteo (no API key required).
 * Returns `ok: false` on failure — the widget renders its fallback state.
 */
export async function GET() {
  try {
    const url =
      "https://api.open-meteo.com/v1/forecast?latitude=-6.23827&longitude=106.97557" +
      "&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=Asia%2FJakarta";

    const res = await fetch(url, { next: { revalidate } });
    if (!res.ok) return NextResponse.json({ ok: false }, { status: 200 });

    const data = (await res.json()) as {
      current?: {
        temperature_2m?: number;
        relative_humidity_2m?: number;
        weather_code?: number;
        wind_speed_10m?: number;
      };
    };
    const c = data.current;
    if (!c || typeof c.temperature_2m !== "number") {
      return NextResponse.json({ ok: false }, { status: 200 });
    }

    return NextResponse.json({
      ok: true,
      temperature: Math.round(c.temperature_2m),
      humidity: c.relative_humidity_2m ?? null,
      windSpeed: c.wind_speed_10m != null ? Math.round(c.wind_speed_10m) : null,
      code: c.weather_code ?? -1,
    });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
