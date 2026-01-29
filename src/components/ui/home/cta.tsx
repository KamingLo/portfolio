import Link from "next/link";
import { Mail, MessageCircle, ArrowRight } from "lucide-react";
import Section from "@/components/layouts/sections";

export const FinalCTA = () => (
  <Section id="contact" className=" mb-20">
    <div className="relative overflow-hidden rounded-3xl bg-blue-800 p-10 text-center shadow-[0_0_80px_rgba(37,99,235,0.15)]">
      <div className="relative z-10 space-y-12 my-10">
        <h2 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none text-white">
          Ready to start your project?
        </h2>
        
        <p className="text-blue-100 text-lg md:text-xl font-medium max-w-xl mx-auto opacity-90">
          Mari berdiskusi tentang bagaimana Next.js dan Laravel dapat membantu membangun solusi digital Anda.
        </p>

        {/* Dual Contact Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4">
          {/* WhatsApp Option */}
          <a 
            href="https://wa.me/6283835360789" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white text-blue-600 px-10 py-5 rounded-2xl font-semibold text-lg hover:bg-zinc-100 hover:scale-105 active:scale-95 transition-all shadow-xl"
          >
            <MessageCircle size={22} />
            Chat on WhatsApp
          </a>

          {/* Email Option */}
          <a 
            href="mailto:lokaming86@gmail.com" 
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-blue-700 text-white border border-blue-500/50 px-10 py-5 rounded-2xl font-semibold text-lg hover:text-slate-50 hover:bg-blue-400 hover:scale-105 active:scale-95 transition-all shadow-xl"
          >
            <Mail size={22} />
            Send an email
          </a>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  </Section>
);