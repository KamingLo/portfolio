import { Layers, Database, Code2, CheckCircle2 } from "lucide-react";
import Section from "@/components/layouts/sections";

const Stacks = [
  { 
    title: "Frontend", 
    icon: Layers, 
    techs: ["Next.js / React", "Tailwind CSS", "TypeScript"],
    description: "Membangun antarmuka yang responsif dan interaktif."
  },
  { 
    title: "Backend", 
    icon: Database, 
    techs: ["Laravel / PHP", "Node.js / Express", "PostgreSQL / Mongo"],
    description: "Arsitektur server yang aman dan database teroptimasi."
  },
  { 
    title: "Infrastructure", 
    icon: Code2, 
    techs: ["Ubuntu Server", "Docker / Git", "Python (Data analysis)"],
    description: "Deployment yang efisien dan analisis data teknis."
  }
];

export const TechStack = () => (
  <Section id="stack" className="text-zinc-300">
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6 border-b border-white/5 pb-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-sm font-mono tracking-[0.2em] text-blue-500 font-semibold">
              Engine room
            </span>
          </div>
          <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tighter">
            Tech stack<span className="text-blue-600">.</span>
          </h2>
        </div>
        <p className="text-zinc-500 max-w-sm text-base md:text-lg font-medium leading-relaxed">
          Teknologi pilihan untuk membangun produk yang skalabel dan berperforma tinggi.
        </p>
      </div>

      {/* Grid Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {Stacks.map((stack, i) => (
          <div 
            key={i} 
            className="group relative p-10 md:p-14 rounded-4xl border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:border-blue-500/20 hover:bg-white/[0.04]"
          >
            {/* Subtle Gradient Glow */}
            <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10">
              <stack.icon className="w-14 h-14 mb-10 text-zinc-600 group-hover:text-blue-500 transition-all duration-500 group-hover:scale-110" />
              
              <div className="space-y-4 mb-10">
                <h4 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
                  {stack.title}
                </h4>
                <p className="text-zinc-500 text-base font-normal leading-relaxed group-hover:text-zinc-400 transition-colors">
                  {stack.description}
                </p>
              </div>

              <ul className="space-y-5">
                {stack.techs.map((t, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-zinc-400 group-hover:text-zinc-200 transition-colors text-lg md:text-xl font-medium">
                    <CheckCircle2 size={20} className="text-zinc-800 group-hover:text-blue-500 transition-colors duration-500" /> 
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