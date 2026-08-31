export const ANALYTICS_EVENTS = [
  "hero_cta_click",
  "form_start",
  "form_field_error",
  "form_submit_attempt",
  "generate_lead",
  "phone_click",
  "email_click",
  "document_download",
  "section_engagement",
] as const;

export type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[number];

const BLOCKED_KEYS = new Set([
  "firstName",
  "lastName",
  "email",
  "phone",
  "name",
  "comments",
  "message",
  "companyWebsite",
]);

export function sanitizeAnalyticsParams(
  params: Record<string, unknown> | undefined,
): Record<string, string | number | boolean> {
  if (!params) {
    return {};
  }
  const clean: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(params)) {
    if (BLOCKED_KEYS.has(key)) {
      continue;
    }
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      clean[key] = value;
    }
  }
  return clean;
}

export function leadConversionStorageKey(submissionId: string): string {
  return `five-oaks-lead:${submissionId}`;
}
