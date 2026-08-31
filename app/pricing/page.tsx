import type { Metadata } from "next";
import { SpokePage } from "@/components/SpokePage";
import { buildPageMetadata } from "@/lib/metadata";
import { pricingPage } from "@/lib/pages";
import {
  copy,
  displayFactValue,
  getFact,
  pricingStatusItems,
} from "@/lib/project-data";

export const metadata: Metadata = buildPageMetadata(pricingPage);

export default function PricingPage() {
  return (
    <SpokePage page={pricingPage}>
      <section>
        <h2 className="font-display text-3xl text-ink">Cost status, not a price list</h2>
        <p className="mt-4 text-base leading-7 text-ink">{copy.pricingLead}</p>
        <p className="mt-4 text-base leading-7 text-ink">{copy.pricingCaution}</p>
        <div className="mt-8 divide-y border-y border-stone">
          {pricingStatusItems.map((item) => (
            <div
              key={item.label}
              className="grid gap-2 py-4 sm:grid-cols-[12rem_1fr]"
            >
              <div className="text-sm text-ink-muted">{item.label}</div>
              <div className="font-display text-xl text-ink">
                {displayFactValue(getFact(item.factId))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </SpokePage>
  );
}
