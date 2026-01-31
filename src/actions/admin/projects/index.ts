"use server";

import { prisma } from "@/lib/prisma";
import { getAuth } from "@/lib/auth";

export async function getProjects(page: number = 1, limit: number = 6, query: string = "") {
  try {
    // 1. Cek Autentikasi
    await getAuth();

    // 2. Hitung offset untuk pagination
    const skip = (page - 1) * limit;

    // 3. Bangun Filter Pencarian
    // Kita cari berdasarkan title, subtitle, atau category
    const whereCondition = query 
      ? {
          OR: [
            { title: { contains: query, mode: 'insensitive' as const } },
            { subtitle: { contains: query, mode: 'insensitive' as const } },
            { category: { contains: query, mode: 'insensitive' as const } },
          ],
        }
      : {};

    // 4. Ambil Data & Total secara bersamaan (Parallel)
    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: { id: 'desc' }, // Menggunakan ID desc agar yang terbaru di atas
      }),
      prisma.project.count({ where: whereCondition }),
    ]);

    return { 
      success: true, 
      data: projects, 
      total, 
      totalPages: Math.ceil(total / limit) 
    };

  } catch (error) {
    console.error("Action Error:", error);
    return { 
      success: false, 
      message: "Gagal mengambil data", 
      data: [], 
      total: 0, 
      totalPages: 0 
    };
  }
}