import Image from "next/image";
import { footer, hero } from "@/data/murec";

export function Footer() {
  return (
    <footer className="border-t border-charcoal/8 bg-ivory px-[var(--grid-margin)] py-16 md:py-20">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-16 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Image
              src={hero.logo}
              alt="MUREC"
              width={120}
              height={32}
              className="mb-8 h-7 w-auto"
            />
            <p className="mb-3 font-display text-xl text-charcoal">{footer.team}</p>
            <address className="max-w-xs not-italic font-sans text-sm leading-relaxed text-muted">
              {footer.address}
            </address>
          </div>

          <div className="md:col-span-3">
            <p className="mb-4 font-sans text-[9px] tracking-[0.35em] text-muted uppercase">
              Contact
            </p>
            <ul className="space-y-2 font-sans text-sm text-charcoal">
              <li>
                <a href={`mailto:${footer.email}`} className="transition-colors hover:text-accent">
                  {footer.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${footer.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-accent"
                >
                  {footer.phone}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="mb-4 font-sans text-[9px] tracking-[0.35em] text-muted uppercase">
              Social
            </p>
            <ul className="space-y-2">
              {footer.social.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-sans text-sm text-charcoal transition-colors hover:text-accent"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="mb-4 font-sans text-[9px] tracking-[0.35em] text-muted uppercase">
              Navigate
            </p>
            <ul className="space-y-2">
              {footer.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-sans text-sm text-charcoal transition-colors hover:text-accent"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-16 font-sans text-[10px] tracking-[0.2em] text-muted">
          {footer.copyright}
        </p>
      </div>
    </footer>
  );
}
