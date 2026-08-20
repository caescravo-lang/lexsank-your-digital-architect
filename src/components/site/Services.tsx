import { Code2, Bot, Radio } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Desarrollo de software y apps a medida",
    text: "Plataformas web interactivas, sistemas empresariales escalables y aplicaciones con diseño UX/UI intuitivo.",
    points: ["Arquitectura escalable", "Integración con tus sistemas", "UX orientada a conversión"],
  },
  {
    icon: Bot,
    title: "Automatización con inteligencia artificial 24/7",
    text: "Agentes inteligentes y asistentes de voz que atienden, califican y cierran ventas de forma continua.",
    points: ["Atención sin horarios", "Calificación automática de leads", "Asistentes de voz y chat"],
  },
  {
    icon: Radio,
    title: "Infraestructura y redes inteligentes",
    text: "Conectividad avanzada, hardware adaptado y redes autónomas para entornos desafiantes.",
    points: ["Redes LoRa y mesh", "Energía solar autónoma", "Monitoreo con sensores"],
  },
];

export function Services() {
  return (
    <section id="servicios" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Servicios
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            El ecosistema digital y físico que su negocio demanda
          </h2>
          <p className="mt-4 text-ink-soft">
            Tres capas complementarias que se integran en una sola arquitectura: software,
            inteligencia y conectividad.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map(({ icon: Icon, title, text, points }) => (
            <article
              key={title}
              className="group rounded-3xl border border-border/70 bg-background p-7 transition-all hover:-translate-y-1 hover:shadow-soft"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl gradient-brand text-primary-foreground">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-6 font-display text-lg font-semibold leading-snug text-foreground">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{text}</p>
              <ul className="mt-5 space-y-2 border-t border-border/70 pt-5">
                {points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm text-ink-soft">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
