import MainLayout from "@/components/layouts/main-layout";
import Section from "@/components/layouts/sections";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { siWhatsapp, siGmail, siIndeed, siGithub } from "simple-icons";
import { SimpleIcon } from "@/components/ui/simple-icon";

const contactMethods = [
  {
    title: "WhatsApp",
    description: "Fast response for project discussions or general inquiries.",
    href: "https://wa.me/6283835360789",
    icon: siWhatsapp,
    external: true,
  },
  {
    title: "Email",
    description: "Send a direct message for more in-depth discussions.",
    href: "mailto:lokaming86@gmail.com",
    icon: siGmail,
    external: false,
  },
  {
    title: "LinkedIn",
    description: "Connect professionally and explore my career track record.",
    href: "https://linkedin.com/in/kaming-lo",
    icon: siIndeed,
    external: true,
  },
  {
    title: "GitHub",
    description: "Explore the codebase and open-source projects I've worked on.",
    href: "https://github.com/kaminglo",
    icon: siGithub,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <MainLayout>
      <Section id="contact-hero" className="text-zinc-700 [-webkit-tap-highlight-color:transparent]">
        {/* --- HERO SECTION --- */}
        <div className="flex flex-col md:flex-row items-start justify-between pt-16 md:pt-32 pb-16 md:pb-24 gap-12 md:gap-16 border-b border-zinc-100">
          <div className="flex flex-col items-start space-y-6 md:w-1/2">
            <Logo />
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold text-zinc-900 tracking-tight">
              Let&apos;s build something great.
            </h1>
          </div>

          <div className="flex flex-col items-start md:w-1/2 md:pt-16 space-y-6">
            <div className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-sm text-blue-600 font-semibold uppercase tracking-wider">
                Get in touch
              </span>
            </div>
            <p className="text-md sm:text-lg md:text-xl text-zinc-500 max-w-xl leading-relaxed">
              Have a question or an exciting project in mind? Choose the most convenient way for you to connect, and let&apos;s make it happen.
            </p>
          </div>
        </div>

        {/* --- CONTACT CARDS --- */}
        <div className="pt-16 md:pt-24 pb-20 md:pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method) => {
              const Tag = method.external ? "a" : "a"; // Both can use 'a' since mailto is external behavior
              const externalProps = method.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {};

              return (
                <Tag
                  key={method.title}
                  href={method.href}
                  {...externalProps}
                  className="group relative w-full overflow-hidden border border-zinc-200 p-8 transition-all duration-300 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/5 active:border-blue-500 active:bg-blue-50"
                >
                  <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left gap-5">
                    <div className="w-14 h-14 flex items-center justify-center text-zinc-400 group-hover:text-blue-600 border border-zinc-200 transition-colors duration-300">
                      <SimpleIcon icon={method.icon} size={28} />
                    </div>
                    <div className="flex flex-col h-full">
                      <h3 className="text-xl font-semibold text-zinc-900 mb-2 group-active:text-blue-600 transition-colors">
                        {method.title}
                      </h3>
                      <p className="text-zinc-500 text-sm leading-relaxed">
                        {method.description}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="absolute top-8 right-8 text-zinc-300 group-hover:text-blue-500 transition-all group-hover:rotate-45" />
                </Tag>
              );
            })}
          </div>
        </div>
      </Section>
    </MainLayout>
  );
}