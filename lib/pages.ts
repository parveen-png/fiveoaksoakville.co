import type { FaqItem } from "@/lib/project-data";
import { copy, faqs, seo } from "@/lib/project-data";

export interface SiblingLink {
  href: string;
  label: string;
}

export interface PageContent {
  path: string;
  title: string;
  description: string;
  h1: string;
  answer: string;
  factExcerpt: string;
  factIds: readonly string[];
  faqs?: readonly FaqItem[];
  siblings: readonly SiblingLink[];
  breadcrumbName: string;
}

export const navLinks = [
  { href: "/", label: "Overview" },
  { href: "/homes", label: "Homes" },
  { href: "/location", label: "Location" },
  { href: "/pricing", label: "Pricing" },
  { href: "/floor-plans", label: "Plans" },
  { href: "/faqs", label: "FAQs" },
] as const;

export const sitemapPaths = [
  "/",
  "/location",
  "/homes",
  "/pricing",
  "/floor-plans",
  "/faqs",
  "/privacy",
  "/disclaimer",
] as const;

export const homePage: PageContent = {
  path: "/",
  title: seo.title,
  description: seo.description,
  h1: "Five Oaks Oakville",
  answer: copy.heroSupport,
  factExcerpt:
    "As of August 24, 2026, official Caivan materials confirm Five Oaks as a coming-soon Oakville community of single-detached homes and townhomes. Pricing, floor plans, deposits, incentives, the exact site, launch date and occupancy remain to be announced.",
  factIds: [
    "project",
    "developer",
    "location",
    "status",
    "home-types",
    "townhome-tenure",
    "pricing",
    "floor-plans",
    "deposit",
    "incentives",
    "launch-date",
    "occupancy",
  ],
  faqs: faqs.slice(0, 3),
  siblings: [
    { href: "/homes", label: "Homes at Five Oaks" },
    { href: "/location", label: "Where is Five Oaks" },
    { href: "/pricing", label: "Five Oaks prices" },
    { href: "/faqs", label: "Five Oaks FAQs" },
  ],
  breadcrumbName: "Five Oaks Oakville",
};

export const locationPage: PageContent = {
  path: "/location",
  title: "Where Is Five Oaks Located? Oakville Site TBA",
  description:
    "Five Oaks is in Oakville, Ontario. The exact address is to be announced. No commute or pin claims until Caivan publishes the site.",
  h1: "Where is Five Oaks located?",
  answer:
    "Five Oaks is located in Oakville, Ontario, Canada. Caivan Communities has confirmed the municipality, not a street, intersection or site plan. As of August 24, 2026, the exact address remains to be announced. This independent page does not invent a map pin, commute times or amenity proximity. Register to be notified when the official location is published.",
  factExcerpt:
    "Fact check, August 24, 2026: location is Oakville, Ontario (verified). Exact project site, address and intersection: to be announced. 209 Oak Park Blvd. is a general Caivan Oakville sales centre, not a confirmed Five Oaks pin.",
  factIds: ["location", "status", "project"],
  faqs: [faqs[1]],
  siblings: [
    { href: "/homes", label: "Homes" },
    { href: "/pricing", label: "Pricing" },
    { href: "/faqs", label: "FAQs" },
  ],
  breadcrumbName: "Location",
};

export const homesPage: PageContent = {
  path: "/homes",
  title: "Five Oaks Townhomes and Detached Homes | Oakville",
  description:
    "Five Oaks Oakville is planned with single-detached homes and townhomes. Models, lots and sizes are TBA. Register for verified updates.",
  h1: "Five Oaks townhomes and detached homes",
  answer:
    "Five Oaks by Caivan Communities is planned as single-detached homes and townhomes in Oakville, Ontario. Current project materials name detached elevations The Starling, The Merlin and The Sandhill, plus townhome elevations including the 24′ Collection, Advantage Townhomes and B2B. Those images are artist's concepts. Official floor plans, lot sizes, bedrooms and pricing remain to be announced. Caivan's Oakville overview indicates freehold townhomes; confirm tenure per release. Register for verified updates.",
  factExcerpt:
    "As of August 24, 2026: home types are single-detached and townhomes (verified). Townhome tenure is indicated as freehold on Caivan's Oakville overview. Named elevations shown here are artist's concepts. Floor plans, lots and sizes remain to be announced.",
  factIds: ["home-types", "townhome-tenure", "floor-plans"],
  faqs: [faqs[2], faqs[3]],
  siblings: [
    { href: "/floor-plans", label: "Floor plans" },
    { href: "/pricing", label: "Pricing" },
    { href: "/location", label: "Location" },
  ],
  breadcrumbName: "Homes",
};

