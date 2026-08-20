import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Values } from "@/components/site/Values";
import { Contact } from "@/components/site/Contact";

const title = "Nosotros — LexSank Interactive, ingeniería desde Táchira";
const description =
  "LexSank Interactive nace en San Cristóbal, Táchira, con estándares internacionales de ingeniería, desarrollo e innovación tecnológica para empresas.";

export const Route = createFileRoute("/nosotros")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NosotrosPage,
});

const pillars = [
  {
    title: "Propósito",
    text: "Desarrollar arquitecturas tecnológicas integrales —software, inteligencia artificial y hardware/redes— que transforman empresas, optimizan procesos y maximizan ventas.",
  },
  {
    title: "Alcance",
    text: "Con base en San Cristóbal, Táchira, operamos con estándares internacionales de ingeniería, documentación y calidad de entrega.",
  },
  {
    title: "Forma de trabajar",
    text: "Equipos pequeños, comunicación directa con quien construye y decisiones técnicas explicadas en lenguaje de negocio.",
  },
];

function NosotrosPage() {
  return (
    <>
      <PageHeader
        badge="Nosotros"
        title="Innovación sin fronteras, con raíz local"
        subtitle="Somos una firma de ingeniería y producto que combina software, IA e infraestructura física en una sola arquitectura."
      />

      <section className="py-24">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-3">
          {pillars.map((p) => (
            <article key={p.title} className="rounded-3xl border border-border/70 bg-surface p-8">
              <h2 className="font-display text-lg font-semibold text-foreground">{p.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{p.text}</p>
            </article>
          ))}
        </div>
      </section>

      <Values />
      <Contact />
    </>
  );
}
