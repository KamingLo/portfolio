import MainLayout from "@/components/layouts/main-layout";
import { AboutHero } from "@/components/ui/about-me/about-hero";
import { AboutFounder } from "@/components/ui/about-me/about-founder";
import { AboutSkills } from "@/components/ui/about-me/about-skills";
import { TechStack } from "@/components/ui/home/tech-stack";

export default function AboutPage() {
  return (
    <MainLayout>
      <AboutHero />
      <AboutFounder />
      <AboutSkills />
      <div className="mt-16 md:mt-24">
        <TechStack />
      </div>
    </MainLayout>
  );
}