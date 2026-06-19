"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, ChangeEvent, useCallback } from "react";

export default function WebPConverterPage() {
  // --- STATE ---
  const [quality, setQuality] = useState<number>(80);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [webpUrl, setWebpUrl] = useState<string | null>(null);
  const [originalSizeStr, setOriginalSizeStr] = useState<string>("");
  const [newSizeStr, setNewSizeStr] = useState<string>("");
  const [reduction, setReduction] = useState<string>("");
  const [fileName, setFileName] = useState<string>("image.webp");
  const [rawImage, setRawImage] = useState<HTMLImageElement | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // --- HELPERS ---
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const parseToBytes = (formatted: string) => {
    const num = parseFloat(formatted);
    if (formatted.includes("MB")) return num * 1024 * 1024;
    if (formatted.includes("KB")) return num * 1024;
    return num;
  };

  // FIX: Menggunakan useCallback agar fungsi stabil dan tidak memicu useEffect berlebihan
  const convert = useCallback((img: HTMLImageElement, currentQuality: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const dataUrl = canvas.toDataURL("image/webp", currentQuality / 100);
    setWebpUrl(dataUrl);

    const stringLength = dataUrl.split(",")[1].length;
    const sizeInBytes = Math.floor(stringLength * (3 / 4));
    setNewSizeStr(formatBytes(sizeInBytes));

    const originalBytes = parseToBytes(originalSizeStr);
    const saved = (((originalBytes - sizeInBytes) / originalBytes) * 100).toFixed(1);
    setReduction((parseFloat(saved) > 0 ? saved : "0") + "%");
  }, [originalSizeStr]); // Dependency originalSizeStr krn digunakan di dalam fungsi

  const processImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name.split(".")[0] + ".webp");
    setOriginalSizeStr(formatBytes(file.size));

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image(); // Gunakan window.Image untuk native constructor
      img.onload = () => {
        setRawImage(img);
        setShowResult(true);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // FIX: Memasukkan 'convert' ke dalam dependency array
  useEffect(() => {
    if (rawImage) {
      convert(rawImage, quality);
    }
  }, [quality, rawImage, convert]);

  return (
    <div className="min-h-screen bg-black text-zinc-300 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-10 flex items-center justify-between border-b border-zinc-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tighter italic">
              WebP Engine.
            </h1>
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mt-1">
              Local Browser Image Compression
            </p>
          </div>
          <Link href="/admin/dashboard"
            className="text-sm text-blue-500 hover:text-blue-400 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to dashboard
          </Link>
        </div>

        <div className="space-y-8">
          {/* Upload Area */}
          <div className="bg-zinc-900/30 rounded-3xl border border-zinc-800 p-12 text-center hover:border-blue-500/50 transition-all group">
            <input type="file" id="conv_upload" className="hidden" accept="image/*" onChange={processImage} />
            <label htmlFor="conv_upload" className="cursor-pointer">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white/5 text-zinc-400 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-500/10 group-hover:text-blue-500 transition-all">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-lg font-bold text-zinc-200">Drop your file here</span>
                <p className="text-xs font-mono text-zinc-600 mt-2">SUPPORTS: PNG, JPG, GIF, AVIF</p>
              </div>
            </label>
          </div>

          {showResult && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              
              {/* Settings Card */}
              <div className="bg-zinc-900/40 p-8 rounded-3xl border border-zinc-800 space-y-6">
                <h3 className="text-[10px] font-mono font-bold text-blue-500 uppercase tracking-[0.3em]">Configurations</h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Quality</label>
                    <span className="text-xl font-bold text-white italic">{quality}%</span>
                  </div>
                  <input
                    type="range" min="10" max="100" value={quality}
                    onChange={(e) => setQuality(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                <div className="pt-6 border-t border-zinc-800 space-y-4 font-mono">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-600">ORIGINAL_SIZE</span>
                    <span className="text-zinc-400">{originalSizeStr}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-600">OPTIMIZED_SIZE</span>
                    <span className="text-blue-400 font-bold">{newSizeStr}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-blue-500/5 rounded-2xl mt-4 border border-blue-500/10">
                    <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Saving</span>
                    <span className="text-2xl font-bold text-blue-500 italic">{reduction}</span>
                  </div>
                </div>
              </div>

              {/* Preview Card */}
              <div className="bg-zinc-900/40 p-8 rounded-3xl border border-zinc-800 flex flex-col items-center justify-center relative overflow-hidden">
                <h3 className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-[0.3em] mb-6 self-start">Live Preview</h3>

                <div className="relative group cursor-zoom-in" onClick={() => webpUrl && setShowModal(true)}>
                  {webpUrl && (
                    <Image
                      src={webpUrl} 
                      alt="Preview"
                      width={800}
                      height={600}
                      unoptimized // Penting untuk dataURL/blob klien
                      className="max-h-64 w-auto rounded-xl shadow-2xl transition-all group-hover:scale-105 object-contain"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/10 backdrop-blur-md p-3 rounded-full text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>

                <a
                  href={webpUrl || "#"}
                  download={fileName}
                  className="w-full mt-8 py-4 bg-white text-black text-center font-bold rounded-2xl hover:bg-zinc-200 transition-all text-xs uppercase tracking-widest"
                >
                  Download WebP
                </a>
              </div>
            </div>
          )}

          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>

      {/* Modal Overlay */}
      {showModal && webpUrl && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95 p-4 md:p-10 animate-in fade-in duration-300"
          onClick={() => setShowModal(false)}
        >
          <button className="absolute top-8 right-8 text-zinc-500 hover:text-white transition-colors">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <Image 
            src={webpUrl} 
            alt="Full Preview"
            width={1200}
            height={800}
            unoptimized
            className="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain" 
          />
        </div>
      )}
    </div>
  );
}