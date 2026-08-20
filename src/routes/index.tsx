import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Values } from "@/components/site/Values";
import { Services } from "@/components/site/Services";
import { Cases } from "@/components/site/Cases";
import { Testimonials } from "@/components/site/Testimonials";
import { Process } from "@/components/site/Process";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

const title = "LexSank Interactive — Arquitectura tecnológica integral";
const description =
  "Software a medida, automatización con IA 24/7 e infraestructura de redes inteligentes. Innovación sin fronteras desde San Cristóbal, Táchira, con estándares internacionales.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "LexSank Interactive",
          slogan: "Innovación sin fronteras: el ecosistema digital y físico que su negocio demanda.",
          description,
          address: {
            "@type": "PostalAddress",
            addressLocality: "San Cristóbal",
            addressRegion: "Táchira",
            addressCountry: "VE",
          },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Nav />
      <main>
        <Hero />
        <Values />
        <Services />
        <Cases />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
