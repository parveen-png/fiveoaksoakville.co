import Link from "next/link";
import { copy, project } from "@/lib/project-data";
import { navLinks } from "@/lib/pages";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-paper-elevated">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl italic">
              {project.name}
            </p>
            <p className="mt-2 text-sm tracking-[0.18em] text-gold uppercase">
              Oakville, Ontario
            </p>
            <p className="mt-4 max-w-sm text-sm leading-6 text-paper-elevated/80">
              Independent project information for {project.name} by{" "}
              {project.developer}. Not an official Caivan website.
            </p>
          </div>
          <div>
            <h2 className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">
              Explore
            </h2>
            <ul className="mt-3 space-y-2 text-sm leading-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link className="hover:text-gold" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link className="hover:text-gold" href="/#register">
                  Register
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">
              Trust
            </h2>
            <ul className="mt-3 space-y-2 text-sm leading-6">
              <li>
                <Link className="hover:text-gold" href="/privacy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="hover:text-gold" href="/disclaimer">
                  Terms / Disclaimer
                </Link>
              </li>
            </ul>
            {siteConfig.siteUrlConfigured ? (
              <p className="mt-4 text-xs leading-5 text-paper-elevated/70">
                Canonical: {siteConfig.domainDisplay}
              </p>
            ) : null}
          </div>
        </div>
        <div className="mt-12 border-t border-paper-elevated/15 pt-8">
          <p className="max-w-4xl text-sm leading-6 text-paper-elevated/85">
            {copy.legalFooterDisclosure}
          </p>
          <p className="mt-6 text-sm text-paper-elevated/70">
            © {year} Five Oaks informational site. This website is not operated by{" "}
            {project.developer}.
          </p>
        </div>
      </div>
    </footer>
  );
}
