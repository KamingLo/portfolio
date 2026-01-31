"use server";

import { prisma } from "@/lib/prisma";

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