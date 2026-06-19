import { getAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Users, ArrowLeft, UserPlus, Shield, Mail, Lock, User as UserIcon } from "lucide-react";
import Link from "next/link";

export default async function UsersPage() {
  const { user: currentUser } = await getAuth();

  const allUsers = await prisma.user.findMany({
    select: { id: true, name: true, email: true },
    orderBy: { id: 'asc' },
  });

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20 max-w-full overflow-x-hidden">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col gap-6">
        <div className="space-y-3">
          <Link 
            href="/admin" 
            className="group flex items-center gap-2 text-zinc-500 hover:text-blue-500 transition-all text-sm font-medium active:scale-95 w-fit"
          >
            <ArrowLeft size={16} />
            Kembali ke dashboard
          </Link>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <h1 className="text-3xl md:text-4xl font-bold text-white">User management</h1>
              <p className="text-zinc-500 text-sm">Mengelola akses dan kredensial pengguna sistem.</p>
            </div>
            
            <button className="flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold transition-all active:scale-[0.97] shadow-lg shadow-blue-900/20 w-full sm:w-auto">
              <UserPlus size={18} />
              <span>Tambah pengguna</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* --- LEFT SIDE: USER LIST (Card Style) --- */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <Users size={20} className="text-blue-500" />
              Daftar pengguna 
              <span className="text-zinc-700 font-medium text-sm">({allUsers.length})</span>
            </h2>
          </div>

          <div className="rounded-[2rem] bg-zinc-900/30 border border-zinc-800 overflow-hidden divide-y divide-zinc-800">
            {allUsers.map((u) => (
              <div 
                key={u.id} 
                className="p-6 flex items-center justify-between group hover:bg-white/[0.02] transition-all active:bg-zinc-900/50"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="h-12 w-12 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500 font-bold flex-shrink-0">
                    { u.name?.charAt(0) ?? "A"}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-white font-bold truncate flex items-center gap-2">
                      {u.name}
                      {u.id === currentUser.id && (
                        <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full font-bold">Kamu</span>
                      )}
                    </span>
                    <span className="text-zinc-500 text-xs truncate">{u.email}</span>
                  </div>
                </div>
                
                <button className="p-3 bg-zinc-900 text-zinc-500 hover:text-white rounded-2xl border border-zinc-800 active:scale-90 transition-all">
                   <ArrowLeft size={18} className="rotate-180" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* --- RIGHT SIDE: ACCOUNT DETAILS FORM --- */}
        <div className="lg:col-span-5 space-y-6">
          <div className="px-2">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              <Shield size={20} className="text-blue-500" />
              Detail akun
            </h2>
          </div>

          <div className="bg-zinc-900/30 border border-zinc-800 rounded-[2.5rem] p-8 md:p-10 space-y-8">
            <div className="space-y-6">
              {/* Field: Nama */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 flex items-center gap-2 ml-1">
                  <UserIcon size={14} /> Nama lengkap
                </label>
                <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl text-white font-medium">
                  {currentUser.name}
                </div>
              </div>

              {/* Field: Email */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 flex items-center gap-2 ml-1">
                  <Mail size={14} /> Alamat email
                </label>
                <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl text-white font-medium">
                  {currentUser.email}
                </div>
              </div>

              {/* Field: Password (Hidden/Preview) */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 flex items-center gap-2 ml-1">
                  <Lock size={14} /> Kata sandi
                </label>
                <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl text-zinc-600 flex justify-between items-center">
                  <span>••••••••••••</span>
                  <button className="text-[10px] font-bold text-blue-500 hover:text-blue-400 active:scale-95 transition-all">
                    Ubah sandi
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800/50">
               <button className="w-full py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-2xl font-bold transition-all active:scale-[0.97]">
                 Simpan perubahan
               </button>
            </div>

            <p className="text-[11px] text-zinc-600 text-center">
              Perubahan pada detail akun akan memengaruhi sesi login anda saat ini.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}