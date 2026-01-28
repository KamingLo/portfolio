"use client";
import { useActionState, useState } from "react";
import { loginAction } from "@/actions/auth/login";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [state, action, isPending] = useActionState(loginAction, undefined);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <form action={action} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center text-black">Login</h2>
                
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    className="border border-gray-300 p-2.5 mb-4 w-full rounded text-black focus:ring-2 focus:ring-blue-500 outline-none"
                />

                <div className="mb-4 relative">
                    <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        required
                        className="border border-gray-300 p-2.5 w-full rounded text-black focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    
                    {/* 2. Gunakan Icon Lucide di sini */}
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-blue-600 transition-colors"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? (
                            <EyeOff size={20} strokeWidth={2.5} />
                        ) : (
                            <Eye size={20} strokeWidth={2.5} />
                        )}
                    </button>
                </div>

                {state?.message && (
                    <p className="text-red-500 text-sm text-center mb-4 font-medium">
                        {state.message}
                    </p>
                )}

                <button 
                    type="submit" 
                    disabled={isPending}
                    className="bg-blue-600 text-white p-2.5 rounded w-full font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 flex justify-center items-center gap-2"
                >
                    {isPending ? "Sedang Masuk..." : "Login"}
                </button>
            </form>
        </div>
    );
}