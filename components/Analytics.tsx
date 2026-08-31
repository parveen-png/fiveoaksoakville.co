"use client";

import Script from "next/script";
import { siteConfig } from "@/lib/site-config";

export function Analytics() {
  const measurementId = siteConfig.analyticsMeasurementId;
  if (!measurementId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-setup" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', { anonymize_ip: true, send_page_view: true });
        `}
      </Script>
    </>
  );
}
