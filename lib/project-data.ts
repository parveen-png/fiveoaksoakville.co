export const LANDING_PAGE_VERSION = "1.0.0";
export const FORM_VERSION = "1.0.0";
export const CONSENT_TEXT_VERSION = "1.0.0";
export const INFORMATION_CHECKED_ISO = "2026-08-24";
export const INFORMATION_CHECKED_DISPLAY = "August 24, 2026";

export type FactStatus = "VERIFIED" | "PROVISIONAL" | "CONFLICTING" | "TBA";

export type DisplayBehavior = "value" | "tba" | "request-update";

export interface ProjectFact {
  id: string;
  item: string;
  value: string;
  sourceLabel: string;
  sourceUrl?: string;
  checked: string;
  status: FactStatus;
  displayBehavior: DisplayBehavior;
}

export interface SourceConflict {
  topic: string;
  officialValue: string;
  conflictingValue: string;
  resolution: string;
}

export const project = {
  name: "Five Oaks",
  developer: "Caivan Communities",
  municipality: "Oakville, Ontario",
  municipalityShort: "Oakville",
  country: "Canada",
  status: "Coming Soon",
  homeTypes: "Single-detached homes and townhomes",
  primaryCta: "Get Project Updates",
  officialProjectUrl:
    "https://caivan.com/greater-toronto-area/oakville/five-oaks/",
  officialOakvilleCommunitiesUrl:
    "https://caivan.com/greater-toronto-area/oakville/",
  officialCaivanHomeUrl: "https://caivan.com/",
  officialContactUrl: "https://caivan.com/contact/",
  generalSalesCentre: {
    address: "209 Oak Park Blvd., Oakville, Ontario L6H 7S8",
    phone: "289-430-0627",
    note: "General Caivan Oakville Sales Centre contact only. This is not confirmed as the Five Oaks project site or a project-specific sales office.",
  },
} as const;

export const facts: readonly ProjectFact[] = [
  {
    id: "project",
    item: "Project",
    value: "Five Oaks",
    sourceLabel: "Official Five Oaks page",
    sourceUrl: "https://caivan.com/greater-toronto-area/oakville/five-oaks/",
    checked: INFORMATION_CHECKED_ISO,
    status: "VERIFIED",
    displayBehavior: "value",
  },
  {
    id: "developer",
    item: "Developer",
    value: "Caivan Communities",
    sourceLabel: "Official Five Oaks page",
    sourceUrl: "https://caivan.com/greater-toronto-area/oakville/five-oaks/",
    checked: INFORMATION_CHECKED_ISO,
    status: "VERIFIED",
    displayBehavior: "value",
  },
  {
    id: "location",
    item: "Location",
    value: "Oakville, Ontario",
    sourceLabel: "Official Five Oaks page",
    sourceUrl: "https://caivan.com/greater-toronto-area/oakville/five-oaks/",
    checked: INFORMATION_CHECKED_ISO,
    status: "VERIFIED",
    displayBehavior: "value",
  },
  {
    id: "status",
    item: "Status",
    value: "Coming Soon",
    sourceLabel: "Official Oakville communities page",
    sourceUrl: "https://caivan.com/greater-toronto-area/oakville/",
    checked: INFORMATION_CHECKED_ISO,
    status: "VERIFIED",
    displayBehavior: "value",
  },
  {
    id: "home-types",
    item: "Home types",
    value: "Single-detached homes and townhomes",
    sourceLabel: "Official Five Oaks page",
    sourceUrl: "https://caivan.com/greater-toronto-area/oakville/five-oaks/",
    checked: INFORMATION_CHECKED_ISO,
    status: "VERIFIED",
    displayBehavior: "value",
  },
  {
    id: "townhome-tenure",
    item: "Townhome tenure",
    value: "Freehold townhomes indicated by Caivan",
    sourceLabel: "Official Oakville communities page",
    sourceUrl: "https://caivan.com/greater-toronto-area/oakville/",
    checked: INFORMATION_CHECKED_ISO,
    status: "VERIFIED",
    displayBehavior: "value",
  },
  {
    id: "pricing",
    item: "Pricing",
    value: "Not published in reviewed official Five Oaks material",
    sourceLabel: "Official project materials reviewed",
    checked: INFORMATION_CHECKED_ISO,
    status: "TBA",
    displayBehavior: "tba",
  },
  {
    id: "floor-plans",
    item: "Floor plans",
    value: "Not published",
    sourceLabel: "Official project materials reviewed",
    checked: INFORMATION_CHECKED_ISO,
    status: "TBA",
    displayBehavior: "tba",
  },
  {
    id: "deposit",
    item: "Deposit structure",
    value: "Not published",
    sourceLabel: "Official project materials reviewed",
    checked: INFORMATION_CHECKED_ISO,
    status: "TBA",
    displayBehavior: "tba",
  },
  {
    id: "incentives",
    item: "Incentives",
    value: "No Five Oaks-specific incentives confirmed",
    sourceLabel: "Official project materials reviewed",
    checked: INFORMATION_CHECKED_ISO,
    status: "TBA",
    displayBehavior: "request-update",
  },
  {
    id: "launch-date",
    item: "Launch date",
    value: "Not published",
    sourceLabel: "Official project materials reviewed",
    checked: INFORMATION_CHECKED_ISO,
    status: "TBA",
    displayBehavior: "tba",
  },
  {
    id: "occupancy",
    item: "Occupancy",
    value: "Not published",
    sourceLabel: "Official project materials reviewed",
    checked: INFORMATION_CHECKED_ISO,
    status: "TBA",
    displayBehavior: "tba",
  },
  {
    id: "information-checked",
    item: "Information checked",
    value: INFORMATION_CHECKED_DISPLAY,
    sourceLabel: "This page's fact ledger",
    checked: INFORMATION_CHECKED_ISO,
    status: "VERIFIED",
    displayBehavior: "value",
  },
] as const;

