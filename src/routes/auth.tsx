import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { PageHeader } from "@/components/site/PageHeader";

const title = "Acceso al portal de clientes | LexSank Interactive";
const description =
  "Inicia sesión o crea tu cuenta en el portal de clientes de LexSank para registrar y seguir tus solicitudes de proyecto.";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/portal", replace: true });
    });
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { full_name: fullName, company },
          },
        });
        if (error) throw error;
        toast.success("Cuenta creada. Bienvenido a LexSank.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Sesión iniciada.");
      }
      navigate({ to: "/portal", replace: true });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No pudimos completar la operación.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error("No pudimos iniciar sesión con Google.");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/portal", replace: true });
  }

  return (
    <>
      <PageHeader
        badge="Portal de clientes"
        title={mode === "login" ? "Inicia sesión" : "Crea tu cuenta"}
        subtitle="Registra tus solicitudes de proyecto y sigue su avance en un solo lugar."
      />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-md rounded-3xl border border-border/70 bg-surface p-8 shadow-soft">
          <div className="mb-6 grid grid-cols-2 rounded-full bg-background p-1 text-sm font-medium">
            {(["login", "signup"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`rounded-full px-4 py-2 transition-colors ${
                  mode === m ? "gradient-brand text-primary-foreground" : "text-ink-soft"
                }`}
              >
                {m === "login" ? "Iniciar sesión" : "Registrarme"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <>
                <Field label="Nombre completo" value={fullName} onChange={setFullName} required />
                <Field label="Empresa (opcional)" value={company} onChange={setCompany} />
              </>
            )}
            <Field label="Correo" type="email" value={email} onChange={setEmail} required />
            <Field
              label="Contraseña"
              type="password"
              value={password}
              onChange={setPassword}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full gradient-brand px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-60"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {mode === "login" ? "Entrar" : "Crear cuenta"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs text-ink-soft">
            <span className="h-px flex-1 bg-border" />o<span className="h-px flex-1 bg-border" />
          </div>

          <button
            type="button"
            onClick={handleGoogle}
            className="w-full rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface"
          >
            Continuar con Google
          </button>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-ink-soft">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-shadow focus:ring-2 focus:ring-ring"
      />
    </label>
  );
}
