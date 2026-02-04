import { getProjects } from "@/actions/admin/projects/action";
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
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col gap-6">
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl md:text-4xl font-bold text-white">Portfolio projects</h1>
              <p className="text-zinc-500 text-sm">Total {response.total} karya terdaftar.</p>
            </div>
            <Link 
              href="/admin/projects/new" 
              className="flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold transition-all active:scale-95 shadow-lg shadow-blue-600/20 w-full sm:w-auto"
            >
              <Plus size={18} /> <span>New project</span>
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
                <th className="px-8 py-5 font-bold">Project</th>
                <th className="px-8 py-5 font-bold">Category</th>
                <th className="px-8 py-5 font-bold text-center">External links</th>
                <th className="px-8 py-5 font-bold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {projects.length > 0 ? (
                projects.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-16 rounded-xl bg-zinc-800 overflow-hidden border border-zinc-700 flex-shrink-0 relative">
                          {item.image ? (
                            <img src={item.image} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-zinc-600"><ImageIcon size={20} /></div>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-zinc-100 font-bold">{item.title}</span>
                          <span className="text-[11px] text-zinc-500 line-clamp-1">{item.subtitle}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-[11px] font-bold text-blue-400 bg-blue-400/5 px-3 py-1.5 rounded-full border border-blue-400/10">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-center gap-2 text-zinc-500">
                        <Link href={`/projects/${item.slug}`} target="_blank" className="p-2.5 bg-zinc-900 rounded-xl hover:text-blue-400 active:scale-90 transition-all border border-zinc-800">
                          <Eye size={18} />
                        </Link>
                        {item.githubLink && (
                          <a href={item.githubLink} target="_blank" className="p-2.5 bg-zinc-900 rounded-xl hover:text-white active:scale-90 transition-all border border-zinc-800">
                            <Github size={18} />
                          </a>
                        )}
                        {item.liveDemo && (
                          <a href={item.liveDemo} target="_blank" className="p-2.5 bg-zinc-900 rounded-xl hover:text-green-500 active:scale-90 transition-all border border-zinc-800">
                            <ExternalLink size={18} />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end items-center gap-2">
                        <Link href={`/admin/projects/${item.id}/edit`} className="p-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-500 hover:text-blue-400 rounded-2xl transition-all border border-zinc-800 active:scale-90">
                          <Pencil size={18} />
                        </Link>
                        <DeleteButton id={item.id} title={item.title} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : null}
            </tbody>
          </table>
        </div>

        {/* VIEW MOBILE (Card List) */}
        <div className="md:hidden divide-y divide-zinc-800">
          {projects.length > 0 ? (
            projects.map((item) => (
              <div key={item.id} className="p-5 space-y-5 bg-zinc-900/20">
                <div className="flex gap-4">
                  <div className="h-16 w-20 rounded-2xl bg-zinc-800 overflow-hidden border border-zinc-700 relative flex-shrink-0">
                    {item.image ? (
                      <img src={item.image} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-600"><ImageIcon size={20} /></div>
                    )}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] text-blue-500 font-bold mb-1">{item.category}</span>
                    <h3 className="text-white font-bold truncate">{item.title}</h3>
                    <p className="text-xs text-zinc-500 line-clamp-1">{item.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 pt-2">
                  <div className="flex gap-2">
                    <Link href={`/projects/${item.slug}`} target="_blank" className="p-3 bg-zinc-900 rounded-2xl text-zinc-400 active:scale-90 border border-zinc-800">
                      <Eye size={20} />
                    </Link>
                    {item.githubLink && (
                      <a href={item.githubLink} target="_blank" className="p-3 bg-zinc-900 rounded-2xl text-zinc-400 active:scale-90 border border-zinc-800">
                        <Github size={20} />
                      </a>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/admin/projects/${item.id}/edit`} className="p-3 bg-zinc-900 text-zinc-400 rounded-2xl border border-zinc-800 active:scale-90">
                      <Pencil size={20} />
                    </Link>
                    <DeleteButton id={item.id} title={item.title} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-20 text-center text-zinc-600">Tidak ada proyek ditemukan.</div>
          )}
        </div>
      </div>

      {/* --- PAGINATION & INFO --- */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-[12px] text-zinc-600 font-bold">
          Showing {projects.length} of {response.total} projects
        </div>
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </div>
  );
}