"use server";

import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

export type ActionState = {
  message?: string;
} | undefined;

export async function loginAction(prevState: ActionState, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { message: "Email dan password tidak boleh kosong!" };
  }

  if (password.length < 8) {
    return { message: "Password minimal harus 8 karakter!" };
  }

  try {
    // 1. Cari user di database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // 2. Validasi password menggunakan bcrypt
    if (!user) {
      return { message: "Email atau password salah!" };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { message: "Email atau password salah!" };
    }

    // 3. Buat Session JWT & Simpan di Cookie
    await createSession(user.id.toString());
    
  } catch (error) {
    // Menangani error database atau server lainnya
    return { message: "Terjadi kesalahan sistem. Coba lagi nanti." };
  }

  // 4. Redirect ke halaman tujuan (Harus di luar block try/catch)
  redirect("/admin/dashboard");
}