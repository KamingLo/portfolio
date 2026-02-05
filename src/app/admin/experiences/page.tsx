import { getExperiences } from "@/actions/admin/experiences/action";
import { Plus, Pencil, Briefcase, Calendar } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import DeleteButton from "@/components/ui/admin/experiences/delete-button";
import Pagination from "@/components/ui/admin/pagination";

export default async function ExperiencesPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const limit = 6;

  const response = await getExperiences(currentPage, limit);
  const experiences = response.data || [];
  const totalPages = response.totalPages || 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col gap-6">
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl md:text-4xl font-bold text-white">Professional experiences</h1>
              <p className="text-zinc-500 text-sm">Total {response.total} riwayat karir terdaftar.</p>
            </div>
            <Link 
              href="/admin/experiences/new" 
              className="flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold transition-all active:scale-95 shadow-lg shadow-blue-600/20 w-full sm:w-auto"
            >
              <Plus size={18} /> <span>New experience</span>
            </Link>
          </div>
        </div>
      </div>

      {/* --- CONTENT (Card on Mobile, Table on Desktop) --- */}
      <div className="rounded-[2rem] bg-zinc-900/30 border border-zinc-800 overflow-hidden">
        
        {/* VIEW DESKTOP (Table) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-zinc-500 text-xs border-b border-zinc-800 bg-zinc-900/50">
                <th className="px-8 py-5 font-bold">Experience</th>
                <th className="px-8 py-5 font-bold">Duration</th>
                <th className="px-8 py-5 font-bold text-center">Status</th>
                <th className="px-8 py-5 font-bold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {experiences.length > 0 ? (
                experiences.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500 border border-blue-500/20 flex-shrink-0 relative">
                           <Briefcase size={20} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-zinc-100 font-bold">{item.job_title}</span>
                          <span className="text-[11px] text-zinc-500 line-clamp-1">{item.company}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-zinc-400 text-xs">
                        <Calendar size={14} className="text-zinc-600" />
                        <span>
                          {format(new Date(item.start_date), "MMM yyyy")} — {item.is_current ? "Present" : item.end_date ? format(new Date(item.end_date), "MMM yyyy") : "-"}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      {item.is_current && (
                        <span className="text-[11px] font-bold text-green-400 bg-green-400/5 px-3 py-1.5 rounded-full border border-green-400/10 inline-block">
                          Active role
                        </span>
                      )}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end items-center gap-2">
                        <Link href={`/admin/experiences/${item.id}/edit`} className="p-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-500 hover:text-blue-400 rounded-2xl transition-all border border-zinc-800 active:scale-90">
                          <Pencil size={18} />
                        </Link>
                        <DeleteButton id={item.id} title={item.job_title} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={4} className="px-8 py-20 text-center text-zinc-600">Tidak ada riwayat ditemukan.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* VIEW MOBILE (Card List) */}
        <div className="md:hidden divide-y divide-zinc-800">
          {experiences.length > 0 ? (
            experiences.map((item) => (
              <div key={item.id} className="p-5 space-y-5 bg-zinc-900/20">
                <div className="flex gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500 relative flex-shrink-0">
                    <Briefcase size={24} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] text-zinc-500 font-bold mb-1">
                       {format(new Date(item.start_date), "MMM yyyy")} — {item.is_current ? "Present" : "End"}
                    </span>
                    <h3 className="text-white font-bold truncate">{item.job_title}</h3>
                    <p className="text-xs text-zinc-500 line-clamp-1">{item.company}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 pt-2">
                  <div className="flex gap-2">
                    {item.is_current && (
                      <span className="text-[10px] font-bold text-green-400 bg-green-400/5 px-3 py-1.5 rounded-full border border-green-400/10">
                        Active role
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/admin/experiences/${item.id}/edit`} className="p-3 bg-zinc-900 text-zinc-400 rounded-2xl border border-zinc-800 active:scale-90">
                      <Pencil size={20} />
                    </Link>
                    <DeleteButton id={item.id} title={item.job_title} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-20 text-center text-zinc-600">Tidak ada riwayat ditemukan.</div>
          )}
        </div>
      </div>

      {/* --- PAGINATION & INFO --- */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-[12px] text-zinc-600 font-bold">
          Showing {experiences.length} of {response.total} experiences
        </div>
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </div>
  );
}