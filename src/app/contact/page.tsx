import MainLayout from "@/components/layouts/main-layout";
import Section from "@/components/layouts/sections";
import { ArrowUpRight, Github, Linkedin, MessageCircle, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <MainLayout>
      <Section id="contact" className="text-zinc-300 mt-10 pb-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-6 border-b border-white/5 pb-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-sm font-mono tracking-[0.2em] text-blue-500 font-semibold uppercase">
                Let's Work Together
              </span>
            </div>
            <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tighter">
              Contact<span className="text-blue-600">.</span>
            </h2>
          </div>
          <p className="text-zinc-500 max-w-sm text-base md:text-lg font-medium leading-relaxed">
            Punya pertanyaan atau proyek menarik? Pilih cara ternyaman bagi Anda untuk terhubung.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
          
          {/* WhatsApp Card - Primary Action */}
          <a 
            href="https://wa.me/6283835360789" 
            target="_blank"
            className="md:col-span-1 md:row-span-1 group relative overflow-hidden rounded-3xl border border-white/10 bg-[#25D366]/[0.03] p-8 transition-all hover:bg-[#25D366]/[0.08]"
          >
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="bg-[#25D366]/20 w-12 h-12 rounded-2xl flex items-center justify-center text-[#25D366]">
                <MessageCircle size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">WhatsApp</h3>
                <p className="text-zinc-500 text-sm">Respon cepat untuk diskusi proyek atau sekadar tanya-tanya.</p>
              </div>
            </div>
            <ArrowUpRight className="absolute top-8 right-8 text-zinc-700 group-hover:text-white transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>

          {/* LinkedIn Card */}
          <a 
            href="https://linkedin.com/in/kaming-lo" 
            target="_blank"
            className="md:col-span-1 md:row-span-1 group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0077B5]/[0.03] p-8 transition-all hover:bg-[#0077B5]/[0.08]"
          >
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="bg-[#0077B5]/20 w-12 h-12 rounded-2xl flex items-center justify-center text-[#0077B5]">
                <Linkedin size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">LinkedIn</h3>
                <p className="text-zinc-500 text-sm">Terhubung secara profesional dan lihat rekam jejak karir saya.</p>
              </div>
            </div>
            <ArrowUpRight className="absolute top-8 right-8 text-zinc-700 group-hover:text-white transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>

          {/* GitHub Card */}
          <a 
            href="https://github.com/kaminglo" 
            target="_blank"
            className="md:col-span-1 md:row-span-1 group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-all hover:bg-white/[0.08]"
          >
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="bg-white/10 w-12 h-12 rounded-2xl flex items-center justify-center text-white">
                <Github size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">GitHub</h3>
                <p className="text-zinc-500 text-sm">Eksplorasi baris kode dan proyek open-source yang saya kerjakan.</p>
              </div>
            </div>
            <ArrowUpRight className="absolute top-8 right-8 text-zinc-700 group-hover:text-white transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>          
        </div>
      </Section>
    </MainLayout>
  );
}