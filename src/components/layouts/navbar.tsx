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
        { name: 'Home', href: '/' },
        { name: 'Project', href: '/projects' },
        { name: 'Experience', href: '/experiences' },
        { name: 'Contact', href: '/contact' },
        { name: 'About me', href: '/about-me' },
    ];

    const delayNavigation = () => {
        setTimeout(() => {
            setIsOpen(false);
        }, 350);
    };

    return (
        <header className="fixed top-0 z-[150] w-full py-6 [-webkit-tap-highlight-color:transparent]">
            <div className="mx-auto max-w-7xl px-6 md:px-12">
                <nav className="flex items-center justify-between rounded-[2rem] border border-white/10 bg-[#0A0C10]/80 px-4 py-4 backdrop-blur-md shadow-2xl relative z-[170]">
                    
                    <Link href="/" className="pl-4 text-xl font-bold text-white transition-colors duration-200 active:text-blue-500">
                        KamingLo
                    </Link>

                    <ul className="hidden gap-2 text-md font-medium text-zinc-400 md:flex">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link 
                                    href={link.href} 
                                    className="px-4 py-2 transition-all duration-200 hover:text-white rounded-full active:text-blue-500 active:bg-blue-500/5"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center gap-2">
                        <Link href={"/contact"} className="hidden md:flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-black active:bg-blue-500 active:text-white transition-all">
                            Let&apos;s talk
                            <ArrowUpRight size={16} />
                        </Link>
                        
                        <button 
                            className="md:hidden flex h-12 w-12 items-center justify-center rounded-full text-white transition-colors active:text-blue-500"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </nav>
            </div>

            {/* FULL SCREEN MOBILE OVERLAY */}
            <div 
                className={`fixed inset-0 z-[140] bg-zinc-950 transition-all duration-500 ease-in-out md:hidden ${
                    isOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-full opacity-0 invisible'
                }`}
            >
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:3rem_3rem]" />
                
                <div className="relative z-10 flex h-full flex-col justify-between px-8 pt-32 pb-12">
                    <ul className="space-y-4">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    onClick={() => delayNavigation()}
                                    // Efek Klik: Teks dan garis bawah jadi biru
                                    className="flex items-center justify-between text-4xl font-bold text-white border-b border-white/5 pb-6 transition-all duration-200 active:text-blue-500 active:border-blue-500"
                                >
                                    {link.name}
                                    <ArrowUpRight size={28} className='text-blue-500'/>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="space-y-8">
                        <div className="space-y-2">
                            <span className="text-[10px] font-bold text-zinc-600 block">Get in touch</span>
                            <Link href="mailto:lokaming86@gmail.com" className="text-xl font-bold text-white active:text-blue-500">
                                lokaming86@gmail.com
                            </Link>
                        </div>
                        <a 
                            href="https://wa.me/6283835360789" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block w-full rounded-2xl bg-blue-600 py-6 text-lg font-bold text-white transition-all active:bg-blue-400 text-center"
                        >
                            WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};