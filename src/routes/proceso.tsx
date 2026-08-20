import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Process } from "@/components/site/Process";
import { Testimonials } from "@/components/site/Testimonials";
import { Contact } from "@/components/site/Contact";

const title = "Cómo trabajamos — Método LexSank de la idea a la operación";
const description =
  "Diagnóstico, arquitectura, desarrollo iterativo y escalado: el método de LexSank para llevar tu proyecto tecnológico de la idea a la operación.";

export const Route = createFileRoute("/proceso")({
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
  component: ProcesoPage,
});

function ProcesoPage() {
  return (
    <>
      <PageHeader
        badge="Cómo trabajamos"
        title="Un método claro, de la idea a la operación"
        subtitle="Entregas iterativas, pruebas continuas y total transparencia en cada fase del proyecto."
      />
      <Process heading={false} />
      <Testimonials />
      <Contact />
    </>
  );
}
