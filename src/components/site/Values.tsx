import { MapPin } from "lucide-react";
import { LOCATION } from "./contact";

const values = [
  "Robustez técnica",
  "Transparencia",
  "Empatía comercial",
  "Escalabilidad",
  "Innovación continua",
];

export function Values() {
  return (
    <section className="border-y border-border/60 bg-surface py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 md:flex-row md:justify-between">
        <p className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          {LOCATION}
          <span className="hidden text-ink-soft sm:inline">· estándares internacionales</span>
        </p>
        <ul className="flex flex-wrap justify-center gap-2">
          {values.map((v) => (
            <li
              key={v}
              className="rounded-full border border-border bg-background px-4 py-1.5 text-xs font-medium text-ink-soft"
            >
              {v}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
