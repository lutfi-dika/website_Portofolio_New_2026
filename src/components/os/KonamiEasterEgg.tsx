"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function KonamiEasterEgg() {
  const [unlocked, setUnlocked] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let index = 0;
    let timer: ReturnType<typeof setTimeout>;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === KONAMI[index]) {
        index++;
        setProgress(index);
        clearTimeout(timer);
        timer = setTimeout(() => {
          index = 0;
          setProgress(0);
        }, 2000);

        if (index === KONAMI.length) {
          setUnlocked(true);
          index = 0;
          setProgress(0);
          setTimeout(() => setUnlocked(false), 4000);
        }
      } else {
        index = 0;
        setProgress(0);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {/* Progress indicator (very subtle) */}
      {progress > 0 && !unlocked && (
        <div className="fixed bottom-2 left-1/2 z-[200] -translate-x-1/2">
          <div className="flex gap-1">
            {KONAMI.map((_, i) => (
              <span
                key={i}
                className={`h-1 w-1 rounded-full transition-colors ${
                  i < progress ? "bg-accent" : "bg-faint/30"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Unlocked overlay */}
      <AnimatePresence>
        {unlocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="text-center"
            >
              <p className="font-mono text-6xl font-bold tracking-tighter text-accent">
                ↑↑↓↓←→←→BA
              </p>
              <p className="mt-4 text-lg font-bold text-foreground">
                Konami Code Activated!
              </p>
              <p className="mt-1 text-sm text-muted">
                Kamu menemukan easter egg LUTFI.DEV
              </p>
              <div className="mt-4 flex justify-center gap-1">
                {["🎮", "🕹️", "👾", "🏆", "⭐"].map((emoji, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * i }}
                    className="text-2xl"
                  >
                    {emoji}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
