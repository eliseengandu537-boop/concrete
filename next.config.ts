import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: { unoptimized: true },
  devIndicators: false,
  turbopack: { root: process.cwd() },
};

export default nextConfig;
