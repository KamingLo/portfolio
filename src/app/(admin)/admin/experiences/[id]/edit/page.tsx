import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { updateExperience } from "@/actions/admin/experiences/action";
import ExperienceForm from "@/components/ui/admin/experiences/experience-form";


export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    
    const experience = await prisma.experience.findUnique({ 
        where: { id } 
    });

    if (!experience) notFound();

    // Lakukan konversi Date (Object) ke String (YYYY-MM-DD)
    const formattedExperience = {
        ...experience,
        start_date: experience.start_date.toISOString().split('T')[0],
        end_date: experience.end_date 
            ? experience.end_date.toISOString().split('T')[0] 
            : undefined, // Gunakan undefined agar cocok dengan tipe optional string
    };

    return (
        <ExperienceForm 
            initialData={formattedExperience} // Sekarang tipenya sudah String, bukan Date lagi
            title="Edit Experience"
            action={updateExperience} 
        />
    );
}