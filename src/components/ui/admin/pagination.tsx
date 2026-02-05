"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ totalPages, currentPage }: { totalPages: number, currentPage: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => router.push(createPageURL(currentPage - 1))}
        disabled={currentPage <= 1}
        className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white disabled:opacity-20 transition-all"
      >
        <ChevronLeft size={20} />
      </button>
      
      <div className="flex items-center gap-1">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => router.push(createPageURL(i + 1))}
            className={`w-10 h-10 rounded-xl font-mono text-sm transition-all border ${
              currentPage === i + 1 
              ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20" 
              : "bg-white/5 border-white/10 text-zinc-500 hover:bg-white/10"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <button
        onClick={() => router.push(createPageURL(currentPage + 1))}
        disabled={currentPage >= totalPages}
        className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white disabled:opacity-20 transition-all"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}