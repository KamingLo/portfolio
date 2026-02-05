"use client";

import { useState} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
    LayoutDashboard, 
    Briefcase, 
    LogOut, 
    Menu, 
    X, 
    User,
    Globe,
    ShieldCheck,
    Zap
} from "lucide-react";
import { logoutAction } from "@/actions/auth/action";
import { useFormStatus } from "react-dom";

const MENU_ITEMS = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Projects", href: "/admin/projects", icon: Briefcase },
    { name: "Experiences", href: "/admin/experiences", icon: User },
    { name: "Converter tool", href: "/admin/converter", icon: Zap },
    { name: "Profile", href: "/admin/profile", icon: User },
];

const getInitial = (name: string) => name.charAt(0);

function LogoutButton() {
  const { pending } = useFormStatus();
  return (
    <button 
      type="submit"
      disabled={pending}
      className="flex items-center gap-3 px-4 py-3 w-full text-sm text-zinc-500 hover:text-red-500 hover:bg-red-500/5 active:bg-red-500/10 active:scale-95 rounded-2xl transition-all duration-200 disabled:opacity-50 outline-none"
    >
      <LogOut size={18} className={pending ? "animate-pulse" : ""} />
      <span>{pending ? "Logging out..." : "Logout"}</span>
    </button>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const userName = "Kaming Lo";

  return (
    <div className="flex min-h-screen bg-black text-zinc-400 selection:bg-blue-500/30 font-sans antialiased">
      
      {/* --- SIDEBAR DESKTOP --- */}
      <aside className="hidden lg:flex flex-col w-72 border-r border-zinc-900 bg-black fixed h-full z-40">
        <div className="p-8 flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white">
            <ShieldCheck size={20} />
          </div>
          <span className="text-2xl  text-white">Admin.</span>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {MENU_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-200 group border active:scale-95 ${
                  isActive 
                    ? "bg-white/5 text-blue-500 border-white/5 shadow-inner" 
                    : "bg-transparent text-zinc-500 border-transparent hover:bg-white/5 hover:text-zinc-200 active:bg-white/10"
                }`}
              >
                <item.icon size={20} className={isActive ? "text-blue-500" : "text-zinc-600 group-hover:text-blue-500"} />
                <span className="text-sm ">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-zinc-900">
           <div className="flex items-center gap-4 mb-6">
              <div className="h-10 w-10 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500  text-lg">
                {getInitial(userName)}
              </div>
              <div className="flex flex-col">
                 <span className="text-sm  text-white">{userName}</span>
                 <span className="text-xs text-zinc-600 font-medium tracking-normal">Administrator</span>
              </div>
           </div>
           <form action={logoutAction}>
              <LogoutButton />
           </form>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 lg:ml-72 flex flex-col min-h-screen">
        <header className="h-20 border-b border-zinc-900 bg-black/80 backdrop-blur-xl sticky top-0 z-30 px-6 flex items-center justify-between">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-3 bg-zinc-900 hover:bg-zinc-800 active:scale-90 active:bg-zinc-700 rounded-2xl transition-all text-white border border-zinc-800 outline-none"
          >
            <Menu size={20} />
          </button>

          <Link 
            href="/" 
            className="flex items-center gap-2 text-sm  text-zinc-500 hover:text-blue-500 active:scale-95 transition-all px-4 py-2 bg-zinc-900/50 rounded-xl border border-zinc-800"
          >
            <Globe size={18} />
            <span>Live site</span>
          </Link>
        </header>

        <div className="p-6 md:p-10 flex-1">
          {children}
        </div>
      </main>

      {/* --- MOBILE SIDEBAR --- */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div 
            className="absolute inset-0 bg-black/95 backdrop-blur-sm animate-in fade-in duration-300" 
            onClick={() => setIsSidebarOpen(false)} 
          />
          
          <aside className="absolute top-0 left-0 bottom-0 w-80 bg-black border-r border-zinc-900 p-8 flex flex-col animate-in slide-in-from-left duration-300 shadow-2xl">
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white">
                  <ShieldCheck size={20} />
                </div>
                <span className="text-2xl  text-white">Admin.</span>
              </div>
              <button 
                onClick={() => setIsSidebarOpen(false)} 
                className="p-3 bg-zinc-900 rounded-2xl text-zinc-500 border border-zinc-800 active:scale-90 transition-all"
              >
                <X size={20} />
              </button>
            </div>
            
            <nav className="flex-1 space-y-3">
              {MENU_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center gap-4 px-5 py-5 rounded-[2rem] transition-all duration-200 border active:scale-95 ${
                      isActive 
                        ? "bg-white/5 text-blue-500 border-white/5 shadow-inner" 
                        : "text-zinc-500 bg-transparent border-transparent active:bg-white/10 active:text-zinc-200"
                    }`}
                  >
                    <item.icon size={22} className={isActive ? "text-blue-500" : "text-zinc-600"} />
                    <span className="text-base ">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto pt-8 border-t border-zinc-900">
              <div className="flex items-center gap-4 mb-8 px-2">
                <div className="h-12 w-12 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500  text-xl">
                  {getInitial(userName)}
                </div>
                <div className="flex flex-col">
                   <span className="text-base  text-white">{userName}</span>
                   <span className="text-xs text-zinc-600 font-medium tracking-normal">Administrator</span>
                </div>
              </div>
              <form action={logoutAction}>
                <button 
                  type="submit"
                  className="flex items-center justify-center gap-4 py-4 w-full bg-red-600 text-white  rounded-[2rem] hover:bg-red-500 active:scale-95 active:brightness-90 transition-all shadow-lg shadow-red-900/20"
                >
                  <LogOut size={20} />
                  <span>Logout session</span>
                </button>
              </form>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}