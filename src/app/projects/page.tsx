import { getPublicProjects } from "@/actions/public/projects/action";
import ProjectList from "@/components/ui/projects/project-list";
import Link from "next/link";
import MainLayout from "@/components/layouts/main-layout";
import Section from "@/components/layouts/sections";

export default async function Page({ 
  searchParams 
}: { 
  searchParams: Promise<{ page?: string }> 
}) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;
  
  // Ambil data dengan limit 4 per halaman
  const { data: projects, metadata } = await getPublicProjects(currentPage, 4);

  // Sanitasi data: Pastikan properti null dikonversi ke undefined 
  // agar tidak bentrok dengan interface ProjectList
  const formattedProjects = projects.map(project => ({
    ...project,
    explanation: project.explanation ?? undefined,
    githubLink: project.githubLink ?? undefined,
    liveDemo: project.liveDemo ?? undefined,
  }));

  return (
    <MainLayout>
      <Section className="py-20 md:py-32">
        {/* --- HEADER --- */}
        <div className="mb-16 md:mb-24 space-y-4">
          <h2 className="text-sm font-mono text-blue-500 tracking-[0.2em] uppercase">My Archive</h2>
          <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter uppercase leading-[0.8]">
            Projects
          </h1>
        </div>

        {/* --- CONTENT --- */}
        <ProjectList projects={formattedProjects} />

        {/* --- SECTION: PAGINATION --- */}
        {metadata && metadata.totalPages > 1 && (
          <nav className="mt-24 md:mt-48 border-t border-white/5 pt-12 md:pt-20 flex justify-center items-center gap-6 md:gap-12">
            {[...Array(metadata.totalPages)].map((_, i) => {
              const pageNum = i + 1;
              const isActive = currentPage === pageNum;
              
              return (
                <Link 
                  key={i} 
                  href={`?page=${pageNum}`}
                  scroll={false} // Menjaga posisi scroll saat pindah halaman
                  className={`transition-all duration-700 ease-in-out select-none ${
                    isActive 
                    ? "text-3xl md:text-5xl text-blue-500 font-bold tracking-tighter" 
                    : "text-xl md:text-2xl text-zinc-800 hover:text-zinc-500 font-light"
                  }`}
                >
                  {pageNum.toString().padStart(2, '0')}
                </Link>
              );
            })}
          </nav>
        )}
      </Section>
    </MainLayout>
  );
}