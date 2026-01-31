'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const navLinks = [
        { name: 'Projects', href: '/projects' },
        { name: 'Experience', href: '#experience' },
        { name: 'Contact', href: '/contact' },
        { name: 'About me', href: '/about-me' },
    ];

    return (
        <header className="fixed top-0 z-[150] w-full py-6">
            <div className="mx-auto max-w-7xl px-6 md:px-12">
                <nav className="flex items-center justify-between rounded-4xl border border-white/10 bg-[#0A0C10]/80 px-4 py-4 backdrop-blur-md shadow-2xl relative z-[170]" aria-label="Main Navigation">
                    
                    {/* Logo - Tetap z-[170] agar tidak tertutup */}
                    <Link href="/" className="pl-4 group text-xl font-bold tracking-tighter text-white">
                        KamingLo
                    </Link>

                    {/* Desktop Links */}
                    <ul className="hidden gap-2 text-md font-medium text-zinc-400 md:flex">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link 
                                    href={link.href} 
                                    className="px-4 py-2 transition-colors duration-200 hover:text-white rounded-full hover:bg-white/5"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                        <button className="hidden md:flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-black hover:bg-zinc-200 transition-all active:scale-95">
                            Let's Talk
                            <ArrowUpRight size={16} />
                        </button>
                        
                        {/* Mobile Toggle - Z-Index paling tinggi */}
                        <button 
                            className="md:hidden flex h-10 w-10 items-center justify-center rounded-full text-white focus:outline-none z-[170] hover:bg-white/10 transition-colors"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X size={30} /> : <Menu size={30} />}
                        </button>
                    </div>
                </nav>
            </div>

            {/* FULL SCREEN MOBILE OVERLAY (Halaman Baru) */}
            <div 
                className={`fixed inset-0 z-[140] bg-zinc-950 transition-all duration-500 ease-in-out md:hidden ${
                    isOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-full opacity-0 invisible'
                }`}
            >
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:3rem_3rem]" />
                
                <div className="relative z-10 flex h-full flex-col justify-between px-8 pt-32 pb-12">
                    <ul className="space-y-6">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center justify-between text-4xl font-semibold tracking-tight text-white border-b border-white/5 pb-4"
                                >
                                    {link.name}
                                    <ArrowUpRight size={28} className="text-blue-500" />
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="space-y-8">
                        <div className="space-y-2">
                            <span className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 block">GET IN TOUCH</span>
                            <Link href="lokaming86@gmail.com" className="text-xl font-medium text-white">
                                lokaming86@gmail.com
                            </Link>
                        </div>
                        <a 
                            href="https://wa.me/6283835360789" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block w-full rounded-2xl bg-blue-600 py-5 text-lg font-semibold text-white hover:bg-green-700 active:bg-green-500 transition-colors text-center"
                        >
                            WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};