import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { updateProject } from "@/actions/admin/projects/action";
import ProjectForm from "@/components/ui/admin/projects/project-form";

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });

  if (!project) notFound();

  // Konversi data agar aman dikirim ke Client Component (Plain Object)
  const formattedProject = {
    ...project,
    // Ubah null menjadi undefined agar cocok dengan tipe data opsional di TypeScript
    explanation: project.explanation ?? undefined,
    githubLink: project.githubLink ?? undefined,
    liveDemo: project.liveDemo ?? undefined,
    image: project.image ?? undefined,
    // Jika ada field Date yang ingin ditampilkan/diedit dalam form:
    // created_at: project.created_at.toISOString(), 
  };

  return (
    <ProjectForm 
      initialData={formattedProject} 
      action={updateProject} 
      title="Edit Proyek" 
    />
  );
}