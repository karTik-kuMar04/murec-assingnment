"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, registerGsap } from "@/lib/gsap";
import { X, ArrowUpRight } from "lucide-react";

registerGsap();

type MenuItem = { label: string; href: string };

type MenuOverlayProps = {
  open: boolean;
  onClose: () => void;
  items: readonly MenuItem[];
};

export function MenuOverlay({ open, onClose, items }: MenuOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || !overlayRef.current || !linksRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0, clipPath: "inset(0% 0% 100% 0%)" },
        { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 0.75, ease: "power4.inOut" },
      );

      gsap.from(linksRef.current!.querySelectorAll("li"), {
        y: 40,
        opacity: 0,
        filter: "blur(4px)",
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.out",
        delay: 0.2,
      });

      if (metaRef.current) {
        gsap.from(metaRef.current.children, {
          y: 20,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          delay: 0.35,
        });
      }
    });

    return () => ctx.revert();
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#080808] px-[var(--grid-margin)] py-8 md:py-12 text-cream select-none overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      {/* Background ambient lighting and grain */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(197,168,128,0.08),transparent_60%)]" />
      <div className="grain absolute inset-0 opacity-20 pointer-events-none" />

      {/* Top Bar */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="font-sans text-[10px] tracking-[0.3em] text-cream/40 uppercase">
          MUREC Navigation
        </span>
        <button
          type="button"
          onClick={onClose}
          className="group flex items-center gap-3 font-sans text-xs tracking-[0.25em] text-cream/70 uppercase transition-colors hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-cream"
          aria-label="Close menu"
        >
          <span>CLOSE</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-cream/15 transition-transform duration-300 group-hover:rotate-90 group-hover:border-cream/40">
            <X className="h-4 w-4" aria-hidden />
          </span>
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 my-auto grid gap-12 py-8 lg:grid-cols-12 lg:items-center">
        {/* Navigation Links */}
        <nav className="lg:col-span-8">
          <ul ref={linksRef} className="space-y-2 md:space-y-3">
            {items.map((item, idx) => {
              const isExternal = item.href.startsWith("http");
              const label = item.label.toUpperCase();
              const indexStr = String(idx + 1).padStart(2, "0");

              return (
                <li key={item.label} className="overflow-hidden">
                  {isExternal ? (
                    <a
                      href={item.href}
                      onClick={onClose}
                      className="group inline-flex items-baseline gap-4 md:gap-8 font-display text-3xl sm:text-5xl md:text-6xl text-cream/80 transition-all duration-300 hover:text-cream hover:translate-x-3"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="font-mono text-xs text-accent tracking-widest transition-opacity group-hover:opacity-100">
                        {indexStr}
                      </span>
                      <span>{label}</span>
                      <ArrowUpRight className="h-5 w-5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 text-accent" />
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group inline-flex items-baseline gap-4 md:gap-8 font-display text-3xl sm:text-5xl md:text-6xl text-cream/80 transition-all duration-300 hover:text-cream hover:translate-x-3"
                    >
                      <span className="font-mono text-xs text-accent tracking-widest transition-opacity group-hover:opacity-100">
                        {indexStr}
                      </span>
                      <span>{label}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right Side Editorial Meta */}
        <div ref={metaRef} className="hidden lg:col-span-4 lg:flex lg:flex-col lg:gap-8 border-l border-cream/10 pl-12 text-cream/50">
          <div>
            <p className="text-meta text-accent mb-2">HEADQUARTERS</p>
            <p className="font-sans text-sm text-cream/80 leading-relaxed">
              Madhusudan, Riana Towers<br />
              Sector 136, Noida<br />
              Uttar Pradesh, India
            </p>
          </div>
          <div>
            <p className="text-meta text-accent mb-2">INQUIRIES</p>
            <p className="font-sans text-sm text-cream/80">info@murec.com</p>
            <p className="font-sans text-sm text-cream/80">+91 97177 73229</p>
          </div>
          <div>
            <p className="text-meta text-accent mb-2">ACCREDITATION</p>
            <p className="font-sans text-xs text-cream/60">
              IGBC Certified Green Architectural Collection
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-cream/10 font-sans text-[10px] tracking-[0.2em] text-cream/40 uppercase">
        <span>Madhusudan Urban Real Estate Collection</span>
        <span>Est. 1954 · Seven Decades of Legacy</span>
      </div>
    </div>
  );
}
