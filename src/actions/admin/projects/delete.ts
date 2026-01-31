"use server";

import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function deleteProject(id: string) {
  try {
    const project = await prisma.project.findUnique({
      where: { id },
      select: { image: true }
    });

    if (!project) throw new Error("Proyek tidak ditemukan.");

    if (project.image) {
      const fileName = project.image.split('/').pop();
      if (fileName) {
        await supabase.storage.from('kamingportfolio').remove([fileName]);
      }
    }

    await prisma.project.delete({ where: { id } });

    revalidatePath("/admin/projects");
    return { success: true, message: "Proyek berhasil dihapus." };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}