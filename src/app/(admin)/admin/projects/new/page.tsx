import { createProject } from "@/actions/admin/projects/action";
import ProjectForm from "@/components/ui/admin/projects/project-form";

export default function NewProjectPage() {
  return <ProjectForm action={createProject} title="Buat Proyek Baru" />;
}