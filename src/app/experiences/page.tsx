import { getPublicExperiences } from "@/actions/public/experiences/action";
import ExperienceList from "@/components/ui/experiences/experience-list";
import Link from "next/link";
import MainLayout from "@/components/layouts/main-layout";
import Section from "@/components/layouts/sections";

export default async function ExperiencePage({ 
  searchParams 
}: { 
  searchParams: Promise<{ page?: string }> 
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  
  const { data: experiences, metadata } = await getPublicExperiences(currentPage, 4);

  return (
    <MainLayout>
      <Section className="py-16">
        <div className="mb-20 space-y-4">
          <h2 className="text-md font-mono text-blue-500">Professional Journey</h2>
          <h1 className="text-5xl md:text-7xl font-bold text-white">Experiences.</h1>
        </div>

        <ExperienceList experiences={experiences} />

        {metadata.totalPages > 1 && (
          <div className="mt-32 flex justify-center items-center gap-8 font-mono text-sm">
            <Link 
              href={`?page=${currentPage - 1}`}
              className={`transition-opacity ${currentPage <= 1 ? 'opacity-20 pointer-events-none' : 'hover:text-blue-400'}`}
            >
              PREV
            </Link>
            
            <div className="flex gap-4">
               {[...Array(metadata.totalPages)].map((_, i) => (
                 <Link 
                  key={i} 
                  href={`?page=${i + 1}`}
                  className={currentPage === i + 1 ? "text-blue-500 underline underline-offset-8" : "text-zinc-600 hover:text-zinc-400"}
                 >
                   {i + 1}
                 </Link>
               ))}
            </div>

            <Link 
              href={`?page=${currentPage + 1}`}
              className={`transition-opacity ${currentPage >= metadata.totalPages ? 'opacity-20 pointer-events-none' : 'hover:text-blue-400'}`}
            >
              NEXT
            </Link>
          </div>
        )}
      </Section>
    </MainLayout>
  );
}