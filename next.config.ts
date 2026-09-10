import type { NextConfig } from "next";
import { securityHeaders } from "./lib/security";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ewzutahmskuhbsalpygn.supabase.co",
      },
    ],
  },
  turbopack: {
    root: process.cwd(),
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders(),
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "fiveoakbycaivan.com" }],
        destination: "https://www.fiveoakbycaivan.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "fiveoaksoakville.co" }],
        destination: "https://www.fiveoakbycaivan.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.fiveoaksoakville.co" }],
        destination: "https://www.fiveoakbycaivan.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
