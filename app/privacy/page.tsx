import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/ui";
import { buildJsonLd } from "@/lib/json-ld";
import { buildPageMetadata } from "@/lib/metadata";
import { privacyPageMeta } from "@/lib/pages";

export const metadata: Metadata = buildPageMetadata(privacyPageMeta);

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={buildJsonLd({
          page: {
            path: privacyPageMeta.path,
            title: privacyPageMeta.title,
            description: privacyPageMeta.description,
            h1: privacyPageMeta.h1,
            answer: privacyPageMeta.description,
            factExcerpt: "",
            factIds: [],
            siblings: [],
            breadcrumbName: privacyPageMeta.breadcrumbName,
          },
        })}
      />
      <Header tone="solid" registerHref="/#register" />
      <main id="main" className="bg-paper pt-10 pb-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <p className="text-xs font-semibold tracking-[0.18em] text-bronze uppercase">
            Requires legal review before launch
          </p>
          <h1 className="mt-4 font-display text-4xl tracking-tight text-ink">
            Privacy Policy
          </h1>
          <p className="mt-6 text-base leading-7 text-ink">
            This policy describes how personal information is treated when you
            request Five Oaks project updates on this independent informational
            website. It is not a substitute for legal advice.
          </p>
          <div className="mt-8 space-y-6 text-base leading-7 text-ink">
            <section>
              <h2 className="font-display text-2xl">Organization responsible</h2>
              <p className="mt-3">
                Personal information submitted through this website is collected
                by the independent operator of this informational site, not by
                Caivan Communities.
              </p>
            </section>
            <section>
              <h2 className="font-display text-2xl">What we collect</h2>
              <p className="mt-3">
                We collect first name, last name, email address, optional phone
                number, product interest, optional buyer timing, marketing-consent
                status, and non-sensitive attribution data such as landing-page
                URL, referrer and UTM parameters. We do not collect government
                identifiers, payment details or other unnecessary sensitive
                information.
              </p>
            </section>
            <section>
              <h2 className="font-display text-2xl">Why we collect it</h2>
              <p className="mt-3">
                We use this information to respond to your request for Five Oaks
                project updates. If you provide express consent, we may also send
                commercial electronic messages about the project. We do not send
                those messages unless a marketing-consent checkbox is selected.
              </p>
            </section>
            <section>
              <h2 className="font-display text-2xl">Lead processors</h2>
              <p className="mt-3">
                Lead information is processed only to respond to your update
                request. Acknowledgement messages may be sent by email when that
                delivery channel is configured.
              </p>
            </section>
            <section>
              <h2 className="font-display text-2xl">Retention</h2>
              <p className="mt-3">
                The operator should retain lead records only as long as needed to
                respond to update requests, meet legal obligations, and resolve
                disputes. A documented retention schedule belongs in the operator
                privacy program before launch.
              </p>
            </section>
            <section>
              <h2 className="font-display text-2xl">Access and deletion</h2>
              <p className="mt-3">
                Privacy inquiries, access requests and deletion requests may be
                sent through the contact details used to respond to your original
                request. The operator should verify identity, locate the relevant
                records, and respond according to applicable Canadian privacy law.
              </p>
            </section>
            <section>
              <h2 className="font-display text-2xl">Analytics</h2>
              <p className="mt-3">
                If analytics are enabled, events do not include names, email
                addresses, phone numbers or other form field values. Analytics
                identifiers, if used, should be configured only after privacy
                review.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
