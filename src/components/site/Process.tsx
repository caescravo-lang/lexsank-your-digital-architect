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

export function Process() {
  return (
    <section id="proceso" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Cómo trabajamos
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Un método claro, de la idea a la operación
          </h2>
        </div>

        <ol className="mt-14 grid gap-5 md:grid-cols-4">
          {steps.map((s) => (
            <li key={s.n} className="rounded-3xl bg-surface p-7">
              <span className="font-display text-sm font-semibold text-primary">{s.n}</span>
              <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
