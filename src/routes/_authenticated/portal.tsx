import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, LogOut, Plus } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/_authenticated/portal")({
  head: () => ({
    meta: [
      { title: "Portal de clientes | LexSank Interactive" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PortalPage,
});

const DEFAULT_SERVICE = "Software y apps a medida";
const services = [
  DEFAULT_SERVICE,
  "Automatización con IA",
  "Infraestructura y redes",
  "Otro",
];

function PortalPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    service: DEFAULT_SERVICE,
    description: "",
    budget_range: "",
  });

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
  }, []);

  const profile = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("*").maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const requests = useQuery({
    queryKey: ["project_requests"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("project_requests")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const createRequest = useMutation({
    mutationFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;
      if (!userId) throw new Error("Sesión no disponible");
      const { error } = await supabase.from("project_requests").insert({
        user_id: userId,
        title: form.title,
        service: form.service,
        description: form.description,
        budget_range: form.budget_range || null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Solicitud enviada.");
      setForm({ title: "", service: DEFAULT_SERVICE, description: "", budget_range: "" });
      queryClient.invalidateQueries({ queryKey: ["project_requests"] });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "No se pudo enviar."),
  });

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <>
      <PageHeader
        badge="Portal de clientes"
        title={`Hola${profile.data?.full_name ? `, ${profile.data.full_name}` : ""}`}
        {...(email ? { subtitle: email } : {})}
      />

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="rounded-3xl border border-border/70 bg-surface p-8">
            <h2 className="font-display text-lg font-semibold text-foreground">Nueva solicitud</h2>
            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                createRequest.mutate();
              }}
            >
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-ink-soft">Título</span>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full rounded-2xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-ink-soft">Servicio</span>
                <select
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="w-full rounded-2xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                >
                  {services.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-ink-soft">Descripción</span>
                <textarea
                  required
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full rounded-2xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-ink-soft">
                  Presupuesto estimado (opcional)
                </span>
                <input
                  value={form.budget_range}
                  onChange={(e) => setForm({ ...form, budget_range: e.target.value })}
                  className="w-full rounded-2xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                />
              </label>

              <button
                type="submit"
                disabled={createRequest.isPending}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full gradient-brand px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-60"
              >
                {createRequest.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
                Enviar solicitud
              </button>
            </form>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-foreground">Mis solicitudes</h2>
              <button
                type="button"
                onClick={signOut}
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-ink-soft transition-colors hover:bg-surface hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
                Salir
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {requests.isLoading && <p className="text-sm text-ink-soft">Cargando…</p>}
              {requests.data?.length === 0 && (
                <p className="rounded-3xl border border-dashed border-border p-8 text-center text-sm text-ink-soft">
                  Aún no tienes solicitudes registradas.
                </p>
              )}
              {requests.data?.map((r) => (
                <article key={r.id} className="rounded-3xl border border-border/70 bg-surface p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display font-semibold text-foreground">{r.title}</h3>
                    <span className="rounded-full bg-background px-3 py-1 text-xs font-medium text-primary">
                      {r.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-ink-soft">{r.service}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{r.description}</p>
                  {r.budget_range && (
                    <p className="mt-3 text-xs text-ink-soft">Presupuesto: {r.budget_range}</p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
