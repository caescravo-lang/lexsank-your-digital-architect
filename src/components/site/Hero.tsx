import { ArrowRight, MessageCircle } from "lucide-react";
import heroMockup from "@/assets/hero-mockup.jpg";
import { WHATSAPP_URL } from "./contact";

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full opacity-25 blur-3xl gradient-brand"
      />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-1.5 text-xs font-medium tracking-wide text-ink-soft">
            <span className="h-1.5 w-1.5 rounded-full gradient-brand" />
            Innovación sin fronteras
          </span>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-6xl">
            Soluciones tecnológicas avanzadas con{" "}
            <span className="bg-gradient-to-r from-brand to-brand-deep bg-clip-text text-transparent">
              impacto empresarial definitivo
            </span>
            .
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
            Tu visión, ejecutada con arquitectura tecnológica integral: software a medida,
            inteligencia artificial y redes inteligentes que transforman procesos y multiplican
            tus ventas.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full gradient-brand px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
            >
              <MessageCircle className="h-4 w-4" />
              Agendar consultoría
            </a>
            <a
              href="#casos"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface"
            >
              Ver casos de estudio
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4">
            {[
              ["3", "Ecosistemas en producción"],
              ["24/7", "Automatización con IA"],
              ["100%", "Arquitectura a medida"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl bg-surface p-4">
                <dt className="font-display text-2xl font-semibold text-foreground">{value}</dt>
                <dd className="mt-1 text-xs leading-snug text-ink-soft">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="absolute inset-4 rounded-[2.5rem] gradient-brand opacity-15 blur-2xl" aria-hidden />
          <img
            src={heroMockup}
            alt="Plataforma empresarial de LexSank en escritorio y móvil"
            width={1200}
            height={1008}
            className="relative w-full rounded-[2rem] border border-border/60 bg-surface object-cover shadow-soft"
          />
        </div>
      </div>
    </section>
  );
}
