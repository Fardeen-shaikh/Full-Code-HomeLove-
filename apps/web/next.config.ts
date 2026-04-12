import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      { protocol: "http", hostname: "localhost", port: "3001", pathname: "/**" },
      { protocol: "https", hostname: "homelove-platform-production.up.railway.app", pathname: "/**" },
      { protocol: "https", hostname: "homelove.com.my", pathname: "/**" },
      { protocol: "https", hostname: "www.homelove.com.my", pathname: "/**" },
    ],
  },
};

export default nextConfig;
