import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { User, Users, ArrowRight } from "lucide-react";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;

  if (!sessionToken) {
    redirect("/login");
  }

  const session = await decrypt(sessionToken);
  const userId = Number(session.userId);

  const currentUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  const allUsers = await prisma.user.findMany({
    select: { id: true, name: true, email: true },
    take: 5,
  });

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Header */}
      <header className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
          Dashboard<span className="text-blue-600">.</span>
        </h1>
        <p className="text-zinc-500 text-lg font-medium">
          Selamat datang kembali, <span className="text-white">{currentUser?.name}</span>.
        </p>
      </header>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 space-y-4 transition-all hover:bg-white/[0.04]">
          <div className="h-12 w-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500">
            <Users size={24} />
          </div>
          <div>
            <div className="text-4xl font-bold text-white tracking-tight">24</div>
            <div className="text-zinc-500 font-medium">Total users</div>
          </div>
        </div>
        {/* Tambahkan stats card lain di sini jika diperlukan */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Profile Details */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-8 rounded-[2.5rem] border border-white/5 space-y-8">
            <h2 className="text-xl font-semibold text-white tracking-tight flex items-center gap-3">
              <User size={20} className="text-blue-500" />
              Profil saya
            </h2>
            
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-mono text-zinc-600 tracking-wider">Nama lengkap</span>
                <p className="text-zinc-300 font-medium text-lg">{currentUser?.name}</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-mono text-zinc-600 tracking-wider">Alamat email</span>
                <p className="text-zinc-300 font-medium text-lg">{currentUser?.email}</p>
              </div>
              <div className="pt-4 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium text-zinc-500 font-mono">Sesi aktif</span>
              </div>
            </div>
          </div>
        </div>

        {/* User Management Table */}
        <div className="lg:col-span-8">
          <div className="rounded-[2.5rem] bg-white/[0.02] border border-white/5 overflow-hidden">
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white tracking-tight">Daftar pengguna terbaru</h2>
              <button className="text-sm font-medium text-blue-500 hover:text-blue-400 transition-colors">
                View all
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-zinc-600 text-sm font-mono border-b border-white/5">
                    <th className="px-8 py-5 font-medium tracking-wider">Nama</th>
                    <th className="px-8 py-5 font-medium tracking-wider">Email</th>
                    <th className="px-8 py-5 font-medium tracking-wider text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {allUsers.map((user) => (
                    <tr key={user.id} className="group hover:bg-white/[0.02] transition-colors">
                      <td className="px-8 py-6 text-zinc-300 font-medium">{user.name}</td>
                      <td className="px-8 py-6 text-zinc-500 font-medium">{user.email}</td>
                      <td className="px-8 py-6 text-right text-zinc-600 group-hover:text-blue-500 transition-colors">
                        <button className="p-2 hover:bg-blue-600/10 rounded-xl transition-all">
                          <ArrowRight size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}