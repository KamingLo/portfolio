import type { Metadata } from "next";
import MainLayout from "@/components/layouts/main-layout";
import { AboutHero } from "@/components/ui/about-me/about-hero";
import { AboutFounder } from "@/components/ui/about-me/about-founder";
import { AboutSkills } from "@/components/ui/about-me/about-skills";
import { TechStack } from "@/components/ui/home/tech-stack";

export const metadata: Metadata = {
  title: "About Me",
  description: "Learn more about Kaming Lo, a modern software engineer and web developer. Discover my background, skills, and values in software engineering.",
};

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