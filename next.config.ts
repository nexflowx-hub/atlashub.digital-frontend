import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Vercel handles output automatically */
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
