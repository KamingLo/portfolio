import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import LenisProvider from "@/components/layouts/lenis-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://kaminglo.com"),
  title: {
    default: "Kaming Lo | Web Developer Portfolio",
    template: "%s | Kaming Lo",
  },
  description: "Portfolio of Kaming Lo, a modern software engineer and web developer specializing in Next.js, React, and building scalable digital solutions.",
  keywords: [
    "Kaming Lo",
    "Kaming Portfolio",
    "Web Developer Indonesia",
    "Next.js Developer",
    "Software Engineer Portfolio",
    "Fullstack Developer",
    "Prisma Supabase Portfolio"
  ],
  authors: [{ name: "Kaming Lo", url: "https://github.com/kaminglo" }],
  creator: "Kaming Lo",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://kaminglo.com",
    title: "Kaming Lo | Web Developer Portfolio",
    description: "Portfolio of Kaming Lo, a modern software engineer and web developer specializing in Next.js, React, and building scalable digital solutions.",
    siteName: "Kaming Lo Portfolio",
    images: [
      {
        url: "/assets/image/kaming.webp",
        width: 1200,
        height: 630,
        alt: "Kaming Lo Portfolio Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaming Lo | Web Developer Portfolio",
    description: "Portfolio of Kaming Lo, a modern software engineer and web developer specializing in Next.js, React, and building scalable digital solutions.",
    images: ["/assets/image/kaming.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
