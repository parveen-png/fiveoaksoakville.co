import Image from "next/image";
import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";
import { ExternalLink } from "@/components/ui";
import {
  copy,
  displayFactValue,
  elevations,
  getFact,
  images,
  interiors,
  INFORMATION_CHECKED_DISPLAY,
  type FaqItem,
} from "@/lib/project-data";
import type { PageContent } from "@/lib/pages";

export function AnswerBlock({
  h1,
  answer,
}: {
  h1: string;
  answer: string;
}) {
  return (
    <div>
      <h1
        id="page-title"
        className="font-display text-4xl leading-tight text-ink sm:text-5xl"
      >
        {h1}
      </h1>
      <p
        id="answer-block"
        className="mt-6 max-w-3xl text-lg leading-8 text-ink"
      >
        {answer}
      </p>
    </div>
  );
}

export function DatedFactExcerpt({
  excerpt,
  factIds,
}: {
  excerpt: string;
  factIds: readonly string[];
}) {
  return (
    <aside className="border border-stone bg-paper-muted/70 p-5 md:p-6">
      <p className="text-[0.7rem] font-semibold tracking-[0.2em] text-bronze uppercase">
        Fact excerpt · {INFORMATION_CHECKED_DISPLAY}
      </p>
      <p className="mt-3 text-base leading-7 text-ink">{excerpt}</p>
      <dl className="mt-5 divide-y border-t border-stone">
        {factIds.map((id) => {
          const fact = getFact(id);
          return (
            <div
              key={fact.id}
              className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4"
            >
              <dt className="text-sm text-ink-muted">{fact.item}</dt>
              <dd className="text-sm font-medium text-ink">
                {displayFactValue(fact)}
              </dd>
            </div>
          );
        })}
      </dl>
    </aside>
  );
}

export function SiblingLinks({
  links,
}: {
  links: PageContent["siblings"];
}) {
  return (
    <nav aria-label="Related Five Oaks pages" className="flex flex-wrap gap-3">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="border border-stone bg-paper-elevated px-4 py-2 text-sm text-ink hover:border-bronze hover:text-bronze"
        >
          {link.label}
        </Link>
      ))}
      <Link
        href="#register"
        className="border border-bronze bg-bronze px-4 py-2 text-sm text-paper-elevated hover:bg-bronze-hover"
      >
        Register
      </Link>
    </nav>
  );
}

export function FaqList({ items }: { items: readonly FaqItem[] }) {
  return (
    <div id="faqs" className="space-y-4">
      {items.map((faq) => (
        <details
          key={faq.question}
          className="border border-stone bg-paper-elevated px-5 py-4"
        >
          <summary className="cursor-pointer font-display text-xl text-ink">
            {faq.question}
          </summary>
          <p className="mt-3 text-base leading-7 text-ink">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function NeighbourhoodFigure({
  src,
  alt,
  width,
  height,
  caption = copy.imageQualifier,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}) {
  return (
    <figure>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-auto w-full object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
      <figcaption className="mt-2 text-xs tracking-wide text-ink-muted">
        {caption} Not a Five Oaks rendering.
      </figcaption>
    </figure>
  );
}

export function RenderingFigure({
  src,
  alt,
  width,
  height,
  caption = copy.renderingQualifier,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  priority = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <figure>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="h-auto w-full object-cover"
        sizes={sizes}
      />
      <figcaption className="mt-2 text-xs tracking-wide text-ink-muted">
        {caption}
      </figcaption>
    </figure>
  );
}

export function ElevationGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {elevations.map((elevation) => {
        const image = images[elevation.imageId];
        return (
          <article key={elevation.id}>
            <RenderingFigure
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
            />
            <h3 className="mt-3 font-display text-xl text-ink">
              {elevation.title}
            </h3>
            <p className="mt-1 text-sm text-ink-muted">{elevation.type}</p>
          </article>
        );
      })}
    </div>
  );
}

export function InteriorGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {interiors.map((interior) => {
        const image = images[interior.imageId];
        return (
          <article key={interior.id}>
            <RenderingFigure
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
            />
            <h3 className="mt-3 font-display text-xl text-ink">
              {interior.title}
            </h3>
          </article>
        );
      })}
    </div>
  );
}

export function OfficialSources() {
  return (
    <p className="text-sm leading-6 text-ink-muted">
      Cite, do not impersonate:{" "}
      <ExternalLink href="https://caivan.com/greater-toronto-area/oakville/five-oaks/">
        Caivan Five Oaks
      </ExternalLink>
      ,{" "}
      <ExternalLink href="https://caivan.com/greater-toronto-area/oakville/">
        Caivan Oakville
      </ExternalLink>
      ,{" "}
      <ExternalLink href="https://caivan.com/">caivan.com</ExternalLink>.
    </p>
  );
}

export function PageForm() {
  return <LeadForm idPrefix="hero" />;
}
