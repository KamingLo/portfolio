import type { Metadata } from "next";
import { getProjectBySlug } from "@/actions/public/projects/action";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { siGithub } from "simple-icons";
import { SimpleIcon } from "@/components/ui/simple-icon";
import MainLayout from "@/components/layouts/main-layout";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.subtitle || `Learn more about ${project.title}, a project developed by Kaming Lo.`,
    openGraph: {
      title: `${project.title} | Kaming Lo`,
      description: project.subtitle || `Learn more about ${project.title}, a project developed by Kaming Lo.`,
      images: project.image ? [{ url: project.image }] : [],
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <MainLayout>
      <article className="min-h-screen text-zinc-900 pb-32">
        
        {/* Navigation - Minimalist */}
        <nav className="py-6 border-b border-zinc-200">
          <Link 
            href="/projects" 
            className="group flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-all text-xs tracking-widest uppercase w-fit"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" /> 
            Back to Projects
          </Link>
        </nav>

        {/* --- HERO SECTION --- */}
        <div className="flex flex-col md:flex-row items-start justify-between pt-16 md:pt-32 pb-16 md:pb-24 gap-12 md:gap-16 border-b border-zinc-100 mb-16 md:mb-24">
          <div className="flex flex-col items-start space-y-6 md:w-1/2">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold text-zinc-900 tracking-tight">
              {project.title}
            </h1>
          </div>

          <div className="flex flex-col items- md:w-1/2">
              <span className="text-3xl text-grey-800 font-semibold">
                {project.category}
              </span>
            <p className="text-md sm:text-lg md:text-xl text-zinc-500 max-w-xl leading-relaxed">
              {project.subtitle}
            </p>
          </div>
        </div>

        {/* SECTION 1: [FOTO 16/9] & [DETAIL SIDEBAR] */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
          {/* Main Image Container - Sharp Edges */}
          <div className="lg:col-span-8">
            <div className="relative aspect-video w-full overflow-hidden bg-zinc-100 border border-zinc-200">
              <Image 
                src={project.image} 
                alt={project.title} 
                fill 
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Sidebar Detail - Minimalist & Clean */}
          <aside className="lg:col-span-4 flex flex-col justify-between h-full py-2">
            <div className="space-y-12">
              {/* Category Section */}
              <div className="group">
                <span className="text-zinc-400 text-xs tracking-widest font-bold uppercase mb-4 block">
                  Category
                </span>
                <p className="text-3xl md:text-4xl font-medium text-zinc-900 tracking-tight leading-none group-hover:text-blue-600 transition-colors">
                  {project.category}
                </p>
              </div>
              
              {/* Technologies Section */}
              <div>
                <span className="text-zinc-400 text-xs tracking-widest font-bold uppercase mb-4 block border-t border-zinc-200 pt-6">
                  Technologies
                </span>
                <div className="flex flex-col gap-3">
                  {project.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="text-lg font-medium text-zinc-600 hover:text-blue-600 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Links - Sharp Minimalist Buttons */}
            <div className="flex flex-col gap-4 mt-16 pt-8 border-t border-zinc-200">
              {project.liveDemo && (
                <a 
                  href={project.liveDemo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full border-b border-zinc-900 pb-3 text-zinc-900 font-semibold hover:text-blue-600 hover:border-blue-600 transition-all group"
                >
                  <span>Visit Live Demo</span>
                  <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              )}
              {project.githubLink && (
                <a 
                  href={project.githubLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-between w-full border-b border-zinc-200 pb-3 text-zinc-600 font-medium hover:text-zinc-900 hover:border-zinc-900 transition-all group"
                >
                  <span>View Source Code</span>
                  <SimpleIcon icon={siGithub} size={18} />
                </a>
              )}
            </div>
          </aside>
        </div>


        {/* SECTION 3: [CONTENT] - The Giant Text Scaling */}
        <section className="max-w-[1440px] md:text-xl font-light">
          <div
            dangerouslySetInnerHTML={{ __html: project.explanation ?? "" }} 
          />
        </section>

      </article>
    </MainLayout>
  );
}