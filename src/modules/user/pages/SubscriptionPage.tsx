import { useState } from "react";
import { Container, NavBar } from "@/modules/shared";
import {
  Check, Sparkles, Zap, Rocket, Crown, ArrowRight,
  Building2, Users, UtensilsCrossed, LayoutGrid, Star
} from "lucide-react";
import { subscriptionService } from "@/modules/subscriptions";
import { useSubscriptionContext } from "@/modules/subscriptions";
import { useNavigate } from "react-router";

const PLANS = [
  {
    id: "free" as const,
    name: "Free",
    price: "0",
    description: "Para emprendedores que inician su negocio.",
    icon: <Star size={22} />,
    color: "gray",
    features: [
      "1 restaurante",
      "Hasta 5 mesas",
      "Hasta 10 productos en menú",
      "Gestión de pedidos básica",
      "Acceso web completo",
    ],
    limitations: ["Sin módulo de cocina", "Sin empleados/staff", "Sin sucursales extra"],
    cta: "Tu plan actual",
    gradient: false,
  },
  {
    id: "basic" as const,
    name: "Básico",
    price: "229",
    description: "Para restaurantes en crecimiento que necesitan más poder.",
    icon: <Zap size={22} />,
    color: "keleo",
    features: [
      "1 restaurante",
      "Mesas ilimitadas",
      "Menú ilimitado",
      "Módulo de cocina en tiempo real",
      "Hasta 5 empleados",
      "Gestión de roles (mesero, cocina)",
      "Soporte por correo",
    ],
    limitations: [],
    cta: "Suscribirse — $229/mes",
    gradient: false,
    popular: false,
  },
  {
    id: "pro" as const,
    name: "Pro",
    price: "399",
    description: "Para dueños de múltiples sucursales que necesitan control total.",
    icon: <Crown size={22} />,
    color: "indigo",
    features: [
      "Hasta 3 restaurantes / sucursales",
      "Mesas y menú ilimitados",
      "Empleados ilimitados",
      "Todos los roles avanzados",
      "Dashboard y reportes",
      "Soporte prioritario por WhatsApp",
      "Módulo de cocina en tiempo real",
    ],
    limitations: [],
    cta: "Suscribirse — $399/mes",
    gradient: true,
    popular: true,
  },
];

const COMPARISON = [
  { feature: "Restaurantes / Sucursales", free: "1", basic: "1", pro: "3" },
  { feature: "Mesas", free: "Hasta 5", basic: "Ilimitadas", pro: "Ilimitadas" },
  { feature: "Productos en Menú", free: "Hasta 10", basic: "Ilimitados", pro: "Ilimitados" },
  { feature: "Empleados", free: "—", basic: "Hasta 5", pro: "Ilimitados" },
  { feature: "Módulo Cocina (Tiempo Real)", free: false, basic: true, pro: true },
  { feature: "Roles avanzados", free: false, basic: false, pro: true },
  { feature: "Soporte", free: "Comunidad", basic: "Correo", pro: "WhatsApp Prioritario" },
];

