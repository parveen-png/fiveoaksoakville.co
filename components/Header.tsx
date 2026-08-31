import Link from "next/link";
import Image from "next/image";
import { copy, images, project } from "@/lib/project-data";
import { navLinks } from "@/lib/pages";

export function Header({
  registerHref = "#register",
  tone = "overlay",
}: {
  registerHref?: string;
  tone?: "overlay" | "solid";
}) {
  return (
    <header
      className={
        tone === "overlay"
          ? "absolute inset-x-0 top-0 z-50"
          : "relative z-50 bg-navy"
      }
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0 bg-paper-elevated/90 px-2 py-1.5">
          <Image
            src={images.logo.src}
            alt={images.logo.alt}
            width={160}
            height={40}
            className="h-8 w-auto sm:h-10"
            priority
          />
          <span className="sr-only">{project.name}</span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-6 xl:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[0.8rem] font-medium tracking-[0.12em] text-paper-elevated/90 uppercase transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href={registerHref} className="btn-primary min-h-10 px-4 text-xs">
            {project.primaryCta}
          </Link>
          <details className="relative xl:hidden">
            <summary className="flex min-h-10 min-w-10 cursor-pointer list-none items-center justify-center bg-paper-elevated text-ink [&::-webkit-details-marker]:hidden">
              <span className="sr-only">Open menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </summary>
            <div className="absolute right-0 z-50 mt-2 w-52 border border-stone bg-paper-elevated p-3 shadow-xl">
              <nav aria-label="Mobile">
                <ul className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="block px-3 py-2.5 text-sm font-medium text-ink hover:bg-paper-muted"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href={registerHref}
                      className="block px-3 py-2.5 text-sm font-medium text-bronze"
                    >
                      Register
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </details>
        </div>
      </div>
      <p className="sr-only">{copy.independentDisclosure}</p>
    </header>
  );
}
