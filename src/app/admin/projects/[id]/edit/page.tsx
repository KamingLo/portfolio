import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { updateProject } from "@/actions/admin/projects/action";
import ProjectForm from "@/components/ui/admin/projects/project-form";

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });

  if (!project) notFound();

  // Konversi semua properti yang berpotensi 'null' menjadi 'undefined'
  // agar cocok dengan interface ProjectData
  const formattedProject = {
    ...project,
    explanation: project.explanation ?? undefined,
    githubLink: project.githubLink ?? undefined,
    liveDemo: project.liveDemo ?? undefined,
  };

  return (
    <ProjectForm 
      initialData={formattedProject} 
      action={updateProject} 
      title="Edit Proyek" 
    />
  );
}