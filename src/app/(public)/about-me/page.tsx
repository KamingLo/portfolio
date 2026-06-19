import MainLayout from "@/components/layouts/main-layout";
import Section from "@/components/layouts/sections";
import { TechStack }from "@/components/ui/home/tech-stack";
import Image from "next/image";

export default function AboutPage() {
  return (
    <MainLayout>
      <Section id="about-header" className="text-zinc-300">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6 border-b border-white/5 pb-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-md font-mono text-blue-500 font-semibold">
                The person behind the products
              </span>
            </div>
            <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tighter">
              About Me
            </h2>
          </div>
          <p className="text-zinc-500 max-w-sm text-base md:text-lg font-medium leading-relaxed">
            Membangun produk digital dengan presisi, edukasi, dan fokus pada skalabilitas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
          <div className="lg:col-span-7 space-y-8 order-2 lg:order-1">
            <h3 className="text-3xl md:text-5xl font-semibold text-white tracking-tight leading-tight">
              Lebih dari sekadar coding, saya membangun solusi yang berkelanjutan.
            </h3>
            
            <div className="space-y-6 text-zinc-400 text-lg md:text-xl font-normal leading-relaxed">
              <p>
                Melanjutkan apa yang saya sampaikan di awal: saya adalah <span className="text-white">Kaming Lo</span>. Perjalanan saya di dunia teknologi unik karena saya berdiri di dua sisi—sebagai pengembang aktif dan sebagai seorang pengajar. 
              </p>
              <p>
                Sebagai spesialis di ekosistem <span className="text-blue-400 font-medium">Next.js</span> dan <span className="text-white font-medium">Laravel</span>, saya tidak hanya fokus pada &quot;asal jalan&quot;. Latar belakang saya sebagai pengajar menuntut saya untuk selalu menulis kode yang bersih, terdokumentasi, dan mudah dipahami—standar yang saya bawa ke setiap produk digital yang saya bangun.
              </p>
              <p>
                Fokus utama saya saat ini adalah menciptakan aplikasi yang memiliki performa tinggi dan <span className="text-zinc-200">User Experience</span> yang mulus. Di luar itu, gairah saya pada analisis data dan pasar modal membantu saya melihat setiap proyek dari kacamata bisnis dan logika yang tajam.
              </p>
            </div>

            <div className="relative p-10 rounded-4xl border border-white/10 bg-white/[0.02] overflow-hidden group transition-all hover:bg-white/[0.04]">
               <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 transition-all duration-500 group-hover:w-2" />
               <p className="text-white text-xl md:text-2xl font-medium italic">
                 &quot;Bagi saya, arsitektur website yang baik adalah fondasi dari pengalaman pengguna yang luar biasa.&quot;
               </p>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-8 order-1 lg:order-2">
             <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] border border-white/20 bg-zinc-900 group shadow-2xl">
                <Image 
                  src="/assets/image/kaming.webp"
                  alt="Kaming Lo - Full-stack Developer"
                  fill
                  priority
                  className="object-cover transition-all duration-700 grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105"
                />
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/20 blur-[80px] -z-10" />
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.01]">
                   <span className="text-blue-500 font-mono text-md block mb-1">Main Interest</span>
                   <span className="text-white font-medium text-md">Web-development</span>
                </div>
                <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.01]">
                   <span className="text-blue-500 font-mono text-md block mb-1">Philosophy</span>
                   <span className="text-white font-medium text-md">Always Learn</span>
                </div>
             </div>
          </div>
        </div>
      </Section>

      <TechStack />
    </MainLayout>
  );
}