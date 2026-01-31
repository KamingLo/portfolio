import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { cache } from "react";

export const getAuth = cache(async () => {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;

  // 1. Cek apakah cookie session ada
  if (!sessionToken) {
    redirect("/login");
  }

  // 2. Dekripsi token JWT
  const session = await decrypt(sessionToken).catch(() => null);

  // 3. Validasi payload session
  if (!session || !session.userId) {
    redirect("/login");
  }

  try {
    // 4. Ambil data user dari database (ID format "us001")
    const user = await prisma.user.findUnique({
      where: { 
        id: String(session.userId) 
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    // 5. Jika user tidak ditemukan di DB (misal sudah dihapus)
    if (!user) {
      redirect("/login");
    }

    return {
      user,
      isAuth: true,
    };
  } catch (error) {
    console.error("Auth DAL Error:", error);
    redirect("/login");
  }
});