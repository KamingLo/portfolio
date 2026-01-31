import { getProjects } from "@/actions/admin/projects";
import { ArrowLeft, Plus, ExternalLink, Github, Pencil, Eye, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import DeleteButton from "@/components/ui/admin/projects/delete-button";
import Pagination from "@/components/ui/admin/pagination";

export default async function ProjectsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const limit = 6;

  const response = await getProjects(currentPage, limit);
  const projects = response.data || [];
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
          <h1 className="text-4xl font-bold text-white tracking-tight">Portfolio Projects</h1>
          <p className="text-zinc-500 text-sm">Total {response.total} karya terdaftar.</p>
        </div>
        <Link href="/admin/projects/new" className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-semibold transition-all shadow-lg shadow-blue-600/20 active:scale-95">
          <Plus size={18} /> <span>New Project</span>
        </Link>
      </div>

      {/* --- TABLE --- */}
      <div className="rounded-[2.5rem] bg-white/[0.02] border border-white/5 overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-zinc-600 text-xs font-mono uppercase tracking-[0.2em] border-b border-white/5 bg-white/[0.01]">
                <th className="px-8 py-5 font-medium">Project</th>
                <th className="px-8 py-5 font-medium">Category</th>
                <th className="px-8 py-5 font-medium text-center">External Links</th>
                <th className="px-8 py-5 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-white/5">
              {projects.length > 0 ? (
                projects.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.01] transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-20 rounded-xl bg-zinc-800 overflow-hidden border border-white/10 flex-shrink-0 relative">
                          {item.image ? (
                            <img src={item.image} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-zinc-600"><ImageIcon size={20} /></div>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-mono text-blue-500/80 mb-0.5">{item.id}</span>
                          <span className="text-zinc-100 font-bold tracking-tight">{item.title}</span>
                          <span className="text-[11px] text-zinc-500 line-clamp-1">{item.subtitle}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-8 py-6">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-400/10 px-2.5 py-1 rounded-lg border border-blue-400/20">
                        {item.category}
                      </span>
                    </td>

                    <td className="px-8 py-6">
                      <div className="flex justify-center gap-3 text-zinc-500">
                        <Link 
                          href={`/projects/${item.slug}`} 
                          target="_blank"
                          className="p-2 bg-white/5 rounded-lg hover:text-blue-400 hover:bg-blue-400/10 transition-all"
                          title="Lihat Halaman Publik"
                        >
                          <Eye size={18} />
                        </Link>
                        
                        {item.githubLink && (
                          <a href={item.githubLink} target="_blank" className="p-2 bg-white/5 rounded-lg hover:text-white hover:bg-white/10 transition-all">
                            <Github size={18} />
                          </a>
                        )}

                        {/* 3. Live Demo Link */}
                        {item.liveDemo && (
                          <a href={item.liveDemo} target="_blank" className="p-2 bg-white/5 rounded-lg hover:text-green-500 hover:bg-green-500/10 transition-all">
                            <ExternalLink size={18} />
                          </a>
                        )}
                      </div>
                    </td>

                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end items-center gap-2">
                        <Link 
                          href={`/admin/projects/${item.id}/edit`}
                          className="p-2.5 bg-white/5 hover:bg-blue-600/20 text-zinc-400 hover:text-blue-400 rounded-xl transition-all border border-white/5 hover:border-blue-400/30"
                        >
                          <Pencil size={16} />
                        </Link>
                        <DeleteButton id={item.id} title={item.title} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={4} className="px-8 py-32 text-center text-zinc-500">Tidak ada proyek ditemukan.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- PAGINATION & INFO --- */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-4">
        <div className="text-[11px] text-zinc-600 font-mono uppercase tracking-widest">
          Showing {projects.length} of {response.total} projects
        </div>
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </div>
  );
}