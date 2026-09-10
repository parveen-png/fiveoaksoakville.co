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
        source: "/",
        headers: securityHeaders(),
      },
      {
        source: "/((?!sitemap\\.xml$|robots\\.txt$).*)",
        headers: securityHeaders(),
      },
      {
        source: "/sitemap.xml",
        headers: [
          { key: "Content-Type", value: "application/xml; charset=utf-8" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
        ],
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
