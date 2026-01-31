import { getPublicProjects } from "@/actions/public/projects/index";
import ProjectList from "@/components/ui/projects/project-list";
import Link from "next/link";
import MainLayout from "@/components/layouts/main-layout";
import Section from "@/components/layouts/sections";

export default async function Page({ searchParams }: { searchParams: { page?: string } }) {
  const currentPage = Number(searchParams.page) || 1;
  const { data: projects, metadata } = await getPublicProjects(currentPage, 4);

  return (
    <MainLayout>
    <Section className="">
      <ProjectList projects={projects} />

      {/* Pagination Controls */}
      {metadata.totalPages > 1 && (
        <div className="mt-32 flex justify-center items-center gap-8 font-mono text-sm">
          <Link 
            href={`?page=${currentPage - 1}`}
            className={`transition-opacity ${currentPage <= 1 ? 'opacity-20 pointer-events-none' : 'hover:text-blue-500'}`}
          >
            PREV
          </Link>
          
          <div className="flex gap-4">
             {[...Array(metadata.totalPages)].map((_, i) => (
               <Link 
                key={i} 
                href={`?page=${i + 1}`}
                className={currentPage === i + 1 ? "text-blue-500 underline underline-offset-8" : "text-zinc-600"}
               >
                 {i + 1}
               </Link>
             ))}
          </div>

          <Link 
            href={`?page=${currentPage + 1}`}
            className={`transition-opacity ${currentPage >= metadata.totalPages ? 'opacity-20 pointer-events-none' : 'hover:text-blue-500'}`}
          >
            NEXT
          </Link>
        </div>
      )}
    </Section>
    
    </MainLayout>
  );
}