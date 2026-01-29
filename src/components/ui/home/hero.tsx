import Section from "@/components/layouts/sections";
import { ArrowRight, Github, MessageCircle } from "lucide-react";
import Image from "next/image";

export const Hero = () => {
  return (
    <Section className="relative min-h-[85vh] mt-24 md:mt-10 flex items-center justify-center">
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        
        {/* Left Side: Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Status Badge */}
          <div className="mb-6 inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5 text-xs font-mono tracking-widest text-blue-400">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
            Available for new projects
          </div>

          {/* Headline */}
          <h1 className="max-w-3xl text-white bg-clip-text text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1]">
            Full-stack & App Developer building digital products
          </h1>
          
          {/* Sub-headline */}
          <p className="mt-6 max-w-xl text-lg md:text-xl text-zinc-500 font-medium leading-relaxed">
            I'm Kaming Lo, a specialist in <span className="text-blue-400">Next.js</span> and <span className="text-zinc-300">Laravel</span> ecosystem. 
            Fokus menciptakan aplikasi web yang skalabel, performa cepat, dan desain yang mengutamakan <span className="text-zinc-300">user experience</span>.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
            {/* WhatsApp Button */}
            <a 
              href="https://wa.me/6283835360789"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition-all hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              <MessageCircle size={18} />
              Chat on WhatsApp
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            
            {/* Github Button */}
            <a 
              href="https://github.com/kaminglo" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20"
            >
              <Github size={18} />
              Explore Source Code
            </a>
          </div>
        </div>

        {/* Right Side: Image - Hidden on Mobile */}
        <div className="hidden lg:flex justify-end">
          <div className="relative w-[500px] h-[500px]">
            <div className="w-full h-full relative rounded-[3rem] overflow-hidden border border-white/20 shadow-2xl">
              <Image 
                src="/assets/image/kaming.webp"
                alt="Kaming Lo - Full-stack Developer"
                fill
                priority
                className="object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>

            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-600/20 blur-[80px] -z-10" />
          </div>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -z-20 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/5 blur-[160px]" />
    </Section>
  );
};