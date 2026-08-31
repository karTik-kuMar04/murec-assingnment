import Image from "next/image";
import { footer, hero } from "@/data/murec";

export function Footer() {
  return (
    <footer className="relative border-t border-cream/[0.08] bg-[#050505] px-[var(--grid-margin)] py-20 text-cream md:py-28">
      {/* Background grain */}
      <div className="grain absolute inset-0 opacity-15 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1600px]">
        <div className="grid gap-16 md:grid-cols-12 md:gap-8">
          {/* Brand & Address */}
          <div className="md:col-span-5">
            <Image
              src={hero.logo}
              alt="MUREC"
              width={120}
              height={32}
              className="mb-8 h-7 w-auto brightness-0 invert opacity-90"
            />
            <p className="mb-4 font-display text-2xl text-cream">{footer.team}</p>
            <address className="max-w-xs not-italic font-sans text-sm leading-relaxed text-cream/50">
              {footer.address}
            </address>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3">
            <p className="mb-4 font-sans text-[10px] tracking-[0.3em] text-accent uppercase">
              Inquiries
            </p>
            <ul className="space-y-3 font-sans text-sm text-cream/70">
              <li>
                <a
                  href={`mailto:${footer.email}`}
                  className="transition-colors hover:text-accent"
                >
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

          {/* Social Channels */}
          <div className="md:col-span-2">
            <p className="mb-4 font-sans text-[10px] tracking-[0.3em] text-accent uppercase">
              Social
            </p>
            <ul className="space-y-3">
              {footer.social.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-sans text-sm text-cream/70 transition-colors hover:text-accent"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2">
            <p className="mb-4 font-sans text-[10px] tracking-[0.3em] text-accent uppercase">
              Navigation
            </p>
            <ul className="space-y-3">
              {footer.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-sans text-sm text-cream/70 transition-colors hover:text-accent"
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

        {/* Bottom Copyright & Accreditation */}
        <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-cream/[0.06] pt-8 font-sans text-[10px] tracking-[0.2em] text-cream/35 uppercase">
          <p>{footer.copyright}</p>
          <p>IGBC Green Certified Architectural Collection</p>
        </div>
      </div>
    </footer>
  );
}
