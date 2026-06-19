import { getPublicProjects } from "@/actions/public/projects/action";
import ProjectList from "@/components/ui/projects/project-list";
import Link from "next/link";
import MainLayout from "@/components/layouts/main-layout";
import Section from "@/components/layouts/sections";

export const dynamic = 'force-dynamic';

export default async function Page({ 
  searchParams 
}: { 
  searchParams: Promise<{ page?: string }> 
}) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;
  
  const { data: projects, metadata } = await getPublicProjects(currentPage, 4);

  // Lakukan mapping untuk membersihkan data dari NULL dan DATE object
  const formattedProjects = projects?.map((project) => ({
    ...project,
    // Gunakan ?? undefined untuk mengganti null agar aman di TypeScript
    image: project.image ?? undefined,
    githubLink: project.githubLink ?? undefined,
    liveDemo: project.liveDemo ?? undefined,
    explanation: project.explanation ?? undefined,
  }));

  return (
    <MainLayout>
      <Section>
        <div className="mb-20 space-y-4">
          <h2 className="text-md font-mono text-blue-500 tracking-[0.2em]">My Archive</h2>
          <h1 className="text-5xl md:text-7xl font-medium text-white tracking-tighter uppercase">Projects</h1>
        </div>

        {/* Kirim data yang sudah di-format, bukan data mentah dari Prisma */}
        <ProjectList projects={formattedProjects} />

        {/* SECTION: [PAGINATION CENTERED] */}
        {metadata.totalPages > 1 && (
          <nav className="mt-48 border-t border-white/10 pt-20 flex justify-center items-center gap-10 md:gap-20">
            {[...Array(metadata.totalPages)].map((_, i) => {
              const pageNum = i + 1;
              const isActive = currentPage === pageNum;
              
              return (
                <Link 
                  key={i} 
                  href={`?page=${pageNum}`}
                  className={`transition-all duration-500 ease-in-out select-none ${
                    isActive 
                    ? "text-4xl md:text-4xl text-blue-500 font-bold leading-none tracking-tighter" 
                    : "text-2xl md:text-2xl text-zinc-800 hover:text-zinc-500 font-light leading-none"
                  }`}
                >
                  {pageNum < 10 ? `0${pageNum}` : pageNum}
                </Link>
              );
            })}
          </nav>
        )}
      </Section>
    </MainLayout>
  );
}