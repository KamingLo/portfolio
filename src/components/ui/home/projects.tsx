import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Section from "@/components/layouts/sections";

const PROJECTS = [
    {
        id: "01",
        title: "SMK Pelita IV",
        subtitle: "Educational Ecosystem",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070",
        description: "Re-engineering digital presence for institutional excellence. Focused on performance metrics and SEO dominance.",
        category: "Fullstack",
        tags: ["Laravel", "Postgres", "SEO"],
        link: "#"
    },
    {
        id: "02",
        title: "BBNI & BMRI",
        subtitle: "Equity Analytics",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070",
        description: "Real-time banking sector analysis. Transforming complex financial data into interactive, actionable visual insights.",
        category: "Data Analysis",
        tags: ["Next.js", "Financial API", "Chart.js"],
        link: "#"
    }
];

export default function Projects() {
    return (
        <Section id="projects" className="text-zinc-300">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6 border-b border-white/5 pb-10">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-sm font-mono tracking-[0.2em] text-blue-500 font-semibold">
                            Selected works
                        </span>
                    </div>
                    <h2 className="text-5xl md:text-8xl font-medium text-white tracking-tighter">
                        Archive
                    </h2>
                </div>
                <p className="text-zinc-500 max-w-sm text-base md:text-lg font-medium leading-relaxed">
                    Koleksi project kaming terbaru yang menampilkan inovasi dan keahlian dalam pengembangan aplikasi modern.
                </p>
            </div>

            {/* Projects Grid */}
            <div className="space-y-20 md:space-y-20">
                {PROJECTS.map((project) => (
                    <div 
                        key={project.id}
                        className="group flex flex-col lg:grid lg:grid-cols-12 gap-10 items-start lg:items-center"
                    >
                        {/* Image Display */}
                        <div className="w-full lg:col-span-7 order-1 relative">
                            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-zinc-900/50 ring-1 ring-white/10 group-hover:ring-blue-500/40 transition-all duration-700 shadow-2xl">
                                <Image 
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-all duration-1000 grayscale-[0.5] group-hover:grayscale-0 opacity-80 group-hover:opacity-100 group-hover:scale-[1.02]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="w-full lg:col-span-5 order-2 space-y-8 px-1 lg:px-0">
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-mono text-zinc-600">
                                        [{project.id}]
                                    </span>
                                    <div className="h-px flex-1 bg-zinc-900 group-hover:bg-blue-500/30 transition-all" />
                                    <span className="hidden lg:block text-xs font-mono text-blue-500/80 tracking-widest font-bold">
                                        {project.category}
                                    </span>
                                </div>
                                
                                <div className="space-y-2">
                                    <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors duration-300">
                                        {project.title}
                                    </h3>
                                    <p className="text-lg md:text-xl text-zinc-500 font-normal">{project.subtitle}</p>
                                </div>

                                <p className="text-zinc-400 leading-relaxed text-base md:text-lg font-normal max-w-md">
                                    {project.description}
                                </p>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-3 pt-2">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="text-xs font-mono border border-white/10 bg-white/[0.05] px-4 py-2 rounded-full text-zinc-300 tracking-tight">
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            <div className="pt-4">
                                <Link 
                                    href={project.link}
                                    className="inline-flex items-center gap-3 text-white group/link text-base md:text-lg font-semibold tracking-tight transition-all"
                                >
                                    <span className="border-b-2 border-zinc-800 group-hover/link:border-blue-500 pb-1 transition-all">
                                        Lihat studi kasus
                                    </span>
                                    <div className="bg-white/5 p-3 rounded-full group-hover/link:bg-blue-600 transition-all">
                                        <ArrowUpRight size={20} />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Call to Action Archive */}
            <div className="mt-24">
                <Link 
                    href="/projects"
                    className="group relative block overflow-hidden rounded-4xl border border-white/5 bg-white/[0.02] p-12 md:p-24 text-center transition-all duration-500 hover:bg-white/[0.04] hover:border-blue-500/30"
                >
                    {/* Konten Utama */}
                    <div className="relative z-10 flex flex-col items-center space-y-4">
                        
                        <div className="space-y-4">
                            <h3 className="text-4xl md:text-6xl text-white font-semibold tracking-tighter leading-tight">
                                Lihat Seluruh Project Kaming
                            </h3>
                            <p className="text-zinc-500 text-lg md:text-xl font-medium max-w-xl mx-auto">
                                Eksplorasi penjelasan dari setiap proyek yang telah saya bangun.
                            </p>
                        </div>

                        <div className="mt-4 flex items-center gap-3 text-white font-medium text-lg border-b border-zinc-800 pb-2 group-hover:border-blue-500 transition-all duration-500">
                            <span>Buka portofolio</span>
                            <div className="bg-white/5 p-3 rounded-full group-hover:bg-blue-600 transition-all duration-500">
                                <ArrowUpRight 
                                    size={20} 
                                    className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white" 
                                />
                            </div>
                        </div>
                    </div>

                    {/* Efek Cahaya (Glow) yang lebih halus */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                </Link>
            </div>
        </Section>
    );
}