"use client";

import { useEffect, useRef, useCallback } from "react";

export const HeroVideo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafId = useRef<number>(0);

  const updateVideoScale = useCallback(() => {
    const container = containerRef.current;
    const videoWrapper = videoWrapperRef.current;
    const video = videoRef.current;
    if (!container || !videoWrapper || !video) return;

    // Use window scroll position to determine scale since hero is at the top
    const scrollY = window.scrollY;
    const maxScroll = 500; // The amount of scroll required to reach full width
    const progress = Math.max(0, Math.min(1, scrollY / maxScroll));

    const scalePercent = 60 + progress * 40; // 60 -> 100
    const borderRadius = Math.max(12, 24 * (1 - progress)); // 24px -> 12px

    const opacityProgress = Math.max(0, Math.min(1, scrollY / 150)); // Fade in quickly over 150px
    const translateY = 20 * (1 - opacityProgress); // Slide up 20px while fading

    // Direct DOM manipulation — no React re-render, zero delay
    videoWrapper.style.width = `${scalePercent}%`;
    videoWrapper.style.borderRadius = `${borderRadius}px`;
    videoWrapper.style.opacity = `${opacityProgress}`;
    videoWrapper.style.transform = `translateY(${translateY}px)`;
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
    <div ref={containerRef} className="relative w-full pb-4">
      <div
        ref={videoWrapperRef}
        className="relative mx-auto overflow-hidden shadow-2xl shadow-zinc-200/50"
        style={{ width: "60%", borderRadius: "24px", opacity: 0, transform: "translateY(20px)" }}
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
  );
};
