import { getProjectBySlug } from "@/actions/public/projects/action";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Globe, Github } from "lucide-react";
import MainLayout from "@/components/layouts/main-layout";

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <MainLayout>
      <article className="min-h-screen text-white pb-32">
        
        {/* Navigation - Minimalist */}
        <nav className="py-6 border-b border-white/10 mb-12">
          <Link 
            href="/projects" 
            className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-all text-xs tracking-widest uppercase w-fit"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" /> 
            Back to Projects
          </Link>
        </nav>

        {/* SECTION 1: [FOTO 16/9] & [DETAIL SIDEBAR] */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 mb-16 border-b border-white/10 pb-16">
          {/* Square Image Container */}
          <div className="lg:col-span-9 border-r border-white/10 pr-0 lg:pr-8">
            <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
              <Image 
                src={project.image} 
                alt={project.title} 
                fill 
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Sidebar Detail - Sharp & Clean */}
          {/* Sidebar Detail - Bold & Large Typography */}
<aside className="lg:col-span-3 flex flex-col justify-between pl-0 lg:pl-10 mt-12 lg:mt-0">
  <div className="space-y-16">
    {/* Category Section */}
    <div className="group">
      <span className="text-zinc-500 text-xs tracking-widest font-medium mb-3 block">
        Category
      </span>
      <p className="text-4xl md:text-5xl lg:text-5xl font-medium text-zinc-100 tracking-tight leading-none">
        {project.category}
      </p>
    </div>
    
    {/* Technologies Section */}
    <div>
      <span className="text-zinc-500 text-xs tracking-widest font-medium mb-6 block">
        Technologies
      </span>
      <div className="flex flex-col gap-4">
        {project.tags.map((tag, i) => (
          <span 
            key={i} 
            className="text-2xl md:text-3xl lg:text-3xl text-zinc-400 font-light tracking-tighter border-b border-white/10 pb-2 w-full hover:text-white transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>

  {/* Action Links - Tall & Sharp */}
  <div className="flex border-t-2 border-white/10 mt-20">
    {project.githubLink && (
      <a 
        href={project.githubLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="flex-1 flex items-center justify-center py-10 border-r-2 border-white/10 hover:bg-white hover:text-black transition-all group"
      >
        <span className="mr-3 text-sm font-medium hidden md:block">GitHub</span>
        <Github size={24} />
      </a>
    )}
    {project.liveDemo && (
      <a 
        href={project.liveDemo} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center py-10 hover:bg-white hover:text-black transition-all group"
      >
        <span className="mr-3 text-sm font-medium hidden md:block">Live Demo</span>
        <Globe size={24} />
      </a>
    )}
  </div>
</aside>
        </div>

        {/* SECTION 2: [TITLE & SUBTITLE] */}
        <section className="mb-16 border-b border-white/10 pb-16">
          <div className="max-w-6xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-6">
              {project.title}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-zinc-500 font-light max-w-3xl leading-relaxed">
              {project.subtitle}
            </p>
          </div>
        </section>

        {/* SECTION 3: [CONTENT] - The Giant Text Scaling */}
        <section className="max-w-7xl md:text-xl font-light">
          <div
            dangerouslySetInnerHTML={{ __html: project.explanation ?? "" }} 
          />
        </section>

      </article>
    </MainLayout>
  );
}