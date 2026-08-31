"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MenuOverlay } from "./MenuOverlay";
import { hero, navigation } from "@/data/murec";

type NavbarProps = {
  ready?: boolean;
};

export function Navbar({ ready = true }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = [
      "hero",
      "legacy",
      "principles",
      "collection",
      "philosophy",
      "associations",
      "partners",
      "contact",
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: 0 },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
          ready ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        } ${
          scrolled
            ? "bg-charcoal/70 backdrop-blur-md border-b border-cream/[0.06] py-4"
            : "bg-transparent py-6 md:py-8"
        }`}
      >
        <nav
          className="flex items-center justify-between px-[var(--grid-margin)]"
          aria-label="Main navigation"
        >
          <Link href="/" className="group relative z-[60] flex items-center gap-3">
            <Image
              src={hero.logo}
              alt="MUREC"
              width={110}
              height={28}
              className={`transition-all duration-500 brightness-0 invert opacity-90 group-hover:opacity-100 ${
                scrolled ? "h-5 md:h-6" : "h-6 md:h-7"
              }`}
              style={{ width: "auto" }}
              priority
            />
          </Link>

          <div className="relative z-[60] flex items-center gap-6 md:gap-10">
            <div className="hidden items-center gap-3 font-sans text-[10px] tracking-[0.25em] text-cream/40 uppercase lg:flex">
              <span className="h-1 w-1 rounded-full bg-accent" />
              <span>{activeSection.replace("-", " ")}</span>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="group flex items-center gap-3 text-label text-cream transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream"
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <span className="relative overflow-hidden">
                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                  MENU
                </span>
                <span className="absolute inset-0 inline-block translate-y-full text-accent transition-transform duration-300 group-hover:translate-y-0">
                  MENU
                </span>
              </span>
              <span className="flex flex-col gap-1 w-4">
                <span className="h-px w-full bg-cream/80 transition-all duration-300 group-hover:bg-accent group-hover:w-3" />
                <span className="h-px w-full bg-cream/80 transition-all duration-300 group-hover:bg-accent" />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <MenuOverlay
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={navigation.items}
      />
    </>
  );
}
