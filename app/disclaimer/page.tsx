import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/ui";
import { buildJsonLd } from "@/lib/json-ld";
import { buildPageMetadata } from "@/lib/metadata";
import { disclaimerPageMeta } from "@/lib/pages";
import { copy, project } from "@/lib/project-data";

export const metadata: Metadata = buildPageMetadata(disclaimerPageMeta);

export default function DisclaimerPage() {
  return (
    <>
      <JsonLd
        data={buildJsonLd({
          page: {
            path: disclaimerPageMeta.path,
            title: disclaimerPageMeta.title,
            description: disclaimerPageMeta.description,
            h1: disclaimerPageMeta.h1,
            answer: disclaimerPageMeta.description,
            factExcerpt: "",
            factIds: [],
            siblings: [],
            breadcrumbName: disclaimerPageMeta.breadcrumbName,
          },
        })}
      />
      <Header tone="solid" registerHref="/#register" />
      <main id="main" className="bg-paper pt-10 pb-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <p className="text-xs font-semibold tracking-[0.18em] text-bronze uppercase">
            Requires legal and brokerage review before launch
          </p>
          <h1 className="mt-4 font-display text-4xl tracking-tight text-ink">
            Terms / Disclaimer
          </h1>
          <div className="mt-8 space-y-6 text-base leading-7 text-ink">
            <p>{copy.legalFooterDisclosure}</p>
            <p>
              This is an independent informational website. It is not the official
              website of {project.developer} or {project.name}. This site does
              not claim to represent Caivan, to be Caivan&apos;s exclusive sales
              representative, or to offer homes for sale through this page.
            </p>
            <p>
              Information on this page is based on official materials reviewed on
              August 24, 2026. Unconfirmed details are marked to be announced.
              Project information can change. Confirm current details against
              official developer documents before making a purchase decision.
            </p>
            <p>
              Neighbourhood photographs are generic supporting imagery and do not
              depict {project.name}. This website does not provide legal,
              financial or real-estate advice. Have a lawyer review any Agreement
              of Purchase and Sale and related schedules.
            </p>
            <p>{copy.legalReviewFlag}</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
