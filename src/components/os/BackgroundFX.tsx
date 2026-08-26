"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Layered background: subtle grid + noise.
 * Glow layer is very subtle — disabled when data-glow="off".
 */
export function BackgroundFX() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 bg-noise opacity-[0.02]" />

      {/* GLOW LAYER — very subtle, decorative only */}
      <div data-glow-layer className="contents [[data-glow='off']_&]:hidden">
        <div
          className="absolute -top-48 left-1/3 h-[350px] w-[350px] rounded-full blur-[120px] motion-reduce:opacity-0"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--accent) 5%, transparent), transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-52 right-[15%] h-[300px] w-[300px] rounded-full blur-[120px] motion-reduce:opacity-0"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--accent-strong) 4%, transparent), transparent 70%)",
          }}
        />
      </div>
    </div>
  );
}

/** Soft light that follows the pointer. Desktop only. */
export function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const check = () => {
      const root = document.documentElement;
      setEnabled(
        window.matchMedia("(pointer: fine)").matches &&
          root.dataset.glow !== "off" &&
          root.dataset.motion !== "reduced",
      );
    };
    check();

    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-glow", "data-motion"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${e.clientX - 200}px, ${e.clientY - 200}px, 0)`;
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    el.style.opacity = "1";
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      el.style.opacity = "0";
    };
  }, [enabled]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[400px] w-[400px] rounded-full opacity-0 blur-3xl transition-opacity duration-700 lg:block"
      style={{
        background:
          "radial-gradient(circle, var(--accent-soft) 0%, transparent 60%)",
      }}
    />
  );
}
