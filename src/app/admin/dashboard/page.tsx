import { getAuth } from "@/lib/auth";
import Link from "next/link";
import { Users, FolderGit2, ArrowUpRight, LayoutDashboard } from "lucide-react";

export default async function DashboardPage() {
  // Satu baris sakti untuk validasi dan ambil data user
  const { user } = await getAuth();

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-blue-500 font-mono text-sm uppercase tracking-widest">
          <LayoutDashboard size={16} />
          <span>Admin Central</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
          Dashboard<span className="text-blue-600">.</span>
        </h1>
        <p className="text-zinc-500 text-lg font-medium">
          Selamat bekerja, <span className="text-white">{user.name}</span>.
        </p>
      </header>

      {/* Quick Navigation - Grid Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Navigasi ke Projects */}
        <Link 
          href="/admin/projects" 
          className="group relative overflow-hidden p-8 rounded-[2.5rem] bg-blue-600 border border-blue-500/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className="relative z-10 flex justify-between items-start mb-12">
            <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center text-white backdrop-blur-md">
              <FolderGit2 size={28} />
            </div>
            <ArrowUpRight className="text-white/40 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white tracking-tight">Portfolio Projects</h2>
            <p className="text-blue-100/70 font-medium">Tambah, edit, atau hapus karya terbaik Anda.</p>
          </div>
          {/* Decorative background circle */}
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all" />
        </Link>

        {/* Navigasi ke Users */}
        <Link 
          href="/admin/users" 
          className="group relative overflow-hidden p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 transition-all hover:bg-white/[0.04] hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className="relative z-10 flex justify-between items-start mb-12">
            <div className="h-14 w-14 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500">
              <Users size={28} />
            </div>
            <ArrowUpRight className="text-zinc-600 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white tracking-tight">User Management</h2>
            <p className="text-zinc-500 font-medium">Kelola siapa saja yang bisa mengakses panel ini.</p>
          </div>
        </Link>

      </div>

      {/* Info Card Kecil */}
      <div className="p-6 rounded-3xl bg-zinc-900/50 border border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-3 h-3 w-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
          <span className="text-sm font-medium text-zinc-400 font-mono">Database: PostgreSQL Connected</span>
        </div>
        <span className="text-xs text-zinc-600 font-mono">ID: {user.id}</span>
      </div>
    </div>
  );
}