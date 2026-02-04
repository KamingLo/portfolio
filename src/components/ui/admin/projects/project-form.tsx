
"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { 
    ArrowLeft, Upload, Save, Loader2, X, Maximize2, RefreshCw, 
    Bold, Italic, List, ListOrdered, Quote, Minus, Heading1, Heading2, Heading3 
} from "lucide-react";
import Link from "next/link";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface ProjectFormProps {
  initialData?: any;
  action: (formData: FormData) => Promise<{ success: boolean; message: string }>;
  title: string;
}

export default function ProjectForm({ initialData, action, title }: ProjectFormProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [preview, setPreview] = useState(initialData?.image || "");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
  extensions: [StarterKit],
  content: initialData?.explanation || '',
  immediatelyRender: false,
  editorProps: {
    attributes: {
      // Kita tambahkan class 'tiptap' sebagai hook untuk CSS custom kita
      class: 'tiptap prose prose-sm prose-invert focus:outline-none max-w-none min-h-[350px] p-6',
    },
  },
});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!preview) return alert("Thumbnail wajib diisi!");
    if (!editor) return;

    setIsPending(true);
    const formData = new FormData(e.currentTarget);
    formData.append("explanation", editor.getHTML());

    if (initialData?.id) {
      formData.append("id", initialData.id);
      formData.append("oldImageUrl", initialData.image || "");
    }

    const result = await action(formData);
    if (result.success) {
      router.push("/admin/projects");
      router.refresh();
    } else {
      alert(result.message);
      setIsPending(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-white animate-in fade-in duration-500 pb-20">
      {/* --- HEADER --- */}
      <header className="flex flex-col gap-2">
        <Link href="/admin/projects" className="flex items-center gap-2 text-zinc-500 hover:text-blue-400 text-sm w-fit transition-colors">
          <ArrowLeft size={16} /> Kembali ke Proyek
        </Link>
        <h1 className="text-3xl font-bold">{title}</h1>
      </header>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6 bg-white/[0.03] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
          <Input label="Judul Proyek" name="title" defaultValue={initialData?.title} required placeholder="Contoh: E-Commerce Redesign" />
          
          <div className="grid grid-cols-2 gap-4">
            <Input label="Subtitle" name="subtitle" defaultValue={initialData?.subtitle} required placeholder="Web Development" />
            <Input label="Kategori" name="category" defaultValue={initialData?.category} required placeholder="Fullstack" />
          </div>

          <Textarea label="Deskripsi Singkat" name="description" defaultValue={initialData?.description} rows={3} required placeholder="Ringkasan proyek untuk kartu portfolio..." />
          
          {/* TIPTAP EDITOR CONTAINER */}
          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Studi Kasus / Detail Proyek</label>
              <span className="text-[10px] text-zinc-600 font-mono">HTML Format</span>
            </div>
            
            <div className="rounded-3xl border border-white/10 bg-zinc-950/50 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/30 transition-all">
              {/* TOOLBAR */}
              <div className="flex flex-wrap items-center gap-1 p-3 border-b border-white/5 bg-white/[0.02]">
                <ToolbarButton 
                  onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()} 
                  active={editor?.isActive('heading', { level: 1 })}
                  icon={<Heading1 size={18} />} 
                />
                <ToolbarButton 
                  onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} 
                  active={editor?.isActive('heading', { level: 2 })}
                  icon={<Heading2 size={18} />} 
                />
                <ToolbarButton 
                  onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} 
                  active={editor?.isActive('heading', { level: 3 })}
                  icon={<Heading3 size={18} />} 
                />
                <div className="w-px h-6 bg-white/10 mx-1" />
                <ToolbarButton onClick={() => editor?.chain().focus().toggleBold().run()} active={editor?.isActive('bold')} icon={<Bold size={18} />} />
                <ToolbarButton onClick={() => editor?.chain().focus().toggleItalic().run()} active={editor?.isActive('italic')} icon={<Italic size={18} />} />
                <div className="w-px h-6 bg-white/10 mx-1" />
                <ToolbarButton onClick={() => editor?.chain().focus().toggleBulletList().run()} active={editor?.isActive('bulletList')} icon={<List size={18} />} />
                <ToolbarButton onClick={() => editor?.chain().focus().toggleOrderedList().run()} active={editor?.isActive('orderedList')} icon={<ListOrdered size={18} />} />
                <div className="w-px h-6 bg-white/10 mx-1" />
                <ToolbarButton onClick={() => editor?.chain().focus().toggleBlockquote().run()} active={editor?.isActive('blockquote')} icon={<Quote size={18} />} />
                <ToolbarButton onClick={() => editor?.chain().focus().setHorizontalRule().run()} icon={<Minus size={18} />} />
              </div>

              <EditorContent editor={editor} />
              
              {/* Footer Editor (Word Count) */}
              <div className="px-4 py-2 border-t border-white/5 bg-white/[0.01] flex justify-end">
                <span className="text-[10px] text-zinc-600 font-mono">
                  {editor?.storage.characterCount?.characters?.() || 0} characters
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* --- SIDEBAR --- */}
        <div className="space-y-6">
          <div className="bg-white/[0.03] p-8 rounded-[2.5rem] border border-white/5 space-y-6 shadow-2xl sticky top-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Project Thumbnail</label>
              <div className="relative aspect-[4/3] rounded-[2rem] border-2 border-dashed border-white/10 bg-zinc-950 overflow-hidden group">
                {preview ? (
                  <>
                    <img src={preview} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Preview" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3">
                      <button type="button" onClick={() => setIsModalOpen(true)} className="p-3 bg-white/10 rounded-2xl hover:bg-white/20 backdrop-blur-md"><Maximize2 size={20} /></button>
                      <button type="button" onClick={() => fileInputRef.current?.click()} className="p-3 bg-blue-500/20 rounded-2xl hover:bg-blue-500/40 text-blue-400 backdrop-blur-md"><RefreshCw size={20} /></button>
                    </div>
                  </>
                ) : (
                  <button type="button" onClick={() => fileInputRef.current?.click()} className="h-full w-full flex flex-col items-center justify-center gap-3 text-zinc-600 hover:text-zinc-400 transition-colors">
                    <div className="p-4 rounded-2xl bg-white/5"><Upload size={28} /></div>
                    <span className="text-xs font-medium">Click to Upload Image</span>
                  </button>
                )}
                <input type="file" name="image" ref={fileInputRef} accept="image/*" required={!initialData} onChange={(e) => setPreview(e.target.files?.[0] ? URL.createObjectURL(e.target.files[0]) : preview)} className="hidden" />
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <Input label="Technology Tags" name="tags" defaultValue={initialData?.tags?.join(", ")} placeholder="React, Nextjs, Tailwind" />
              <Input label="GitHub Repository" name="githubLink" defaultValue={initialData?.githubLink} placeholder="https://github.com/..." />
              <Input label="Live Demo URL" name="liveDemo" defaultValue={initialData?.liveDemo} placeholder="https://your-site.com" />
            </div>

            <button disabled={isPending} className="w-full py-5 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white rounded-[1.5rem] font-bold transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-3 group active:scale-95">
              {isPending ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} className="group-hover:rotate-12 transition-transform" />}
              {isPending ? "Tunggu Sebentar..." : initialData ? "Simpan Perubahan" : "Terbitkan Proyek"}
            </button>
          </div>
        </div>
      </form>

      {/* MODAL FULL PREVIEW */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-8" onClick={() => setIsModalOpen(false)}>
          <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"><X size={40} /></button>
          <img src={preview} className="max-w-full max-h-full rounded-3xl shadow-2xl border border-white/10 object-contain" alt="Full" />
        </div>
      )}
    </div>
  );
}

const ToolbarButton = ({ onClick, active, icon }: any) => (
  <button
    type="button"
    onClick={onClick}
    className={`p-2 rounded-lg transition-all ${active ? 'bg-blue-500 text-white' : 'hover:bg-white/10 text-zinc-400'}`}
  >
    {icon}
  </button>
);

const Input = ({ label, ...props }: any) => (
  <div className="space-y-1.5">
    <label className="text-xs font-medium text-zinc-500 ml-1 uppercase">{label}</label>
    <input {...props} className="w-full bg-white/5 border border-white/10 p-3.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm" />
  </div>
);

const Textarea = ({ label, ...props }: any) => (
  <div className="space-y-1.5">
    <label className="text-xs font-medium text-zinc-500 ml-1 uppercase">{label}</label>
    <textarea {...props} className="w-full bg-white/5 border border-white/10 p-3.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm resize-none" />
  </div>
);