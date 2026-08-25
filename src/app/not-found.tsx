"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md"
      >
        {/* 404 visual */}
        <div className="relative mb-8">
          <div className="flex items-center justify-center gap-3">
            <Terminal className="h-12 w-12 text-accent" aria-hidden />
            <span className="font-display text-7xl font-bold tracking-tighter text-foreground">
              4<span className="text-accent">0</span>4
            </span>
          </div>
          <div className="mt-2 font-mono text-xs text-faint">
            <span className="text-accent">$</span> error — page not found
          </div>
        </div>

        {/* Message */}
        <h1 className="font-display text-2xl font-bold">
          Halaman Tidak Ditemukan
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Sepertinya halaman yang kamu cari sudah dipindahkan atau tidak tersedia.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-background transition-all hover:brightness-110 active:scale-[0.98]"
          >
            <Home className="h-4 w-4" aria-hidden />
            Kembali ke Dashboard
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Kembali
          </button>
        </div>

        {/* Easter hint */}
        <p className="mt-12 font-mono text-[10px] text-faint">
          Tip: gunakan Ctrl+K untuk navigasi cepat ke halaman lain.
        </p>
      </motion.div>
    </div>
  );
}
