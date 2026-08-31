import type { Metadata } from "next";
import { siteConfig, sitePageUrl } from "@/lib/site-config";

export function buildPageMetadata(page: {
  path: string;
  title: string;
  description: string;
  ogTitle?: string;
}): Metadata {
  const url = sitePageUrl(page.path);
  return {
    title: {
      absolute: page.title,
    },
    description: page.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      url,
      title: page.ogTitle ?? page.title,
      description: page.description,
      locale: "en_CA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.ogTitle ?? page.title,
      description: page.description,
    },
    robots: siteConfig.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
