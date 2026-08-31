import type { Metadata } from "next";
import { SpokePage } from "@/components/SpokePage";
import { buildPageMetadata } from "@/lib/metadata";
import { faqsPage } from "@/lib/pages";

export const metadata: Metadata = buildPageMetadata(faqsPage);

export default function FaqsRoute() {
  return (
    <SpokePage page={faqsPage}>
      <p className="text-base leading-7 text-ink">
        Each answer below is the same wording used in structured data for this
        page. Unpublished items stay marked to be announced as of August 24,
        2026.
      </p>
    </SpokePage>
  );
}
