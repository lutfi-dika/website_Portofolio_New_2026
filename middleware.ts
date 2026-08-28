// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Website HANYA akan mati/maintenance jika di-deploy ke server live (production).
  // Di localhost (saat Anda jalankan npm run dev), nilainya otomatis false.
const isMaintenanceMode = false;

  const pathname = request.nextUrl.pathname;

  // Izinkan akses jika menuju halaman maintenance atau file sistem Next.js
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
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};