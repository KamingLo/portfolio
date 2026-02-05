import { getPublicExperiences } from "@/actions/public/experiences/action";
import ExperienceList from "@/components/ui/experiences/experience-list";
import MainLayout from "@/components/layouts/main-layout";
import Section from "@/components/layouts/sections";

export default async function ExperiencePage() {
  const { data: experiences } = await getPublicExperiences();

  // 1. Penanganan jika data kosong agar tidak error saat render
  if (!experiences || experiences.length === 0) {
    return (
      <MainLayout>
        <Section className="py-20 text-center">
          <p className="text-zinc-500">Belum ada data pengalaman tersedia.</p>
        </Section>
      </MainLayout>
    );
  }

  // 2. Konversi Date ke String (Opsional, jika ExperienceList kamu protes soal tipe data)
  const formattedExperiences = experiences.map((exp) => ({
    ...exp,
    start_date: exp.start_date instanceof Date 
      ? exp.start_date.toISOString() 
      : exp.start_date,
    end_date: exp.end_date instanceof Date 
      ? exp.end_date.toISOString() 
      : exp.end_date ?? undefined, // Konversi null ke undefined untuk konsistensi
  }));

  return (
    <MainLayout>
      <Section className="py-20 md:py-32">
        {/* --- HEADER --- */}
        <div className="mb-16 md:mb-24 space-y-4 border-b border-white/5 pb-10">
          <h2 className="text-sm md:text-md font-mono text-blue-500 uppercase tracking-widest">
            Professional Journey
          </h2>
          <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tight">
            Experiences
          </h1>
        </div>

        {/* --- LIST --- */}
        <ExperienceList experiences={formattedExperiences} />

      </Section>
    </MainLayout>
  );
}