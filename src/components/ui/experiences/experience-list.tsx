import { format } from "date-fns";

interface Experience {
    id: string;
    job_title: string;
    start_date: Date | string;
    end_date?: Date | string;
    is_current: boolean;
    company: string;
    description: string;
    skills?: string;
}

export default function ExperienceList({ experiences }: { experiences: Experience[] }) {
  return (
    <div className="py-16 md:py-24 space-y-16 md:space-y-24">
      {experiences.map((exp) => (
        <div 
          key={exp.id} 
          className="group flex flex-col md:flex-row gap-6 md:gap-16 items-start"
        >
          {/* Left Column - Date & Company */}
          <div className="w-full md:w-1/4 flex flex-col space-y-2 shrink-0 md:pt-1">
            <span className="text-sm font-semibold text-blue-600 tracking-wider uppercase">
              {format(new Date(exp.start_date), "MMM yyyy")} — {exp.is_current ? "Present" : exp.end_date ? format(new Date(exp.end_date), "MMM yyyy") : ""}
            </span>
            <span className="text-xl md:text-2xl font-semibold text-zinc-900">
              {exp.company}
            </span>
          </div>

          {/* Right Column - Role & Description */}
          <div className="w-full md:w-3/4 space-y-6">
            <h3 className="text-2xl md:text-4xl font-semibold text-zinc-900 group-hover:text-blue-600 transition-colors">
              {exp.job_title}
            </h3>
            
            {/* Description */}
            <div 
              className="text-zinc-500 text-base md:text-lg leading-relaxed max-w-3xl prose prose-zinc prose-p:my-2 prose-ul:my-2 prose-li:my-1"
              dangerouslySetInnerHTML={{ __html: exp.description }}
            />

            {/* Tech Tags */}
            {exp.skills && (
              <div className="flex flex-wrap gap-2 pt-2">
                {exp.skills.split(",").map((skill: string) => (
                  <span 
                    key={skill} 
                    className="text-xs md:text-sm font-semibold border border-zinc-200 px-3 py-1.5 text-zinc-500 hover:border-blue-300 hover:text-blue-600 transition-colors"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}