'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
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
        <header className={`sticky top-0 w-full transition-all duration-300 [-webkit-tap-highlight-color:transparent] z-50 ${isOpen ? 'backdrop-blur-none' : 'backdrop-blur-md'}`}>
            <div className="mx-auto max-w-[1600px] px-6 md:px-12">
                <nav className="flex items-center justify-between py-4 relative z-[210]">
                    
                    <Link href="/" className="pl-4 transition-opacity duration-200 active:opacity-70">
                        <Logo/>
                    </Link>

                    <ul className="hidden gap-2 text-md font-medium text-zinc-500 md:flex">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link 
                                    href={link.href} 
                                    className="px-4 py-2 transition-all duration-200 hover:text-zinc-900 rounded-full active:text-blue-500 active:bg-blue-500/5"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center gap-2">
                        <Link href={"/contact"} className="hidden md:flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-semibold text-white active:bg-blue-500 active:text-white transition-all">
                            Let&apos;s talk
                            <ArrowUpRight size={16} />
                        </Link>
                        
                        <button 
                            className="md:hidden flex h-12 w-12 items-center justify-center rounded-full text-zinc-900 transition-colors active:text-blue-500"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </nav>
            </div>

            {/* FULL SCREEN MOBILE OVERLAY */}
            <div 
                className={`fixed inset-0 z-[200] bg-white/95 backdrop-blur-2xl transition-all duration-500 ease-in-out md:hidden ${
                    isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                }`}
            >
                <div className="relative z-10 flex h-full flex-col justify-between px-8 pt-32 pb-12">
                    <ul className="space-y-3">
                        {navLinks.map((link, index) => (
                            <li 
                                key={link.name}
                                className={`transform transition-all duration-500 ${
                                    isOpen 
                                        ? 'translate-y-0 opacity-100' 
                                        : 'translate-y-8 opacity-0'
                                }`}
                                style={{ transitionDelay: isOpen ? `${index * 80}ms` : '0ms' }}
                            >
                                <Link
                                    href={link.href}
                                    onClick={() => delayNavigation()}
                                    className="flex items-center justify-between text-4xl font-semibold text-zinc-900 border-b border-zinc-200 pb-5 transition-all duration-200 active:text-blue-500 active:border-blue-500/50"
                                >
                                    {link.name}
                                    <ArrowUpRight size={28} className='text-blue-500/70'/>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </header>
    );
};