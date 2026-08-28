import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white px-4">
      <div className="text-center space-y-4 max-w-md">
        <h2 className="text-2xl font-bold tracking-tight">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-slate-400 text-sm">
          Maaf, halaman yang Anda tuju tidak tersedia atau telah dipindahkan.
        </p>
        <div>
          <Link
            href="/"
            className="inline-block px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors shadow-lg shadow-blue-500/20"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </main>
  );
}
