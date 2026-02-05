import Link from "next/link";
import { ArrowUpRight, Layers } from "lucide-react";
import Section from "@/components/layouts/sections";
import { format } from "date-fns";
import { getLatestHomeExperience } from "@/actions/public/home/action";

export async function Experience() {
    const experience = await getLatestHomeExperience();

    if (!experience) return null;

    return (
        <Section id="experience" data-aos="fade-up" className="mt-16 text-zinc-300 [-webkit-tap-highlight-color:transparent]">
            {/* --- HEADER SECTION --- */}
            <div className="flex flex-col justify-between mb-16 md:mb-24 gap-6 border-b border-white/5 pb-10">
                <div className="space-y-2">
                    <span className="text-md text-blue-500 font-bold">
                        Professional journey
                    </span>
                    <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tight">
                        Experiences
                    </h2>
                </div>
            </div>

            {/* --- EXPERIENCE CONTENT (Project List Style) --- */}
            <div className="relative">
                
                {/* 1. Garis Backbone Vertikal */}
                <div className="absolute left-0 md:left-0 top-0 bottom-0 w-px border-l border-dashed border-zinc-800 z-0" />

                <div className="relative pl-8 md:pl-24 group flex flex-col items-start mb-20 md:mb-32">
                    
                    {/* Tanda Titik pada Garis Backbone */}
                    <div className="absolute left-[-5px] top-1 w-[11px] h-[11px] rounded-full bg-zinc-900 border border-zinc-700 group-hover:border-blue-500 transition-colors duration-500 z-10" />

                    {/* Sisi Teks */}
                    <div className="w-full space-y-8">
                        <div className="space-y-6">
                            
                            {/* --- METADATA BAR --- */}
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] md:text-xs text-zinc-600 whitespace-nowrap uppercase tracking-widest">
                                    Pekerjaan Terbaru
                                </span>
                                <div className="h-[1px] flex-1 bg-zinc-800 group-hover:bg-blue-500/30 transition-all duration-700" />
                                <span className="text-[10px] md:text-xs text-blue-500/80 font-bold flex items-center gap-2 whitespace-nowrap">
                                    <Layers size={12} />
                                    {format(new Date(experience.start_date), "MMM yyyy")} — Present
                                </span>
                            </div>
                            
                            {/* --- TITLE & COMPANY --- */}
                            <div className="space-y-3">
                                <Link href="/experiences">
                                    <h3 className="text-3xl md:text-7xl font-bold text-white group-hover:text-blue-400 transition-colors duration-500 leading-tight">
                                        {experience.job_title}
                                    </h3>
                                </Link>
                                <p className="text-lg md:text-2xl text-zinc-500 font-medium">
                                    at <span className="text-zinc-300">{experience.company}</span>
                                </p>
                            </div>

                            {/* --- DESCRIPTION (TIPTAP HTML) --- */}
                            <div 
                                className="text-zinc-400 text-sm md:text-xl font-normal max-w-3xl prose prose-invert prose-sm md:prose-base leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: experience.description }}
                            />
                        </div>

                        {/* --- TECH TAGS --- */}
                        <div className="flex flex-wrap gap-2 md:gap-3">
                            {experience.skills?.split(",").map((skill: string) => (
                                <span 
                                    key={skill} 
                                    className="text-[10px] md:text-sm border border-white/5 bg-white/[0.03] px-4 py-1.5 md:px-5 md:py-2 rounded-full text-zinc-500 group-hover:text-zinc-300 group-hover:border-blue-500/20 transition-all duration-500"
                                >
                                    {skill.trim()}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* --- CTA SECTION --- */}
            <div className="mt-12 md:mt-20">
                <Link 
                    href="/experiences"
                    className="group relative block overflow-hidden rounded-3xl md:rounded-[3rem] border border-white/5 bg-white/[0.01] p-10 md:p-24 text-center transition-all duration-500 hover:bg-white/[0.03] hover:border-blue-500/20"
                >
                    <div className="relative z-10 flex flex-col items-center space-y-6">
                        <h3 className="text-3xl md:text-7xl text-white font-bold tracking-tight active:text-blue-500 transition-colors">
                            Lihat pengalaman lainnya
                        </h3>

                        <div className="mt-4 flex items-center gap-3 text-white font-bold text-base md:text-lg border-b border-zinc-800 pb-2 group-hover:border-blue-500 transition-all duration-500">
                            <span>Buka portofolio lengkap</span>
                            <div className="bg-white/5 p-2.5 md:p-3 rounded-full group-hover:bg-blue-600 transition-all duration-500">
                                <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform duration-500" />
                            </div>
                        </div>
                    </div>

                    {/* Subtle Background Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[200px] md:h-[400px] bg-blue-600/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
                </Link>
            </div>
        </Section>
    );
}