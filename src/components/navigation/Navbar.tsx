"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MenuOverlay } from "./MenuOverlay";
import { hero, navigation } from "@/data/murec";

const DARK_SECTIONS = new Set(["hero", "principles", "associations", "contact"]);

type NavbarProps = {
  ready?: boolean;
};

export function Navbar({ ready = true }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

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
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
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

  const onDark = DARK_SECTIONS.has(activeSection);
  const textClass = onDark ? "text-cream" : "text-charcoal";
  const mutedClass = onDark ? "text-cream/55" : "text-muted";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-opacity duration-700 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      >
        <nav
          className="flex items-center justify-between px-[var(--grid-margin)] py-6"
          aria-label="Main navigation"
        >
          <Link href="/" className="relative z-[60]">
            <Image
              src={hero.logo}
              alt="MUREC"
              width={100}
              height={26}
              className={`h-6 w-auto transition-all duration-500 md:h-7 ${
                onDark ? "brightness-0 invert" : ""
              }`}
              priority
            />
          </Link>

          <div className="relative z-[60] flex items-center gap-6 md:gap-10">
            <span className={`hidden text-meta lg:block ${mutedClass}`}>
              {activeSection.replace("-", " ")}
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className={`text-label transition-opacity hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${textClass} ${
                onDark ? "focus-visible:outline-cream" : "focus-visible:outline-charcoal"
              }`}
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              Menu
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