export const tbaProjectItems = [
  "Exact project site/address/intersection",
  "Official site plan",
  "Number of lots/homes",
  "Lot widths",
  "Home sizes",
  "Bedroom/bathroom configurations",
  "Elevations",
  "Detailed features and finishes",
  "Price list",
  "Starting prices",
  "Deposit schedule",
  "Incentives",
  "Release dates",
  "Sales launch date",
  "Occupancy/closing dates",
  "Assignment rules",
  "Development charges",
  "Parking details",
  "Official floor plans",
  "Any claims of limited inventory or scarcity",
] as const;

export const sourceConflicts: readonly SourceConflict[] = [];

export function displayFactValue(fact: ProjectFact): string {
  if (fact.displayBehavior === "tba") {
    return "To be announced";
  }
  if (fact.displayBehavior === "request-update") {
    return "Request the latest verified update";
  }
  return fact.value;
}

export function getFact(id: string): ProjectFact {
  const fact = facts.find((entry) => entry.id === id);
  if (!fact) {
    throw new Error(`Unknown project fact: ${id}`);
  }
  return fact;
}

export const copy = {
  independentDisclosure:
    "Independent project information site. Not the official website of Caivan Communities or Five Oaks.",
  legalFooterDisclosure:
    "This is an independent informational website and is not the official website of the developer, builder or project. Project details, prices, incentives, specifications and availability are subject to change without notice. Renderings are artists' concepts where applicable. This is not an offering for sale. Any offering may be made only through the developer's official documents and applicable purchase agreement. E.&O.E.",
  legalReviewFlag:
    "This disclosure is flagged for final Ontario legal/brokerage compliance review before launch.",
  imageQualifier: "Neighbourhood imagery for illustration only.",
  renderingQualifier: "Artist's rendering. Homes as built may differ.",
  factsExplanation:
    "Pre-construction details can change. Time-sensitive items on these pages should be checked against current developer materials before you rely on them.",
  pricingLead:
    "Official Five Oaks pricing has not yet been published in the sources reviewed for this page.",
  pricingCaution:
    "Avoid relying on undated third-party price lists. Pre-construction pricing, incentives and deposit structures can change between releases.",
  locationLead:
    "Five Oaks is confirmed for Oakville, Ontario, while the exact project address or intersection remains to be announced in the official Five Oaks material reviewed for this page. Until that location is confirmed, proximity and travel-time claims should not be presented as project-specific facts.",
  oakvilleContext:
    "Oakville is a Greater Toronto Area town on Lake Ontario, with parks, trails, Oakville Transit, GO Transit Lakeshore West service, and major transportation corridors. Those are town-level facts. They are not a substitute for a confirmed Five Oaks pin.",
  oakvilleSafeFacts: [
    "Oakville is within the Greater Toronto Area.",
    "Oakville is on Lake Ontario.",
    "Oakville has an established parks and trails network.",
    "Oakville has municipal transit (Oakville Transit).",
    "Oakville connects with GO Transit's Lakeshore West service.",
    "Major transportation corridors serve Oakville.",
  ],
  developerSummary:
    "Caivan describes itself as a multidisciplinary homebuilding team focused on home design, construction quality and the homeowner experience. Its public materials also describe the use of Advanced Building Innovation Company technologies and manufacturing processes in its approach to homebuilding.",
  developerCaution:
    "Features, construction methods and specifications shown in other Caivan communities should not be assumed for Five Oaks until they are confirmed in official Five Oaks documents.",
  lawyerReview:
    "Have your lawyer review the Agreement of Purchase and Sale and all schedules before applicable deadlines.",
  checklistIntro:
    "This checklist is general buyer due-diligence information, not individualized legal or financial advice.",
  heroSupport:
    "Coming soon from Caivan. Detached homes and townhomes. Register for verified updates.",
  formSupport:
    "Ask to be notified when official Five Oaks Oakville pricing, floor plans, deposit information and launch details are published.",
  formTrust: [
    "Source-checked project facts, dated August 24, 2026.",
    "Notified when official pricing and floor plans are published.",
    "No fabricated prices, unit counts or launch dates.",
    "Marketing messages only if you opt in.",
  ],
  finalCta:
    "Five Oaks is coming to Oakville with single-detached homes and townhomes. Register now so you can review verified pricing, plans and launch details as soon as they are published.",
  mapUnavailable:
    "A project map is not shown because verified Five Oaks coordinates have not been supplied. This placeholder will remain disabled until official project coordinates are confirmed.",
  privacyNearSubmit:
    "By submitting this form, you acknowledge the Privacy Policy and understand that your information will be used to respond to your request. Marketing messages are sent only in accordance with the consent choices shown above.",
} as const;

