"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PhotoCarouselProps = {
  /** Daftar path/URL gambar, urutan sesuai tampilan */
  images: string[];
  /** Nama yang ditampilkan sebagai caption di pojok kiri bawah */
  name: string;
  /** Rasio aspek container, default 4:5 seperti contoh */
  aspectClassName?: string;
};

export function PhotoCarousel({
  images,
  name,
  aspectClassName = "aspect-[4/5]",
}: PhotoCarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const total = images.length;

  const goTo = (newIndex: number) => {
    if (total === 0) return;
    setDirection(newIndex > index ? 1 : -1);
    setIndex((newIndex + total) % total);
  };

  const goPrev = () => goTo(index - 1);
  const goNext = () => goTo(index + 1);

  if (total === 0) return null;

  return (
    <div
      className={`relative w-full max-w-md mx-auto overflow-hidden rounded-2xl border border-border bg-card shadow-lg ${aspectClassName}`}
    >
      {/* Gambar dengan transisi slide */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={index}
          custom={direction}
          initial={{ opacity: 0, x: direction > 0 ? 80 : -80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -80 : 80 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={images[index]}
            alt={`${name} ${index + 1}`}
            fill
            priority={index === 0}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 448px"
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlay bawah supaya caption tetap terbaca */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent"
      />

      {/* Tombol panah kiri */}
      <button
        type="button"
        onClick={goPrev}
        aria-label="Foto sebelumnya"
        className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-700 shadow-md transition hover:bg-white active:scale-95"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Tombol panah kanan */}
      <button
        type="button"
        onClick={goNext}
        aria-label="Foto berikutnya"
        className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-700 shadow-md transition hover:bg-white active:scale-95"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Caption nama, pojok kiri bawah */}
      <p className="absolute bottom-4 left-4 z-10 text-sm font-semibold text-white drop-shadow">
        {name}
      </p>

      {/* Counter foto, pojok kanan bawah */}
      <span className="absolute bottom-4 right-4 z-10 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white">
        {index + 1}/{total}
      </span>
    </div>
  );
}

/**
 * Wrapper: menampilkan dot indicator DI LUAR kartu foto,
 * persis seperti pada contoh (garis panjang untuk foto aktif).
 * Ini yang dipakai untuk hasil akhir sesuai gambar referensi.
 */
export function PhotoCarouselWithDots(props: PhotoCarouselProps) {
  const [index, setIndex] = useState(0);
  const total = props.images.length;

  return (
    <div className="flex flex-col items-center gap-4">
      <PhotoCarouselControlled {...props} index={index} onChange={setIndex} />
      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ke foto ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-accent" : "w-1.5 bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/** Versi terkontrol dari carousel, dipakai oleh PhotoCarouselWithDots */
function PhotoCarouselControlled({
  images,
  name,
  aspectClassName = "aspect-[4/5]",
  index,
  onChange,
}: PhotoCarouselProps & { index: number; onChange: (i: number) => void }) {
  const [direction, setDirection] = useState(0);
  const total = images.length;

  const goTo = (newIndex: number) => {
    if (total === 0) return;
    setDirection(newIndex > index ? 1 : -1);
    onChange((newIndex + total) % total);
  };

  if (total === 0) return null;

  return (
    <div
      className={`relative w-full max-w-md mx-auto overflow-hidden rounded-2xl border border-border bg-card shadow-lg ${aspectClassName}`}
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={index}
          custom={direction}
          initial={{ opacity: 0, x: direction > 0 ? 80 : -80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -80 : 80 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={images[index]}
            alt={`${name} ${index + 1}`}
            fill
            priority={index === 0}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 448px"
          />
        </motion.div>
      </AnimatePresence>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent"
      />

      <button
        type="button"
        onClick={() => goTo(index - 1)}
        aria-label="Foto sebelumnya"
        className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-700 shadow-md transition hover:bg-white active:scale-95"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={() => goTo(index + 1)}
        aria-label="Foto berikutnya"
        className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-700 shadow-md transition hover:bg-white active:scale-95"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <p className="absolute bottom-4 left-4 z-10 text-sm font-semibold text-white drop-shadow">
        {name}
      </p>

      <span className="absolute bottom-4 right-4 z-10 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white">
        {index + 1}/{total}
      </span>
    </div>
  );
}
