import { Layers, Database, Code2, CheckCircle2 } from "lucide-react";
import Section from "@/components/layouts/sections";

const Stacks = [
  { 
    title: "Frontend", 
    icon: Layers, 
    techs: ["Next.js / React", "Tailwind CSS", "Flutter"],
    description: "Membangun antarmuka yang responsif dan interaktif."
  },
  { 
    title: "Backend", 
    icon: Database, 
    techs: ["Laravel / PHP", "Node.js / Express", "PostgreSQL / MongoDB"],
    description: "Arsitektur server yang aman dan database teroptimasi."
  },
  { 
    title: "Infrastructure", 
    icon: Code2, 
    techs: ["Ubuntu Server", "Git / GitHub", "Python (Data analysis)"],
    description: "Deployment yang efisien dan analisis data teknis."
  }
];

export const TechStack = () => (
  <Section id="stack" data-aos="fade-in" className="text-zinc-300 [-webkit-tap-highlight-color:transparent]">
    <div className="max-w-7xl mx-auto">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6 border-b border-white/5 pb-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2">
            <span className="text-sm text-blue-500 font-bold">
              Software engine
            </span>
          </div>
          <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tight">
            Tech stack
          </h2>
        </div>
        <p className="text-zinc-500 max-w-sm text-base md:text-lg font-medium">
          Teknologi pilihan untuk membangun produk yang skalabel dan berperforma tinggi.
        </p>
      </div>

      {/* --- GRID DISPLAY --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {Stacks.map((stack, i) => (
          <div 
            key={i} 
            className="group relative p-10 md:p-14 rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-all duration-200 hover:border-blue-500/20 active:border-blue-500 active:bg-blue-500/5"
          >
            {/* Subtle Gradient Glow */}
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="relative z-10">
              <stack.icon className="w-14 h-14 mb-10 text-zinc-700 group-hover:text-blue-500 group-active:text-blue-500 transition-colors duration-300" />
              
              <div className="space-y-4 mb-10">
                <h4 className="text-3xl md:text-4xl font-bold text-white group-active:text-blue-500 transition-colors">
                  {stack.title}
                </h4>
                <p className="text-zinc-500 text-base font-normal group-hover:text-zinc-400 transition-colors">
                  {stack.description}
                </p>
              </div>

              <ul className="space-y-5">
                {stack.techs.map((t, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-zinc-400 group-hover:text-zinc-200 group-active:text-zinc-200 transition-colors text-lg md:text-xl font-medium">
                    <CheckCircle2 size={20} className="text-zinc-800 group-hover:text-blue-500 group-active:text-blue-500 transition-colors duration-300" /> 
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Section>
);