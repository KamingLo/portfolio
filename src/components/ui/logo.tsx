import Image from "next/image";

export const Logo = () => {
    return (
        <div className="flex items-center gap-3">
            <Image
                src="/assets/image/logo-black.svg"
                alt="Logo"
                width={40}
                height={40}
                priority
            />
            <span className="text-zinc-900 font-semibold text-lg tracking-tight">Kaming</span>
        </div>
    )
}