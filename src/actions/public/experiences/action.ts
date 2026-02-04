"use server";

import { prisma } from "@/lib/prisma";

export async function getPublicExperiences(page: number = 1, limit: number = 4) {
  try {
    const skip = (page - 1) * limit;

    // Ambil data dan total count secara paralel untuk efisiensi
    const [experiences, total] = await Promise.all([
      prisma.experience.findMany({
        skip,
        take: limit,
        // Urutkan: Yang masih bekerja (is_current) di atas, 
        // lalu berdasarkan tanggal mulai terbaru
        orderBy: [
          { is_current: 'desc' },
          { start_date: 'desc' }
        ],
      }),
      prisma.experience.count(),
    ]);

    return {
      success: true,
      data: experiences,
      metadata: {
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      }
    };
  } catch (error) {
    console.error("Public Fetch Error:", error);
    return { 
      success: false, 
      data: [], 
      metadata: { total: 0, totalPages: 0, currentPage: 1 } 
    };
  }
}