import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";

// 1. Tentukan route mana saja yang harus login (Protected Routes)
const protectedRoutes = ["/dashboard", "/profile"];
const publicRoutes = ["/login", "/signup", "/"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
  const isPublicRoute = publicRoutes.includes(path);

  // 2. Ambil session dari cookie
  const cookie = req.cookies.get("session")?.value;
  const session = cookie ? await decrypt(cookie).catch(() => null) : null;

  // 3. Redirect ke /login jika mencoba akses halaman terproteksi tanpa session
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // 4. Redirect ke /dashboard jika sudah login tapi mencoba ke halaman login lagi
  if (isPublicRoute && session && path !== "/") {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

// Tambahkan Matcher agar middleware tidak berjalan di semua file (seperti static files)
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};