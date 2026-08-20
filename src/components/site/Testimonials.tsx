import { SectionBadge } from "./SectionBadge";

const items = [
  {
    quote:
      "Automatizamos la atención y la captación: los clientes reciben respuesta al instante, a cualquier hora.",
    name: "Dirección comercial",
    role: "Sector inmobiliario",
  },
  {
    quote:
      "La plataforma 360° cambió por completo la forma en que mostramos los espacios. Menos visitas, más cierres.",
    name: "Gerencia de proyectos",
    role: "Desarrollo y construcción",
  },
  {
    quote:
      "La red autónoma nos dio conectividad donde no llegaba nadie, con monitoreo confiable todo el año.",
    name: "Coordinación técnica",
    role: "Operaciones de campo",
  },
];

export function Testimonials() {
  return (
    <section className="px-4 py-8">
      <div className="relative overflow-hidden rounded-[2.5rem] gradient-ink px-6 py-16 md:px-14 md:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 right-0 h-[420px] w-[420px] rounded-full gradient-brand opacity-20 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl">
          <SectionBadge tone="dark">Testimonios</SectionBadge>
          <h2 className="mt-5 max-w-xl font-display text-3xl font-semibold tracking-tight text-primary-foreground md:text-4xl">
            Lo que dicen quienes ya operan con LexSank
          </h2>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {items.map((t) => (
              <figure
                key={t.name + t.role}
                className="rounded-3xl border border-primary-foreground/15 bg-primary-foreground/5 p-7 backdrop-blur-sm"
              >
                <blockquote className="text-sm leading-relaxed text-primary-foreground/85">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-primary-foreground/15 pt-4">
                  <p className="font-display text-sm font-semibold text-primary-foreground">{t.name}</p>
                  <p className="text-xs text-primary-foreground/60">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
