import type { Metadata } from "next";
import { SpokePage } from "@/components/SpokePage";
import { NeighbourhoodFigure } from "@/components/Editorial";
import { buildPageMetadata } from "@/lib/metadata";
import { homesPage } from "@/lib/pages";
import { copy, homeCollection, images } from "@/lib/project-data";

export const metadata: Metadata = buildPageMetadata(homesPage);

export default function HomesPage() {
  return (
    <SpokePage page={homesPage}>
      <section className="space-y-8">
        {homeCollection.map((home) => (
          <article key={home.id} className="border border-stone bg-paper-elevated p-6">
            <h2 className="font-display text-3xl text-ink">{home.title}</h2>
            <p className="mt-2 text-xs tracking-[0.16em] text-bronze uppercase">
              {home.status}
            </p>
            <p className="mt-4 text-base leading-7 text-ink">{home.copy}</p>
          </article>
        ))}
        <p className="text-sm leading-6 text-ink-muted">{copy.developerCaution}</p>
        <NeighbourhoodFigure
          src={images.garden.src}
          alt={images.garden.alt}
          width={images.garden.width}
          height={images.garden.height}
        />
      </section>
    </SpokePage>
  );
}
