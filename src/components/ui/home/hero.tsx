import Section from "@/components/layouts/sections";
import { ArrowRight, Github, MessageCircle } from "lucide-react";
import Image from "next/image";

export const Hero = () => {
  return (
    // Tambahkan tap highlight transparent agar tidak ada kotak abu-abu saat klik di HP
    <Section data-aos="fade-in"className="relative sm:mb-16 flex items-center justify-center [-webkit-tap-highlight-color:transparent]">
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        
        {/* Left Side: Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          
          {/* Status Badge */}
          <div className="mb-6 inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5 text-xs font-medium text-blue-400">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
            Available for new projects
          </div>

          {/* Headline */}
          <h1 className="max-w-3xl text-white text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight">
            Full-stack & App Developer building digital products
          </h1>
          
          {/* Sub-headline */}
          <p className="mt-6 max-w-xl text-lg md:text-xl text-zinc-500 font-medium leading-relaxed">
            I'm Kaming Lo, a specialist in <span className="text-blue-400">Next.js</span> and <span className="text-zinc-300">Laravel</span> ecosystem. 
            Fokus menciptakan aplikasi web yang skalabel, performa cepat, dan desain yang mengutamakan <span className="text-zinc-300">user experience</span>.
          </p>

          {/* CTA Buttons - Mobile only */}
          <div className="mt-10 flex flex-col sm:hidden gap-5 w-full">
            
            {/* WhatsApp Button */}
            <a 
              href="https://wa.me/6283835360789"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-black transition-all duration-200 hover:bg-zinc-200 active:bg-blue-600 active:text-white"
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
              className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-bold text-white backdrop-blur-md transition-all duration-200 hover:bg-white/10 active:border-blue-500 active:text-blue-500"
            >
              <Github size={18} />
              Explore source code
            </a>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="hidden lg:flex justify-end">
          <div className="relative w-[500px] h-[500px]">
            <div className="w-full h-full relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
              <Image 
                src="/assets/image/kaming.webp"
                alt="Kaming Lo"
                fill
                priority
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-600/10 blur-[80px] -z-10" />
          </div>
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -z-20 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/5 blur-[160px]" />
    </Section>
  );
};