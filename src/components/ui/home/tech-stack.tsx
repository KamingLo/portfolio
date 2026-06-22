import Section from "@/components/layouts/sections";
import {
  siNextdotjs,
  siGo,
  siTailwindcss,
  siLaravel,
  siPostgresql,
  siPython,
  siDocker,
  siUbuntu
} from "simple-icons";

const StackCategories = [
  {
    title: "Development",
    description: "Alat utama untuk membangun ekosistem dan logika aplikasi.",
    logos: [
      { name: "Next.js", icon: siNextdotjs },
      { name: "Tailwind", icon: siTailwindcss },
      { name: "Laravel", icon: siLaravel },
      { name: "Go", icon: siGo },
      { name: "Python", icon: siPython },
      { name: "PostgreSQL", icon: siPostgresql },
    ]
  },
  {
    title: "Infrastructure",
    description: "Sistem dan kontainer untuk pengelolaan server aplikasi.",
    logos: [
      { name: "Docker", icon: siDocker },
      { name: "Ubuntu", icon: siUbuntu },
    ]
  }
];

export const TechStack = () => (
  <Section id="stack" data-aos="fade-in" className="text-zinc-700">
    <div className="max-w-[1440px] mx-auto py-12 md:py-20 px-6">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col items-center justify-center text-center mb-16 md:mb-24 space-y-4 border-b border-zinc-100 pb-10">
        <span className="text-sm text-blue-500 font-semibold uppercase">
          Software engine
        </span>
        <h2 className="text-4xl md:text-6xl font-semibold text-zinc-900">
          Tech stack
        </h2>
        <p className="text-zinc-500 max-w-lg text-base md:text-lg">
          Teknologi pilihan untuk membangun produk yang skalabel dan berperforma tinggi.
        </p>
      </div>

      {/* --- DASHBOARD LAYOUT SECTION --- */}
      <div className="flex flex-col gap-16 md:gap-24">
        {StackCategories.map((category, idx) => (
          <div key={idx} className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
            
            {/* Sisi Kiri: Informasi Kategori */}
            <div className="md:w-1/3 space-y-3 md:sticky md:top-32">
              <h3 className="text-2xl md:text-3xl font-semibold text-zinc-900">
                {category.title}
              </h3>
              <p className="text-zinc-500 text-sm md:text-base">
                {category.description}
              </p>
            </div>

            {/* Sisi Kanan: Daftar Teknologi (Pill Cards) */}
            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 w-full">
              {category.logos.map((logo, index) => (
                <div 
                  key={index}
                  style={{ ["--brand-color" as string]: `#${logo.icon.hex}` }}
                  className="group flex items-center gap-5 p-6 border border-zinc-200 transition-all duration-300 hover:border-[var(--brand-color)] hover:-translate-y-1 cursor-pointer"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border border-zinc-200 group-hover:bg-[var(--brand-color)]/10 transition-colors duration-300">
                    <svg
                      role="img"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 fill-zinc-400 group-hover:fill-[var(--brand-color)] transition-colors duration-300"
                    >
                      <title>{logo.name}</title>
                      <path d={logo.icon.path} />
                    </svg>
                  </div>
                  
                  <span className="text-base md:text-lg font-semibold text-zinc-600 group-hover:text-zinc-900 transition-colors duration-300">
                    {logo.name}
                  </span>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

    </div>
  </Section>
);