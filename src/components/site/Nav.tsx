import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, LogIn, Menu, X } from "lucide-react";
import logo from "@/assets/lexsank-mark.png";
import { useAuth } from "@/hooks/useAuth";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/servicios", label: "Servicios" },
  { to: "/casos", label: "Casos" },
  { to: "/proceso", label: "Proceso" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/blog", label: "Blog" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { session } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border border-primary-foreground/15 gradient-ink px-4 py-2.5 transition-all ${
          scrolled ? "shadow-glow" : ""
        }`}
      >
        <Link to="/" className="flex items-center gap-2 pl-1">
          <img src={logo} alt="LexSank" width={32} height={32} className="h-8 w-8" />
          <span className="font-display text-lg font-semibold tracking-tight text-primary-foreground">
            Lex<span className="text-brand">Sank</span>
          </span>
        </Link>

        <div className="hidden items-center gap-0.5 rounded-full bg-primary-foreground/10 px-1 py-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "bg-primary-foreground/20 text-primary-foreground" }}
              className="rounded-full px-3.5 py-1.5 text-sm font-medium text-primary-foreground/70 transition-colors hover:bg-primary-foreground/15 hover:text-primary-foreground"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {session ? (
            <Link
              to="/portal"
              className="hidden items-center gap-2 rounded-full gradient-brand px-5 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03] sm:inline-flex"
            >
              <LayoutDashboard className="h-4 w-4" />
              Mi portal
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => navigate({ to: "/auth" })}
              className="hidden items-center gap-2 rounded-full gradient-brand px-5 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03] sm:inline-flex"
            >
              <LogIn className="h-4 w-4" />
              Entrar
            </button>
          )}
          <button
            type="button"
            aria-label="Abrir menú"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-3xl border border-primary-foreground/15 gradient-ink p-3 shadow-soft lg:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block rounded-2xl px-4 py-2.5 text-sm font-medium text-primary-foreground/75 hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to={session ? "/portal" : "/auth"}
            onClick={() => setOpen(false)}
            className="mt-1 block rounded-2xl gradient-brand px-4 py-2.5 text-center text-sm font-medium text-primary-foreground"
          >
            {session ? "Mi portal" : "Entrar"}
          </Link>
        </div>
      )}
    </header>
  );
}
