import { getPublicExperiences } from "@/actions/public/experiences/action";
import ExperienceList from "@/components/ui/experiences/experience-list";
import MainLayout from "@/components/layouts/main-layout";
import Section from "@/components/layouts/sections";

export default async function ExperiencePage() {
  const { data: experiences } = await getPublicExperiences();

  // Pastikan data ada sebelum di-map
  const formattedExperiences = experiences?.map((exp) => ({
    ...exp,
    // Konversi Date ke string
    start_date: exp.start_date.toISOString(),
    
    // PERBAIKAN DI SINI:
    // Jika exp.end_date ada, jadikan ISO string. Jika null, paksa jadi undefined.
    end_date: exp.end_date ? exp.end_date.toISOString() : undefined,
    
    // Pastikan created_at & updated_at juga jadi string
    created_at: exp.created_at.toISOString(),
    updated_at: exp.updated_at.toISOString(),
  }));

  return (
    <MainLayout>
      <Section>
        <div className="mb-20 space-y-4">
          <h2 className="text-md font-mono text-blue-500">Professional Journey</h2>
          <h1 className="text-5xl md:text-7xl font-semibold text-white">Experiences</h1>
        </div>

        {/* Kirim data yang sudah di-format */}
        <ExperienceList experiences={formattedExperiences} />
      </Section>
    </MainLayout>
  );
}