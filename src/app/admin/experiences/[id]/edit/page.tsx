import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { updateExperience } from "@/actions/admin/experiences/action";
import ExperienceForm from "@/components/ui/admin/experiences/experience-form";


export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const experience = await prisma.experience.findUnique({ where: { id } });

  if (!experience) notFound();

  return (
    <ExperienceForm 
      initialData={experience}
      title="Add New Journey" 
      action={updateExperience} 
    />
  );
}