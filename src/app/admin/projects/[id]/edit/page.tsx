import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { updateProject } from "@/actions/admin/projects/update";
import ProjectForm from "@/components/ui/admin/projects/project-form";

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });

  if (!project) notFound();

  return (
    <ProjectForm 
      initialData={project} 
      action={updateProject} 
      title="Edit Proyek" 
    />
  );
}