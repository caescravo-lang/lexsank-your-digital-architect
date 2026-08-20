import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/lexsank-mark.png";
import { WHATSAPP_URL } from "./contact";

const links = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#casos", label: "Casos" },
  { href: "#proceso", label: "Proceso" },
  { href: "#contacto", label: "Contacto" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border border-border/60 px-4 py-2.5 transition-all ${
          scrolled ? "gradient-ink/95 shadow-soft backdrop-blur-xl" : "bg-transparent backdrop-blur-md"
        }`}
      >
        <a href="#inicio" className="flex items-center gap-2 pl-1">
          <img src={logo} alt="LexSank" width={32} height={32} className="h-8 w-8" />
          <span className="font-display text-lg font-semibold tracking-tight text-foreground">
            Lex<span className="text-primary">Sank</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 rounded-full bg-surface px-1 py-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-1.5 text-sm font-medium text-ink-soft transition-colors hover:bg-background hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full gradient-brand px-5 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            Hablemos
          </a>
          <button
            type="button"
            aria-label="Abrir menú"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface text-foreground md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-3xl border border-border/60 bg-background/95 p-3 shadow-soft backdrop-blur-xl md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-2xl px-4 py-2.5 text-sm font-medium text-ink-soft hover:bg-surface hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
