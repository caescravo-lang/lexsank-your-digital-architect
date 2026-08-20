import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Services } from "@/components/site/Services";
import { Process } from "@/components/site/Process";
import { Contact } from "@/components/site/Contact";

const title = "Servicios — Software, IA e infraestructura | LexSank";
const description =
  "Desarrollo de software y apps a medida, automatización con inteligencia artificial 24/7 e infraestructura de redes inteligentes para empresas.";

export const Route = createFileRoute("/servicios")({
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
  component: ServiciosPage,
});

function ServiciosPage() {
  return (
    <>
      <PageHeader
        badge="Servicios"
        title="El ecosistema digital y físico que su negocio demanda"
        subtitle="Tres capas complementarias que se integran en una sola arquitectura: software, inteligencia y conectividad."
      />
      <Services heading={false} />
      <Process />
      <Contact />
    </>
  );
}
