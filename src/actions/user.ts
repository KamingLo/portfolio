"use server";

import { prisma } from "@/lib/prisma";

export async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        password: true, // Pastikan field ini ada di schema Prisma kamu
      },
    });
    return users;
  } catch (error) {
    console.error("Gagal mengambil data user:", error);
    return [];
  }
}