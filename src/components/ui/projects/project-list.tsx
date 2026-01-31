import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github, Globe } from "lucide-react";

export default function ProjectList({ projects }: { projects: any[] }) {
  return (
    <div className="space-y-32 md:space-y-48">
      {projects.map((project, index) => (
        <div 
          key={project.id}
          className="group flex flex-col lg:grid lg:grid-cols-12 gap-10 lg:gap-16 items-start lg:items-center"
        >
          {/* 1. Image Display - Wrapped with Link */}
          <div className={`w-full lg:col-span-7 relative ${index % 2 !== 0 ? 'lg:order-2' : 'order-1'}`}>
            <Link href={`/projects/${project.slug}`} className="block">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] bg-zinc-900/50 ring-1 ring-white/10 group-hover:ring-blue-500/40 transition-all duration-700 shadow-2xl">
                <Image 
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-all duration-1000 grayscale-[0.5] group-hover:grayscale-0 opacity-80 group-hover:opacity-100 group-hover:scale-[1.05]"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
              </div>
            </Link>
          </div>

          {/* Text Content */}
          <div className={`w-full lg:col-span-5 space-y-8 px-1 lg:px-0 ${index % 2 !== 0 ? 'lg:order-1' : 'order-2'}`}>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-zinc-600 tracking-tighter">
                  NO. {String(index + 1).padStart(2, '0')}
                </span>
                <div className="h-[1px] flex-1 bg-zinc-800 group-hover:bg-blue-500/30 transition-all duration-700" />
                <span className="text-xs font-mono text-blue-500/80 tracking-widest font-bold uppercase">
                  {project.category}
                </span>
              </div>
              
              <div className="space-y-3">
                {/* 2. Title - Wrapped with Link */}
                <Link href={`/projects/${project.slug}`} className="inline-block">
                  <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors duration-500">
                    {project.title}
                  </h3>
                </Link>
                <p className="text-lg md:text-xl text-zinc-500 font-medium leading-tight">
                  {project.subtitle}
                </p>
              </div>

              <p className="text-zinc-400 leading-relaxed text-base md:text-lg font-normal max-w-md">
                {project.description}
              </p>
            </div>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags?.map((tag: string) => (
                <span key={tag} className="text-[10px] font-bold uppercase tracking-widest border border-white/5 bg-white/[0.03] px-4 py-1.5 rounded-full text-zinc-500 group-hover:text-zinc-300 transition-colors">
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Links */}
            <div className="flex items-center gap-6 pt-4">
              <Link 
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-3 text-white group/link text-base md:text-lg font-semibold tracking-tight transition-all"
              >
                <span className="border-b-2 border-zinc-800 group-hover/link:border-blue-500 pb-1 transition-all duration-300">
                  Lihat studi kasus
                </span>
                <div className="bg-white/5 p-3 rounded-full group-hover/link:bg-blue-600 group-hover/link:rotate-45 transition-all duration-500">
                  <ArrowUpRight size={20} />
                </div>
              </Link>

              {/* GitHub & Demo Link */}
              <div className="flex gap-4 border-l border-zinc-800 pl-6">
                {project.githubLink && (
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                    <Github size={22} />
                  </a>
                )}
                {project.liveDemo && (
                  <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-blue-400 transition-colors">
                    <Globe size={22} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}