"use server";

import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

// Helper untuk membuat slug URL friendly
const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

export async function createProject(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const imageFile = formData.get("image") as File;

    const lastProject = await prisma.project.findFirst({
      orderBy: { id: 'desc' },
      select: { id: true }
    });

    let newId = "PR0001";
    if (lastProject) {
      const lastNumber = parseInt(lastProject.id.replace("PR", ""));
      newId = `PR${(lastNumber + 1).toString().padStart(4, '0')}`;
    }

    // 2. Upload ke Supabase Storage
    let imageUrl = "";
    if (imageFile && imageFile.size > 0) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${newId}-${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('kamingportfolio')
        .upload(fileName, imageFile);

      if (error) throw new Error(`Upload gagal: ${error.message}`);

      const { data: { publicUrl } } = supabase.storage
        .from('kamingportfolio')
        .getPublicUrl(fileName);
      
      imageUrl = publicUrl;
    }

    // 3. Simpan ke Database Prisma
    await prisma.project.create({
      data: {
        id: newId,
        title,
        subtitle: formData.get("subtitle") as string,
        category: formData.get("category") as string,
        image: imageUrl,
        description: formData.get("description") as string,
        explanation: formData.get("explanation") as string || null,
        slug: slugify(title),
        tags: (formData.get("tags") as string)
          .split(",")
          .map(tag => tag.trim())
          .filter(tag => tag !== ""),
        githubLink: formData.get("githubLink") as string || null,
        liveDemo: formData.get("liveDemo") as string || null,
      }
    });

    revalidatePath("/admin/projects");
    return { success: true, message: `Proyek ${newId} berhasil diterbitkan!` };

  } catch (error: any) {
    console.error("Create Error:", error);
    return { success: false, message: error.message || "Gagal membuat proyek." };
  }
}