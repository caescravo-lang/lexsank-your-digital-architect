import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  FolderKanban,
  LayoutDashboard,
  Loader2,
  LogOut,
  Plus,
  Save,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { WHATSAPP_URL } from "@/components/site/contact";

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

const statusStyles: Record<string, string> = {
  nuevo: "bg-brand/10 text-brand-deep",
  "en revisión": "bg-amber-500/10 text-amber-600",
  "en curso": "bg-brand/15 text-brand-deep",
  entregado: "bg-emerald-500/10 text-emerald-600",
  cerrado: "bg-muted text-ink-soft",
};

type Tab = "resumen" | "solicitudes" | "perfil";

const navItems: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "resumen", label: "Resumen", icon: LayoutDashboard },
  { id: "solicitudes", label: "Solicitudes", icon: FolderKanban },
  { id: "perfil", label: "Mi perfil", icon: UserRound },
];

function PortalPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<Tab>("resumen");
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

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

  const stats = useMemo(() => {
    const list = requests.data ?? [];
    const open = list.filter((r) => !["entregado", "cerrado"].includes(r.status)).length;
    const done = list.filter((r) => ["entregado", "cerrado"].includes(r.status)).length;
    return [
      { label: "Solicitudes totales", value: list.length, icon: FolderKanban },
      { label: "En proceso", value: open, icon: Clock },
      { label: "Completadas", value: done, icon: CheckCircle2 },
    ];
  }, [requests.data]);

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  const displayName = profile.data?.full_name || email?.split("@")[0] || "cliente";
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-surface">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 py-6 lg:flex-row lg:px-8 lg:py-8">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)] lg:w-64 lg:shrink-0">
          <div className="flex h-full flex-col rounded-3xl gradient-ink p-5 text-white/80">
            <Link to="/" className="flex items-center gap-2 px-2 py-1">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl gradient-brand text-sm font-semibold text-primary-foreground">
                LS
              </span>
              <span className="font-display text-sm font-semibold text-white">LexSank</span>
            </Link>

            <nav className="mt-8 flex gap-1 lg:flex-col">
              {navItems.map((item) => {
                const active = tab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTab(item.id)}
                    className={`flex flex-1 items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-medium transition-colors lg:flex-none ${
                      active
                        ? "bg-white/12 text-white"
                        : "text-white/60 hover:bg-white/8 hover:text-white"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="mt-8 hidden rounded-2xl border border-white/10 bg-white/5 p-4 lg:block">
              <Sparkles className="h-4 w-4 text-brand" />
              <p className="mt-3 text-xs leading-relaxed text-white/70">
                ¿Necesitas hablar con un ingeniero ahora mismo?
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-white"
              >
                Escribir por WhatsApp <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>

            <button
              type="button"
              onClick={signOut}
              className="mt-auto hidden items-center gap-3 rounded-2xl px-4 py-2.5 text-sm text-white/60 transition-colors hover:bg-white/8 hover:text-white lg:flex"
            >
              <LogOut className="h-4 w-4" />
              Cerrar sesión
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1 space-y-6">
          <header className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-border/70 bg-background p-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-ink-soft">
                Portal de clientes
              </p>
              <h1 className="mt-1 font-display text-2xl font-semibold text-foreground">
                Hola, {displayName}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-full gradient-brand px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                <Plus className="h-4 w-4" />
                Nueva solicitud
              </button>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-surface text-sm font-semibold text-foreground">
                {initials}
              </span>
              <button
                type="button"
                onClick={signOut}
                aria-label="Cerrar sesión"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink-soft transition-colors hover:bg-surface lg:hidden"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </header>

          {tab === "resumen" && (
            <>
              <div className="grid gap-4 sm:grid-cols-3">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-3xl border border-border/70 bg-background p-6"
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-surface text-brand-deep">
                      <s.icon className="h-4 w-4" />
                    </span>
                    <p className="mt-5 font-display text-3xl font-semibold text-foreground">
                      {s.value}
                    </p>
                    <p className="mt-1 text-sm text-ink-soft">{s.label}</p>
                  </div>
                ))}
              </div>

              <section className="rounded-3xl border border-border/70 bg-background p-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-lg font-semibold text-foreground">
                    Actividad reciente
                  </h2>
                  <button
                    type="button"
                    onClick={() => setTab("solicitudes")}
                    className="text-sm font-medium text-brand-deep"
                  >
                    Ver todas
                  </button>
                </div>
                <div className="mt-5">
                  <RequestList
                    loading={requests.isLoading}
                    items={(requests.data ?? []).slice(0, 4)}
                    onCreate={() => setModalOpen(true)}
                  />
                </div>
              </section>
            </>
          )}

          {tab === "solicitudes" && (
            <section className="rounded-3xl border border-border/70 bg-background p-6">
              <h2 className="font-display text-lg font-semibold text-foreground">Mis solicitudes</h2>
              <div className="mt-5">
                <RequestList
                  loading={requests.isLoading}
                  items={requests.data ?? []}
                  onCreate={() => setModalOpen(true)}
                />
              </div>
            </section>
          )}

          {tab === "perfil" && <ProfileCard email={email} profile={profile.data} />}
        </main>
      </div>

      {modalOpen && <NewRequestModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}

type RequestRow = {
  id: string;
  title: string;
  service: string;
  description: string;
  budget_range: string | null;
  status: string;
  created_at: string;
};

function RequestList({
  loading,
  items,
  onCreate,
}: {
  loading: boolean;
  items: RequestRow[];
  onCreate: () => void;
}) {
  if (loading) {
    return (
      <div className="flex items-center gap-2 py-8 text-sm text-ink-soft">
        <Loader2 className="h-4 w-4 animate-spin" /> Cargando…
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-10 text-center">
        <p className="text-sm text-ink-soft">Aún no tienes solicitudes registradas.</p>
        <button
          type="button"
          onClick={onCreate}
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface"
        >
          <Plus className="h-4 w-4" /> Crear la primera
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((r) => (
        <article
          key={r.id}
          className="rounded-2xl border border-border/70 bg-surface p-5 transition-colors hover:border-brand/40"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="font-display font-semibold text-foreground">{r.title}</h3>
              <p className="mt-0.5 text-xs text-ink-soft">
                {r.service} ·{" "}
                {new Date(r.created_at).toLocaleDateString("es-VE", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                statusStyles[r.status] ?? "bg-muted text-ink-soft"
              }`}
            >
              {r.status}
            </span>
          </div>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-soft">{r.description}</p>
          {r.budget_range && (
            <p className="mt-3 text-xs text-ink-soft">Presupuesto: {r.budget_range}</p>
          )}
        </article>
      ))}
    </div>
  );
}