export const heroChips = [
  "Coming Soon",
  "Oakville, Ontario",
  "Detached Homes",
  "Townhomes",
] as const;

export const registrationBenefits = [
  "Notification when verified Five Oaks details are released.",
  "Updates when official pricing information becomes available.",
  "Updates when official floor plans become available.",
  "Updates regarding deposit structures and launch information when confirmed.",
  "Important changes to verified project information.",
] as const;

export const homeCollection = [
  {
    id: "detached",
    title: "Single-detached homes",
    copy: "Named detached elevations from current project materials include The Starling (40′), The Merlin (42′) and The Sandhill (50′). Those images are artist's concepts. Floor plans, lots, sizes and pricing remain to be announced.",
    status: "Details to be announced",
    imageId: "starling40" as const,
  },
  {
    id: "townhomes",
    title: "Townhomes",
    copy: "Named townhome elevations from current project materials include the 24′ Collection, Advantage Townhomes and back-to-back (B2B). Those images are artist's concepts. Confirm tenure on the official release. Floor plans and pricing remain to be announced.",
    status: "Details to be announced",
    imageId: "advantageTowns" as const,
  },
] as const;

export const pricingStatusItems = [
  { label: "Starting price", factId: "pricing" },
  { label: "Price list", factId: "pricing" },
  { label: "Deposit structure", factId: "deposit" },
  { label: "Current incentives", factId: "incentives" },
  { label: "Launch date", factId: "launch-date" },
  { label: "Occupancy", factId: "occupancy" },
] as const;

