import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/ui";
import { MobileStickyCta } from "@/components/MobileStickyCta";
import {
  AnswerBlock,
  DatedFactExcerpt,
  FaqList,
  OfficialSources,
  PageForm,
  SiblingLinks,
} from "@/components/Editorial";
import { buildJsonLd } from "@/lib/json-ld";
import type { PageContent } from "@/lib/pages";
import { copy, project } from "@/lib/project-data";
import type { ReactNode } from "react";

export function SpokePage({
  page,
  children,
}: {
  page: PageContent;
  children?: ReactNode;
}) {
  return (
    <>
      <JsonLd data={buildJsonLd({ page })} />
      <Header tone="solid" />
      <main id="main" className="bg-paper pb-24 lg:pb-16">
        <div className="border-b border-stone bg-paper-elevated">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 lg:px-8">
            <p className="text-[0.7rem] font-semibold tracking-[0.22em] text-bronze uppercase">
              {project.name} · {project.municipality}
            </p>
            <div className="mt-4">
              <AnswerBlock h1={page.h1} answer={page.answer} />
            </div>
            <p className="mt-6 max-w-3xl text-sm leading-6 text-ink-muted">
              {copy.independentDisclosure}
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:px-8">
          <div className="space-y-10">
            <DatedFactExcerpt excerpt={page.factExcerpt} factIds={page.factIds} />
            {children}
            {page.faqs && page.faqs.length > 0 ? (
              <section aria-labelledby="faqs-heading">
                <h2
                  id="faqs-heading"
                  className="font-display text-3xl text-ink"
                >
                  Questions on this page
                </h2>
                <div className="mt-6">
                  <FaqList items={page.faqs} />
                </div>
              </section>
            ) : null}
            <SiblingLinks links={page.siblings} />
            <OfficialSources />
          </div>
          <div className="lg:sticky lg:top-8 lg:self-start">
            <PageForm />
          </div>
        </div>
      </main>
      <Footer />
      <MobileStickyCta />
    </>
  );
}
