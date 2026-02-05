import { getPublicExperiences } from "@/actions/public/experiences/action";
import ExperienceList from "@/components/ui/experiences/experience-list";
import MainLayout from "@/components/layouts/main-layout";
import Section from "@/components/layouts/sections";

export default async function ExperiencePage() {
  const { data: experiences } = await getPublicExperiences();

  return (
    <MainLayout>
      <Section>
        <div className="mb-20 space-y-4">
          <h2 className="text-md font-mono text-blue-500">Professional Journey</h2>
          <h1 className="text-5xl md:text-7xl font-semibold text-white">Experiences</h1>
        </div>

        <ExperienceList experiences={experiences} />

      </Section>
    </MainLayout>
  );
}