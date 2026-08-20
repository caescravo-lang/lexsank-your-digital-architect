import logo from "@/assets/lexsank-mark.png";
import { EMAIL, EMAIL_URL, LOCATION, WHATSAPP_URL } from "./contact";

export function Footer() {
  return (
    <footer className="overflow-hidden border-t border-border/60 pt-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2">
            <img src={logo} alt="LexSank" width={28} height={28} loading="lazy" className="h-7 w-7" />
            <span className="font-display font-semibold text-foreground">LexSank Interactive</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-soft">
            Arquitecturas tecnológicas integrales: software, inteligencia artificial e
            infraestructura de redes. Innovación sin fronteras.
          </p>
          <p className="mt-4 text-xs text-ink-soft">{LOCATION}</p>
        </div>

        <nav className="flex flex-col gap-3 text-sm text-ink-soft">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
            Secciones
          </p>
          <a href="#servicios" className="hover:text-foreground">Servicios</a>
          <a href="#casos" className="hover:text-foreground">Casos</a>
          <a href="#proceso" className="hover:text-foreground">Proceso</a>
          <a href="#contacto" className="hover:text-foreground">Contacto</a>
        </nav>

        <nav className="flex flex-col gap-3 text-sm text-ink-soft">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
            Contacto
          </p>
          <a href={EMAIL_URL} className="hover:text-foreground">{EMAIL}</a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
            WhatsApp
          </a>
        </nav>
      </div>

      <p
        aria-hidden
        className="pointer-events-none mt-10 select-none bg-gradient-to-b from-surface to-background bg-clip-text text-center font-display text-[18vw] font-bold leading-[0.8] tracking-tight text-transparent"
      >
        LexSank
      </p>
    </footer>
  );
}
