import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface CtaCardProps {
    href: string;
    title: string;
    description: string;
    buttonText: string;
}

export const CtaCard: React.FC<CtaCardProps> = ({
    href,
    title,
    description,
    buttonText,
}) => {
    return (
        <div className="mt-32">
            <Link 
                href={href}
                className="group relative block overflow-hidden border border-zinc-200 bg-zinc-50/50 p-12 md:p-24 text-left transition-all duration-500 hover:bg-zinc-100 hover:border-blue-500/20 active:border-blue-500"
            >
                <div className="relative z-10 flex flex-col items-start space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-4xl md:text-7xl text-zinc-900 font-semibold tracking-tight active:text-blue-500 transition-colors">
                            {title}
                        </h3>
                        <p className="text-zinc-500 text-lg md:text-xl font-medium max-w-xl">
                            {description}
                        </p>
                    </div>

                    <div className="mt-4 flex items-center gap-3 text-zinc-900 font-semibold text-lg border-b border-zinc-200 pb-2 group-hover:border-blue-500 group-active:border-blue-500 group-active:text-blue-500 transition-all duration-500">
                        <span>{buttonText}</span>
                        <div className="bg-zinc-100 p-3 rounded-full text-zinc-900 group-hover:bg-blue-600 group-hover:text-white group-active:bg-blue-500 transition-all duration-500 flex items-center justify-center">
                            <ArrowUpRight size={22} className="group-hover:rotate-45 transition-transform duration-500" />
                        </div>
                    </div>
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-500/5 blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
            </Link>
        </div>
    );
};

export default CtaCard;
