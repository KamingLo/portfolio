import { getPublicExperiences } from "@/actions/public/experiences/action";
import ExperienceList from "@/components/ui/experiences/experience-list";
import MainLayout from "@/components/layouts/main-layout";
import Section from "@/components/layouts/sections";
import { Logo } from "@/components/ui/logo";

export const dynamic = 'force-dynamic';

export default async function ExperiencePage() {
    
  const { data: experiences } = await getPublicExperiences();

  // Pastikan data ada sebelum di-map
  const formattedExperiences = experiences?.map((exp) => ({
    ...exp,
    // Konversi Date ke string
    start_date: exp.start_date.toISOString(),
    
    // Jika exp.end_date ada, jadikan ISO string. Jika null, paksa jadi undefined.
    end_date: exp.end_date ? exp.end_date.toISOString() : undefined,
    
    // Pastikan created_at & updated_at juga jadi string
    created_at: exp.created_at.toISOString(),
    updated_at: exp.updated_at.toISOString(),
  }));

  return (
    <MainLayout>
      <Section id="experiences-hero" className="text-zinc-700 [-webkit-tap-highlight-color:transparent]">
        {/* --- HERO SECTION --- */}
        <div className="flex flex-col md:flex-row items-start justify-between pt-16 md:pt-32 pb-16 md:pb-24 gap-12 md:gap-16 border-b border-zinc-100">
          <div className="flex flex-col items-start space-y-6 md:w-1/2">
            <Logo />
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold text-zinc-900 tracking-tight">
              Profesional Experience.
            </h1>
          </div>

          <div className="flex flex-col items-start md:w-1/2 md:pt-16 space-y-6">
            <p className="text-md sm:text-lg md:text-xl text-zinc-500 max-w-xl leading-relaxed">
              A timeline of my professional experience, showcasing the companies I&apos;ve worked with and the impact I&apos;ve made along the way.
            </p>
          </div>
        </div>

        {/* --- EXPERIENCES LIST --- */}
        <ExperienceList experiences={formattedExperiences || []} />
      </Section>
    </MainLayout>
  );
}