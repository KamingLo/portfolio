import MainLayout from "@/components/layouts/main-layout";
import Section from "@/components/layouts/sections";
import Image from "next/image";
import Link from "next/link";
import { TechStack } from "@/components/ui/home/tech-stack";
import { ArrowUpRight, Github, Linkedin, MessageCircle, Mail } from "lucide-react";
import {
  siNextdotjs,
  siLaravel,
  siTailwindcss,
  siReact,
  siTypescript,
  siGo,
  siPython,
  siPostgresql,
  siMysql,
  siDocker,
  siUbuntu,
  siGit,
  siJavascript,
  siPhp,
} from "simple-icons";

/* ─── DATA ───────────────────────────────────────────────────── */

const skillCategories = [
  {
    title: "Frontend",
    span: "col-span-1 md:col-span-2 md:row-span-2",
    techs: [
      { name: "Next.js", icon: siNextdotjs },
      { name: "React", icon: siReact },
      { name: "Tailwind CSS", icon: siTailwindcss },
      { name: "TypeScript", icon: siTypescript },
      { name: "JavaScript", icon: siJavascript },
    ],
  },
  {
    title: "Backend",
    span: "col-span-1 md:col-span-1 md:row-span-2",
    techs: [
      { name: "Laravel", icon: siLaravel },
      { name: "Go", icon: siGo },
      { name: "PHP", icon: siPhp },
    ],
  },
  {
    title: "Language",
    span: "col-span-1 md:col-span-1 md:row-span-1",
    techs: [
      { name: "Python", icon: siPython },
      { name: "TypeScript", icon: siTypescript },
    ],
  },
  {
    title: "Database",
    span: "col-span-1 md:col-span-1 md:row-span-1",
    techs: [
      { name: "PostgreSQL", icon: siPostgresql },
      { name: "MySQL", icon: siMysql },
    ],
  },
  {
    title: "Infrastructure",
    span: "col-span-1 md:col-span-2 md:row-span-1",
    techs: [
      { name: "Docker", icon: siDocker },
      { name: "Ubuntu", icon: siUbuntu },
      { name: "Git", icon: siGit },
    ],
  },
];

