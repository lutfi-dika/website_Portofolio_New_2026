// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Website HANYA akan mati/maintenance jika di-deploy ke server live (production).
  // Di localhost (saat Anda jalankan npm run dev), nilainya otomatis false.
  const isMaintenanceMode = false;

  const pathname = request.nextUrl.pathname;

  // Izinkan akses jika menuju halaman maintenance
  if (
    isMaintenanceMode &&
    !pathname.startsWith('/maintenance') &&
    !pathname.startsWith('/_next') &&
    !pathname.startsWith('/api') &&
    !pathname.includes('.')
  ) {
    return NextResponse.rewrite(new URL('/maintenance', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Mengecualikan folder Next.js, file gambar, favicon, sitemap.xml, dan robots.txt agar langsung lolos
  matcher: '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
};