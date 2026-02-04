import MainLayout from "@/components/layouts/main-layout";
import Section from "@/components/layouts/sections";
import { ArrowUpRight, Github, Linkedin, MessageCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <MainLayout>
      <Section id="contact" className="text-zinc-300 [-webkit-tap-highlight-color:transparent]">
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-6 border-b border-white/5 pb-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-md text-blue-500 font-bold">
                Let's work together
              </span>
            </div>
            <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tight">
              Contact
            </h2>
          </div>
          <p className="text-zinc-500 max-w-sm text-base md:text-lg font-medium">
            Punya pertanyaan atau proyek menarik? Pilih cara ternyaman bagi Anda untuk terhubung.
          </p>
        </div>

        {/* --- CONTACT GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* WhatsApp Card */}
          <a 
            href="https://wa.me/6283835360789" 
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-10 transition-all duration-300 hover:border-blue-500/30 active:border-blue-500 active:bg-blue-500/5"
          >
            <div className="relative z-10 flex flex-col h-full justify-between gap-12">
              <div className="bg-zinc-900 w-14 h-14 rounded-2xl flex items-center justify-center text-zinc-500 group-hover:text-blue-500 group-active:text-blue-500 border border-white/5 transition-colors">
                <MessageCircle size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 group-active:text-blue-500 transition-colors">WhatsApp</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">Respon cepat untuk diskusi proyek atau sekadar tanya-tanya.</p>
              </div>
            </div>
            <ArrowUpRight className="absolute top-10 right-10 text-zinc-700 group-hover:text-blue-500 group-active:text-blue-500 transition-all group-hover:rotate-45" />
          </a>

          {/* LinkedIn Card */}
          <a 
            href="https://linkedin.com/in/kaming-lo" 
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-10 transition-all duration-300 hover:border-blue-500/30 active:border-blue-500 active:bg-blue-500/5"
          >
            <div className="relative z-10 flex flex-col h-full justify-between gap-12">
              <div className="bg-zinc-900 w-14 h-14 rounded-2xl flex items-center justify-center text-zinc-500 group-hover:text-blue-500 group-active:text-blue-500 border border-white/5 transition-colors">
                <Linkedin size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 group-active:text-blue-500 transition-colors">LinkedIn</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">Terhubung secara profesional dan lihat rekam jejak karir saya.</p>
              </div>
            </div>
            <ArrowUpRight className="absolute top-10 right-10 text-zinc-700 group-hover:text-blue-500 group-active:text-blue-500 transition-all group-hover:rotate-45" />
          </a>

          {/* GitHub Card */}
          <a 
            href="https://github.com/kaminglo" 
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-10 transition-all duration-300 hover:border-blue-500/30 active:border-blue-500 active:bg-blue-500/5"
          >
            <div className="relative z-10 flex flex-col h-full justify-between gap-12">
              <div className="bg-zinc-900 w-14 h-14 rounded-2xl flex items-center justify-center text-zinc-500 group-hover:text-blue-500 group-active:text-blue-500 border border-white/5 transition-colors">
                <Github size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 group-active:text-blue-500 transition-colors">GitHub</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">Eksplorasi baris kode dan proyek open-source yang saya kerjakan.</p>
              </div>
            </div>
            <ArrowUpRight className="absolute top-10 right-10 text-zinc-700 group-hover:text-blue-500 group-active:text-blue-500 transition-all group-hover:rotate-45" />
          </a>          
        </div>
      </Section>
    </MainLayout>
  );
}