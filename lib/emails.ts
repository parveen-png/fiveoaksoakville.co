import { CONSENT_TEXT_VERSION, project } from "@/lib/project-data";
import { siteConfig } from "@/lib/site-config";
import type { CapturedLead } from "@/lib/leads-types";

export function acknowledgementEmail(lead: CapturedLead): {
  subject: string;
  text: string;
  html: string;
} {
  const privacyUrl = siteConfig.privacyPolicyUrl.startsWith("http")
    ? siteConfig.privacyPolicyUrl
    : `${siteConfig.siteUrl}${siteConfig.privacyPolicyPath}`;
  const subject = "Five Oaks update request received";
  const text = [
    `Hello ${lead.firstName},`,
    "",
    "Thank you. This independent Five Oaks informational website has received your request for project updates.",
    "",
    `Five Oaks by ${project.developer} is a coming-soon community in ${project.municipality}. Official pricing, floor plans, deposit details, incentives, exact location, launch timing and occupancy information remain limited as of the sources reviewed for this website.`,
    "",
    "We will share verified updates using the contact information you provided, according to your consent and communication preferences. This message confirms receipt of your request only. It does not include prices, floor plans or other project documents.",
    "",
    lead.marketingConsent
      ? "You opted in to receive project updates and other commercial electronic messages. You can unsubscribe at any time using the link in those messages or by contacting us."
      : "You did not opt in to commercial electronic messages. We will use your information to respond to this update request. We will not send ongoing promotional messages unless you later provide consent.",
    "",
    `Privacy information: ${privacyUrl}`,
    "",
    "This message is from the independent operator of this informational website. It is not from Caivan Communities.",
  ].join("\n");

  const html = `
    <p>Hello ${escapeHtml(lead.firstName)},</p>
    <p>Thank you. This independent Five Oaks informational website has received your request for project updates.</p>
    <p>Five Oaks by ${escapeHtml(project.developer)} is a coming-soon community in ${escapeHtml(project.municipality)}. Official pricing, floor plans, deposit details, incentives, exact location, launch timing and occupancy information remain limited as of the sources reviewed for this website.</p>
    <p>We will share verified updates using the contact information you provided, according to your consent and communication preferences. This message confirms receipt of your request only. It does not include prices, floor plans or other project documents.</p>
    <p>${
      lead.marketingConsent
        ? "You opted in to receive project updates and other commercial electronic messages. You can unsubscribe at any time using the link in those messages or by contacting us."
        : "You did not opt in to commercial electronic messages. We will use your information to respond to this update request. We will not send ongoing promotional messages unless you later provide consent."
    }</p>
    <p><a href="${escapeHtml(privacyUrl)}">Privacy information</a></p>
    <p>This message is from the independent operator of this informational website. It is not from Caivan Communities.</p>
  `;

  return { subject, text, html };
}

export function internalLeadEmail(lead: CapturedLead): {
  subject: string;
  text: string;
  html: string;
} {
  const subject = "New Five Oaks project-update lead";
  const rows: Array<[string, string]> = [
    ["Submission timestamp", lead.submittedAt],
    ["First name", lead.firstName],
    ["Last name", lead.lastName],
    ["Email", lead.email],
    ["Phone", lead.phone || "(not supplied)"],
    ["Product interest", lead.productInterest],
    ["Buyer timing", lead.buyerTiming || "(not supplied)"],
    ["Marketing consent", lead.marketingConsent ? "Yes" : "No"],
    ["Consent timestamp", lead.consentTimestamp || "(n/a)"],
    ["Consent text version", CONSENT_TEXT_VERSION],
    ["UTM source", lead.attribution.utmSource || "(none)"],
    ["UTM medium", lead.attribution.utmMedium || "(none)"],
    ["UTM campaign", lead.attribution.utmCampaign || "(none)"],
    ["UTM term", lead.attribution.utmTerm || "(none)"],
    ["UTM content", lead.attribution.utmContent || "(none)"],
    ["Referrer", lead.attribution.referrer || "(none)"],
    ["Landing-page URL", lead.attribution.landingPageUrl || "(none)"],
    ["Landing-page variant", lead.attribution.landingPageVariant || "(none)"],
    ["Landing-page version", lead.attribution.landingPageVersion],
    ["Form version", lead.attribution.formVersion],
    ["Submission ID", lead.submissionId],
  ];
  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  const html = `
    <table>
      ${rows
        .map(
          ([label, value]) =>
            `<tr><th align="left">${escapeHtml(label)}</th><td>${escapeHtml(value)}</td></tr>`,
        )
        .join("")}
    </table>
  `;
  return { subject, text, html };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
