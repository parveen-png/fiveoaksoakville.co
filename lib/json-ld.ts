import { images, project, type FaqItem } from "@/lib/project-data";
import { identityIsPlaceholder, siteConfig, sitePageUrl } from "@/lib/site-config";
import { homePage, type PageContent } from "@/lib/pages";

const FORBIDDEN = [
  '"Offer"',
  "RealEstateListing",
  "AggregateRating",
  "SingleFamilyResidence",
  "GeoCoordinates",
] as const;

export interface JsonLdOptions {
  page: PageContent;
  faqs?: readonly FaqItem[];
}

function imageUrl(): string {
  return images.hero.src.startsWith("http")
    ? images.hero.src
    : `${siteConfig.siteUrl}${images.hero.src}`;
}

export function buildJsonLd(options: JsonLdOptions = { page: homePage }) {
  const { page } = options;
  const origin = siteConfig.siteUrl;
  const pageUrl = sitePageUrl(page.path);
  const pageFaqs = options.faqs ?? page.faqs;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebSite",
      "@id": `${origin}/#website`,
      url: sitePageUrl("/"),
      name: "Five Oaks Oakville project information",
      alternateName: ["Five Oaks by Caivan Oakville", "Five Oaks Oakville"],
      description:
        "Independent informational website about Five Oaks by Caivan Communities in Oakville, Ontario.",
      publisher: { "@id": `${origin}/#publisher` },
      inLanguage: "en-CA",
    },
    {
      "@type": "Organization",
      "@id": `${origin}/#publisher`,
      name: "Five Oaks Oakville project information",
      url: sitePageUrl("/"),
      ...(!identityIsPlaceholder(siteConfig.publisherEmail)
        ? { email: siteConfig.publisherEmail }
        : {}),
      ...(!identityIsPlaceholder(siteConfig.publisherPhone)
        ? { telephone: siteConfig.publisherPhone }
        : {}),
    },
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: page.title,
      headline: page.h1,
      description: page.description,
      datePublished: "2026-08-24",
      dateModified: "2026-08-24",
      isPartOf: { "@id": `${origin}/#website` },
      about: [
        {
          "@type": "Thing",
          name: project.name,
          description: `${project.name} is a coming-soon new-home community by ${project.developer} in ${project.municipality}, ${project.country}, planned to include ${project.homeTypes.toLowerCase()}.`,
        },
        {
          "@type": "City",
          name: "Oakville",
          containedInPlace: {
            "@type": "AdministrativeArea",
            name: "Ontario",
            containedInPlace: {
              "@type": "Country",
              name: "Canada",
            },
          },
        },
      ],
      mentions: [
        { "@type": "Organization", name: project.developer },
        { "@type": "Place", name: "Oakville, Ontario" },
      ],
      primaryImageOfPage: { "@id": `${origin}/#primaryimage` },
      inLanguage: "en-CA",
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["#page-title", "#answer-block"],
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: breadcrumbItems(page),
    },
    {
      "@type": "ImageObject",
      "@id": `${origin}/#primaryimage`,
      url: imageUrl(),
      contentUrl: imageUrl(),
      caption:
        "Neighbourhood imagery for illustration only. This photograph does not depict the Five Oaks project.",
      width: images.hero.width,
      height: images.hero.height,
    },
  ];

  if (pageFaqs && pageFaqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      url: `${pageUrl}#faqs`,
      mainEntity: pageFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

function breadcrumbItems(page: PageContent) {
  if (page.path === "/") {
    return [
      {
        "@type": "ListItem",
        position: 1,
        name: page.breadcrumbName,
        item: sitePageUrl("/"),
      },
    ];
  }
  return [
    {
      "@type": "ListItem",
      position: 1,
      name: "Five Oaks Oakville",
      item: sitePageUrl("/"),
    },
    {
      "@type": "ListItem",
      position: 2,
      name: page.breadcrumbName,
      item: sitePageUrl(page.path),
    },
  ];
}

export function jsonLdContainsForbidden(data: unknown): string[] {
  const json = JSON.stringify(data);
  return FORBIDDEN.filter((token) => json.includes(token));
}

