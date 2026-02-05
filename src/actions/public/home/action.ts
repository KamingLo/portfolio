"use server";

import { prisma } from "@/lib/prisma"; // Pastikan path prisma client Anda benar

export async function getHomeProjects(limit: number = 2) {
  try {
    const projects = await prisma.project.findMany({
      take: limit,
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        title: true,
        slug: true,
        subtitle: true,
        image: true,
        description: true,
        category: true,
        tags: true,
      }
    });

    return projects;
  } catch (error) {
    console.error("Failed to fetch home projects:", error);
    return [];
  }
}

export async function getLatestHomeExperience() {
    try {
        const experience = await prisma.experience.findFirst({
            where: {
                is_current: true, // Mencari yang masih aktif
            },
            orderBy: {
                start_date: 'desc', // Berdasarkan tanggal mulai terbaru
            },
            select: {
                id: true,
                job_title: true,
                company: true,
                start_date: true,
                description: true,
                skills: true, // Tambahkan ini jika ingin menampilkan tag tech
            },
        });

        return experience;
    } catch (error) {
        console.error("Failed to fetch latest experience:", error);
        return null;
    }
}