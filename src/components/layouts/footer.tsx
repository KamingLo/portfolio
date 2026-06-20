import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = [
        { name: 'Home', href: '/' },
        { name: 'Projects', href: '/projects' },
        { name: 'Experience', href: '/experiences' },
        { name: 'About me', href: '/about-me' },
    ];

    const socialLinks = [
        { name: 'Email', href: 'mailto:lokaming86@gmail.com', icon: Mail },
        { name: 'WhatsApp', href: 'https://wa.me/6283835360789', icon: ArrowUpRight },
        { name: 'GitHub', href: 'https://github.com', icon: Github },
        { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
    ];

    return (
        <footer className="relative border-t border-zinc-200 bg-zinc-50/80 backdrop-blur-2xl pt-16 pb-8 md:pt-24 md:pb-12 [-webkit-tap-highlight-color:transparent]">
            <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
                
                {/* --- CALL TO ACTION SECTION --- */}
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-16 md:mb-24">
                    <div className="space-y-4 max-w-2xl">
                        <h2 className="text-4xl md:text-6xl font-bold text-zinc-900">
                            Mari bangun sesuatu yang luar biasa.
                        </h2>
                        <p className="text-zinc-500 text-lg">
                            Punya ide proyek atau sekadar ingin menyapa? Jangan ragu untuk menghubungi saya.
                        </p>
                    </div>
                    <Link 
                        href="mailto:lokaming86@gmail.com" 
                        className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-8 py-4 text-base font-bold text-white transition-all active:bg-blue-500 active:text-white"
                    >
                        Mulai percakapan
                        <ArrowUpRight size={20} />
                    </Link>
                </div>

                {/* --- FOOTER CONTENT GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-zinc-100 pt-12 md:pt-16 mb-12 md:mb-16">
                    
                    {/* Brand / Logo */}
                    <div className="md:col-span-6 flex flex-col items-start space-y-6">
                        <Link href="/" className="flex items-center gap-3 transition-opacity duration-200 active:opacity-70">
                            <Image
                                src="/assets/image/logo-black.svg"
                                alt="Logo Kaming"
                                width={40}
                                height={40}
                            />
                            <span className="text-zinc-900 font-bold text-xl">Kaming</span>
                        </Link>
                        <p className="text-zinc-500 max-w-sm">
                            Menghadirkan solusi digital melalui kode yang bersih dan pengalaman pengguna yang bermakna.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="md:col-span-3 space-y-6">
                        <h3 className="text-zinc-900 font-bold text-lg">Navigasi</h3>
                        <ul className="space-y-4">
                            {footerLinks.map((link) => (
                                <li key={link.name}>
                                    <Link 
                                        href={link.href}
                                        className="text-zinc-500 hover:text-zinc-900 active:text-blue-500 transition-colors duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Socials & Contact */}
                    <div className="md:col-span-3 space-y-6">
                        <h3 className="text-zinc-900 font-bold text-lg">Terhubung</h3>
                        <ul className="space-y-4">
                            {socialLinks.map((link) => (
                                <li key={link.name}>
                                    <a 
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-2 text-zinc-500 hover:text-zinc-900 active:text-blue-500 transition-colors duration-200"
                                    >
                                        <link.icon size={18} className="transition-transform group-hover:-translate-y-0.5" />
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* --- BOTTOM SECTION --- */}
                <p className="text-center text-gray-500">
                    © {currentYear} Kaming. All rights reserved.
                </p>

            </div>
        </footer>
    );
};