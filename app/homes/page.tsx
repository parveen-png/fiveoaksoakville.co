import type { Metadata } from "next";
import { SpokePage } from "@/components/SpokePage";
import {
  ElevationGrid,
  InteriorGrid,
  RenderingFigure,
} from "@/components/Editorial";
import { buildPageMetadata } from "@/lib/metadata";
import { homesPage } from "@/lib/pages";
import { copy, homeCollection, images } from "@/lib/project-data";

export const metadata: Metadata = buildPageMetadata(homesPage);

export default function HomesPage() {
  return (
    <SpokePage page={homesPage}>
      <section className="space-y-8">
        {homeCollection.map((home) => {
          const image = images[home.imageId];
          return (
            <article
              key={home.id}
              className="overflow-hidden border border-stone bg-paper-elevated"
            >
              <RenderingFigure
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
              />
              <div className="p-6">
                <h2 className="font-display text-3xl text-ink">{home.title}</h2>
                <p className="mt-2 text-xs tracking-[0.16em] text-bronze uppercase">
                  {home.status}
                </p>
                <p className="mt-4 text-base leading-7 text-ink">{home.copy}</p>
              </div>
            </article>
          );
        })}
        <p className="text-sm leading-6 text-ink-muted">{copy.developerCaution}</p>
      </section>
      <section className="space-y-4">
        <h2 className="font-display text-3xl text-ink">
          Collections and elevations
        </h2>
        <p className="text-base leading-7 text-ink">
          Named collections from current project materials. Elevations are
          artist&apos;s concepts, not floor plans.
        </p>
        <ElevationGrid />
      </section>
      <section className="space-y-4">
        <h2 className="font-display text-3xl text-ink">Interiors</h2>
        <p className="text-base leading-7 text-ink">
          Kitchen, great room and breakfast renderings from current project
          materials.
        </p>
        <InteriorGrid />
      </section>
    </SpokePage>
  );
}
