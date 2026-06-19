import { Navbar } from "@/components/layouts/navbar";

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function MainLayout({ children, className = "" }: MainLayoutProps) {
  return (
    <div className="relative min-h-screen bg-black overflow-x-clip">
        <Navbar />

        <main className={`relative z-10 pb-20 max-w-7xl mx-auto px-6 selection:bg-blue-500/30 font-sans ${className}`}>
            {children}
        </main>
    </div>
  );
}