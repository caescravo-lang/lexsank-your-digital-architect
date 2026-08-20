import logo from "@/assets/lexsank-mark.png";
import { EMAIL, EMAIL_URL, LOCATION } from "./contact";

export function Footer() {
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 md:flex-row md:justify-between">
        <div className="flex items-center gap-2">
          <img src={logo} alt="LexSank" width={28} height={28} loading="lazy" className="h-7 w-7" />
          <span className="font-display font-semibold text-foreground">LexSank Interactive</span>
        </div>

        <nav className="flex flex-wrap justify-center gap-5 text-sm text-ink-soft">
          <a href="#servicios" className="hover:text-foreground">Servicios</a>
          <a href="#casos" className="hover:text-foreground">Casos</a>
          <a href="#proceso" className="hover:text-foreground">Proceso</a>
          <a href={EMAIL_URL} className="hover:text-foreground">{EMAIL}</a>
        </nav>

        <p className="text-xs text-ink-soft">{LOCATION}</p>
      </div>
    </footer>
  );
}
