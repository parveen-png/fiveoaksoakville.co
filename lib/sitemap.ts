import type { MetadataRoute } from "next";
import { sitemapPaths } from "@/lib/pages";
import { INFORMATION_CHECKED_ISO } from "@/lib/project-data";
import { sitePageUrl } from "@/lib/site-config";

export function sitemapEntries(): MetadataRoute.Sitemap {
  return sitemapPaths.map((path) => ({
    url: sitePageUrl(path),
    lastModified: INFORMATION_CHECKED_ISO,
    changeFrequency:
      path === "/"
        ? "weekly"
        : path === "/privacy" || path === "/disclaimer"
          ? "yearly"
          : "monthly",
    priority: path === "/" ? 1 : path === "/privacy" || path === "/disclaimer" ? 0.3 : 0.8,
  }));
}

function xmlEscape(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function buildSitemapXml(): string {
  const urls = sitemapEntries()
    .map((entry) => {
      const lastmod =
        entry.lastModified instanceof Date
          ? entry.lastModified.toISOString()
          : entry.lastModified;
      return `  <url>
    <loc>${xmlEscape(entry.url)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${Number(entry.priority).toFixed(1)}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}
