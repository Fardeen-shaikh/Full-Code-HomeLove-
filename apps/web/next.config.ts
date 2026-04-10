import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      { hostname: "localhost" },
      { hostname: "homelove-platform-production.up.railway.app" },
      { hostname: "homelove.com.my" },
      { hostname: "www.homelove.com.my" },
    ],
  },
};

export default nextConfig;
