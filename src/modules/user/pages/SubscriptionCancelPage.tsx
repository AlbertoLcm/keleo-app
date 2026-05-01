import { useNavigate } from "react-router";
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react";
import { Container, NavBar } from "@/modules/shared";
import { ROUTES } from "@/routes/paths";

export default function SubscriptionCancelPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-200">
      <NavBar />
      <Container>
        <div className="max-w-lg mx-auto mt-20 text-center">
          <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center mx-auto mb-8">
            <XCircle size={52} className="text-gray-400 dark:text-gray-500" strokeWidth={1.5} />
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
            Proceso cancelado
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-2 text-lg">
            No se realizó ningún cargo.
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mb-10">
            Puedes suscribirte cuando quieras. Tu plan actual sigue activo sin cambios.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate(ROUTES.SUBSCRIPTION)}
              className="flex-1 py-3 px-5 bg-keleo-500 hover:bg-keleo-600 text-white font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-sm shadow-keleo-500/20"
            >
              <RefreshCw size={16} />
              Ver planes de nuevo
            </button>
            <button
              onClick={() => navigate(ROUTES.RESTAURANTS.INDEX)}
              className="flex-1 py-3 px-5 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 font-bold rounded-xl transition flex items-center justify-center gap-2"
            >
              <ArrowLeft size={16} />
              Volver al inicio
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}
