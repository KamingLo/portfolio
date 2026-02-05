import { Mail, MessageCircle } from "lucide-react";
import Section from "@/components/layouts/sections";

export const FinalCTA = () => (
  // Tambahkan px-4 agar di HP tidak menempel ke pinggir layar
  <Section id="contact" data-aos="fade-up" className="mb-20 [-webkit-tap-highlight-color:transparent]">
    <div className="relative overflow-hidden rounded-[2rem] bg-blue-800 p-8 md:p-16 text-center shadow-[0_0_80px_rgba(37,99,235,0.15)]">
      <div className="relative z-10 space-y-8 md:space-y-12 my-6 md:my-10">
        
        {/* Headline - Ukuran disesuaikan untuk mobile */}
        <h2 className="text-3xl md:text-6xl font-bold tracking-tight leading-tight text-white">
          Ready to start your project?
        </h2>
        
        {/* Sub-headline */}
        <p className="text-blue-100 text-base md:text-xl font-medium max-w-xl mx-auto opacity-90">
          Mari berdiskusi tentang bagaimana Next.js dan Laravel dapat membantu membangun solusi digital Anda.
        </p>

        {/* Dual Contact Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          
          {/* WhatsApp Option - Feedback biru saat diklik */}
          <a 
            href="https://wa.me/6283835360789" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-base md:text-lg transition-all active:bg-blue-100 active:text-blue-700 shadow-xl"
          >
            <MessageCircle size={20} />
            Chat on WhatsApp
          </a>

          {/* Email Option - Feedback biru terang saat diklik */}
          <a 
            href="mailto:lokaming86@gmail.com" 
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-blue-700 text-white border border-white/10 px-8 py-4 rounded-2xl font-bold text-base md:text-lg transition-all active:bg-blue-500 shadow-xl"
          >
            <Mail size={20} />
            Send an email
          </a>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  </Section>
);