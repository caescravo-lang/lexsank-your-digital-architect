import { Mail, MapPin, MessageCircle } from "lucide-react";
import { EMAIL, EMAIL_URL, LOCATION, WHATSAPP_URL } from "./contact";

export function Contact() {
  return (
    <section id="contacto" className="px-4 pb-20">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] gradient-ink px-6 py-16 text-center md:px-16 md:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full gradient-brand opacity-30 blur-3xl"
        />
        <div className="relative">
          <h2 className="mx-auto max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight text-primary-foreground md:text-5xl">
            Innovación sin fronteras: el ecosistema digital y físico que su negocio demanda.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm text-primary-foreground/70 md:text-base">
            Conversemos sobre tu proyecto. Respondemos con una propuesta de arquitectura concreta,
            plazos y alcance.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full gradient-brand px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              <MessageCircle className="h-4 w-4" />
              Escribir por WhatsApp
            </a>
            <a
              href={EMAIL_URL}
              className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              <Mail className="h-4 w-4" />
              {EMAIL}
            </a>
          </div>

          <p className="mt-8 inline-flex items-center gap-2 text-xs text-primary-foreground/60">
            <MapPin className="h-3.5 w-3.5" />
            {LOCATION}
          </p>
        </div>
      </div>
    </section>
  );
}
