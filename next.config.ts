import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      { hostname: "images.pexels.com" },
      { hostname: "ydcrinvaenahrvntitoi.supabase.co" },
    ],
  },
};

export default nextConfig;
