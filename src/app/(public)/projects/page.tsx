import { getPublicProjects } from "@/actions/public/projects/action";
import ProjectList from "@/components/ui/projects/project-list";
import Link from "next/link";
import MainLayout from "@/components/layouts/main-layout";
import Section from "@/components/layouts/sections";
import { Logo } from "@/components/ui/logo";

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
        {/* --- HERO SECTION --- */}
        <div className="flex flex-col md:flex-row items-start justify-between pt-16 md:pt-32 pb-16 md:pb-24 gap-12 md:gap-16 border-b border-zinc-100 mb-16 md:mb-24">
          <div className="flex flex-col items-start space-y-6 md:w-1/2">
            <Logo />

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold text-zinc-900 tracking-tight">
              Projects.
            </h1>
          </div>

          <div className="flex flex-col items-start md:w-1/2 md:pt-16 space-y-6">
            <p className="text-md sm:text-lg md:text-xl text-zinc-500 max-w-xl leading-relaxed">
              A collection of recent projects showcasing innovation and expertise in modern application development.
            </p>
          </div>
        </div>

        {/* Kirim data yang sudah di-format, bukan data mentah dari Prisma */}
        <ProjectList projects={formattedProjects} />

        {/* SECTION: [PAGINATION CENTERED] */}
        {metadata.totalPages > 1 && (
          <nav className="mt-48 border-t border-zinc-200 pt-20 flex justify-center items-center gap-10 md:gap-20">
            {[...Array(metadata.totalPages)].map((_, i) => {
              const pageNum = i + 1;
              const isActive = currentPage === pageNum;
              
              return (
                <Link 
                  key={i} 
                  href={`?page=${pageNum}`}
                  className={`transition-all duration-500 ease-in-out select-none ${
                    isActive 
                    ? "text-4xl md:text-4xl text-blue-500 font-semibold leading-none tracking-tighter" 
                    : "text-2xl md:text-2xl text-zinc-300 hover:text-zinc-500 font-light leading-none"
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