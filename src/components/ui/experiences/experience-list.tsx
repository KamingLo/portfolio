import { Layers } from "lucide-react";
import { format } from "date-fns";

interface Experience {
    id: string;
    job_title: string;
    start_date: string;
    end_date?: string;
    is_current: boolean;
    company: string;
    description: string;
    skills?: string;
}

export default function ExperienceProjectStyle({ experiences }: { experiences: Experience[] }) {
  return (
    <div className="relative max-w-5xl mx-auto py-12 md:py-20">
      
      {/* 1. Garis Backbone Vertikal - Digeser ke kiri banget kalau di mobile agar hemat tempat */}
      <div className="absolute top-0 bottom-0 w-px border-l border-dashed border-zinc-800 z-0" />

      <div className="space-y-20 md:space-y-48">
        {experiences.map((exp, index) => (
          <div 
            key={exp.id} 
            className="relative pl-8 md:pl-24 group flex flex-col items-start"
          >
            
            {/* Tanda Titik pada Garis Backbone */}
            <div className="absolute left-[-5px] md:left-[-5px] top-1 w-[11px] h-[11px] rounded-full bg-zinc-900 border border-zinc-700 group-hover:border-blue-500 transition-colors duration-500 z-10" />

            {/* Sisi Teks */}
            <div className="w-full space-y-6 md:space-y-8">
              <div className="space-y-4 md:space-y-6">
                
                {/* --- METADATA BAR --- */}
                <div className="flex items-center gap-3 md:gap-4">
                  <span className="text-[10px] md:text-xs text-zinc-600 whitespace-nowrap">
                    NO. {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="h-[1px] flex-1 bg-zinc-800 group-hover:bg-blue-500/30 transition-all duration-700" />
                  <span className="text-[10px] md:text-xs text-blue-500/80 font-bold flex items-center gap-1.5 whitespace-nowrap">
                    <Layers size={10} className="md:w-3 md:h-3" />
                    {format(new Date(exp.start_date), "MMM yyyy")} — {exp.is_current ? "Present" : exp.end_date ? format(new Date(exp.end_date), "MMM yyyy") : ""}
                  </span>
                </div>
                
                {/* --- TITLE & COMPANY --- */}
                <div className="space-y-2 md:space-y-3">
                  {/* Ukuran font dikurangi untuk mobile (text-2xl/3xl) agar tidak pecah baris terlalu ekstrem */}
                  <h3 className="text-2xl sm:text-3xl md:text-7xl font-bold text-white group-hover:text-blue-400 transition-colors duration-500 leading-tight">
                    {exp.job_title}
                  </h3>
                  <p className="text-base md:text-2xl text-zinc-500 font-medium">
                    at <span className="text-zinc-300">{exp.company}</span>
                  </p>
                </div>

                {/* --- DESCRIPTION --- */}
                {/* max-w-full di mobile agar teks memenuhi layar */}
                <div 
                  className="text-zinc-400 text-sm md:text-xl font-normal max-w-full md:max-w-3xl prose prose-invert prose-xs md:prose-base leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: exp.description }}
                />
              </div>

              {/* --- TECH TAGS --- */}
              <div className="flex flex-wrap gap-2">
                {exp.skills?.split(",").map((skill: string) => (
                  <span 
                    key={skill} 
                    className="text-[10px] md:text-sm border border-white/5 bg-white/[0.03] px-3 py-1 md:px-5 md:py-2 rounded-full text-zinc-500 group-hover:text-zinc-300 group-hover:border-blue-500/20 transition-all duration-500"
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