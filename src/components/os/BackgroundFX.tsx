"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Layered background: blueprint grid + accent glow blobs + noise.
 * Glow layer is disabled when settings.effects.backgroundGlow = false
 * (html[data-glow="off"]).
 */
export function BackgroundFX() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 bg-noise opacity-[0.035]" />

      {/* GLOW LAYER */}
      <div data-glow-layer className="contents [[data-glow='off']_&]:hidden">
        <div
          className="glow-blob absolute -top-40 left-1/4 h-[480px] w-[480px] animate-drift rounded-full opacity-[0.13] blur-3xl motion-reduce:animate-none"
          style={{
            background:
              "radial-gradient(circle, var(--accent), transparent 65%)",
          }}
        />
        <div
          className="glow-blob absolute -bottom-52 right-[10%] h-[560px] w-[560px] animate-drift rounded-full opacity-[0.09] blur-3xl motion-reduce:animate-none"
          style={{
            background:
              "radial-gradient(circle, var(--accent-strong), transparent 65%)",
            animationDelay: "-6s",
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
