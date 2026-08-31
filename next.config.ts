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
        has: [{ type: "host", value: "fiveoaksoakville.co" }],
        destination: "https://www.fiveoaksoakville.co/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
