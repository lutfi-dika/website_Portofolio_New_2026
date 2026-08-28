// src/app/maintenance/page.tsx
export default function MaintenancePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white px-4">
      <div className="text-center space-y-4 max-w-md">
        <h1 className="text-3xl font-bold tracking-tight">
          Sedang Dalam Perbaikan
        </h1>
        <p className="text-slate-400 text-sm">
          Kami sedang melakukan pembaruan pada website. Silakan kunjungi kembali
          dalam beberapa saat.
        </p>
      </div>
    </main>
  );
}
