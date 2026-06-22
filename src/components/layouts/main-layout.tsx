import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";
interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function MainLayout({ children, className = "" }: MainLayoutProps) {
  return (
    <div className="relative min-h-screen bg-white overflow-x-clip">
        <Navbar />

        <main className={`relative z-10 pb-20 px-4 md:px-6 mx-auto max-w-[1600px] selection:bg-blue-100 font-sans ${className}`}>
            {children}
        </main>

        <Footer />
    </div>
  );
}