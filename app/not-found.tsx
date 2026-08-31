import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header tone="solid" registerHref="/#register" />
      <main id="main" className="bg-paper py-20">
        <div className="mx-auto max-w-2xl px-5">
          <h1 className="font-display text-4xl tracking-tight text-ink">
            Page not found
          </h1>
          <p className="mt-4 text-lg leading-8 text-ink-muted">
            That page is not available on this Five Oaks informational website.
          </p>
          <Link href="/" className="btn-primary mt-8 inline-flex">
            Return to Five Oaks Oakville
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
