import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Section from "@/components/layouts/sections";

export const Experience = () => (
  <Section id="experience" className="text-zinc-300 mt-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6 border-b border-white/5 pb-10">
            <div className="space-y-3">
            <div className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-sm font-mono tracking-[0.2em] text-blue-500 font-semibold">
                Professional journey
                </span>
            </div>
            <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tighter">
                Experience<span className="text-blue-600">.</span>
            </h2>
            </div>
            <p className="text-zinc-500 max-w-sm text-base md:text-lg font-medium leading-relaxed">
            Rekam jejak profesional dalam membangun infrastruktur digital dan solusi backend.
            </p>
        </div>

        <div className="relative group">
            <div className="absolute -inset-1 bg-blue-600/10 rounded-xl blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
            
            <div className="relative rounded-4xl border border-white/10 bg-white/[0.02] p-10 md:p-20 backdrop-blur-sm transition-all hover:bg-white/[0.04]">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                <div className="space-y-6 flex-1">
                <div className="space-y-2">
                    <div className="text-sm font-mono text-blue-500 tracking-wider font-medium">
                    Januari 2026 — Present
                    </div>
                    <h3 className="text-4xl md:text-6xl font-semibold text-white tracking-tight">
                    Backend developer intern
                    </h3>
                </div>
                
                <p className="text-zinc-400 leading-relaxed text-lg md:text-xl font-normal max-w-2xl">
                    Mengelola arsitektur server dan optimasi database untuk platform berskala menengah. 
                    Fokus pada performa Laravel dan integrasi API pihak ketiga.
                </p>

                {/* Skill Tags */}
                <div className="flex flex-wrap gap-3 pt-4">
                    {["Laravel", "System Architecture", "API Integration", "Database Optimization"].map((skill) => (
                    <span key={skill} className="text-xs font-mono border border-white/10 bg-white/[0.05] px-4 py-2 rounded-full text-zinc-300">
                        {skill}
                    </span>
                    ))}
                </div>
                </div>
            </div>

            {/* Link ke riwayat lengkap */}
            <div className="mt-16 pt-10 border-t border-white/5 flex justify-start">
                <Link 
                href="/experience" 
                className="group/link inline-flex items-center gap-3 text-lg font-semibold text-white tracking-tight"
                >
                <span className="border-b-2 border-zinc-800 group-hover/link:border-blue-500 pb-1 transition-all">
                    Lihat riwayat karir lengkap
                </span>
                <div className="bg-white/5 p-3 rounded-full group-hover/link:bg-blue-600 transition-all">
                    <ArrowUpRight size={20} className="transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                </div>
                </Link>
            </div>
            </div>
        </div>
  </Section>
);