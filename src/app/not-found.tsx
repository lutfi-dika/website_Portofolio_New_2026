import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-green-400 p-4 font-mono">
      <div className="bg-gray-950 p-8 rounded-lg border border-green-800 shadow-2xl max-w-2xl w-full overflow-x-auto">
        {/* Simulasi terminal code */}
        <p className="text-gray-400">
          user@portfolio:~/$ goto page/tujuan_salah
        </p>
        <p className="text-red-400 font-bold">404: PAGE_NOT_FOUND</p>
        <br />

        <div className="whitespace-pre text-sm leading-tight">
          <p className="text-white">function findPage() {"{"}</p>
          <p className="pl-6 text-blue-300">try {"{"}</p>
          <p className="pl-12 text-yellow-300">fetchPage(currentPath);</p>
          <p className="pl-6 text-blue-300">
            {"}"} catch (error) {"{"}
          </p>
          <p className="pl-12 text-gray-400">
            {"// Ternyata halamannya tidak ada"}
          </p>
          <p className="pl-12 text-red-500">
            return &ldquo;Ups, link yang Anda tuju tidak ditemukan.&rdquo;;
          </p>
          <p className="pl-6 text-blue-300">{"}"}</p>
          <p className="text-white">{"}"}</p>
        </div>

        <br />
        <p className="animate-pulse text-white">_</p>
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/"
          className="px-6 py-3 bg-green-600 text-gray-950 rounded-md hover:bg-green-500 transition font-bold text-lg"
        >
          Fix Error Ini & Kembali ke Beranda
        </Link>
      </div>
    </main>
  );
}
