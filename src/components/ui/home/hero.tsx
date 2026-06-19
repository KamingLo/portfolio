"use client";

import { useEffect, useRef, useCallback } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import Section from "@/components/layouts/sections";

export const Hero = () => {
  const sectionRef = useRef<HTMLOptionElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafId = useRef<number>(0);

  const updateVideoScale = useCallback(() => {
    const section = sectionRef.current;
    const videoWrapper = videoWrapperRef.current;
    const video = videoRef.current;
    if (!section || !videoWrapper || !video) return;

    const rect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight;
    const windowHeight = window.innerHeight;

    const scrolled = windowHeight - rect.top;
    const totalScrollRange = sectionHeight + windowHeight;
    const progress = Math.max(0, Math.min(1, scrolled / totalScrollRange));

    // Map scroll progress to scale: 60% -> 90%
    const videoProgress = Math.max(0, Math.min(1, (progress - 0.15) / 0.5));
    const scalePercent = 60 + videoProgress * 30; // 60 -> 90
    const borderRadius = Math.max(12, 24 * (1 - videoProgress)); // 24px -> 12px

    // Direct DOM manipulation — no React re-render, zero delay
    videoWrapper.style.width = `${scalePercent}%`;
    videoWrapper.style.borderRadius = `${borderRadius}px`;
    video.style.borderRadius = `${borderRadius}px`;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(updateVideoScale);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateVideoScale(); // Initial calculation

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [updateVideoScale]);

  return (
    <Section
      ref={sectionRef}
      style={{ marginLeft: "calc(-50vw + 50%)", width: "100vw", maxWidth: "none" }}
      className="relative !px-0 !mb-0"
    >
      {/* Text Content Area */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-8 pb-8 text-center">
        {/* Headline */}
        <h1
          className="max-w-4xl text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight"
          data-aos="fade-up"
        >
          Full-stack Developer.
        </h1>

        {/* Sub-headline */}
        <p
          className="mt-5 max-w-3xl text-xl sm:text-2xl md:text-3xl font-medium leading-relaxed"
          style={{ color: "rgba(160, 170, 190, 0.85)" }}
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Building digital products with precision.
        </p>

        {/* CTA Link */}
        <a
          href="#projects"
          className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 hover:gap-3"
          style={{ color: "rgba(120, 140, 255, 0.9)" }}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          See Projects
          <ArrowRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>

        {/* Scroll Indicator */}
        <div
          className="mt-12 animate-bounce"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <ChevronDown size={24} className="text-white/40" />
        </div>
      </div>

      {/* Video Section */}
      <div className="relative w-full pb-4">
        <div
          ref={videoWrapperRef}
          className="relative mx-auto overflow-hidden"
          style={{ width: "60%", borderRadius: "24px" }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-auto block"
            style={{ borderRadius: "24px" }}
          >
            <source src="/assets/video/hero_video.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -z-20 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/5 blur-[160px]" />
    </Section>
  );
};