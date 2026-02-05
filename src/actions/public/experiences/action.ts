"use server";

import { prisma } from "@/lib/prisma";

export async function getPublicExperiences() {
  try {
    // Langsung ambil semua data tanpa skip/limit pagination
    const experiences = await prisma.experience.findMany({
      // Urutkan: Yang masih bekerja (is_current) di atas, 
      // lalu berdasarkan tanggal mulai terbaru
      orderBy: [
        { is_current: 'desc' },
        { start_date: 'desc' }
      ],
    });

    return {
      success: true,
      data: experiences,
    };
  } catch (error) {
    console.error("Public Fetch Error:", error);
    return { 
      success: false, 
      data: [],
      message: "Gagal mengambil data pengalaman." 
    };
  }
}