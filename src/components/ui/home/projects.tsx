import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Section from "@/components/layouts/sections";
import { getHomeProjects } from "@/actions/public/home/projects";

export default async function Projects() {
    const projects = await getHomeProjects(2);

    return (
        <Section id="projects" className="text-zinc-300">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6 border-b border-white/5 pb-10">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-sm font-mono tracking-[0.2em] text-blue-500 font-semibold uppercase">
                            Selected works
                        </span>
                    </div>
                    <h2 className="text-5xl md:text-8xl font-medium text-white tracking-tighter">
                        Archive
                    </h2>
                </div>
                <p className="text-zinc-500 max-w-sm text-base md:text-lg font-medium leading-relaxed">
                    Koleksi proyek terbaru yang menampilkan inovasi dan keahlian dalam pengembangan aplikasi modern.
                </p>
            </div>

            {/* Projects List */}
            <div className="space-y-32 md:space-y-40">
                {projects.map((project, index) => (
                    <div 
                        key={project.id}
                        className="group flex flex-col lg:grid lg:grid-cols-12 gap-10 lg:gap-16 items-start lg:items-center"
                    >
                        {/* Image Display - Clickable */}
                        <div className={`w-full lg:col-span-7 relative ${index % 2 !== 0 ? 'lg:order-2' : 'order-1'}`}>
                            <Link href={`/projects/${project.slug}`} className="block">
                                <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] bg-zinc-900/50 ring-1 ring-white/10 group-hover:ring-blue-500/40 transition-all duration-700 shadow-2xl">
                                    <Image 
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-all duration-1000 grayscale-[0.5] group-hover:grayscale-0 opacity-80 group-hover:opacity-100 group-hover:scale-[1.05]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
                                </div>
                            </Link>
                        </div>

                        {/* Text Content */}
                        <div className={`w-full lg:col-span-5 space-y-8 px-1 lg:px-0 ${index % 2 !== 0 ? 'lg:order-1' : 'order-2'}`}>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <span className="text-xs font-mono text-zinc-600">
                                        NO. {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <div className="h-px flex-1 bg-zinc-800 group-hover:bg-blue-500/30 transition-all duration-700" />
                                    <span className="text-xs font-mono text-blue-500/80 tracking-widest font-bold uppercase">
                                        {project.category}
                                    </span>
                                </div>
                                
                                <div className="space-y-3">
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
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            <div className="pt-4">
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
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* CTA Archive Section */}
            <div className="mt-32">
                <Link 
                    href="/projects"
                    className="group relative block overflow-hidden rounded-[3rem] border border-white/5 bg-white/[0.01] p-12 md:p-24 text-center transition-all duration-500 hover:bg-white/[0.03] hover:border-blue-500/20"
                >
                    <div className="relative z-10 flex flex-col items-center space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-4xl md:text-7xl text-white font-medium tracking-tighter leading-tight">
                                Lihat Seluruh Project
                            </h3>
                            <p className="text-zinc-500 text-lg md:text-xl font-medium max-w-xl mx-auto">
                                Eksplorasi detail teknis dari setiap sistem yang telah saya kembangkan.
                            </p>
                        </div>

                        <div className="mt-4 flex items-center gap-3 text-white font-medium text-lg border-b border-zinc-800 pb-2 group-hover:border-blue-500 transition-all duration-500">
                            <span>Buka Portofolio Lengkap</span>
                            <div className="bg-white/5 p-3 rounded-full group-hover:bg-blue-600 transition-all duration-500">
                                <ArrowUpRight size={22} className="group-hover:rotate-45 transition-transform duration-500" />
                            </div>
                        </div>
                    </div>

                    {/* Subtle Background Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/10 blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
                </Link>
            </div>
        </Section>
    );
}