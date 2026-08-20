import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Cases } from "@/components/site/Cases";
import { Contact } from "@/components/site/Contact";

const title = "Casos de estudio — AERUM 360, Bucare Suite, Red LoRa | LexSank";
const description =
  "Portafolio de impacto de LexSank: recorridos virtuales 360°, ecosistemas inmobiliarios con IA y redes LoRa mesh autónomas con energía solar.";

export const Route = createFileRoute("/casos")({
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
  component: CasosPage,
});

function CasosPage() {
  return (
    <>
      <PageHeader
        badge="Casos de estudio"
        title="Portafolio de impacto"
        subtitle="Proyectos en producción donde la arquitectura integral cambió los resultados del negocio."
      />
      <Cases heading={false} />
      <Contact />
    </>
  );
}
