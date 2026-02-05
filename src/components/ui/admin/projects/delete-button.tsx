"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Trash2, Loader2, AlertTriangle } from "lucide-react";
import { deleteProject } from "@/actions/admin/projects/action";

// Helper untuk deteksi apakah kita sudah di Client (Hydrated)
// Cara ini tidak memicu warning ESLint karena tidak menggunakan setState di useEffect
const subscribe = () => () => {}; // No-op subscribe
const getSnapshot = () => true;   // Di Client bernilai true
const getServerSnapshot = () => false; // Di Server bernilai false

export default function DeleteButton({ id, title }: { id: string; title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Hook resmi React untuk menggantikan logic "mounted"
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Efek untuk mengurus overflow body saja
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  async function handleDelete() {
    setIsDeleting(true);
    const result = await deleteProject(id);
    if (!result.success) {
      alert(result.message);
      setIsDeleting(false);
    } else {
      setIsOpen(false);
    }
  }

  // Early return jika belum mounted (masih di server)
  if (!mounted) return null;

  // Komponen Modal yang akan di-portal
  const ModalContent = (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
      onClick={() => !isDeleting && setIsOpen(false)}
    >
      <div 
        className="bg-zinc-950 border border-zinc-800 w-full max-w-sm rounded-[2.5rem] p-10 animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="p-6 bg-red-500/10 rounded-full text-red-500 animate-pulse">
            <AlertTriangle size={40} strokeWidth={2.5} />
          </div>
          
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-white ">Hapus Proyek?</h3>
            <p className="text-zinc-500 text-sm">
              Kamu akan menghapus <span className="text-zinc-200 font-bold underline decoration-red-500/50">{title}</span> secara permanen dari database dan storage.
            </p>
          </div>

          <div className="flex flex-col gap-3 w-full pt-4">
            <button
              disabled={isDeleting}
              onClick={handleDelete}
              className="w-full px-6 py-4 bg-red-600 hover:bg-red-500 disabled:bg-zinc-800 text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-3 active:scale-95"
            >
              {isDeleting ? <Loader2 size={20} className="animate-spin" /> : <Trash2 size={20} />}
              {isDeleting ? "Menghapus..." : "Ya, Hapus sekarang"}
            </button>
            
            <button
              disabled={isDeleting}
              onClick={() => setIsOpen(false)}
              className="w-full px-6 py-4 bg-transparent hover:bg-white/5 text-zinc-500 hover:text-white rounded-2xl transition-all text-md"
            >
              Batalkan
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-3 bg-zinc-900 hover:bg-red-600/10 text-zinc-500 hover:text-red-500 rounded-2xl transition-all border border-zinc-800 hover:border-red-500/30"
        title="Delete"
      >
        <Trash2 size={18} />
      </button>

      {isOpen && createPortal(ModalContent, document.body)}
    </>
  );
}