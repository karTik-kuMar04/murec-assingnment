import { ArrowRight } from "lucide-react";
import Link from "next/link";

type ArrowLinkProps = {
  href: string;
  label: string;
  className?: string;
  dark?: boolean;
};

export function ArrowLink({ href, label, className = "", dark = false }: ArrowLinkProps) {
  const isExternal = href.startsWith("http");

  const content = (
    <>
      <span className="link-underline">{label}</span>
      <ArrowRight
        className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5"
        aria-hidden
      />
    </>
  );

  const classes = `group inline-flex min-h-[44px] items-center gap-3 text-label transition-colors duration-300 ${
    dark ? "text-charcoal hover:text-accent" : "text-cream hover:text-accent"
  } ${className}`;

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
