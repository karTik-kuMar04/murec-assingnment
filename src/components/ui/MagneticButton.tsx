"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

type MagneticButtonProps = {
  href: string;
  label: string;
  variant?: "light" | "dark";
  className?: string;
};

export function MagneticButton({
  href,
  label,
  className = "",
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const isExternal = href.startsWith("http");

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
    setOffset({ x, y });
  };

  const handleLeave = () => setOffset({ x: 0, y: 0 });

  const classes = `group inline-flex min-h-[48px] items-center gap-4 rounded-full border border-cream/20 bg-charcoal/40 px-7 py-3 text-label text-cream backdrop-blur-sm transition-all duration-300 hover:border-accent hover:bg-accent/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cream ${className}`;

  const style = { transform: `translate(${offset.x}px, ${offset.y}px)` };

  const content = (
    <>
      <span className="font-sans text-xs tracking-[0.22em] text-cream/90 uppercase transition-colors group-hover:text-cream">
        {label}
      </span>
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cream/10 transition-all duration-300 group-hover:bg-accent group-hover:text-charcoal">
        <ArrowRight
          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden
        />
      </span>
    </>
  );

  if (isExternal) {
    return (
      <a
        ref={ref}
        href={href}
        className={classes}
        style={style}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      ref={ref}
      href={href}
      className={classes}
      style={style}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {content}
    </Link>
  );
}
