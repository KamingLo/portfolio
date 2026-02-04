"use client";

import { useState } from "react";
import { Trash2, Loader2, AlertTriangle, X } from "lucide-react";
import { deleteExperience } from "@/actions/admin/experiences/action";

export default function DeleteButton({ id, title }: { id: string; title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);
    const result = await deleteExperience(id);
    if (!result.success) {
      alert(result.message);
      setIsDeleting(false);
    } else {
      setIsOpen(false);
    }
  }

  return (
    <>
      {/* Tombol Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2.5 bg-white/5 hover:bg-red-600/20 text-zinc-400 hover:text-red-400 rounded-xl transition-all border border-white/5 hover:border-red-400/30"
        title="Delete Project"
      >
        <Trash2 size={16} />
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div 
            className="bg-zinc-900 border border-white/10 w-full max-w-md rounded-[2rem] p-8 shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-red-500/10 rounded-full text-red-500">
                <AlertTriangle size={32} />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Hapus Proyek?</h3>
                <p className="text-zinc-400 text-sm">
                  Apakah kamu yakin ingin menghapus <span className="text-white font-semibold">"{title}"</span>? 
                  Tindakan ini permanen dan akan menghapus data dari database serta storage.
                </p>
              </div>

              <div className="flex gap-3 w-full pt-4">
                <button
                  disabled={isDeleting}
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-all"
                >
                  Batal
                </button>
                <button
                  disabled={isDeleting}
                  onClick={handleDelete}
                  className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-600/20"
                >
                  {isDeleting ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                  {isDeleting ? "Menghapus..." : "Ya, Hapus"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}