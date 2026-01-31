import { getAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Users, ArrowLeft, ArrowRight, UserPlus, Search } from "lucide-react";
import Link from "next/link";

export default async function UsersPage() {
  // 1. Proteksi Halaman & Ambil Data Admin
  const { user: currentUser } = await getAuth();

  // 2. Ambil Data Semua User
  const allUsers = await prisma.user.findMany({
    select: { id: true, name: true, email: true },
    orderBy: { id: 'asc' },
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Navigation & Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <Link 
            href="/admin" 
            className="group flex items-center gap-2 text-zinc-500 hover:text-blue-500 transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Kembali ke Dashboard
          </Link>
          <div className="space-y-1">
            <h1 className="text-4xl font-bold text-white tracking-tight">User Management</h1>
            <p className="text-zinc-500 font-medium">
              Mengelola akses dan data pengguna sistem.
            </p>
          </div>
        </div>

        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-semibold transition-all shadow-lg shadow-blue-600/20 active:scale-95">
          <UserPlus size={18} />
          <span>Tambah Pengguna</span>
        </button>
      </div>

      <hr className="border-white/5" />

      {/* Main Content Card */}
      <div className="rounded-[2.5rem] bg-white/[0.02] border border-white/5 overflow-hidden backdrop-blur-sm">
        
        {/* Table Header / Toolbar */}
        <div className="p-8 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500">
              <Users size={20} />
            </div>
            <h2 className="text-xl font-semibold text-white tracking-tight">
              Daftar Pengguna <span className="text-zinc-600 ml-1">({allUsers.length})</span>
            </h2>
          </div>
          
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Cari email atau nama..." 
              className="bg-white/5 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm text-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-600/50 transition-all w-full sm:w-64"
            />
          </div>
        </div>

        {/* Table Area */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-zinc-600 text-xs font-mono uppercase tracking-[0.2em] border-b border-white/5 bg-white/[0.01]">
                <th className="px-8 py-5 font-medium">ID User</th>
                <th className="px-8 py-5 font-medium">Informasi Pengguna</th>
                <th className="px-8 py-5 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {allUsers.map((u) => (
                <tr key={u.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="px-8 py-6">
                    <span className="font-mono text-xs text-zinc-500 group-hover:text-blue-500 transition-colors">
                      {u.id}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-zinc-200 font-semibold tracking-tight">
                        {u.name} {u.id === currentUser.id && <span className="ml-2 text-[10px] bg-blue-600/20 text-blue-400 px-2 py-0.5 rounded-full uppercase tracking-widest font-bold">You</span>}
                      </span>
                      <span className="text-zinc-500 text-sm">{u.email}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="inline-flex items-center justify-center h-10 w-10 text-zinc-600 hover:text-white hover:bg-white/10 rounded-xl transition-all">
                      <ArrowRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Table */}
        <div className="p-6 bg-white/[0.01] border-t border-white/5 text-center">
          <p className="text-xs font-mono text-zinc-600 uppercase tracking-widest">
            End of records — Logged in as {currentUser.email}
          </p>
        </div>
      </div>
    </div>
  );
}