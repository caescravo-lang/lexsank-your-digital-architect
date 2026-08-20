import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import heroMockup from "@/assets/hero-mockup.jpg";
import { WHATSAPP_URL } from "./contact";
import { SectionBadge } from "./SectionBadge";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden rounded-b-[2.5rem] gradient-ink px-4 pt-32 pb-16 md:rounded-b-[3.5rem] md:pt-40 md:pb-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full gradient-brand opacity-25 blur-3xl"
      />
      <div className="relative mx-auto max-w-5xl text-center">
        <SectionBadge tone="dark">
          <Sparkles className="mr-2 h-3.5 w-3.5" />
          Innovación sin fronteras
        </SectionBadge>

        <h1 className="mx-auto mt-7 max-w-4xl font-display text-4xl font-semibold leading-[1.08] tracking-tight text-primary-foreground md:text-6xl">
          Soluciones tecnológicas avanzadas con{" "}
          <span className="bg-gradient-to-r from-brand to-primary-foreground bg-clip-text text-transparent">
            impacto empresarial definitivo
          </span>
          .
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/70 md:text-lg">
          Tu visión, ejecutada con arquitectura tecnológica integral: software a medida,
          inteligencia artificial y redes inteligentes que transforman procesos y multiplican tus
          ventas.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
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
            className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
          >
            Ver casos de estudio
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="relative mx-auto mt-14 max-w-5xl">
        <img
          src={heroMockup}
          alt="Plataforma empresarial de LexSank en escritorio y móvil"
          width={1200}
          height={1008}
          className="w-full rounded-[2rem] border border-primary-foreground/15 object-cover shadow-glow"
        />

        <dl className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            ["3", "Ecosistemas en producción"],
            ["24/7", "Automatización con IA"],
            ["100%", "Arquitectura a medida"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-5 backdrop-blur-sm"
            >
              <dt className="font-display text-2xl font-semibold text-primary-foreground">{value}</dt>
              <dd className="mt-1 text-xs leading-snug text-primary-foreground/65">{label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
