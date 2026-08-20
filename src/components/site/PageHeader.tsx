import { SectionBadge } from "./SectionBadge";

export function PageHeader({
  badge,
  title,
  subtitle,
}: {
  badge: string;
  title: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden rounded-b-[2.5rem] gradient-ink px-6 pt-32 pb-16 text-center md:rounded-b-[3.5rem] md:pt-40 md:pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full gradient-brand opacity-20 blur-3xl"
      />
      <div className="relative mx-auto max-w-3xl">
        <SectionBadge tone="dark">{badge}</SectionBadge>
        <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-primary-foreground md:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-primary-foreground/70">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