function ProfileCard({
  email,
  profile,
}: {
  email: string | null;
  profile: { full_name: string | null; company: string | null; phone: string | null } | null | undefined;
}) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ full_name: "", company: "", phone: "" });

  useEffect(() => {
    if (profile) {
      setForm({
        full_name: profile.full_name ?? "",
        company: profile.company ?? "",
        phone: profile.phone ?? "",
      });
    }
  }, [profile]);

  const save = useMutation({
    mutationFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;
      if (!userId) throw new Error("Sesión no disponible");
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: form.full_name || null,
          company: form.company || null,
          phone: form.phone || null,
        })
        .eq("id", userId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Perfil actualizado.");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "No se pudo guardar."),
  });

  return (
    <section className="rounded-3xl border border-border/70 bg-background p-6">
      <h2 className="font-display text-lg font-semibold text-foreground">Mi perfil</h2>
      <p className="mt-1 text-sm text-ink-soft">{email}</p>

      <form
        className="mt-6 grid max-w-2xl gap-4 sm:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          save.mutate();
        }}
      >
        <Field
          label="Nombre completo"
          value={form.full_name}
          onChange={(v) => setForm({ ...form, full_name: v })}
        />
        <Field
          label="Empresa"
          value={form.company}
          onChange={(v) => setForm({ ...form, company: v })}
        />
        <Field
          label="Teléfono"
          value={form.phone}
          onChange={(v) => setForm({ ...form, phone: v })}
        />
        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={save.isPending}
            className="inline-flex items-center gap-2 rounded-full gradient-brand px-6 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-60"
          >
            {save.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Guardar cambios
          </button>
        </div>
      </form>
    </section>
  );
}

function NewRequestModal({ onClose }: { onClose: () => void }) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    title: "",
    service: DEFAULT_SERVICE,
    description: "",
    budget_range: "",
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
      toast.success("Solicitud enviada. Te contactaremos pronto.");
      queryClient.invalidateQueries({ queryKey: ["project_requests"] });
      onClose();
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "No se pudo enviar."),
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-border/70 bg-background p-7 shadow-soft"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">Nueva solicitud</h2>
            <p className="mt-1 text-sm text-ink-soft">
              Cuéntanos qué necesitas y preparamos una propuesta de arquitectura.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="rounded-full p-1.5 text-ink-soft transition-colors hover:bg-surface"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            createRequest.mutate();
          }}
        >
          <Field
            label="Título"
            required
            value={form.title}
            onChange={(v) => setForm({ ...form, title: v })}
          />

          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-ink-soft">Servicio</span>
            <select
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
              className="w-full rounded-2xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
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
              className="w-full rounded-2xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <Field
            label="Presupuesto estimado (opcional)"
            value={form.budget_range}
            onChange={(v) => setForm({ ...form, budget_range: v })}
          />

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-surface"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={createRequest.isPending}
              className="inline-flex items-center gap-2 rounded-full gradient-brand px-6 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-60"
            >
              {createRequest.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              Enviar solicitud
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-ink-soft">{label}</span>
      <input
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
      />
    </label>
  );
}
