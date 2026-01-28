"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction() {
  const cookieStore = await cookies();
  
  // Hapus cookie bernama 'session' yang berisi JWT
  cookieStore.delete("session");

  // Redirect ke halaman login setelah logout berhasil
  redirect("/login");
}