export const buyerChecklist = [
  "Final home model and lot.",
  "Purchase price.",
  "Deposit amount and payment dates.",
  "Included features and finishes.",
  "Upgrade costs.",
  "Development and closing adjustments.",
  "Tentative closing dates.",
  "Assignment provisions.",
  "Tarion/New Home Warranty documentation where applicable.",
  "Legal review of the Agreement of Purchase and Sale.",
] as const;

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: readonly FaqItem[] = [
  {
    question: "What is Five Oaks by Caivan?",
    answer:
      "Five Oaks is a coming-soon Caivan Communities new-home community in Oakville, Ontario, planned to include single-detached homes and townhomes. Official pricing, floor plans, deposits, incentives, exact location, launch timing and occupancy details had not been published in the official sources reviewed on August 24, 2026.",
  },
  {
    question: "Where is Five Oaks located?",
    answer:
      "Five Oaks is confirmed for Oakville, Ontario. The exact project address or intersection has not been confirmed in the official Five Oaks sources reviewed on August 24, 2026. Until that location is published, this page does not present commute times or amenity proximity as project-specific facts.",
  },
  {
    question: "What types of homes are planned at Five Oaks?",
    answer:
      "Caivan has identified single-detached homes and townhomes for Five Oaks. Additional model and lot details are still to be announced.",
  },
  {
    question: "Are the Five Oaks townhomes freehold?",
    answer:
      "Caivan's Oakville community overview identifies Five Oaks as including freehold townhomes. Buyers should confirm tenure for their specific release and home before purchasing.",
  },
  {
    question: "How much will homes at Five Oaks cost?",
    answer:
      "Official Five Oaks pricing has not yet been published in the official sources reviewed for this page. Register for updates rather than relying on speculative or undated third-party price lists.",
  },
  {
    question: "Are Five Oaks floor plans available?",
    answer:
      "Official Five Oaks floor plans have not yet been published in the reviewed project material. Register to be notified when official plans are released.",
  },
  {
    question: "What is the Five Oaks deposit structure?",
    answer:
      "The Five Oaks deposit schedule has not yet been confirmed in the reviewed official project material. Deposit amounts and payment dates should be confirmed in official documents before any purchase decision.",
  },
  {
    question: "Are there incentives for Five Oaks?",
    answer:
      "No current Five Oaks-specific incentive should be advertised here until it is verified against current official documentation. Request the latest verified update rather than relying on unofficial promotions.",
  },
  {
    question: "When will Five Oaks launch?",
    answer:
      "A specific Five Oaks sales launch date has not been confirmed in the official sources reviewed for this page. Occupancy and closing timing are also to be announced.",
  },
  {
    question: "How can I receive Five Oaks updates?",
    answer:
      "Submit the project-update form on this page. The publisher identified in the footer will use the contact information you provide to respond to your request. Ongoing promotional messages are sent only if you opt in to the marketing-consent checkbox. You can unsubscribe from commercial electronic messages at any time.",
  },
] as const;

export const seo = {
  title: "Five Oaks Oakville | Coming-Soon Caivan Community",
  description:
    "Five Oaks by Caivan Communities is coming soon to Oakville, Ontario, Canada with detached homes and townhomes. Independent site. Register for verified updates.",
  ogTitle: "Five Oaks Oakville | Coming-Soon Caivan Community",
  keywords: [
    "Five Oaks Oakville",
    "Five Oaks by Caivan",
    "Five Oaks Oakville coming soon",
    "Caivan Oakville townhomes",
    "Oakville detached homes Five Oaks",
    "Oakville new homes Caivan",
  ],
} as const;

export const userMessages = {
  validationSummary: "Please check the highlighted fields and try again.",
  firstName: "Enter your first name.",
  lastName: "Enter your last name.",
  email: "Enter a valid email address.",
  phone: "Enter a valid phone number or leave the field blank.",
  productInterest: "Select a home type interest.",
  loading: "Submitting your request…",
  success:
    "You're registered for Five Oaks updates. We'll use the contact information you provided to keep you informed according to your communication preferences.",
  failure:
    "We couldn't submit your request right now. Your information has not been confirmed as received. Please try again.",
} as const;

