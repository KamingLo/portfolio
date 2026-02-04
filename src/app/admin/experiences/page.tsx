import { getExperiences } from "@/actions/admin/experiences/action"; // Sesuaikan path action kamu
import { ArrowLeft, Plus, Pencil, Briefcase, Calendar, Star } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import DeleteButton from "@/components/ui/admin/experiences/delete-button"; // Buat component delete khusus experience
import Pagination from "@/components/ui/admin/pagination";

export default async function ExperiencesPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const limit = 6;

  const response = await getExperiences(currentPage, limit);
  const experiences = response.data || [];
  const totalPages = response.totalPages || 0;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <Link href="/admin" className="group flex items-center gap-2 text-zinc-500 hover:text-blue-500 transition-colors text-sm font-medium">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Kembali ke Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-white tracking-tight">Professional Experiences</h1>
          <p className="text-zinc-500 text-sm">Total {response.total} riwayat karir terdaftar.</p>
        </div>
        <Link href="/admin/experiences/new" className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-semibold transition-all shadow-lg shadow-blue-600/20 active:scale-95">
          <Plus size={18} /> <span>New Experience</span>
        </Link>
      </div>

      {/* --- TABLE --- */}
      <div className="rounded-[2.5rem] bg-white/[0.02] border border-white/5 overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-zinc-600 text-xs font-mono uppercase tracking-[0.2em] border-b border-white/5 bg-white/[0.01]">
                <th className="px-8 py-5 font-medium">Job & Company</th>
                <th className="px-8 py-5 font-medium">Duration & Status</th>
                <th className="px-8 py-5 font-medium">Skills</th>
                <th className="px-8 py-5 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-white/5">
              {experiences.length > 0 ? (
                experiences.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.01] transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20 flex-shrink-0">
                          <Briefcase size={20} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-mono text-blue-500/80 mb-0.5">{item.id}</span>
                          <span className="text-zinc-100 font-bold tracking-tight">{item.job_title}</span>
                          <span className="text-[11px] text-zinc-500">{item.company}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2 text-zinc-300 text-xs">
                          <Calendar size={12} className="text-zinc-500" />
                          {format(new Date(item.start_date), "MMM yyyy")} — {item.is_current ? "Present" : item.end_date ? format(new Date(item.end_date), "MMM yyyy") : "-"}
                        </div>
                        {item.is_current && (
                          <span className="w-fit text-[9px] font-bold uppercase tracking-wider text-green-400 bg-green-400/10 px-2 py-0.5 rounded-md border border-green-400/20 animate-pulse">
                            Active
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-8 py-6">
                      <div className="flex flex-wrap gap-1.5 max-w-[250px]">
                        {item.skills.split(",").slice(0, 3).map((skill: string, index: number) => (
                          <span key={index} className="text-[10px] bg-white/5 text-zinc-400 px-2 py-1 rounded-md border border-white/5">
                            {skill.trim()}
                          </span>
                        ))}
                        {item.skills.split(",").length > 3 && (
                          <span className="text-[10px] text-zinc-600 self-center">+{item.skills.split(",").length - 3}</span>
                        )}
                      </div>
                    </td>

                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end items-center gap-2">
                        <Link 
                          href={`/admin/experiences/${item.id}/edit`}
                          className="p-2.5 bg-white/5 hover:bg-blue-600/20 text-zinc-400 hover:text-blue-400 rounded-xl transition-all border border-white/5 hover:border-blue-400/30"
                        >
                          <Pencil size={16} />
                        </Link>
                        <DeleteButton id={item.id} title={item.job_title} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={4} className="px-8 py-32 text-center text-zinc-500">Tidak ada riwayat pengalaman ditemukan.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- PAGINATION & INFO --- */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-4">
        <div className="text-[11px] text-zinc-600 font-mono uppercase tracking-widest">
          Showing {experiences.length} of {response.total} experiences
        </div>
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </div>
  );
}