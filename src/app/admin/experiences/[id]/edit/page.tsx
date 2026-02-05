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

    // Lakukan konversi Date ke String ISO agar sesuai dengan interface 'ExperienceData'
    // src/app/admin/experiences/[id]/edit/page.tsx

    const formattedExperience = {
        ...experience,
        start_date: experience.start_date.toISOString().split('T')[0],
        // Ubah null menjadi undefined agar cocok dengan tipe 'string | undefined'
        end_date: experience.end_date 
            ? experience.end_date.toISOString().split('T')[0] 
            : undefined, 
    };

    return (
        <ExperienceForm 
            initialData={formattedExperience}
            title="Edit Experience" // Saya ubah title-nya agar lebih sesuai untuk halaman edit
            action={updateExperience} 
        />
    );
}