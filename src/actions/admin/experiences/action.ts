"use server";

import { prisma } from "@/lib/prisma";
import { getAuth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

// Tambahkan pengecekan sederhana untuk tanggal
const parseDate = (dateVal: any) => {
  const d = new Date(dateVal);
  return isNaN(d.getTime()) ? null : d;
};

export async function createExperience(formData: FormData) {
  try {
    await getAuth();

    // Pastikan field wajib ada
    const job_title = formData.get("job_title") as string;
    const company = formData.get("company") as string;
    const startDateRaw = formData.get("start_date");

    if (!job_title || !company || !startDateRaw) {
       throw new Error("Job title, company, dan start date wajib diisi.");
    }

    const lastExperience = await prisma.experience.findFirst({
      orderBy: { id: 'desc' },
      select: { id: true }
    });

    console.log(lastExperience);

    let newId = "EXP0001";
    if (lastExperience) {
      const lastNumber = parseInt(lastExperience.id.replace("EXP", ""));
      newId = `EXP${(lastNumber + 1).toString().padStart(4, '0')}`;
    }

    await prisma.experience.create({
      data: {
        id: newId,
        job_title,
        company,
        description: formData.get("description") as string || "",
        skills: formData.get("skills") as string || "",
        is_current: formData.get("is_current") === "true",
        start_date: parseDate(startDateRaw) as Date, 
        end_date: formData.get("is_current") === "true" 
          ? null 
          : parseDate(formData.get("end_date")),
      }
    });

    revalidatePath("/admin/experiences");
    return { success: true, message: `Pengalaman ${newId} berhasil diterbitkan!` };

  } catch (error) {
    console.error("DEBUG_ERROR:", error);
    // Pastikan error selalu string agar bisa di-serialize
    return { success: false, message: error instanceof Error ? error.message : "Gagal membuat pengalaman." };
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
        // PERBAIKAN DI SINI:
        orderBy: [
          { is_current: 'desc' }, // 'true' (1) akan di atas 'false' (0)
          { start_date: 'desc' }, // Setelah itu, urutkan berdasarkan tanggal mulai terbaru
        ],
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
    return { 
      success: false, 
      message: "Gagal mengambil data", 
      data: [], 
      total: 0, 
      totalPages: 0 
    };
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

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Gagal memperbarui pengalaman.";
    return { success: false, message: errorMessage };
  }
}

export async function deleteExperience(id: string) {
  try {
    await getAuth();
    await prisma.experience.delete({ where: { id } });

    revalidatePath("/admin/experiences");
    return { success: true, message: "Pengalaman berhasil dihapus." };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Gagal menghapus proyek.";
    return { success: false, message: errorMessage };
  }
}