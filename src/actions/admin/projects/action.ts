"use server";

import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { getAuth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

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