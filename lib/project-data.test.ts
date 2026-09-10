import { describe, expect, it } from "vitest";
import {
  displayFactValue,
  elevations,
  faqs,
  facts,
  getFact,
  images,
  interiors,
  userMessages,
  wordCount,
  copy,
  seo,
} from "./project-data";
import { flattenLeadErrors, leadInputSchema } from "./validation";
import { buildJsonLd, jsonLdContainsForbidden } from "./json-ld";
import { redactRecord } from "./logger";
import { sanitizeAnalyticsParams } from "./analytics";
import { siteConfig, sitePageUrl } from "./site-config";
import { buildSitemapXml } from "./sitemap";
import {
  allMoneyPages,
  faqsPage,
  floorPlansPage,
  homesPage,
  locationPage,
  pricingPage,
  sitemapPaths,
} from "./pages";
import {
  FIVE_OAKS_SHEET_HEADERS,
  FIVE_OAKS_SHEET_PROJECT,
  toFiveOaksSheetRow,
} from "./google/sheets";

describe("project facts", () => {
  it("keeps exactly ten FAQs", () => {
    expect(faqs).toHaveLength(10);
  });

  it("renders TBA facts as honest placeholders", () => {
    expect(displayFactValue(getFact("pricing"))).toBe("To be announced");
    expect(displayFactValue(getFact("floor-plans"))).toBe("To be announced");
    expect(displayFactValue(getFact("deposit"))).toBe("To be announced");
    expect(displayFactValue(getFact("incentives"))).toBe(
      "Request the latest verified update",
    );
    expect(displayFactValue(getFact("launch-date"))).toBe("To be announced");
    expect(displayFactValue(getFact("occupancy"))).toBe("To be announced");
  });

  it("does not invent a project address", () => {
    const location = facts.find((fact) => fact.id === "location");
    expect(location?.value).toBe("Oakville, Ontario");
    expect(location?.status).toBe("VERIFIED");
  });
});

describe("homepage answer block", () => {
  it("keeps the hero line short and names the project", () => {
    const text = copy.heroSupport;
    expect(wordCount(text)).toBeLessThanOrEqual(25);
    expect(text).toContain("Caivan");
    expect(text.toLowerCase()).toContain("townhome");
    expect(text.toLowerCase()).toContain("register");
  });

  it("uses a unique title versus the .ca stacked landing title", () => {
    expect(seo.title).not.toBe(
      "Five Oaks Oakville | Caivan Townhomes & Detached Homes",
    );
    expect(seo.title.length).toBeGreaterThanOrEqual(45);
    expect(seo.title.length).toBeLessThanOrEqual(65);
  });
});

describe("spoke answer blocks", () => {
  it("keeps unique 40–80 word answers and query-language H1s", () => {
    const spokes = [
      locationPage,
      homesPage,
      pricingPage,
      floorPlansPage,
      faqsPage,
    ];
    for (const page of spokes) {
      expect(wordCount(page.answer)).toBeGreaterThanOrEqual(40);
      expect(wordCount(page.answer)).toBeLessThanOrEqual(80);
      expect(page.siblings.length).toBeGreaterThanOrEqual(2);
    }
    expect(locationPage.h1.toLowerCase()).toContain("where is five oaks");
    expect(homesPage.h1.toLowerCase()).toContain("townhome");
    expect(pricingPage.h1.toLowerCase()).toContain("price");
    expect(floorPlansPage.h1.toLowerCase()).toContain("floor plan");
  });
});

describe("lead validation", () => {
  const valid = {
    firstName: "Alex",
    lastName: "Lee",
    email: "alex@example.com",
    phone: "",
    productInterest: "townhome",
    marketingConsent: false,
  };

  it("accepts a complete request without phone or marketing consent", () => {
    const parsed = leadInputSchema.safeParse(valid);
    expect(parsed.success).toBe(true);
  });

  it("uses the specified field messages", () => {
    const parsed = leadInputSchema.safeParse({
      firstName: "",
      lastName: "",
      email: "not-an-email",
      phone: "abc",
      productInterest: "condo",
      marketingConsent: false,
    });
    expect(parsed.success).toBe(false);
    if (parsed.success) {
      return;
    }
    const errors = flattenLeadErrors(parsed.error);
    const byField = Object.fromEntries(
      errors.map((error) => [error.field, error.message]),
    );
    expect(byField.firstName).toBe(userMessages.firstName);
    expect(byField.lastName).toBe(userMessages.lastName);
    expect(byField.email).toBe(userMessages.email);
    expect(byField.phone).toBe(userMessages.phone);
  });

  it("accepts an optional formatted phone number", () => {
    const parsed = leadInputSchema.safeParse({
      ...valid,
      phone: "(416) 555-1234",
    });
    expect(parsed.success).toBe(true);
  });
});

describe("sheet contract", () => {
  it("keeps the Five Oaks Sheet column order", () => {
    expect([...FIVE_OAKS_SHEET_HEADERS]).toEqual([
      "Date",
      "First Name",
      "Last Name",
      "Email",
      "Phone",
      "Product Interest",
      "Buyer Timing",
      "Marketing Consent",
      "UTM Source",
      "UTM Medium",
      "UTM Campaign",
      "Landing Page",
      "Referrer",
      "Submission ID",
      "Project",
    ]);
  });

  it("writes Five Oaks Oakville in the Project cell", () => {
    const row = toFiveOaksSheetRow({
      submittedAt: "2026-08-31T00:00:00.000Z",
      firstName: "Alex",
      lastName: "Lee",
      email: "alex@example.com",
      phone: "",
      productInterest: "townhome",
      marketingConsent: false,
      landingPage: "https://www.fiveoakbycaivan.com/",
      submissionId: "test-id",
    });
    expect(row[14]).toBe("Five Oaks Oakville");
    expect(FIVE_OAKS_SHEET_PROJECT).toBe("Five Oaks Oakville");
  });
});

