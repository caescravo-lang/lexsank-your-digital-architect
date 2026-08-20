export function SectionBadge({ children, tone = "light" }: { children: React.ReactNode; tone?: "light" | "dark" }) {
  return (
    <span
      className={
        tone === "dark"
          ? "inline-flex items-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-xs font-medium tracking-wide text-primary-foreground/80"
          : "inline-flex items-center rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium tracking-wide text-ink-soft"
      }
    >
      {children}
    </span>
  );
}
