import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { CodeMockup } from "./code-mockup";

export const HeroContent = () => {
  return (
    <div className="relative z-10 flex flex-col items-start justify-center min-h-[85vh] md:px-6 pt-12 pb-8">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center max-w-[1440px] w-full mx-auto">
        
        <div className="lg:col-span-7 flex flex-col items-start text-left">

          <h1
            className="text-zinc-900 text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold tracking-tight leading-[1.1] max-w-2xl"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Make Website That Improve Business
          </h1>

          <p
            className="mt-6 text-zinc-500 text-base sm:text-lg md:text-xl max-w-xl leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            I build modern, high-performance web applications designed to engage users and accelerate business growth. Specialized in Next.js, Laravel, and Go.
          </p>

          <div 
            className="relative mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 z-10"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-zinc-900 text-white px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:bg-blue-600 active:bg-blue-500"
            >
              Let&apos;s Talk
              <ArrowRight size={16} />
            </Link>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 border border-zinc-200 text-zinc-900 px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:bg-zinc-50 hover:border-zinc-300"
            >
              See My Projects
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
          <CodeMockup />
        </div>
      </div>

      <div
        className="relative z-10 mt-16 animate-bounce"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <ChevronDown size={24} className="text-zinc-300" />
      </div>
    </div>
  );
};