describe("privacy-conscious logging and analytics", () => {
  it("redacts email and phone from logs", () => {
    const redacted = redactRecord({
      email: "person@example.com",
      phone: "4165551234",
      destination: "webhook",
    });
    expect(redacted.email).toBe("[redacted]");
    expect(redacted.phone).toBe("[redacted]");
    expect(redacted.destination).toBe("webhook");
  });

  it("strips personal form values from analytics params", () => {
    const clean = sanitizeAnalyticsParams({
      firstName: "Alex",
      email: "alex@example.com",
      phone: "4165551234",
      placement: "hero",
    });
    expect(clean.firstName).toBeUndefined();
    expect(clean.email).toBeUndefined();
    expect(clean.phone).toBeUndefined();
    expect(clean.placement).toBe("hero");
  });
});

describe("campaign images", () => {
  it("uses local files according to their source names", () => {
    expect(images.hero.src).toBe("/images/hero-lions-valley-aerial.jpg");
    expect(images.communityAerial.src).toBe("/images/community-aerial.jpg");
    expect(images.pondPathway.src).toBe("/images/pond-pathway-aerial.jpg");
    expect(images.creekAerial.src).toBe(
      "/images/community-sixteen-mile-creek.jpg",
    );
    expect(images.collection24.src).toBe(
      "/images/24-collection-elevation-b.jpg",
    );
    expect(images.starling40.src).toBe(
      "/images/40-starling-corner-elevation-b.jpg",
    );
    expect(images.merlin42.src).toBe("/images/42-merlin-elevation-a.jpg");
    expect(images.sandhill50.src).toBe("/images/50-sandhill-elevation-b.jpg");
    expect(images.advantageTowns.src).toBe(
      "/images/advantage-townhomes-elevation-b.jpg",
    );
    expect(images.b2b.src).toBe("/images/b2b-elevation-a.jpg");
    expect(images.breakfast.src).toBe("/images/breakfast.jpg");
    expect(images.greatRoom.src).toBe("/images/great-room.jpg");
    expect(images.kitchenSingles.src).toBe("/images/kitchen-singles.jpg");
    expect(images.kitchenTowns.src).toBe("/images/kitchen-towns.jpg");
    expect(images.lakeshore.src).toBe("/images/oakville-lakeshore.jpg");
    expect(images.park.src).toBe("/images/oakville-park-trail.jpg");
    expect(images.garden.src).toBe("/images/architectural-garden.jpg");
    expect(images.treeCanopy.src).toBe("/images/oakville-tree-canopy.jpg");
    expect(elevations).toHaveLength(6);
    expect(interiors.map((item) => images[item.imageId].src)).toEqual([
      "/images/kitchen-towns.jpg",
      "/images/kitchen-singles.jpg",
      "/images/great-room.jpg",
      "/images/breakfast.jpg",
    ]);
  });
});

describe("json-ld", () => {
  it("does not emit Offer, review or fabricated listing entities", () => {
    for (const page of allMoneyPages) {
      const data = buildJsonLd({ page });
      expect(jsonLdContainsForbidden(data)).toEqual([]);
      const json = JSON.stringify(data);
      expect(json).toContain("WebSite");
      expect(json).toContain("WebPage");
      expect(json).toContain("BreadcrumbList");
      expect(json).toContain("Organization");
      expect(json).toContain(sitePageUrl(page.path));
    }
    expect(JSON.stringify(buildJsonLd({ page: faqsPage }))).toContain(
      "FAQPage",
    );
  });

  it("uses visible FAQ text in FAQ schema", () => {
    const json = JSON.stringify(buildJsonLd({ page: faqsPage }));
    for (const faq of faqs) {
      expect(json).toContain(faq.question);
      expect(json).toContain(faq.answer);
    }
  });
});

describe("site page URLs", () => {
  it("uses a trailing slash only on the homepage", () => {
    expect(sitePageUrl("/")).toBe(`${siteConfig.siteUrl}/`);
    expect(sitePageUrl("/privacy")).toBe(`${siteConfig.siteUrl}/privacy`);
    expect(sitePageUrl("/disclaimer")).toBe(`${siteConfig.siteUrl}/disclaimer`);
    expect(sitePageUrl("/pricing")).toBe(`${siteConfig.siteUrl}/pricing`);
  });

  it("includes hub and spokes in the sitemap path list", () => {
    expect(sitemapPaths).toEqual([
      "/",
      "/location",
      "/homes",
      "/pricing",
      "/floor-plans",
      "/faqs",
      "/privacy",
      "/disclaimer",
    ]);
  });

  it("emits a urlset Google can parse with every public page loc", () => {
    const xml = buildSitemapXml();
    expect(xml.startsWith("<?xml version=\"1.0\" encoding=\"UTF-8\"?>")).toBe(
      true,
    );
    expect(xml).toContain(
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    );
    expect(xml).toContain("</urlset>");
    for (const path of sitemapPaths) {
      expect(xml).toContain(`<loc>${sitePageUrl(path)}</loc>`);
    }
  });
});
