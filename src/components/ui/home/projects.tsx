import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Section from "@/components/layouts/sections";
import { getHomeProjects } from "@/actions/public/home/action";
import { CtaCard } from "@/components/ui/cta-card";

export default async function Projects() {
    const projects = await getHomeProjects(2);

    return (
        <Section id="projects" data-aos="fade-up" className="text-zinc-700 [-webkit-tap-highlight-color:transparent]">
            {/* --- SECTION HEADER --- */}
            <div className="flex flex-col md:flex-row items-start justify-between pt-16 md:pt-32 pb-16 md:pb-24 gap-12 md:gap-16 border-b border-zinc-100 mb-16 md:mb-24">
                <div className="flex flex-col items-start space-y-6 md:w-1/2">
                    <h2 className="text-4xl sm:text-5xl md:text-7xl font-semibold text-zinc-900 tracking-tight">
                        Projects
                    </h2>
                </div>

                <div className="flex flex-col items-start md:w-1/2 md:pt-16 space-y-6">
                    <div className="inline-flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-sm text-blue-600 font-semibold uppercase tracking-wider">
                            My archive
                        </span>
                    </div>
                    <p className="text-md sm:text-lg md:text-xl text-zinc-500 max-w-xl leading-relaxed">
                        A collection of recent projects showcasing innovation and expertise in modern application development.
                    </p>
                </div>
            </div>

            {/* --- PROJECTS LIST --- */}
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

                                    <Link 
                                        href={`/projects/${project.slug}`}
                                        className="inline-flex items-center gap-3 text-zinc-900 font-semibold group/btn"
                                    >
                                        <span className="border-b border-zinc-900 pb-1 group-hover/btn:text-blue-600 group-hover/btn:border-blue-600 transition-colors">
                                            View case study
                                        </span>
                                        <ArrowUpRight size={18} className="group-hover/btn:text-blue-600 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- CTA ARCHIVE SECTION --- */}
            <CtaCard
                href="/projects"
                title="View all projects"
                description="Explore the technical details of every system I have developed."
                buttonText="Open full portfolio"
            />
        </Section>
    );
}