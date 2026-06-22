import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    allowedDevOrigins: ["0.0.0.0", "192.168.1.10", "192.168.1.3"],
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol:'https',
        hostname:'eccbaslanarjjbpudutj.supabase.co',
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
