import { Layers } from "lucide-react";
import { format } from "date-fns";

interface Experience {
    id: string;
    job_title: string;
    start_date: string; // Assuming start_date is a string representing a date
    end_date?: string; // Optional, assuming it may not be present for current jobs
    is_current: boolean;
    company: string;
    description: string;
    skills?: string; // Optional, assuming skills are a comma-separated string
}

export default function ExperienceProjectStyle({ experiences }: { experiences: Experience[] }) {
  return (
    <div className="relative max-w-5xl mx-auto px-4 py-20">
      
      {/* 1. Garis Backbone Vertikal (Kiri) */}
      <div className="absolute left-6 md:left-10 top-0 bottom-0 w-px border-l border-dashed border-zinc-800 z-0" />

      <div className="space-y-32 md:space-y-48">
        {experiences.map((exp, index) => (
          <div 
            key={exp.id} 
            className="relative pl-12 md:pl-24 group flex flex-col items-start"
          >
            
            {/* Sisi Teks (Desain Project List Style yang Disederhanakan) */}
            <div className="w-full space-y-8">
              <div className="space-y-6">
                
                {/* --- METADATA BAR --- */}
                <div className="flex items-center gap-4">
                  <span className="text-xs text-zinc-600">
                    NO. {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="h-[1px] flex-1 bg-zinc-800 group-hover:bg-blue-500/30 transition-all duration-700" />
                  <span className="text-xs text-blue-500/80 font-bold flex items-center gap-2">
                    <Layers size={12} />
                    {/* Format: Jan 2024 — Present */}
                    {format(new Date(exp.start_date), "MMM yyyy")} — {exp.is_current ? "Present" : format(new Date(exp.end_date!), "MMM yyyy")}
                  </span>
                </div>
                
                {/* --- TITLE & COMPANY --- */}
                <div className="space-y-3">
                  <h3 className="text-4xl md:text-7xl font-bold text-white group-hover:text-blue-400 transition-colors duration-500">
                    {exp.job_title}
                  </h3>
                  <p className="text-lg md:text-2xl text-zinc-500 font-medium">
                    at <span className="text-zinc-300">{exp.company}</span>
                  </p>
                </div>

                {/* --- DESCRIPTION (TIPTAP HTML) --- */}
                <div 
                  className="text-zinc-400 text-base md:text-xl font-normal max-w-3xl prose prose-invert prose-sm md:prose-base"
                  dangerouslySetInnerHTML={{ __html: exp.description }}
                />
              </div>

              {/* --- TECH TAGS --- */}
              <div className="flex flex-wrap gap-2 md:gap-3">
                {exp.skills?.split(",").map((skill: string) => (
                  <span 
                    key={skill} 
                    className="text-sm md:text-md border border-white/5 bg-white/[0.03] px-5 py-2 rounded-full text-zinc-500 group-hover:text-zinc-300 group-hover:border-blue-500/20 transition-all duration-500"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}