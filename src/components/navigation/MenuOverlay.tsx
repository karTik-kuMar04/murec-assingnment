"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, registerGsap } from "@/lib/gsap";
import { X } from "lucide-react";

registerGsap();

type MenuItem = { label: string; href: string };

type MenuOverlayProps = {
  open: boolean;
  onClose: () => void;
  items: readonly MenuItem[];
};

export function MenuOverlay({ open, onClose, items }: MenuOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!open || !overlayRef.current || !panelRef.current || !linksRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 });
      gsap.fromTo(
        panelRef.current,
        { clipPath: "inset(0% 100% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power4.inOut" },
      );
      gsap.from(linksRef.current!.children, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.07,
        ease: "power3.out",
        delay: 0.25,
      });
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
      className="fixed inset-0 z-[55] bg-charcoal/40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        className="absolute inset-y-0 right-0 flex w-full flex-col bg-charcoal/95 px-[var(--grid-margin)] py-8 md:w-[min(720px,85vw)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-3 p-2 font-sans text-[10px] tracking-[0.3em] text-cream/60 uppercase transition-colors hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream"
            aria-label="Close menu"
          >
            Close
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <nav className="flex flex-1 items-center">
          <ul ref={linksRef} className="space-y-1 md:space-y-3">
            {items.map((item) => {
              const isExternal = item.href.startsWith("http");
              const label = item.label.toUpperCase();
              return (
                <li key={item.label}>
                  {isExternal ? (
                    <a
                      href={item.href}
                      onClick={onClose}
                      className="font-display text-4xl text-cream transition-colors hover:text-accent md:text-6xl lg:text-7xl"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="font-display text-4xl text-cream transition-colors hover:text-accent md:text-6xl lg:text-7xl"
                    >
                      {label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <p className="font-sans text-[9px] tracking-[0.4em] text-cream/35 uppercase">
          Legacy in Motion
        </p>
      </div>
    </div>
  );
}
