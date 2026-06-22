"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { codeSnippets } from "./code-mockup-data";
import { siNextdotjs, siLaravel, siGo } from "simple-icons";
import { SimpleIcon } from "@/components/ui/simple-icon";

export const CodeMockup = () => {
  const [activeTab, setActiveTab] = useState<"nextjs" | "laravel" | "gin">("nextjs");
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activeSnippet = useMemo(() => {
    return codeSnippets.find((s) => s.id === activeTab) || codeSnippets[0];
  }, [activeTab]);

  // Auto-play cycle effect
  useEffect(() => {
    if (!isAutoPlaying) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveTab((prev) => {
          if (prev === "nextjs") return "laravel";
          if (prev === "laravel") return "gin";
          return "nextjs";
        });
        setIsTransitioning(false);
      }, 200);
    }, 9000); // cycle every 9 seconds

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isAutoPlaying]);

  const handleTabClick = (tabId: "nextjs" | "laravel" | "gin") => {
    if (activeTab === tabId) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(tabId);
      setIsTransitioning(false);
    }, 200);
    setIsAutoPlaying(false); // pause auto-playing on user click
  };

  const getColorClass = (type: string) => {
    switch (type) {
      case "keyword":
        return "text-purple-600 font-semibold";
      case "string":
        return "text-emerald-600";
      case "function":
        return "text-blue-600";
      case "className":
        return "text-amber-600 font-medium";
      case "variable":
        return "text-zinc-700 font-medium";
      case "punctuation":
        return "text-zinc-400";
      case "comment":
        return "text-zinc-400 italic";
      default:
        return "text-zinc-800";
    }
  };

  return (
    <div 
      className="w-full max-w-xl bg-white border border-zinc-200 shadow-xl shadow-zinc-100/50 rounded-none overflow-hidden font-sans text-left transition-all duration-300"
      data-aos="fade-left"
    >
      {/* Header Bar */}
      <div className="bg-zinc-50 border-b border-zinc-200 px-4 py-3 flex items-center justify-between select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="text-xs text-zinc-400 font-medium font-mono">
          {activeSnippet.fileName}
        </div>
        <div className="w-12" /> {/* spacer to balance layout */}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-200 bg-zinc-50/50 select-none overflow-x-auto scrollbar-hide">
        {codeSnippets.map((snippet) => {
          const isActive = snippet.id === activeTab;
          return (
            <button
              key={snippet.id}
              onClick={() => handleTabClick(snippet.id)}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-mono border-r border-zinc-200 transition-colors cursor-pointer rounded-none outline-none shrink-0 ${
                isActive
                  ? "bg-white border-b border-b-transparent text-zinc-950 font-semibold"
                  : "text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100/50"
              }`}
            >
              {/* Tab indicator icon */}
              {snippet.id === "nextjs" && <SimpleIcon icon={siNextdotjs} size={20} className={!isActive ? "text-zinc-400" : ""} style={isActive ? { color: `#${siNextdotjs.hex}` } : {}} />}
              {snippet.id === "laravel" && <SimpleIcon icon={siLaravel} size={20} className={!isActive ? "text-zinc-400" : ""} style={isActive ? { color: `#${siLaravel.hex}` } : {}} />}
              {snippet.id === "gin" && <SimpleIcon icon={siGo} size={20} className={!isActive ? "text-zinc-400" : ""} style={isActive ? { color: `#${siGo.hex}` } : {}} />}
              
              {snippet.label}
              
              {isActive && (
                <span className="ml-1 text-[10px] opacity-40 hover:opacity-100">×</span>
              )}
            </button>
          );
        })}
        {/* Fill remaining empty space in tab bar */}
        <div className="flex-1 bg-zinc-50/50 min-w-[2rem]" />
      </div>

      {/* Editor Content */}
      <div className={`p-5 font-mono text-[13px] leading-relaxed overflow-x-auto min-h-[350px] bg-white flex transition-opacity duration-200 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
        {/* Line Numbers */}
        <div className="flex flex-col text-zinc-300 text-right pr-4 select-none border-r border-zinc-100 min-w-[2.5rem]">
          {activeSnippet.lines.map((_, idx) => (
            <div key={idx} className="h-6">
              {idx + 1}
            </div>
          ))}
        </div>

        {/* Static Code */}
        <div className="pl-4 flex-1 text-zinc-800 select-all whitespace-pre">
          {activeSnippet.lines.map((line, lineIdx) => {
            if (line.length === 0) {
              return <div key={lineIdx} className="h-6" />;
            }

            return (
              <div key={lineIdx} className="h-6 flex items-center flex-wrap">
                {line.map((token, tokenIdx) => (
                  <span key={tokenIdx} className={getColorClass(token.type)}>
                    {token.text}
                  </span>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