const socialLinks = [
  { name: "GitHub", href: "https://github.com/kaminglo", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com/in/kaming-lo", icon: Linkedin },
  { name: "WhatsApp", href: "https://wa.me/6283835360789", icon: MessageCircle },
];

const contactCards = [
  {
    title: "WhatsApp",
    description: "Respon cepat untuk diskusi proyek atau sekadar tanya-tanya.",
    href: "https://wa.me/6283835360789",
    icon: MessageCircle,
    external: true,
  },
  {
    title: "LinkedIn",
    description: "Terhubung secara profesional dan lihat rekam jejak karir saya.",
    href: "https://linkedin.com/in/kaming-lo",
    icon: Linkedin,
    external: true,
  },
  {
    title: "Email",
    description: "Kirim pesan langsung untuk diskusi lebih mendalam.",
    href: "mailto:lokaming86@gmail.com",
    icon: Mail,
    external: false,
  },
];

/* ─── PAGE ───────────────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <MainLayout>

      {/* ━━━ SECTION 1 — HERO (Identitas Utama) ━━━━━━━━━━━━━━ */}
      <Section id="about-hero" className="text-zinc-700">
        <div className="flex flex-col items-center justify-center text-center pt-16 md:pt-32 pb-20 md:pb-40 space-y-8">
          {/* Logo */}
          <Image
            src="/assets/image/logo-black.svg"
            alt="Logo Kaming"
            width={64}
            height={64}
            priority
            className="opacity-90"
          />

          {/* Company Name */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-zinc-900 tracking-tight">
            Kaming Lo.
          </h1>

          {/* Tagline */}
          <p className="text-lg sm:text-xl md:text-2xl text-zinc-500 max-w-2xl leading-relaxed">
            Membangun produk digital yang presisi melalui arsitektur yang bersih dan pengalaman pengguna yang bermakna.
          </p>

          {/* Primary CTA */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-zinc-900 text-white px-8 py-4 rounded-full font-bold text-base transition-all duration-300 hover:bg-blue-600 hover:gap-4 active:bg-blue-500 mt-4"
          >
            Mulai Proyek
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </Section>

      {/* ━━━ SECTION 2 — PROFIL FOUNDER ━━━━━━━━━━━━━━━━━━━━━━ */}
      <Section id="founder" className="text-zinc-700">
        <div className="w-full h-px bg-zinc-200 mb-16 md:mb-24" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-center">
          {/* Foto */}
          <div className="md:col-span-5 flex justify-center md:justify-start">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-3xl overflow-hidden border border-zinc-200 shadow-lg">
              <Image
                src="/assets/image/kaming.webp"
                alt="Kaming Lo"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 256px, 320px"
              />
            </div>
          </div>

          {/* Teks */}
          <div className="md:col-span-7 space-y-6 text-center md:text-left">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight">
                Kaming Lo
              </h2>
              <p className="text-lg md:text-xl text-blue-600 font-semibold">
                Full-stack Developer & Educator
              </p>
            </div>

            <p className="text-base md:text-lg text-zinc-500 max-w-xl leading-relaxed">
              Saya mendirikan praktik pengembangan ini dengan satu keyakinan: fondasi kode yang bersih adalah bentuk tanggung jawab profesional tertinggi. Berdiri di persimpangan antara pengembangan perangkat lunak dan edukasi, saya mengkhususkan diri pada ekosistem Next.js dan Laravel untuk merancang sistem yang stabil, mudah dibaca, dan siap untuk skala esok hari.
            </p>

            {/* Social Icons */}
            <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="group flex items-center justify-center w-12 h-12 rounded-full border border-zinc-200 text-zinc-400 hover:text-blue-600 hover:border-blue-300 active:bg-blue-50 transition-all duration-300"
                >
                  <link.icon size={20} className="transition-transform group-hover:-translate-y-0.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ━━━ SECTION 3 — AREA KEAHLIAN (Bento Box) ━━━━━━━━━━━ */}
      <Section id="skills" className="text-zinc-700">
        <div className="w-full h-px bg-zinc-200 my-16 md:my-24" />

        {/* Header */}
        <div className="text-center mb-12 md:mb-20 space-y-3">
          <span className="text-sm text-blue-600 font-bold uppercase tracking-wider">
            Keahlian Teknis
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight">
            Area Keahlian
          </h2>
          <p className="text-zinc-400 max-w-lg mx-auto text-base">
            Teknologi yang saya kuasai untuk membangun produk berkualitas tinggi.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 md:gap-6 auto-rows-auto">
          {skillCategories.map((cat, idx) => (
            <div
              key={idx}
              className={`${cat.span} group rounded-2xl border border-zinc-200 bg-zinc-50/80 p-6 md:p-8 transition-all duration-300 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/5`}
            >
              {/* Category Title */}
              <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-6">
                {cat.title}
              </h3>

              {/* Tech Items */}
              <div className="flex flex-wrap gap-3">
                {cat.techs.map((tech, i) => (
                  <div
                    key={i}
                    style={{ ["--brand-color" as string]: `#${tech.icon.hex}` }}
                    className="flex items-center gap-3 bg-white border border-zinc-100 rounded-xl px-4 py-3 transition-all duration-300 hover:border-[var(--brand-color)] hover:shadow-md"
                  >
                    <svg
                      role="img"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 fill-zinc-400 group-hover:fill-[var(--brand-color)] transition-colors duration-300"
                    >
                      <title>{tech.name}</title>
                      <path d={tech.icon.path} />
                    </svg>
                    <span className="text-sm font-semibold text-zinc-600">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ━━━ SECTION 4 — LAYANAN UTAMA (TechStack) ━━━━━━━━━━━ */}
      <div className="mt-16 md:mt-24">
        <TechStack />
      </div>

      {/* ━━━ SECTION 5 — AREA KONTAK ━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <Section id="about-contact" className="text-zinc-700 [-webkit-tap-highlight-color:transparent]">
        <div className="w-full h-px bg-zinc-200 my-16 md:my-24" />

        {/* Header */}
        <div className="text-center mb-12 md:mb-16 space-y-3">
          <span className="text-sm text-blue-600 font-bold uppercase tracking-wider">
            Hubungi Saya
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight">
            Mari Terhubung
          </h2>
        </div>

        {/* Contact Cards — mobile: vertical centered, desktop: horizontal spread */}
        <div className="flex flex-col md:flex-row items-center md:items-stretch md:justify-between gap-6">
          {contactCards.map((card) => {
            const Tag = card.external ? "a" : Link;
            const externalProps = card.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {};

            return (
              <Tag
                key={card.title}
                href={card.href}
                {...externalProps}
                className="group relative w-full md:flex-1 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 p-8 transition-all duration-300 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/5 active:border-blue-500 active:bg-blue-50"
              >
                <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left gap-5">
                  <div className="bg-zinc-100 w-14 h-14 rounded-2xl flex items-center justify-center text-zinc-400 group-hover:text-blue-600 border border-zinc-200 transition-colors duration-300">
                    <card.icon size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-zinc-900 mb-1 group-active:text-blue-600 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="absolute top-8 right-8 text-zinc-300 group-hover:text-blue-500 transition-all group-hover:rotate-45" />
              </Tag>
            );
          })}
        </div>
      </Section>

    </MainLayout>
  );
}