import { createExperience } from "@/actions/admin/experiences/action";
import ExperienceForm from "@/components/ui/admin/experiences/experience-form";

export default function NewExperiencePage() {
  return (
    <ExperienceForm 
      title="Add New Journey" 
      action={createExperience} 
    />
  );
}