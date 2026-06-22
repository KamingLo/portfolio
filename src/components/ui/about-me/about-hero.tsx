import Section from "@/components/layouts/sections";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/logo";

export const AboutHero = () => (
  <Section id="about-hero" className="text-zinc-700">
    <div className="flex flex-col md:flex-row items-start justify-between pt-16 md:pt-32 pb-20 md:pb-40 gap-12 md:gap-16">
      <div className="flex flex-col items-start space-y-6 md:w-1/2">
        <Logo />
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold text-zinc-900">
          Engineering Digital Excellence
        </h1>
      </div>

      <div className="flex flex-col items-start md:w-1/2 md:pt-16 space-y-6">
        <p className="text-md sm:text-lg md:text-xl text-zinc-500 max-w-xl">
          I build high-performance, scalable web solutions designed to drive real business growth. By blending clean architecture with intuitive user experiences, I turn complex challenges into profitable digital assets.
        </p>

        <Link
          href="/contact"
          className="inline-flex items-center gap-3 bg-zinc-900 text-white px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:bg-blue-600 hover:gap-4 active:bg-blue-500"
        >
          Start Your Project
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </div>
  </Section>
);