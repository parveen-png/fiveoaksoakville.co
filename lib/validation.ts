import { z } from "zod";
import {
  buyerTimingOptions,
  CONSENT_TEXT_VERSION,
  FORM_VERSION,
  LANDING_PAGE_VERSION,
  productInterestOptions,
  userMessages,
} from "@/lib/project-data";

const productInterestValues = productInterestOptions.map(
  (option) => option.value,
) as [string, ...string[]];
const buyerTimingValues = buyerTimingOptions.map((option) => option.value) as [
  string,
  ...string[],
];

const nameSchema = (message: string) =>
  z
    .string()
    .trim()
    .min(1, message)
    .max(80, message)
    .regex(/^[\p{L}\p{M}\s.'-]{1,80}$/u, message);

export const attributionSchema = z.object({
  landingPageUrl: z.string().trim().max(2000).optional().default(""),
  landingPageVersion: z.string().trim().max(40).optional().default(LANDING_PAGE_VERSION),
  referrer: z.string().trim().max(2000).optional().default(""),
  utmSource: z.string().trim().max(200).optional().default(""),
  utmMedium: z.string().trim().max(200).optional().default(""),
  utmCampaign: z.string().trim().max(200).optional().default(""),
  utmTerm: z.string().trim().max(200).optional().default(""),
  utmContent: z.string().trim().max(200).optional().default(""),
  gclid: z.string().trim().max(200).optional().default(""),
  gbraid: z.string().trim().max(200).optional().default(""),
  wbraid: z.string().trim().max(200).optional().default(""),
  fbclid: z.string().trim().max(200).optional().default(""),
  formVersion: z.string().trim().max(40).optional().default(FORM_VERSION),
  consentTextVersion: z
    .string()
    .trim()
    .max(40)
    .optional()
    .default(CONSENT_TEXT_VERSION),
  browserTimezone: z.string().trim().max(80).optional().default(""),
  landingPageVariant: z.string().trim().max(80).optional().default(""),
});

export const leadInputSchema = z.object({
  firstName: nameSchema(userMessages.firstName),
  lastName: nameSchema(userMessages.lastName),
  email: z.email({ error: userMessages.email }),
  phone: z
    .string()
    .trim()
    .max(30)
    .optional()
    .default("")
    .refine(
      (value) => value === "" || /^[+]?[\d\s().-]{7,20}$/.test(value),
      userMessages.phone,
    ),
  productInterest: z.enum(productInterestValues, {
    error: userMessages.productInterest,
  }),
  buyerTiming: z.preprocess(
    (value) => (value === "" || value === null ? undefined : value),
    z.enum(buyerTimingValues).optional(),
  ),
  marketingConsent: z.boolean(),
  companyWebsite: z.string().max(200).optional().default(""),
  idempotencyKey: z.string().uuid().optional(),
  attribution: z.preprocess(
    (value) => value ?? {},
    attributionSchema,
  ),
});

export type LeadInput = z.infer<typeof leadInputSchema>;
export type Attribution = z.infer<typeof attributionSchema>;

export interface FieldError {
  field: string;
  message: string;
}

export function flattenLeadErrors(error: z.ZodError): FieldError[] {
  const seen = new Set<string>();
  const unique: FieldError[] = [];
  for (const issue of error.issues) {
    const field = issue.path[0] ? String(issue.path[0]) : "form";
    if (seen.has(field)) {
      continue;
    }
    seen.add(field);
    unique.push({ field, message: issue.message });
  }
  return unique;
}

export function normalizePhone(phone: string): string {
  return phone.replace(/[^\d+]/g, "");
}
