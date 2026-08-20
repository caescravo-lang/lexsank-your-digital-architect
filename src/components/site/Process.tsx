import { SectionBadge } from "./SectionBadge";

const steps = [
  {
    n: "01",
    title: "Diagnóstico",
    text: "Analizamos procesos, cuellos de botella y oportunidades reales de venta.",
  },
  {
    n: "02",
    title: "Arquitectura",
    text: "Diseñamos la solución integral: software, IA e infraestructura necesaria.",
  },
  {
    n: "03",
    title: "Desarrollo",
    text: "Construimos con entregas iterativas, pruebas continuas y total transparencia.",
  },
  {
    n: "04",
    title: "Escalado",
    text: "Medimos resultados, optimizamos y escalamos la plataforma con tu crecimiento.",
  },
];

export function Process({ heading = true }: { heading?: boolean }) {
  return (
    <section id="proceso" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        {heading && (
        <div className="mx-auto max-w-2xl text-center">
          <SectionBadge>Cómo trabajamos</SectionBadge>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Un método claro, de la idea a la operación
          </h2>
        </div>
        )}

        <ol className="grid gap-5 md:grid-cols-4 mt-14 first:mt-0">
          {steps.map((s) => (
            <li key={s.n} className="rounded-3xl border border-border/70 bg-surface p-7 transition-all hover:-translate-y-1 hover:shadow-soft">
              <span className="font-display text-sm font-semibold text-primary">{s.n}</span>
              <h3 className="mt-5 font-display text-lg font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
