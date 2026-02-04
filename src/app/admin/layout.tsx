"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Briefcase, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  User,
  Globe,
  ShieldCheck
} from "lucide-react";
import { logoutAction } from "@/actions/auth/action";
import { useFormStatus } from "react-dom";

const MENU_ITEMS = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/admin/projects", icon: Briefcase },
  { name: "Profile", href: "/admin/profile", icon: User },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

// Sub-komponen untuk handle loading state pada tombol logout
function LogoutButton() {
  const { pending } = useFormStatus();
  return (
    <button 
      type="submit"
      disabled={pending}
      className="flex items-center gap-3 px-3 py-2 w-full text-xs font-medium text-zinc-500 hover:text-red-400 transition-colors hover:bg-red-500/5 rounded-xl disabled:opacity-50"
    >
      <LogOut size={14} className={pending ? "animate-pulse" : ""} />
      {pending ? "Logging out..." : "Logout"}
    </button>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-black text-zinc-400 selection:bg-blue-500/30">
      
      {/* --- SIDEBAR DESKTOP --- */}
      <aside className="hidden lg:flex flex-col w-72 border-r border-white/5 bg-black fixed h-full z-40">
        <div className="p-8 flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]">
            <ShieldCheck size={18} />
          </div>
          <span className="text-xl font-bold tracking-tighter text-white">Admin.</span>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          {MENU_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group ${
                  isActive 
                    ? "bg-white/5 text-blue-500 border border-white/5" 
                    : "hover:bg-white/[0.02] text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <item.icon size={18} className={isActive ? "text-blue-500" : "group-hover:text-blue-400"} />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile & Logout (Desktop) */}
        <div className="p-4 border-t border-white/5 m-4 rounded-2xl bg-white/[0.02]">
           <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-zinc-800 border border-white/10" />
              <div className="flex flex-col overflow-hidden">
                 <span className="text-xs font-semibold text-white truncate">Kaming Lo</span>
                 <span className="text-[10px] text-zinc-600 font-mono tracking-tighter">Administrator</span>
              </div>
           </div>
           <form action={logoutAction}>
              <LogoutButton />
           </form>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 lg:ml-72 flex flex-col min-h-screen">
        <header className="h-20 border-b border-white/5 bg-black/80 backdrop-blur-xl sticky top-0 z-30 px-6 md:px-10 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-white/5 rounded-xl transition-colors text-white"
            >
              <Menu size={20} />
            </button>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <Link href="/" className="flex items-center gap-2 text-md font-medium text-zinc-500 hover:text-blue-500 transition-colors">
              <Globe size={22} />
              <span className="hidden sm:inline">Live site</span>
            </Link>
          </div>
        </header>

        <div className="p-6 md:p-10 flex-1 bg-black">
          {children}
        </div>
      </main>

      {/* --- MOBILE SIDEBAR OVERLAY --- */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setIsSidebarOpen(false)} />
          
          <aside className="absolute top-0 left-0 bottom-0 w-80 bg-black border-r border-white/10 p-8 flex flex-col animate-in slide-in-from-left duration-500">
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                  <ShieldCheck size={16} />
                </div>
                <span className="text-xl font-bold tracking-tighter text-white">Admin.</span>
              </div>
              <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-zinc-500">
                <X size={24} />
              </button>
            </div>
            
            <nav className="flex-1 space-y-2">
              {MENU_ITEMS.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all ${
                    pathname === item.href ? "bg-white/5 text-blue-500 border border-white/5" : "text-zinc-500"
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </nav>

            {/* Logout Mobile Section */}
            <div className="mt-auto pt-8 border-t border-white/5">
              <div className="flex items-center gap-4 mb-6 px-2">
                <div className="h-12 w-12 rounded-full bg-zinc-800 border border-white/10" />
                <div className="flex flex-col">
                   <span className="text-sm font-semibold text-white">Kaming Lo</span>
                   <span className="text-xs text-zinc-600 font-mono">Administrator</span>
                </div>
              </div>
              <form action={logoutAction}>
                <button 
                  type="submit"
                  className="flex items-center justify-center gap-3 px-4 py-4 w-full bg-red-500/10 text-red-500 font-semibold rounded-2xl hover:bg-red-500/20 transition-all"
                >
                  <LogOut size={18} />
                  Logout from session
                </button>
              </form>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}