import { useEffect } from "react";
import { useNavigate } from "react-router";
import { CheckCircle, PartyPopper, ArrowRight } from "lucide-react";
import { Container, NavBar } from "@/modules/shared";
import { useSubscriptionContext } from "@/modules/subscriptions";
import { ROUTES } from "@/routes/paths";

export default function SubscriptionSuccessPage() {
  const { refetch } = useSubscriptionContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Invalidamos el cache de suscripción al llegar aquí
    refetch();
  }, [refetch]);

  const planNames: Record<string, string> = {
    basic: "Básico",
    pro: "Pro",
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-200">
      <NavBar />
      <Container>
        <div className="max-w-lg mx-auto mt-20 text-center">
          {/* Success icon */}
          <div className="relative inline-flex mb-8">
            <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle size={52} className="text-green-500 dark:text-green-400" strokeWidth={1.5} />
            </div>
            <div className="absolute -top-1 -right-1 w-9 h-9 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center border-2 border-white dark:border-dark-bg">
              <PartyPopper size={18} className="text-yellow-500" />
            </div>
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
            ¡Suscripción activada!
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg">
            Tu plan ya está activo. Ahora tienes acceso a todas las funcionalidades de tu nuevo plan.
          </p>

          <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-100 dark:border-white/5 shadow-sm mb-8 text-left">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 font-medium">¿Qué sigue?</p>
            <ul className="space-y-3">
              {[
                "Crea o administra tus restaurantes",
                "Agrega tu equipo de trabajo",
                "Configura tu menú sin límites",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                  <div className="w-5 h-5 rounded-full bg-keleo-100 dark:bg-keleo-900/30 text-keleo-600 dark:text-keleo-400 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold">{i + 1}</span>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate(ROUTES.RESTAURANTS.INDEX)}
              className="flex-1 py-3 px-5 bg-keleo-500 hover:bg-keleo-600 text-white font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-sm shadow-keleo-500/20"
            >
              Ir a mis restaurantes
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigate(ROUTES.GLOBAL_SETTINGS)}
              className="flex-1 py-3 px-5 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 font-bold rounded-xl transition"
            >
              Ver configuración
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}
