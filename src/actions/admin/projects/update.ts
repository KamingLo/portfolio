"use server";

import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

export async function updateProject(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const oldImageUrl = formData.get("oldImageUrl") as string;
    const imageFile = formData.get("image") as File;
    const title = formData.get("title") as string;
    
    let imageUrl = oldImageUrl;

    // 1. Cek apakah ada upload gambar baru
    if (imageFile && imageFile.size > 0) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${id}-${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('kamingportfolio')
        .upload(fileName, imageFile);

      if (uploadError) throw new Error("Gagal upload gambar baru.");

      const { data: { publicUrl } } = supabase.storage
        .from('kamingportfolio')
        .getPublicUrl(fileName);
      
      imageUrl = publicUrl;

      // Hapus file lama dari storage agar tidak memenuhi kuota
      if (oldImageUrl) {
        const oldFileName = oldImageUrl.split('/').pop();
        if (oldFileName) {
          await supabase.storage.from('kamingportfolio').remove([oldFileName]);
        }
      }
    }

    // 2. Update Database
    await prisma.project.update({
      where: { id },
      data: {
        title,
        subtitle: formData.get("subtitle") as string,
        category: formData.get("category") as string,
        image: imageUrl,
        description: formData.get("description") as string,
        explanation: formData.get("explanation") as string || null,
        slug: slugify(title),
        tags: (formData.get("tags") as string)
          .split(",")
          .map(t => t.trim())
          .filter(t => t !== ""),
        githubLink: formData.get("githubLink") as string || null,
        liveDemo: formData.get("liveDemo") as string || null,
      }
    });

    revalidatePath("/admin/projects");
    return { success: true, message: "Proyek berhasil diperbarui!" };

  } catch (error: any) {
    console.error("Update Error:", error);
    return { success: false, message: error.message || "Gagal memperbarui proyek." };
  }
}