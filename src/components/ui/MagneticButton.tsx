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
  variant = "light",
  className = "",
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const isExternal = href.startsWith("http");

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.12;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.12;
    setOffset({ x, y });
  };

  const handleLeave = () => setOffset({ x: 0, y: 0 });

  const classes = `group inline-flex min-h-[44px] items-center gap-3 rounded-full border px-6 py-3 text-label transition-all duration-500 ${
    variant === "light"
      ? "border-cream/25 text-cream hover:border-cream/60 hover:bg-cream/5"
      : "border-charcoal/15 text-charcoal hover:border-charcoal hover:bg-charcoal/5"
  } ${className}`;

  const style = { transform: `translate(${offset.x}px, ${offset.y}px)` };

  const content = (
    <>
      <span>{label}</span>
      <ArrowRight
        className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
        aria-hidden
      />
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