export const productInterestOptions = [
  { value: "single-detached", label: "Single-detached home" },
  { value: "townhome", label: "Townhome" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export const buyerTimingOptions = [
  { value: "as-soon-as-available", label: "As soon as available" },
  { value: "within-1-year", label: "Within 1 year" },
  { value: "1-2-years", label: "1–2 years" },
  { value: "exploring", label: "Exploring options" },
] as const;

export const images = {
  hero: {
    src: "/images/hero-lions-valley-aerial.jpg",
    alt: "Aerial view of Lions Valley Park and Sixteen Mile Creek near Five Oaks, Oakville",
    width: 1024,
    height: 682,
  },
  logo: {
    src: "https://ewzutahmskuhbsalpygn.supabase.co/storage/v1/object/public/campaign-media/uploads/Caivan-FiveOaks-Logo-Teal-RGB@2x.png",
    alt: "Five Oaks by Caivan Logo",
    width: 400,
    height: 100,
  },
  communityAerial: {
    src: "/images/community-aerial.jpg",
    alt: "Five Oaks community aerial showing the Oakville setting around Lions Valley",
    width: 5305,
    height: 2985,
  },
  pondPathway: {
    src: "/images/pond-pathway-aerial.jpg",
    alt: "Aerial of pond and pathway open space at Five Oaks in Oakville",
    width: 5000,
    height: 3300,
  },
  creekAerial: {
    src: "/images/community-sixteen-mile-creek.jpg",
    alt: "Sixteen Mile Creek valley and surrounding neighbourhood near Five Oaks, Oakville",
    width: 1024,
    height: 544,
  },
  collection24: {
    src: "/images/24-collection-elevation-b.jpg",
    alt: "Five Oaks 24′ Collection Elevation B, artist's rendering",
    width: 5000,
    height: 2674,
  },
  starling40: {
    src: "/images/40-starling-corner-elevation-b.jpg",
    alt: "Five Oaks 40′ Collection The Starling Corner Elevation B, artist's rendering",
    width: 5000,
    height: 2886,
  },
  merlin42: {
    src: "/images/42-merlin-elevation-a.jpg",
    alt: "Five Oaks 42′ Collection The Merlin Elevation A, artist's rendering",
    width: 5000,
    height: 2886,
  },
  sandhill50: {
    src: "/images/50-sandhill-elevation-b.jpg",
    alt: "Five Oaks 50′ Collection The Sandhill Elevation B, artist's rendering",
    width: 5000,
    height: 2885,
  },
  advantageTowns: {
    src: "/images/advantage-townhomes-elevation-b.jpg",
    alt: "Five Oaks Advantage Townhomes Elevation B, artist's rendering",
    width: 5000,
    height: 2673,
  },
  b2b: {
    src: "/images/b2b-elevation-a.jpg",
    alt: "Five Oaks back-to-back townhomes Elevation A, artist's rendering",
    width: 5000,
    height: 2780,
  },
  breakfast: {
    src: "/images/breakfast.jpg",
    alt: "Five Oaks breakfast area interior, artist's rendering",
    width: 4500,
    height: 5000,
  },
  greatRoom: {
    src: "/images/great-room.jpg",
    alt: "Five Oaks great room interior, artist's rendering",
    width: 5000,
    height: 3250,
  },
  kitchenSingles: {
    src: "/images/kitchen-singles.jpg",
    alt: "Five Oaks detached-home kitchen interior, artist's rendering",
    width: 5000,
    height: 3125,
  },
  kitchenTowns: {
    src: "/images/kitchen-towns.jpg",
    alt: "Five Oaks townhome kitchen interior, artist's rendering",
    width: 4500,
    height: 5000,
  },
  lakeshore: {
    src: "/images/oakville-lakeshore.jpg",
    alt: "Lake Ontario shoreline with trees in Oakville. Neighbourhood illustration only; not a Five Oaks rendering.",
    width: 1536,
    height: 1024,
  },
  park: {
    src: "/images/oakville-park-trail.jpg",
    alt: "Park trail through trees in Oakville-area southern Ontario. Neighbourhood illustration only; not a Five Oaks rendering.",
    width: 1536,
    height: 1024,
  },
  garden: {
    src: "/images/architectural-garden.jpg",
    alt: "Residential garden path and stone wall in a southern Ontario setting. Architectural illustration only; not a Five Oaks rendering.",
    width: 1536,
    height: 1024,
  },
  treeCanopy: {
    src: "/images/oakville-tree-canopy.jpg",
    alt: "Tree canopy along an Oakville-area street. Neighbourhood illustration only; not a Five Oaks rendering.",
    width: 1536,
    height: 1024,
  },
} as const;

export const elevations = [
  {
    id: "24-collection",
    title: "24′ Collection",
    type: "Townhome · Elevation B",
    imageId: "collection24" as const,
  },
  {
    id: "advantage",
    title: "Advantage Townhomes",
    type: "Townhome · Elevation B",
    imageId: "advantageTowns" as const,
  },
  {
    id: "b2b",
    title: "B2B",
    type: "Townhome · Elevation A",
    imageId: "b2b" as const,
  },
  {
    id: "starling",
    title: "The Starling",
    type: "Detached · 40′ · Elevation B",
    imageId: "starling40" as const,
  },
  {
    id: "merlin",
    title: "The Merlin",
    type: "Detached · 42′ · Elevation A",
    imageId: "merlin42" as const,
  },
  {
    id: "sandhill",
    title: "The Sandhill",
    type: "Detached · 50′ · Elevation B",
    imageId: "sandhill50" as const,
  },
] as const;

export const interiors = [
  {
    id: "kitchen-towns",
    title: "Kitchen — Towns",
    imageId: "kitchenTowns" as const,
  },
  {
    id: "kitchen-singles",
    title: "Kitchen — Singles",
    imageId: "kitchenSingles" as const,
  },
  {
    id: "great-room",
    title: "Great Room",
    imageId: "greatRoom" as const,
  },
  {
    id: "breakfast",
    title: "Breakfast",
    imageId: "breakfast" as const,
  },
] as const;

export function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}
