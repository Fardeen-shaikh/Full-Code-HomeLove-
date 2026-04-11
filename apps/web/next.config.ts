import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      { hostname: "localhost" },
      { hostname: "homelove-platform-production.up.railway.app" },
      { hostname: "homelove.com.my" },
      { hostname: "www.homelove.com.my" },
    ],
  },
};

export default nextConfig;
