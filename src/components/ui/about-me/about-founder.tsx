import Section from "@/components/layouts/sections";
import Image from "next/image";
import { siGithub, siIndeed, siWhatsapp } from "simple-icons";
import { SimpleIcon } from "@/components/ui/simple-icon";

const socialLinks = [
  { name: "GitHub", href: "https://github.com/kaminglo", icon: siGithub },
  { name: "LinkedIn", href: "https://linkedin.com/in/kaming-lo", icon: siIndeed },
  { name: "WhatsApp", href: "https://wa.me/6283835360789", icon: siWhatsapp },
];

export const AboutFounder = () => (
  <Section id="founder" className="text-zinc-700">
    <div className="w-full h-px bg-zinc-200 mb-16 md:mb-24" />

    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-center">
      {/* Foto */}
      <div className="md:col-span-5 flex justify-start">
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
      <div className="md:col-span-7 space-y-6 text-left">
        <div className="space-y-2">
          <h2 className="text-3xl md:text-5xl font-semibold text-zinc-900">
            Kaming Lo
          </h2>
          <p className="text-lg md:text-xl text-grey-600 font-semibold">
            Software Engineer & Tech Partner
          </p>
        </div>

        <p className="text-base md:text-lg text-zinc-500 max-w-xl">
          I founded this development practice on a single principle: exceptional architecture is the bedrock of a thriving digital business. Bridging the gap between software engineering and strategic execution, I specialize in the Next.js, Gin, and Laravel ecosystems to build robust, scalable solutions. My focus is entirely on engineering reliable digital assets that drive your business forward, reduce long-term maintenance, and seamlessly scale for tomorrow&apos;s market demands.
        </p>

        {/* Social Icons */}
        <div className="flex items-center justify-start gap-4 pt-2">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="group flex items-center justify-center w-12 h-12 rounded-full border border-zinc-200 text-zinc-400 hover:text-blue-600 hover:border-blue-300 active:bg-blue-50 transition-all duration-300"
            >
              <SimpleIcon icon={link.icon} size={20} className="transition-transform group-hover:-translate-y-0.5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  </Section>
);