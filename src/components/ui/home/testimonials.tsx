import { Star, Quote } from "lucide-react";
import Section from "@/components/layouts/sections";

const Stats = [
  { val: "10+", label: "Projects completed" },
  { val: "99%", label: "Performance score" }
];

export const Testimonials = () => (
  <Section id="testimonials" className="text-zinc-300">
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6 border-b border-white/5 pb-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-sm font-mono tracking-[0.2em] text-blue-500 font-semibold">
              Social proof
            </span>
          </div>
          <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tighter">
            Impact<span className="text-blue-600">.</span>
          </h2>
        </div>
        <p className="text-zinc-500 max-w-sm text-base md:text-lg font-medium leading-relaxed">
          Hasil nyata dari kolaborasi strategis dalam membangun solusi digital.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        {/* Testimonial Card */}
        <div className="lg:col-span-7 relative group">
          <div className="absolute -inset-1 bg-blue-600/10 rounded-4xl blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000" />
          
          <div className="relative p-10 md:p-16 rounded-4xl bg-white/[0.02] border border-white/10 backdrop-blur-md overflow-hidden transition-all hover:bg-white/[0.04]">
            <Quote className="absolute right-10 top-10 w-20 h-20 text-blue-500/5 rotate-12" />
            
            <div className="relative z-10 space-y-10">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="fill-blue-500 text-blue-500" />
                ))}
              </div>

              <p className="text-2xl md:text-4xl text-white font-medium leading-tight tracking-tight">
                "Pengerjaan website SMK Pelita IV sangat rapi dan memperhatikan aspek SEO yang sangat membantu visibilitas sekolah kami."
              </p>

              <div className="flex items-center gap-5 pt-4">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 text-xl font-bold border border-blue-500/20">
                  SP
                </div>
                <div>
                  <div className="text-xl font-semibold text-white tracking-tight">SMK Pelita IV</div>
                  <div className="text-sm text-zinc-500 font-medium mt-1">Institutional partner</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-12">
          {Stats.map((stat, i) => (
            <div key={i} className="group space-y-4">
              <div className="text-7xl md:text-9xl font-bold tracking-tighter text-white group-hover:text-blue-500 transition-colors duration-500">
                {stat.val}
              </div>
              <div className="h-1 w-12 bg-blue-600 transition-all duration-500 group-hover:w-20" />
              <div className="text-zinc-500 text-base md:text-lg font-medium tracking-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Section>
);