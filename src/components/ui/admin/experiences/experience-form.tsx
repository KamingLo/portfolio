"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { 
    ArrowLeft, Save, Loader2, Briefcase, 
    Bold, Italic, List, ListOrdered, Quote, Heading3, 
    Wrench, Clock
} from "lucide-react";
import Link from "next/link";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

// 1. Definisi Interface untuk Data Pengalaman
interface ExperienceData {
  id?: string;
  job_title?: string;
  company?: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  is_current?: boolean;
  skills?: string;
}

interface ExperienceFormProps {
  initialData?: ExperienceData; // Ganti any ke ExperienceData
  action: (formData: FormData) => Promise<{ success: boolean; message: string }>;
  title: string;
}

export default function ExperienceForm({ initialData, action, title }: ExperienceFormProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [isCurrent, setIsCurrent] = useState(initialData?.is_current || false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: initialData?.description || '',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'tiptap prose prose-sm prose-invert focus:outline-none max-w-none min-h-[300px] p-6',
      },
    },
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editor) return;

    setIsPending(true);
    const formData = new FormData(e.currentTarget);
    
    formData.append("description", editor.getHTML());
    formData.set("is_current", String(isCurrent));

    if (initialData?.id) {
      formData.append("id", initialData.id);
    }

    const result = await action(formData);
    if (result.success) {
      router.push("/admin/experiences");
      router.refresh();
    } else {
      alert(result.message);
      setIsPending(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 text-white animate-in fade-in duration-500 pb-20">
      <header className="flex flex-col gap-2">
        <Link href="/admin/experiences" className="flex items-center gap-2 text-zinc-500 hover:text-blue-400 text-sm w-fit transition-colors">
          <ArrowLeft size={16} /> Kembali ke Pengalaman
        </Link>
        <h1 className="text-3xl font-bold">{title}</h1>
      </header>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6 bg-white/[0.03] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input 
                label="Jabatan / Job Title" 
                name="job_title" 
                defaultValue={initialData?.job_title} 
                required 
                placeholder="Contoh: Backend Developer Intern" 
                icon={<Briefcase size={16}/>}
            />
            <Input 
                label="Perusahaan" 
                name="company" 
                defaultValue={initialData?.company} 
                required 
                placeholder="Contoh: NVIDIA" 
                icon={<Briefcase size={16}/>}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Tanggung Jawab & Pencapaian</label>
              <span className="text-[10px] text-zinc-600 font-mono italic">Rich Text Editor</span>
            </div>
            
            <div className="rounded-3xl border border-white/10 bg-zinc-950/50 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/30 transition-all">
              <div className="flex flex-wrap items-center gap-1 p-3 border-b border-white/5 bg-white/[0.02]">
                <ToolbarButton onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} active={editor?.isActive('heading', { level: 3 })} icon={<Heading3 size={18} />} />
                <div className="w-px h-6 bg-white/10 mx-1" />
                <ToolbarButton onClick={() => editor?.chain().focus().toggleBold().run()} active={editor?.isActive('bold')} icon={<Bold size={18} />} />
                <ToolbarButton onClick={() => editor?.chain().focus().toggleItalic().run()} active={editor?.isActive('italic')} icon={<Italic size={18} />} />
                <div className="w-px h-6 bg-white/10 mx-1" />
                <ToolbarButton onClick={() => editor?.chain().focus().toggleBulletList().run()} active={editor?.isActive('bulletList')} icon={<List size={18} />} />
                <ToolbarButton onClick={() => editor?.chain().focus().toggleOrderedList().run()} active={editor?.isActive('orderedList')} icon={<ListOrdered size={18} />} />
                <div className="w-px h-6 bg-white/10 mx-1" />
                <ToolbarButton onClick={() => editor?.chain().focus().toggleBlockquote().run()} active={editor?.isActive('blockquote')} icon={<Quote size={18} />} />
              </div>
              <EditorContent editor={editor} />
              <div className="px-4 py-2 border-t border-white/5 bg-white/[0.01] flex justify-end">
                <span className="text-[10px] text-zinc-600 font-mono">
                  {editor?.storage.characterCount?.characters?.() || 0} characters
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/[0.03] p-8 rounded-[2.5rem] border border-white/5 space-y-6 shadow-2xl sticky top-6 backdrop-blur-sm">
            <div className="space-y-4">
               <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Timeline</label>
               
               <Input 
                 label="Tanggal Mulai" 
                 type="date" 
                 name="start_date" 
                 defaultValue={initialData?.start_date ? new Date(initialData.start_date).toISOString().split('T')[0] : ""} 
                 required 
               />

               <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
                 <input 
                    type="checkbox" 
                    id="is_current" 
                    checked={isCurrent}
                    onChange={(e) => setIsCurrent(e.target.checked)}
                    className="w-5 h-5 rounded-lg accent-blue-600"
                 />
                 <label htmlFor="is_current" className="text-xs font-medium text-zinc-300 cursor-pointer flex items-center gap-2">
                    <Clock size={14} className="text-blue-400"/> Masih Bekerja Di Sini
                 </label>
               </div>

               {!isCurrent && (
                 <Input 
                   label="Tanggal Berakhir" 
                   type="date" 
                   name="end_date" 
                   defaultValue={initialData?.end_date ? new Date(initialData.end_date).toISOString().split('T')[0] : ""} 
                   required={!isCurrent}
                 />
               )}
            </div>

            <div className="space-y-2">
                <Input 
                    label="Skills (Pisahkan dengan koma)" 
                    name="skills" 
                    defaultValue={initialData?.skills} 
                    required 
                    placeholder="Laravel, Prisma, Supabase" 
                    icon={<Wrench size={16}/>}
                />
                <p className="text-[10px] text-zinc-500 italic ml-1">*Akan diparsing otomatis menjadi tag</p>
            </div>

            <button 
                disabled={isPending} 
                className="w-full py-5 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white rounded-[1.5rem] font-bold transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-3 group active:scale-95 mt-4"
            >
              {isPending ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} className="group-hover:rotate-12 transition-transform" />}
              {isPending ? "Tunggu..." : initialData ? "Simpan Perubahan" : "Simpan Pengalaman"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

// --- SUB-COMPONENTS DENGAN TIPE DATA SPESIFIK ---

interface ToolbarButtonProps {
  onClick: () => void;
  active?: boolean;
  icon: React.ReactNode;
}

const ToolbarButton = ({ onClick, active, icon }: ToolbarButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`p-2 rounded-lg transition-all ${active ? 'bg-blue-500 text-white' : 'hover:bg-white/10 text-zinc-400'}`}
  >
    {icon}
  </button>
);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
}

const Input = ({ label, icon, ...props }: InputProps) => (
  <div className="space-y-1.5 w-full">
    <label className="text-[10px] font-bold text-zinc-500 ml-1 uppercase tracking-widest flex items-center gap-2">
        {icon} {label}
    </label>
    <input 
        {...props} 
        className="w-full bg-white/5 border border-white/10 p-3.5 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm text-zinc-200 placeholder:text-zinc-700" 
    />
  </div>
);