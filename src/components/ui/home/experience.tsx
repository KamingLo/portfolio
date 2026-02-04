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
            <div className="flex flex-col justify-between mb-12 md:mb-20 gap-6 border-b border-white/5 pb-10">
                <div className="space-y-2">
                    <span className="text-md text-blue-500 font-bold">
                        Professional journey
                    </span>
                    <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tight">
                        Experiences
                    </h2>
                </div>
            </div>

            {/* --- EXPERIENCE CARD --- */}
            <div className="group relative border-b border-white/5 pb-12">
                <div className="flex flex-col gap-10 md:gap-12">
                    
                    {/* 1. Metadata Bar */}
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-bold text-zinc-600">
                            Pekerjaan terbaru
                        </span>
                        <div className="h-px w-12 bg-zinc-800 group-hover:w-20 group-hover:bg-blue-500/30 transition-all duration-700" />
                        <span className="text-xs text-blue-500 font-bold flex items-center gap-2">
                            <Layers size={12} />
                            {format(new Date(experience.start_date), "MMM yyyy")} — Present
                        </span>
                    </div>

                    {/* 2. Main Title & Company */}
                    <div className="space-y-4">
                        <Link href="/experiences" className="inline-block active:text-blue-500 transition-colors">
                            <h3 className="text-5xl md:text-8xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors duration-500 leading-[0.9]">
                                {experience.job_title}
                            </h3>
                        </Link>
                        <p className="text-2xl md:text-4xl text-zinc-500 font-medium tracking-tight">
                            at <span className="text-zinc-300">{experience.company}</span>
                        </p>
                    </div>

                    {/* 3. Description */}
                    <div 
                        className="text-zinc-400 leading-relaxed text-lg md:text-2xl font-normal max-w-4xl prose prose-invert prose-p:leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: experience.description }}
                    />

                    {/* 4. Tech Stack Tags - No uppercase, No tracking */}
                    <div className="flex flex-wrap gap-2 md:gap-3">
                        {experience.skills?.split(",").map((skill: string) => (
                            <span 
                                key={skill} 
                                className="text-xs md:text-sm border border-white/5 bg-white/[0.03] px-6 py-2.5 rounded-full text-zinc-500 group-hover:text-zinc-300 group-hover:border-blue-500/20 transition-all duration-500"
                            >
                                {skill.trim()}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- CTA SECTION --- */}
            <div className="mt-8">
                <Link 
                    href="/experiences"
                    className="group relative block overflow-hidden rounded-[3rem] border border-white/5 bg-white/[0.01] p-12 md:p-24 text-center transition-all duration-500 hover:bg-white/[0.03] hover:border-blue-500/20 active:border-blue-500"
                >
                    <div className="relative z-10 flex flex-col items-center space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-4xl md:text-7xl text-white font-bold tracking-tight active:text-blue-500 transition-colors">
                                Lihat pengalaman lainnya
                            </h3>
                        </div>

                        <div className="mt-4 flex items-center gap-3 text-white font-bold text-lg border-b border-zinc-800 pb-2 group-hover:border-blue-500 group-active:border-blue-500 group-active:text-blue-500 transition-all duration-500">
                            <span>Buka portofolio lengkap</span>
                            <div className="bg-white/5 p-3 rounded-full group-hover:bg-blue-600 group-active:bg-blue-500 transition-all duration-500">
                                <ArrowUpRight size={22} className="group-hover:rotate-45 transition-transform duration-500" />
                            </div>
                        </div>
                    </div>

                    {/* Subtle Background Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/5 blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
                </Link>
            </div>
        </Section>
    );
}