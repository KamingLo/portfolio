"use client";
import { useActionState, useState } from "react";
import { loginAction } from "@/actions/auth/login";
import { Eye, EyeOff, ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [state, action, isPending] = useActionState(loginAction, undefined);

    return (
        <div className="flex min-h-screen bg-black text-white overflow-hidden">
            {/* Left Side: Brand Visual */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden border-r border-white/10 bg-zinc-950">
                {/* Background Grid with Pulse Animation */}
                <div className="absolute inset-0 z-0 opacity-20 animate-pulse">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:4rem_4rem]" />
                </div>
                
                <div className="relative z-10 flex flex-col justify-between p-16 w-full">
                    {/* Slide Down Animation */}
                    <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tighter transition-all hover:text-blue-500 animate-slide-down">
                        <ArrowLeft size={18} className="text-zinc-500" />
                        Back to main
                    </Link>

                    <div className="space-y-6">
                        {/* Slow Bounce Icon */}
                        <div className="h-12 w-12 rounded-2xl bg-blue-600/20 flex items-center justify-center text-blue-500 animate-bounce [animation-duration:3s]">
                            <ShieldCheck size={32} />
                        </div>
                        {/* Fade In & Slide Up Text */}
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
                            <h1 className="text-5xl font-bold tracking-tighter leading-tight">
                                Secure access to <br /> your dashboard.
                            </h1>
                            <p className="text-zinc-500 text-lg max-w-md font-medium">
                                Manage your digital products and institutional ecosystem with precision.
                            </p>
                        </div>
                    </div>

                    <div className="text-sm text-zinc-600 font-mono tracking-widest animate-in fade-in duration-1000 delay-500">
                        SYSTEM ARCHITECTURE v1.0
                    </div>
                </div>

                {/* Animated Decorative Glow (Spin Slow) */}
                <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-600/10 blur-[120px] animate-spin-slow" />
            </div>

            {/* Right Side: Form Content */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 md:p-16 relative">
                {/* Mobile Logo */}
                <div className="lg:hidden absolute top-8 left-8 animate-in fade-in slide-in-from-top-4 duration-500">
                   <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tighter">
                        <ArrowLeft size={18} className="text-zinc-500" />
                        Back to main
                    </Link>
                </div>

                {/* Form Wrapper with Slide Up Animation */}
                <div className="w-full max-w-sm space-y-10 animate-in fade-in slide-in-from-bottom-12 duration-1000">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
                        <p className="text-zinc-500 font-medium">Please enter your details to sign in.</p>
                    </div>

                    <form action={action} className="space-y-6">
                        <div className="space-y-4">
                            {/* Input Focus Transitions */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400 ml-1">Email address</label>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    required
                                    className="w-full bg-zinc-900 border border-white/5 rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all duration-300 placeholder:text-zinc-700"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-400 ml-1">Password</label>
                                <div className="relative">
                                    <input
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        required
                                        className="w-full bg-zinc-900 border border-white/5 rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all duration-300 placeholder:text-zinc-700"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white transition-colors duration-200"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Error Message Animation */}
                        {state?.message && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 animate-in slide-in-from-top-2 fade-in">
                                <p className="text-red-500 text-sm font-medium text-center">
                                    {state.message}
                                </p>
                            </div>
                        )}

                        <button 
                            type="submit" 
                            disabled={isPending}
                            className="w-full bg-white text-black py-4 rounded-2xl font-semibold hover:bg-zinc-200 transition-all duration-300 disabled:bg-zinc-800 disabled:text-zinc-500 flex justify-center items-center gap-2"
                        >
                            {isPending ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Authenticating...
                                </span>
                            ) : "Sign in"}
                        </button>
                    </form>

                    <div className="text-center animate-in fade-in duration-700 delay-300">
                        <p className="text-zinc-600 text-sm font-medium">
                            Don't have an account? <Link href="/contact" className="text-blue-500 hover:text-blue-400 transition-colors">Contact administrator</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}