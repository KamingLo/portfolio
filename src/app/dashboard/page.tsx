import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { prisma } from "@/lib/prisma"; // Pastikan import sesuai config export kamu
import { redirect } from "next/navigation";
import { logoutAction } from "@/actions/auth/logout";

export default async function DashboardPage() {
  // 1. Ambil session dari cookie
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;

  if (!sessionToken) {
    redirect("/login");
  }

  // 2. Dekripsi token untuk dapatkan userId
  const session = await decrypt(sessionToken);
  const userId = Number(session.userId);

  // 3. Ambil data user yang sedang login dari database
  const currentUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  // 4. Ambil data user lain untuk ditampilkan di tabel
  const allUsers = await prisma.user.findMany({
    select: { id: true, name: true, email: true },
    take: 5, // Ambil 5 user terbaru saja
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-500">Selamat datang kembali, <span className="font-semibold text-blue-600">{currentUser?.name}</span>!</p>
          </div>
          <form action={logoutAction}>
            <button 
              type="submit"
              className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition-colors"
            >
              Logout
            </button>
          </form>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Profil Saya</h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-400 uppercase">Nama Lengkap</label>
                <p className="text-gray-800 font-medium">{currentUser?.name}</p>
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase">Alamat Email</label>
                <p className="text-gray-800 font-medium">{currentUser?.email}</p>
              </div>
              <div className="pt-2">
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-bold uppercase">
                  Active Session
                </span>
              </div>
            </div>
          </div>

          {/* User List Table (Main Content) */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50">
              <h2 className="text-lg font-semibold text-gray-700">Daftar Pengguna Lain</h2>
            </div>
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-sm">
                <tr>
                  <th className="px-6 py-3 font-medium">Nama</th>
                  <th className="px-6 py-3 font-medium">Email</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {allUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-800 font-medium">{user.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-4 bg-gray-50 text-center">
              <button className="text-sm text-blue-600 font-medium hover:underline">
                Lihat Semua Pengguna
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}