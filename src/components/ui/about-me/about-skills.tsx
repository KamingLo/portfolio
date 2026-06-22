import Section from "@/components/layouts/sections";
import { Code2, Server, Database, Container } from "lucide-react";

const skillAreas = [
  {
    title: "Frontend Development",
    description:
      "Crafting highly responsive, conversion-focused user interfaces that deliver seamless digital experiences across all devices.",
    icon: Code2,
  },
  {
    title: "Backend Development",
    description:
      "Architecting robust, secure server-side systems and APIs that ensure your business logic runs efficiently and scales flawlessly.",
    icon: Server,
  },
  {
    title: "Database & Data",
    description:
      "Designing optimized data structures and scalable storage solutions to keep your business data secure, accessible, and fast.",
    icon: Database,
  },
  {
    title: "Infrastructure & DevOps",
    description:
      "Implementing streamlined deployment pipelines and reliable server infrastructure for maximum uptime and operational efficiency.",
    icon: Container,
  },
];

export const AboutSkills = () => (
  <Section id="skills" className="text-zinc-700">
    <div className="w-full h-px bg-zinc-200 my-16 md:my-24" />

    {/* Header */}
    <div className="text-center mb-12 md:mb-20 space-y-3">
      <h2 className="text-3xl md:text-5xl font-semibold text-zinc-900">
        Core Capabilities
      </h2>
      <p className="text-zinc-400 max-w-lg mx-auto text-base">
        Strategic technical disciplines focused on delivering high-performance, scalable business solutions.
      </p>
    </div>

    {/* Skills Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
      {skillAreas.map((area) => (
        <div
          key={area.title}
          className="group border border-zinc-200 p-8 md:p-10 transition-all duration-300 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/5"
        >
          {/* Icon */}
          <div className="flex items-center justify-center w-14 h-14 border border-zinc-200 text-zinc-400 group-hover:text-blue-600 group-hover:border-blue-200 transition-all duration-300 mb-6">
            <area.icon size={28} />
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-zinc-900 mb-3">
            {area.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-zinc-400">
            {area.description}
          </p>
        </div>
      ))}
    </div>
  </Section>
);