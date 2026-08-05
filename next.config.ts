import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  allowedDevOrigins: [
    "preview-chat-b1b9dcba-380e-4c69-a07c-477ad7f5fd31.space-z.ai",
  ],
};

export default nextConfig;
