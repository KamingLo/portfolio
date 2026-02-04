"use server";

import { prisma } from "@/lib/prisma";
import { getAuth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createExperience(formData: FormData) {
  try {
    // 1. Cek Autentikasi (Sesuai pola dashboard kamu)
    await getAuth();

    const job_title = formData.get("job_title") as string;
    const company = formData.get("company") as string;

    // 2. Logika ID Manual (Persis pola PR0001 kamu, tapi pakai EXP)
    const lastExperience = await prisma.experience.findFirst({
      orderBy: { id: 'desc' },
      select: { id: true }
    });

    let newId = "EXP001";
    if (lastExperience) {
      const lastNumber = parseInt(lastExperience.id.replace("EXP", ""));
      newId = `EXP${(lastNumber + 1).toString().padStart(4, '0')}`;
    }

    // 3. Simpan ke Database Prisma (Mengikuti gaya direct mapping kamu)
    await prisma.experience.create({
      data: {
        id: newId,
        job_title,
        company,
        description: formData.get("description") as string,
        skills: formData.get("skills") as string || "",
        is_current: formData.get("is_current") === "true", // Konversi ke boolean
        start_date: new Date(formData.get("start_date") as string),
        // Logic end_date: null jika is_current, jika tidak ambil dari form
        end_date: formData.get("is_current") === "true" 
          ? null 
          : formData.get("end_date") ? new Date(formData.get("end_date") as string) : null,
      }
    });

    revalidatePath("/admin/experiences");
    return { success: true, message: `Pengalaman ${newId} berhasil diterbitkan!` };

  } catch (error: any) {
    console.error("Create Error:", error);
    return { success: false, message: error.message || "Gagal membuat riwayat pengalaman." };
  }
}

export async function updateExperience(formData: FormData) {
  try {
    await getAuth();
    const id = formData.get("id") as string;
    const job_title = formData.get("job_title") as string;

    await prisma.experience.update({
      where: { id },
      data: {
        job_title,
        company: formData.get("company") as string,
        description: formData.get("description") as string,
        skills: formData.get("skills") as string || "",
        is_current: formData.get("is_current") === "true",
        start_date: new Date(formData.get("start_date") as string),
        end_date: formData.get("is_current") === "true" 
          ? null 
          : formData.get("end_date") ? new Date(formData.get("end_date") as string) : null,
      }
    });

    revalidatePath("/admin/experiences");
    return { success: true, message: "Pengalaman berhasil diperbarui!" };

  } catch (error: any) {
    console.error("Update Error:", error);
    return { success: false, message: error.message || "Gagal memperbarui proyek." };
  }
}

export async function deleteExperience(id: string) {
  try {
    await getAuth();
    await prisma.experience.delete({ where: { id } });

    revalidatePath("/admin/experiences");
    return { success: true, message: "Pengalaman berhasil dihapus." };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function getExperiences(page: number = 1, limit: number = 6) {
  try {
    await getAuth();
    const skip = (page - 1) * limit;

    const [experiences, total] = await Promise.all([
      prisma.experience.findMany({
        skip,
        take: limit,
        orderBy: { id: 'desc' },
      }),
      prisma.experience.count(),
    ]);

    return { 
      success: true, 
      data: experiences, 
      total, 
      totalPages: Math.ceil(total / limit) 
    };

  } catch (error) {
    console.error("Action Error:", error);
    return { success: false, message: "Gagal mengambil data", data: [], total: 0, totalPages: 0 };
  }
}