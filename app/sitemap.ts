import type { MetadataRoute } from "next";
import { sitemapPaths } from "@/lib/pages";
import { sitePageUrl } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-24T00:00:00.000Z");
  return sitemapPaths.map((path) => ({
    url: sitePageUrl(path),
    lastModified,
    changeFrequency: path === "/" ? "weekly" : path === "/privacy" || path === "/disclaimer" ? "yearly" : "monthly",
    priority: path === "/" ? 1 : path === "/privacy" || path === "/disclaimer" ? 0.3 : 0.8,
  }));
}
