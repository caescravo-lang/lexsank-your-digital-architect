import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Contact } from "@/components/site/Contact";

const title = "Blog — Ideas sobre software, IA y redes | LexSank";
const description =
  "Artículos de LexSank Interactive sobre automatización con inteligencia artificial, arquitectura de software y redes inteligentes aplicadas a negocios.";

export const Route = createFileRoute("/blog")({
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
  component: BlogPage,
});

const posts = [
  {
    tag: "Inteligencia artificial",
    date: "Próximamente",
    title: "Cómo un asistente de IA califica leads mientras duermes",
    excerpt:
      "Qué debe automatizarse primero en un embudo comercial y cómo medir el impacto real en cierres.",
  },
  {
    tag: "Arquitectura",
    date: "Próximamente",
    title: "Software a medida vs. plantillas: cuándo conviene cada uno",
    excerpt:
      "Criterios técnicos y de negocio para decidir sin gastar de más en la etapa equivocada.",
  },
  {
    tag: "Redes",
    date: "Próximamente",
    title: "Redes LoRa mesh con energía solar en entornos difíciles",
    excerpt:
      "Conectividad confiable donde no llega la infraestructura tradicional, con monitoreo continuo.",
  },
];

function BlogPage() {
  return (
    <>
      <PageHeader
        badge="Blog"
        title="Ideas aplicadas a negocios reales"
        subtitle="Estamos preparando los primeros artículos. Mientras tanto, estos son los temas que vienen."
      />

      <section className="py-24">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-3">
          {posts.map((p) => (
            <article
              key={p.title}
              className="flex flex-col rounded-3xl border border-border/70 bg-surface p-7 transition-all hover:-translate-y-1 hover:shadow-soft"
            >
              <div className="flex items-center justify-between text-xs text-ink-soft">
                <span className="rounded-full border border-border bg-background px-3 py-1 font-medium">
                  {p.tag}
                </span>
                <span>{p.date}</span>
              </div>
              <h2 className="mt-5 font-display text-lg font-semibold leading-snug text-foreground">
                {p.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{p.excerpt}</p>
            </article>
          ))}
        </div>
      </section>

      <Contact />
    </>
  );
}
