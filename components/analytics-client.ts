"use client";

import {
  leadConversionStorageKey,
  sanitizeAnalyticsParams,
  type AnalyticsEvent,
} from "@/lib/analytics";
import { siteConfig } from "@/lib/site-config";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(
  event: AnalyticsEvent,
  params?: Record<string, unknown>,
) {
  if (typeof window === "undefined") {
    return;
  }
  const payload = {
    ...sanitizeAnalyticsParams(params),
    landing_page_version: siteConfig.landingPageVersion,
    landing_page_variant: siteConfig.landingPageVariant,
  };
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...payload });
  if (typeof window.gtag === "function") {
    window.gtag("event", event, payload);
  }
}

export function trackGenerateLead(submissionId: string) {
  const key = leadConversionStorageKey(submissionId);
  try {
    if (sessionStorage.getItem(key) === "1") {
      return;
    }
    sessionStorage.setItem(key, "1");
  } catch {
    // Private browsing can block storage; still attempt a single event.
  }
  track("generate_lead", { submission_id: submissionId });
}
