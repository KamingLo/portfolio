"use server";

import {  prisma } from "@/lib/prisma"; // Pastikan path prisma client Anda benar

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