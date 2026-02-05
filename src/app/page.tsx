import MainLayout from "@/components/layouts/main-layout";
import { Hero } from "@/components/ui/home/hero";
import Projects from "@/components/ui/home/projects";
import { TechStack } from "@/components/ui/home/tech-stack";
import { Experience } from "@/components/ui/home/experience";
import { Testimonials } from "@/components/ui/home/testimonials";
import { FinalCTA } from "@/components/ui/home/cta";
import AOSInit from "@/components/layouts/aos-init";

export default function Home() {

  return (
    <MainLayout>
        <AOSInit />
        
      <Hero />
      <Projects />
      <Experience />
      <TechStack />
      <Testimonials />
      <FinalCTA />
    </MainLayout>
  );
}