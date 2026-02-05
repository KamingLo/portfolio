import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";

const adminPrefix = "/admin";
const authRoute = "/login";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isAdminRoute = path.startsWith(adminPrefix);
  const isAuthPage = path === authRoute;

  const cookie = req.cookies.get("session")?.value;
  const session = cookie ? await decrypt(cookie).catch(() => null) : null;

  // 1. Logika baru: Redirect /admin ke /admin/dashboard
  if (path === adminPrefix || path === `${adminPrefix}/`) {
    // Jika sudah login, ke dashboard. Jika belum, ke login.
    const destination = session ? `${adminPrefix}/dashboard` : authRoute;
    return NextResponse.redirect(new URL(destination, req.nextUrl));
  }

  // 2. Proteksi rute admin/*
  if (isAdminRoute && !session) {
    return NextResponse.redirect(new URL(authRoute, req.nextUrl));
  }

  // 3. Redirect jika sudah login tapi akses halaman login
  if (isAuthPage && session) {
    return NextResponse.redirect(new URL(`${adminPrefix}/dashboard`, req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};