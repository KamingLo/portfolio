import Link from "next/link";
import Section from "@/components/layouts/sections";
import { format } from "date-fns";
import { getLatestHomeExperience } from "@/actions/public/home/action";
import { CtaCard } from "@/components/ui/cta-card";

export async function Experience() {
    const experience = await getLatestHomeExperience();

    if (!experience) return null;

    return (
        <Section id="experience" data-aos="fade-up" className="mt-16 text-zinc-700 [-webkit-tap-highlight-color:transparent]">
            {/* --- HEADER SECTION --- */}
            <div className="flex flex-col md:flex-row items-start justify-between pt-16 md:pt-32 pb-16 md:pb-24 gap-12 md:gap-16 border-b border-zinc-100 mb-16 md:mb-24">
                <div className="flex flex-col items-start space-y-6 md:w-1/2">
                    <h2 className="text-4xl sm:text-5xl md:text-7xl font-semibold text-zinc-900 tracking-tight">
                        Experiences
                    </h2>
                </div>

                <div className="flex flex-col items-start md:w-1/2 md:pt-16 space-y-6">
                    <div className="inline-flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-sm text-blue-600 font-semibold uppercase tracking-wider">
                            Professional journey
                        </span>
                    </div>
                    <p className="text-md sm:text-lg md:text-xl text-zinc-500 max-w-xl leading-relaxed">
                        A timeline of my professional experience, showcasing the companies I&apos;ve worked with and the impact I&apos;ve made along the way.
                    </p>
                </div>
            </div>

            {/* --- EXPERIENCE CONTENT --- */}
            <div className="py-8 md:py-12 border-t border-zinc-200">
                <div className="group flex flex-col md:flex-row gap-8 md:gap-16 items-start">
                    {/* Left Column - Date & Company */}
                    <div className="w-full md:w-1/4 flex flex-col space-y-2 shrink-0 md:pt-1">
                        <span className="text-sm font-semibold text-blue-600 tracking-wider uppercase">
                            {format(new Date(experience.start_date), "MMM yyyy")} — Present
                        </span>
                        <span className="text-xl md:text-2xl font-semibold text-zinc-900">
                            {experience.company}
                        </span>
                    </div>

                    {/* Right Column - Role & Description */}
                    <div className="w-full md:w-3/4 space-y-6">
                        <Link href="/experiences" className="inline-block">
                            <h3 className="text-3xl md:text-5xl font-semibold text-zinc-900 group-hover:text-blue-600 transition-colors">
                                {experience.job_title}
                            </h3>
                        </Link>
                        
                        {/* Description */}
                        <div 
                            className="text-zinc-500 text-base md:text-lg leading-relaxed max-w-3xl prose prose-zinc prose-p:my-2 prose-ul:my-2 prose-li:my-1"
                            dangerouslySetInnerHTML={{ __html: experience.description }}
                        />

                        {/* Tech Tags */}
                        {experience.skills && (
                            <div className="flex flex-wrap gap-2 pt-2">
                                {experience.skills.split(",").map((skill: string) => (
                                    <span 
                                        key={skill} 
                                        className="text-xs md:text-sm font-semibold border border-zinc-200 px-3 py-1.5 text-zinc-500 hover:border-blue-300 hover:text-blue-600 transition-colors"
                                    >
                                        {skill.trim()}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* --- CTA SECTION --- */}
            <CtaCard
                href="/experiences"
                title="View more experiences"
                description="Explore the details of my career history and professional journey."
                buttonText="Open professional history"
            />
        </Section>
    );
}