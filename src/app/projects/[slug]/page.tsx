import { getProjectBySlug } from "@/actions/public/projects/action";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Globe, Github } from "lucide-react";
import MainLayout from "@/components/layouts/main-layout";

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);

  if (!project) notFound();

  return (
    <MainLayout>
      <article className="min-h-screen text-white pb-20">
        
        {/* Breadcrumb & Navigation */}
        <nav className="py-6">
          <Link 
            href="/projects" 
            className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-all text-sm w-fit"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> 
            Kembali ke Proyek
          </Link>
        </nav>

        {/* Hero Section: Hero Image */}
        <section className="mb-12">
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
            <Image 
              src={project.image} 
              alt={project.title} 
              fill 
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* Header Section: Title & Socials */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-10">
            <div className="max-w-4xl">
              <h1 className="text-6xl md:text-8xl font-light tracking-tighter leading-[0.8] mb-6">
                {project.title}
              </h1>
              <p className="text-2xl md:text-4xl text-zinc-400 font-light leading-snug italic">
                {project.subtitle}
              </p>
            </div>
            
            <div className="flex gap-5">
              {project.githubLink && (
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" 
                   className="p-3 rounded-full border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 transition-all">
                  <Github size={24} />
                </a>
              )}
              {project.liveDemo && (
                <a href={project.liveDemo} target="_blank" rel="noopener noreferrer"
                   className="p-3 rounded-full border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 transition-all">
                  <Globe size={24} />
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            
            {/* Sidebar: Meta Data (Sticky) */}
            <aside className="lg:col-span-3">
              <div className="sticky top-24 space-y-10">
                <div className="space-y-2">
                  <span className="text-zinc-500 text-[10px] tracking-[0.2em] block uppercase font-medium">Kategori</span>
                  <p className="text-2xl font-light text-zinc-200">{project.category}</p>
                </div>
                
                <div className="space-y-3 pt-6 border-t border-white/5">
                  <span className="text-zinc-500 text-[10px] tracking-[0.2em] block uppercase font-medium">Teknologi</span>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="text-sm px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content: Explanation */}
            <div className="lg:col-span-9">
              <div 
                className="prose prose-invert max-w-none 
                  prose-p:text-2xl md:prose-p:text-3xl prose-p:leading-relaxed prose-p:text-zinc-300 prose-p:font-light prose-p:mb-10
                  prose-h2:text-4xl md:prose-h2:text-6xl prose-h2:mb-8 prose-h2:mt-12 prose-h2:font-light prose-h2:tracking-tighter
                  prose-li:text-2xl md:prose-li:text-3xl prose-li:mb-4 prose-li:leading-tight
                  prose-strong:text-white prose-strong:font-medium
                  prose-blockquote:text-3xl prose-blockquote:border-l-[3px] prose-blockquote:border-zinc-500 prose-blockquote:pl-8 prose-blockquote:italic
                  marker:text-zinc-600"
                dangerouslySetInnerHTML={{ __html: project.explanation ?? "" }} 
              />
            </div>

          </div>
        </section>
      </article>
    </MainLayout>
  );
}