import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { EMAIL, EMAIL_URL, LOCATION, WHATSAPP_URL } from "@/components/site/contact";

const title = "Contacto — Conversemos sobre tu proyecto | LexSank";
const description =
  "Escríbenos por WhatsApp o correo y recibe una propuesta de arquitectura concreta con plazos y alcance. San Cristóbal, Táchira — Venezuela.";

export const Route = createFileRoute("/contacto")({
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
  component: ContactoPage,
});

function ContactoPage() {
  return (
    <>
      <PageHeader
        badge="Contacto"
        title="Conversemos sobre tu proyecto"
        subtitle="Respondemos con una propuesta de arquitectura concreta: alcance, plazos y prioridades."
      />

      <section className="py-24">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-3xl border border-border/70 bg-surface p-8 transition-all hover:-translate-y-1 hover:shadow-soft"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl gradient-brand text-primary-foreground">
              <MessageCircle className="h-5 w-5" />
            </span>
            <h2 className="mt-6 font-display text-lg font-semibold text-foreground">WhatsApp</h2>
            <p className="mt-2 text-sm text-ink-soft">
              La vía más rápida. Cuéntanos qué necesitas y agendamos una consultoría.
            </p>
          </a>

          <a
            href={EMAIL_URL}
            className="rounded-3xl border border-border/70 bg-surface p-8 transition-all hover:-translate-y-1 hover:shadow-soft"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl gradient-brand text-primary-foreground">
              <Mail className="h-5 w-5" />
            </span>
            <h2 className="mt-6 font-display text-lg font-semibold text-foreground">Correo</h2>
            <p className="mt-2 text-sm text-ink-soft">{EMAIL}</p>
          </a>

          <div className="rounded-3xl border border-border/70 bg-surface p-8">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl gradient-brand text-primary-foreground">
              <MapPin className="h-5 w-5" />
            </span>
            <h2 className="mt-6 font-display text-lg font-semibold text-foreground">Ubicación</h2>
            <p className="mt-2 text-sm text-ink-soft">{LOCATION}</p>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-6xl px-6">
          <div className="rounded-3xl border border-border/70 bg-background p-8 text-center">
            <h2 className="font-display text-xl font-semibold text-foreground">
              ¿Prefieres dejar tu solicitud por escrito?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-ink-soft">
              Crea tu cuenta en el portal de clientes y registra tu solicitud con todos los
              detalles. Podrás seguir su estado en cualquier momento.
            </p>
            <Link
              to="/auth"
              className="mt-6 inline-flex rounded-full gradient-brand px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              Entrar al portal de clientes
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
