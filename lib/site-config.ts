import { LANDING_PAGE_VERSION } from "@/lib/project-data";

const PLACEHOLDERS = {
  domain: "[DOMAIN]",
  publisherLegalName: "[PUBLISHER_LEGAL_NAME]",
  brokerageLegalName: "[BROKERAGE_LEGAL_NAME_IF_APPLICABLE]",
  recoAgentName: "[RECO_REGISTERED_AGENT_NAME_IF_APPLICABLE]",
  agentDesignation: "[AGENT_DESIGNATION_IF_APPLICABLE]",
  publisherAddress: "[PUBLISHER_ADDRESS]",
  publisherPhone: "[PUBLISHER_PHONE]",
  publisherEmail: "[PUBLISHER_EMAIL]",
  privacyPolicyUrl: "[PRIVACY_POLICY_URL]",
  crmOrWebhookProvider: "[CRM_OR_WEBHOOK_PROVIDER]",
  leadDestination: "[LEAD_DESTINATION]",
  acknowledgementEmailProvider: "[ACKNOWLEDGEMENT_EMAIL_PROVIDER]",
  analyticsMeasurementId: "[ANALYTICS_MEASUREMENT_ID]",
} as const;

function readPublic(name: string): string | undefined {
  const value = process.env[name];
  if (!value) {
    return undefined;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function withPlaceholder(name: string, placeholder: string): string {
  return readPublic(name) ?? placeholder;
}

function isPlaceholder(value: string): boolean {
  return value.startsWith("[") && value.endsWith("]");
}

const configuredSiteUrl = readPublic("NEXT_PUBLIC_SITE_URL");

function isPublicCanonical(url: string | undefined): boolean {
  if (!url) {
    return false;
  }
  try {
    const parsed = new URL(url);
    return (
      parsed.protocol === "https:" &&
      parsed.hostname !== "localhost" &&
      !parsed.hostname.endsWith(".local")
    );
  } catch {
    return false;
  }
}

function resolveSiteUrl(): string {
  if (!configuredSiteUrl) {
    return "http://localhost:3000";
  }
  try {
    return new URL(configuredSiteUrl).origin;
  } catch {
    return "http://localhost:3000";
  }
}

export const siteConfig = {
  siteUrl: resolveSiteUrl(),
  domainDisplay: withPlaceholder("NEXT_PUBLIC_SITE_DOMAIN", PLACEHOLDERS.domain),
  siteUrlConfigured: isPublicCanonical(configuredSiteUrl),
  publisherLegalName: withPlaceholder(
    "NEXT_PUBLIC_PUBLISHER_LEGAL_NAME",
    PLACEHOLDERS.publisherLegalName,
  ),
  brokerageLegalName: withPlaceholder(
    "NEXT_PUBLIC_BROKERAGE_LEGAL_NAME",
    PLACEHOLDERS.brokerageLegalName,
  ),
  recoAgentName: withPlaceholder(
    "NEXT_PUBLIC_RECO_REGISTERED_AGENT_NAME",
    PLACEHOLDERS.recoAgentName,
  ),
  agentDesignation: withPlaceholder(
    "NEXT_PUBLIC_AGENT_DESIGNATION",
    PLACEHOLDERS.agentDesignation,
  ),
  publisherAddress: withPlaceholder(
    "NEXT_PUBLIC_PUBLISHER_ADDRESS",
    PLACEHOLDERS.publisherAddress,
  ),
  publisherPhone: withPlaceholder(
    "NEXT_PUBLIC_PUBLISHER_PHONE",
    PLACEHOLDERS.publisherPhone,
  ),
  publisherEmail: withPlaceholder(
    "NEXT_PUBLIC_PUBLISHER_EMAIL",
    PLACEHOLDERS.publisherEmail,
  ),
  privacyPolicyPath: "/privacy",
  privacyPolicyUrl: withPlaceholder(
    "NEXT_PUBLIC_PRIVACY_POLICY_URL",
    "/privacy",
  ),
  crmOrWebhookProvider: withPlaceholder(
    "NEXT_PUBLIC_CRM_OR_WEBHOOK_PROVIDER",
    PLACEHOLDERS.crmOrWebhookProvider,
  ),
  leadDestination: withPlaceholder(
    "NEXT_PUBLIC_LEAD_DESTINATION",
    PLACEHOLDERS.leadDestination,
  ),
  acknowledgementEmailProvider: withPlaceholder(
    "NEXT_PUBLIC_ACKNOWLEDGEMENT_EMAIL_PROVIDER",
    PLACEHOLDERS.acknowledgementEmailProvider,
  ),
  analyticsMeasurementId: readPublic("NEXT_PUBLIC_ANALYTICS_MEASUREMENT_ID"),
  landingPageVersion: LANDING_PAGE_VERSION,
  landingPageVariant:
    readPublic("NEXT_PUBLIC_LANDING_PAGE_VARIANT") ?? "co-oakville-2026-08",
  allowFbclid: readPublic("NEXT_PUBLIC_ALLOW_FBCLID") === "true",
  verifiedProjectCoordinates: readPublic(
    "NEXT_PUBLIC_VERIFIED_PROJECT_COORDINATES",
  ),
  noindex:
    readPublic("NEXT_PUBLIC_NOINDEX") === "true" ||
    !isPublicCanonical(configuredSiteUrl),
  placeholders: PLACEHOLDERS,
} as const;

/** Absolute URL for a site path. The homepage always includes a trailing slash. */
export function sitePageUrl(pathname: string = "/"): string {
  if (pathname === "/" || pathname === "") {
    return `${siteConfig.siteUrl}/`;
  }
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${siteConfig.siteUrl}${path}`;
}

export function consentWording(publisherLegalName: string): string {
  return `Yes, I would like to receive project updates and other commercial electronic messages from ${publisherLegalName}. I understand I can unsubscribe at any time.`;
}

export function identityIsPlaceholder(value: string): boolean {
  return isPlaceholder(value);
}

export const launchBlockers = [
  {
    id: "domain",
    label: "Canonical domain",
    configured: siteConfig.siteUrlConfigured,
  },
  {
    id: "publisher",
    label: "Publisher legal name",
    configured: !isPlaceholder(siteConfig.publisherLegalName),
  },
  {
    id: "address",
    label: "Publisher address",
    configured: !isPlaceholder(siteConfig.publisherAddress),
  },
  {
    id: "email",
    label: "Publisher email",
    configured: !isPlaceholder(siteConfig.publisherEmail),
  },
  {
    id: "privacy",
    label: "Privacy policy URL",
    configured:
      !isPlaceholder(siteConfig.privacyPolicyUrl) &&
      Boolean(readPublic("NEXT_PUBLIC_PRIVACY_POLICY_URL")),
  },
] as const;
