import type { Metadata } from "next";
import { SpokePage } from "@/components/SpokePage";
import {
  NeighbourhoodFigure,
  RenderingFigure,
} from "@/components/Editorial";
import { buildPageMetadata } from "@/lib/metadata";
import { locationPage } from "@/lib/pages";
import { copy, images, project } from "@/lib/project-data";

export const metadata: Metadata = buildPageMetadata(locationPage);

export default function LocationPage() {
  return (
    <SpokePage page={locationPage}>
      <section>
        <h2 className="font-display text-3xl text-ink">Oakville, not a street yet</h2>
        <p className="mt-4 text-base leading-7 text-ink">{copy.locationLead}</p>
        <p className="mt-4 text-base leading-7 text-ink">{copy.oakvilleContext}</p>
        <ul className="mt-6 space-y-2 text-base text-ink">
          {copy.oakvilleSafeFacts.map((item) => (
            <li key={item} className="border-l-2 border-bronze pl-4">
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm leading-6 text-ink-muted">
          {project.generalSalesCentre.note} Public sales-centre contact listed
          by Caivan for Oakville generally is not used here as a Five Oaks map
          pin.
        </p>
        <div className="mt-8 grid gap-8">
          <RenderingFigure
            src={images.communityAerial.src}
            alt={images.communityAerial.alt}
            width={images.communityAerial.width}
            height={images.communityAerial.height}
          />
          <RenderingFigure
            src={images.pondPathway.src}
            alt={images.pondPathway.alt}
            width={images.pondPathway.width}
            height={images.pondPathway.height}
          />
          <RenderingFigure
            src={images.creekAerial.src}
            alt={images.creekAerial.alt}
            width={images.creekAerial.width}
            height={images.creekAerial.height}
          />
        </div>
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <NeighbourhoodFigure
            src={images.park.src}
            alt={images.park.alt}
            width={images.park.width}
            height={images.park.height}
          />
          <NeighbourhoodFigure
            src={images.treeCanopy.src}
            alt={images.treeCanopy.alt}
            width={images.treeCanopy.width}
            height={images.treeCanopy.height}
          />
        </div>
      </section>
    </SpokePage>
  );
}
