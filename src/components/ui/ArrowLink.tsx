import { ArrowRight } from "lucide-react";
import Link from "next/link";

type ArrowLinkProps = {
  href: string;
  label: string;
  className?: string;
};

export function ArrowLink({ href, label, className = "" }: ArrowLinkProps) {
  const isExternal = href.startsWith("http");

  const content = (
    <>
      <span className="link-underline font-sans text-xs tracking-[0.2em] uppercase">{label}</span>
      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-cream/20 transition-all duration-300 group-hover:border-accent group-hover:scale-110">
        <ArrowRight
          className="h-3.5 w-3.5 text-cream/75 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-accent"
          aria-hidden
        />
      </span>
    </>
  );

  const classes = `group inline-flex min-h-[44px] items-center gap-3.5 text-cream transition-colors duration-300 hover:text-accent ${className}`;

  if (isExternal) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
