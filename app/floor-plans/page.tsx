import type { Metadata } from "next";
import { SpokePage } from "@/components/SpokePage";
import { ElevationGrid } from "@/components/Editorial";
import { buildPageMetadata } from "@/lib/metadata";
import { floorPlansPage } from "@/lib/pages";
import { copy, homeCollection } from "@/lib/project-data";

export const metadata: Metadata = buildPageMetadata(floorPlansPage);

export default function FloorPlansPage() {
  return (
    <SpokePage page={floorPlansPage}>
      <section>
        <h2 className="font-display text-3xl text-ink">
          Elevations, not layouts
        </h2>
        <p className="mt-4 text-base leading-7 text-ink">
          Official interior floor plans for Five Oaks have not been published.
          The elevations below are artist&apos;s concepts named from current
          project materials. They are not bedroom counts, square footage or
          lot plans.
        </p>
        <p className="mt-4 text-base leading-7 text-ink">
          {copy.developerCaution}
        </p>
        <ul className="mt-6 space-y-4">
          {homeCollection.map((home) => (
            <li key={home.id} className="border-l-2 border-bronze pl-4">
              <p className="font-medium text-ink">{home.title}</p>
              <p className="mt-1 text-sm leading-6 text-ink-muted">
                Interior plans for this product type: to be announced.
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <ElevationGrid />
        </div>
      </section>
    </SpokePage>
  );
}
