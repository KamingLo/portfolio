// src/components/layouts/main-layout.tsx
import { Navbar } from "@/components/layouts/navbar";

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function MainLayout({ children, className = "" }: MainLayoutProps) {
  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden">
        {/* Navbar dipanggil di sini agar muncul di portfolio */}
        <Navbar />

        {/* Background Decorative Elements */}
        <div className="fixed inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.25]" />
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px]" />
            <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/15 blur-[100px]" />
        </div>
      
        {/* Konten Utama dengan Padding Top agar tidak tertutup Navbar */}
        <main className={`relative z-10 pt-28 pb-20 max-w-7xl mx-auto px-6 selection:bg-blue-500/30 font-sans ${className}`}>
            {children}
        </main>
    </div>
  );
}