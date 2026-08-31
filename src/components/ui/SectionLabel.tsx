type SectionLabelProps = {
  children: React.ReactNode;
  className?: string;
};

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <span
      className={`font-sans text-[10px] uppercase tracking-[0.35em] text-muted ${className}`}
    >
      {children}
    </span>
  );
}
