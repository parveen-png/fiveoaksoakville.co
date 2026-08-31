import type { Attribution } from "@/lib/validation";

export interface CapturedLead {
  submissionId: string;
  submittedAt: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  productInterest: string;
  buyerTiming?: string;
  marketingConsent: boolean;
  consentTimestamp: string;
  attribution: Attribution;
}

export interface LeadDeliveryResult {
  captured: boolean;
  alreadyRecorded: boolean;
  submissionId: string;
  destination: string;
}
