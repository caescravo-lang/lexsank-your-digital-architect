import { SectionBadge } from "./SectionBadge";
import aerum from "@/assets/case-aerum.jpg";
import bucare from "@/assets/case-bucare.jpg";
import lora from "@/assets/case-lora.jpg";

const cases = [
  {
    name: "AERUM 360",
    tag: "Plataforma web inmersiva",
    image: aerum,
    alt: "Interfaz de recorrido virtual 360 grados de AERUM 360",
    text: "Plataforma web interactiva con recorridos virtuales inmersivos en 360°, interfaz minimalista y moderna que permite explorar espacios completos desde cualquier dispositivo.",
    impact: ["Recorridos 360° inmersivos", "Interfaz minimalista", "Carga optimizada"],
  },
  {
    name: "Bucare Suite",
    tag: "Ecosistema con IA",
    image: bucare,
    alt: "Panel de gestión inmobiliaria Bucare Suite con asistente de IA",
    text: "Ecosistema de gestión inmobiliaria potenciado con IA y asistentes automatizados para la captación y atención continua de clientes.",
    impact: ["Asistentes automatizados", "Captación 24/7", "Gestión centralizada"],
  },
  {
    name: "Red LoRa Mesh",
    tag: "Infraestructura autónoma",
    image: lora,
    alt: "Red descentralizada de nodos LoRa con energía solar",
    text: "Red descentralizada de telecomunicaciones y sensores interconectados mediante energía solar, de largo alcance y alta confiabilidad.",
    impact: ["Largo alcance", "Energía solar", "Sin punto único de falla"],
  },
];

export function Cases({ heading = true }: { heading?: boolean }) {
  return (
    <section id="casos" className="bg-surface py-24">
      <div className="mx-auto max-w-6xl px-6">
        {heading && (
        <div className="mx-auto max-w-2xl text-center">
          <SectionBadge>Casos de estudio</SectionBadge>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Portafolio de impacto
          </h2>
        </div>
        )}

        <div className="space-y-8 mt-14 first:mt-0">
          {cases.map((c, i) => (
            <article
              key={c.name}
              className="grid items-center gap-8 overflow-hidden rounded-[2rem] border border-border/60 bg-background p-6 md:grid-cols-2 md:p-8"
            >
              <img
                src={c.image}
                alt={c.alt}
                width={1008}
                height={752}
                loading="lazy"
                className={`w-full rounded-2xl object-cover ${i % 2 === 1 ? "md:order-2" : ""}`}
              />
              <div className={i % 2 === 1 ? "md:order-1 md:pr-6" : "md:pl-2"}>
                <span className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-ink-soft">
                  {c.tag}
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-foreground">
                  {c.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{c.text}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {c.impact.map((p) => (
                    <li
                      key={p}
                      className="rounded-full border border-border px-3 py-1.5 text-xs text-ink-soft"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
