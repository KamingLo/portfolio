import Section from "@/components/layouts/sections";
import { HeroContent } from "./hero-content";
import { HeroVideo } from "./hero-video";

export const Hero = () => {
  return (
    <Section className="relative">
      <HeroContent />
      <HeroVideo />
    </Section>
  );
};