import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Globe } from "lucide-react";
import { siGithub } from "simple-icons";
import { SimpleIcon } from "@/components/ui/simple-icon";

interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  image: string;
  tags?: string[];
  githubLink?: string;
  liveDemo?: string;
}

export default function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div className="border-t border-zinc-200">
      {projects.map((project, index) => (
        <div 
          key={project.id}
          className="group flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-16 items-start py-16 border-b border-zinc-200 transition-colors hover:bg-zinc-50/50"
        >
          {/* Image Display - Sharp Edges */}
          <div className={`w-full lg:col-span-7 relative aspect-[16/10] overflow-hidden bg-zinc-100 ${index % 2 !== 0 ? 'lg:order-2' : 'lg:order-1'}`}>
            <Link href={`/projects/${project.slug}`} className="block w-full h-full">
              <Image 
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105 grayscale-[0.2] group-hover:grayscale-0"
              />
            </Link>
          </div>

          {/* Text Content Container - No Card */}
          <div className={`w-full lg:col-span-5 flex flex-col py-4 lg:py-8 ${index % 2 !== 0 ? 'lg:order-1' : 'order-2'}`}>
            <div className="flex flex-col h-full justify-between space-y-8">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-xs font-mono text-zinc-400">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">
                    {project.category}
                  </span>
                </div>
                
                <Link href={`/projects/${project.slug}`} className="inline-block group-hover:text-blue-600 transition-colors mb-6">
                  <h3 className="text-4xl lg:text-5xl font-medium text-zinc-900 tracking-tight leading-tight">
                    {project.title}
                  </h3>
                </Link>
                
                <p className="text-lg md:text-xl text-zinc-600 font-medium mb-4">
                  {project.subtitle}
                </p>
                
                <p className="text-zinc-500 leading-relaxed text-base">
                  {project.description}
                </p>
              </div>

              <div className="space-y-8 mt-auto">
                <div className="flex flex-wrap gap-2">
                  {project.tags?.map((tag: string) => (
                    <span key={tag} className="text-xs font-medium px-0 py-1 border-b border-zinc-200 text-zinc-500 mr-4">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <Link 
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-3 text-zinc-900 font-semibold group/btn"
                  >
                    <span className="border-b border-zinc-900 pb-1 group-hover/btn:text-blue-600 group-hover/btn:border-blue-600 transition-colors">
                      Lihat studi kasus
                    </span>
                    <ArrowUpRight size={18} className="group-hover/btn:text-blue-600 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </Link>

                  {/* GitHub & Demo Link */}
                  {(project.githubLink || project.liveDemo) && (
                    <div className="flex items-center gap-4 border-l border-zinc-200 pl-6 h-5">
                      {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-900 transition-colors">
                          <SimpleIcon icon={siGithub} size={20} />
                        </a>
                      )}
                      {project.liveDemo && (
                        <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-blue-600 transition-colors">
                          <Globe size={20} />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}