export const pricingPage: PageContent = {
  path: "/pricing",
  title: "Five Oaks Oakville Prices | Official Cost Status",
  description:
    "Five Oaks Oakville prices are not published. No starting price, list or deposit schedule in official sources reviewed August 24, 2026. Register.",
  h1: "Five Oaks prices and cost",
  answer:
    "How much will Five Oaks cost? Official Five Oaks Oakville prices have not been published. The sources reviewed on August 24, 2026 did not include a starting price, price list, deposit schedule or advertised incentives. Undated third-party lists should not be treated as current. Register on this independent site to request the latest verified cost update when Caivan releases it.",
  factExcerpt:
    "August 24, 2026 excerpt: pricing is to be announced. Deposit structure is to be announced. Incentives: request the latest verified update. No invented starting prices appear on this page.",
  factIds: ["pricing", "deposit", "incentives"],
  faqs: [faqs[4], faqs[6], faqs[7]],
  siblings: [
    { href: "/homes", label: "Homes" },
    { href: "/floor-plans", label: "Floor plans" },
    { href: "/faqs", label: "FAQs" },
  ],
  breadcrumbName: "Pricing",
};

export const floorPlansPage: PageContent = {
  path: "/floor-plans",
  title: "Five Oaks Floor Plans | Oakville Plans Not Public",
  description:
    "Five Oaks floor plans are not published. Named elevation renderings are artist's concepts, not layouts. Register for official plan updates.",
  h1: "Five Oaks floor plans",
  answer:
    "Are Five Oaks floor plans available? Not yet. Interior layouts, bedroom counts and square footage have not been published. Artist's elevation renderings from current project materials appear on this page so you can see named collections. They are not floor plans, and homes as built may differ. This independent site does not invent unofficial layouts. Register when Caivan Communities releases official plans for the Oakville community.",
  factExcerpt:
    "August 24, 2026: floor plans are to be announced. Home types are confirmed as single-detached and townhomes. Bedroom, bathroom and square-footage details remain unpublished.",
  factIds: ["floor-plans", "home-types"],
  faqs: [faqs[5]],
  siblings: [
    { href: "/homes", label: "Homes" },
    { href: "/pricing", label: "Pricing" },
    { href: "/location", label: "Location" },
  ],
  breadcrumbName: "Floor plans",
};

export const faqsPage: PageContent = {
  path: "/faqs",
  title: "Five Oaks Oakville FAQs | Coming-Soon Answers",
  description:
    "Answers to common Five Oaks Oakville questions: location, homes, prices, floor plans, deposits, incentives, launch timing and how to register.",
  h1: "Five Oaks Oakville FAQs",
  answer:
    "These Five Oaks Oakville FAQs cover what is verified and what is still to be announced. Five Oaks is a coming-soon Caivan Communities project in Oakville, Ontario, Canada, planned with detached homes and townhomes. Pricing, plans, deposits, incentives, the exact site, launch date and occupancy were not in the official sources reviewed on August 24, 2026. Register to receive updates.",
  factExcerpt:
    "FAQ answers below match the dated fact ledger of August 24, 2026. Unpublished items are marked to be announced rather than estimated.",
  factIds: ["status", "pricing", "floor-plans", "launch-date"],
  faqs,
  siblings: [
    { href: "/location", label: "Location" },
    { href: "/homes", label: "Homes" },
    { href: "/pricing", label: "Pricing" },
  ],
  breadcrumbName: "FAQs",
};

export const privacyPageMeta = {
  path: "/privacy",
  title: "Privacy Policy | Five Oaks Oakville",
  description:
    "Privacy information for the independent Five Oaks Oakville project-information website.",
  h1: "Privacy Policy",
  breadcrumbName: "Privacy",
} as const;

export const disclaimerPageMeta = {
  path: "/disclaimer",
  title: "Disclaimer | Five Oaks Oakville",
  description:
    "Independent-site disclaimer for the Five Oaks Oakville project-information website.",
  h1: "Terms / Disclaimer",
  breadcrumbName: "Disclaimer",
} as const;

export const allMoneyPages = [
  homePage,
  locationPage,
  homesPage,
  pricingPage,
  floorPlansPage,
  faqsPage,
] as const;
