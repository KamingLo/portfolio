"use server";

import { prisma } from "@/lib/prisma";

export async function getPublicProjects(page: number = 1, limit: number = 4) {
  try {
    const skip = (page - 1) * limit;

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.project.count(),
    ]);

    return {
      success: true,
      data: projects,
      metadata: {
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      }
    };
  } catch (error) {
    console.error("Fetch Projects Error:", error);
    return { success: false, data: [], metadata: { total: 0, totalPages: 0, currentPage: 1 } };
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    const project = await prisma.project.findFirst({
      where: { slug }, // findFirst mengizinkan pencarian field apa pun
    });
    return project;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}