export default function SubscriptionPage() {
  const { plan: currentPlan } = useSubscriptionContext();
  const [loading, setLoading] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubscribe = async (planId: "basic" | "pro") => {
    try {
      setLoading(planId);
      const { url } = await subscriptionService.createCheckout(planId);
      window.location.href = url;
    } catch (err: any) {
      alert(err?.response?.data?.message || "Error al iniciar el proceso de pago. Intenta más tarde.");
    } finally {
      setLoading(null);
    }
  };

  const handleManage = async () => {
    try {
      setLoading("portal");
      const { url } = await subscriptionService.createBillingPortal();
      window.location.href = url;
    } catch (err: any) {
      alert(err?.response?.data?.message || "Error al abrir el portal de pagos.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-200 pb-20">
      <NavBar />
      <Container>
        {/* Header */}
        <div className="max-w-5xl mx-auto mt-8 md:mt-14 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-keleo-100 dark:bg-keleo-900/30 text-keleo-600 dark:text-keleo-400 text-sm font-bold mb-6 border border-keleo-200 dark:border-keleo-500/20">
            <Sparkles size={15} />
            Planes de Suscripción
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            El plan ideal para cada etapa
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Empieza gratis y escala cuando lo necesites. Sin contratos. Cancela en cualquier momento.
          </p>

          {/* Current plan badge */}
          {currentPlan !== "free" && (
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-500/20 text-green-700 dark:text-green-400 text-sm font-bold">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Plan {currentPlan === "basic" ? "Básico" : "Pro"} activo
              <button
                onClick={handleManage}
                disabled={loading === "portal"}
                className="ml-2 text-xs underline opacity-70 hover:opacity-100 transition"
              >
                {loading === "portal" ? "Cargando..." : "Gestionar pago"}
              </button>
            </div>
          )}
        </div>

        {/* Plans Grid */}
        <div className="max-w-5xl mx-auto mt-12 grid md:grid-cols-3 gap-6 items-stretch">
          {PLANS.map((p) => {
            const isActive = currentPlan === p.id;
            const isPro = p.gradient;

            return (
              <div
                key={p.id}
                className={`relative rounded-3xl p-7 flex flex-col transition-all duration-300
                  ${isPro
                    ? "bg-gradient-to-b from-indigo-600 via-keleo-600 to-indigo-800 text-white shadow-2xl shadow-keleo-500/20 scale-[1.02] md:scale-[1.04] z-10 border border-keleo-400/30"
                    : "bg-white dark:bg-dark-card border border-gray-200 dark:border-white/5 shadow-sm hover:border-keleo-300 dark:hover:border-keleo-700/50"
                  }`}
              >
                {p.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 text-xs font-extrabold px-4 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
                      <Rocket size={11} />
                      Más Popular
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-5
                  ${isPro
                    ? "bg-white/20"
                    : p.id === "free"
                      ? "bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400"
                      : "bg-keleo-50 dark:bg-keleo-900/30 text-keleo-600 dark:text-keleo-400"
                  }`}
                >
                  {p.icon}
                </div>

                <h3 className={`text-xl font-extrabold mb-1 ${isPro ? "text-white" : "text-gray-900 dark:text-white"}`}>
                  {p.name}
                </h3>
                <p className={`text-sm mb-5 ${isPro ? "text-keleo-100" : "text-gray-500 dark:text-gray-400"}`}>
                  {p.description}
                </p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-4xl font-black ${isPro ? "text-white" : "text-gray-900 dark:text-white"}`}>
                      ${p.price}
                    </span>
                    {p.price !== "0" && (
                      <span className={`text-sm ${isPro ? "text-keleo-200" : "text-gray-400 dark:text-gray-500"}`}>
                        MXN/mes
                      </span>
                    )}
                    {p.price === "0" && (
                      <span className={`text-sm ${isPro ? "text-keleo-200" : "text-gray-400 dark:text-gray-500"}`}>
                        siempre gratis
                      </span>
                    )}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {p.features.map((f, i) => (
                    <li key={i} className={`flex items-start gap-2.5 text-sm
                      ${isPro ? "text-keleo-100" : "text-gray-600 dark:text-gray-300"}`}
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5
                        ${isPro ? "bg-white/20 text-white" : "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"}`}
                      >
                        <Check size={11} strokeWidth={3} />
                      </div>
                      {f}
                    </li>
                  ))}
                  {p.limitations.map((f, i) => (
                    <li key={`lim-${i}`} className={`flex items-start gap-2.5 text-sm opacity-50
                      ${isPro ? "text-keleo-200" : "text-gray-400 dark:text-gray-500"}`}
                    >
                      <div className="w-5 h-5 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-gray-400 dark:text-gray-600 text-xs font-bold">—</span>
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {isActive ? (
                  p.id === "free" ? (
                    <div className={`w-full py-3 rounded-xl text-sm font-bold text-center
                      ${isPro ? "bg-white/20 text-white" : "bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400"}`}
                    >
                      Plan Actual
                    </div>
                  ) : (
                    <button
                      onClick={handleManage}
                      disabled={loading === "portal"}
                      className="w-full py-3 rounded-xl bg-white/20 hover:bg-white/30 text-white text-sm font-bold transition flex items-center justify-center gap-2 border border-white/20"
                    >
                      {loading === "portal" ? "Cargando..." : "Gestionar suscripción"}
                    </button>
                  )
                ) : p.id === "free" ? (
                  <div className="w-full py-3 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-500 text-sm font-bold text-center cursor-not-allowed">
                    Plan gratuito — siempre disponible
                  </div>
                ) : (
                  <button
                    onClick={() => handleSubscribe(p.id as "basic" | "pro")}
                    disabled={!!loading}
                    className={`w-full py-3 rounded-xl text-sm font-bold transition flex items-center justify-center gap-2
                      ${isPro
                        ? "bg-white text-keleo-700 hover:bg-gray-50 shadow-lg shadow-keleo-900/20 active:scale-[0.98]"
                        : "bg-keleo-500 hover:bg-keleo-600 text-white shadow-sm shadow-keleo-500/20 active:scale-[0.98]"
                      } disabled:opacity-60 disabled:cursor-not-allowed`}
                  >
                    {loading === p.id ? (
                      <span className="animate-pulse">Procesando...</span>
                    ) : (
                      <>
                        {p.cta}
                        <ArrowRight size={15} />
                      </>
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Comparison Table */}
        <div className="max-w-5xl mx-auto mt-20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Comparativa completa
          </h2>
          <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-white/5">
                  <th className="text-left px-6 py-4 text-sm font-bold text-gray-500 dark:text-gray-400 w-[40%]">
                    Característica
                  </th>
                  {["Free", "Básico", "Pro"].map((h) => (
                    <th key={h} className="px-4 py-4 text-center text-sm font-extrabold text-gray-900 dark:text-white">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-gray-50 dark:border-white/[0.03] last:border-0
                      ${i % 2 === 0 ? "" : "bg-gray-50/50 dark:bg-white/[0.01]"}`}
                  >
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300 font-medium">
                      <div className="flex items-center gap-2">
                        {row.feature.includes("Restaurante") && <Building2 size={14} className="text-gray-400" />}
                        {row.feature.includes("Mesa") && <LayoutGrid size={14} className="text-gray-400" />}
                        {row.feature.includes("Empleado") && <Users size={14} className="text-gray-400" />}
                        {row.feature.includes("Cocina") && <UtensilsCrossed size={14} className="text-gray-400" />}
                        {row.feature}
                      </div>
                    </td>
                    {[row.free, row.basic, row.pro].map((val, j) => (
                      <td key={j} className="px-4 py-4 text-center">
                        {typeof val === "boolean" ? (
                          val ? (
                            <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center mx-auto">
                              <Check size={13} strokeWidth={3} />
                            </div>
                          ) : (
                            <span className="text-gray-300 dark:text-gray-600 text-lg font-bold">—</span>
                          )
                        ) : (
                          <span className={`text-sm font-semibold
                            ${j === 2 ? "text-keleo-600 dark:text-keleo-400" : "text-gray-700 dark:text-gray-300"}`}
                          >
                            {val}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ bottom note */}
        <p className="text-center text-sm text-gray-400 dark:text-gray-500 mt-8">
          Todos los precios en MXN + IVA. Puedes cancelar o cambiar de plan en cualquier momento desde tu portal de pagos.
        </p>
      </Container>
    </div>
  );
}
