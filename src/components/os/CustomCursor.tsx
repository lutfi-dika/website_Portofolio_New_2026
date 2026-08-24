"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Desktop-only glow cursor: a small accent dot + trailing ring that
 * expands over interactive elements. Automatically disabled for touch
 * devices, when settings turn it off (data-cursor="off") or when motion
 * is reduced.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const check = () => {
      const root = document.documentElement;
      const ok =
        window.matchMedia("(pointer: fine)").matches &&
        root.dataset.cursor !== "off" &&
        root.dataset.motion !== "reduced";
      setEnabled(ok);
      document.body.classList.toggle("custom-cursor-active", ok);
    };
    check();

    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-cursor", "data-motion"],
    });
    return () => {
      observer.disconnect();
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let raf = 0;
    let tx = -100;
    let ty = -100;
    let rx = -100;
    let ry = -100;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      dot.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;

      const target = e.target as HTMLElement | null;
      const interactive = target?.closest(
        "a, button, input, textarea, select, [role='button'], [role='option']",
      );
      ring.dataset.hover = interactive ? "on" : "off";
    };

    const loop = () => {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[300] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent lg:block"
        style={{ marginLeft: -3, marginTop: -3 }}
      />
      <div
        ref={ringRef}
        data-hover="off"
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[299] hidden h-9 w-9 items-center justify-center rounded-full border border-accent/50 transition-[width,height,border-color,background-color] duration-200 lg:flex"
        style={{ marginLeft: -18, marginTop: -18 }}
      >
        <style>{`
          [data-hover="on"] {
            width: 3.25rem;
            height: 3.25rem;
            margin-left: -26px !important;
            margin-top: -26px !important;
            background-color: var(--accent-soft);
            border-color: var(--accent);
          }
        `}</style>
      </div>
    </>
  );
}

/**
 * Magnetic hover effect wrapper — pulls its child slightly toward the
 * pointer. Used sparingly on primary CTAs.
 */
export function Magnetic({
  children,
  strength = 0.25,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (document.documentElement.dataset.motion === "reduced") return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
    };
    const onLeave = () => {
      el.style.transform = "translate(0, 0)";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return (
    <div ref={ref} className="transition-transform duration-200 ease-out">
      {children}
    </div>
  );
}
