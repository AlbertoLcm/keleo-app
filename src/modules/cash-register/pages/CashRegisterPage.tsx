import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import { useHeaderAction } from "@/modules/shared";
import { useRestaurantRole } from "@/modules/restaurants";
import { CashRegisterWizard } from "../components/CashRegisterWizard";
import { getCashRegisterSessions } from "../services/cash-register.service";
import type { CashRegisterSession } from "../types";
import { Vault, Clock, TrendingDown, TrendingUp, Minus, Plus } from "lucide-react";

const fmt = (v: number | string) =>
  `$${Number(v).toLocaleString("es-MX", { minimumFractionDigits: 2 })}`;

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleString("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const DiffChip = ({ value }: { value: string }) => {
  const num = Number(value);
  if (Math.abs(num) < 0.01) {
    return (
      <span className="flex items-center gap-1 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/10 px-2 py-0.5 rounded-full">
        <Minus size={10} /> $0.00
      </span>
    );
  }
  if (num > 0) {
    return (
      <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full">
        <TrendingUp size={10} /> +{fmt(num)}
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1 text-xs font-semibold text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-500/10 px-2 py-0.5 rounded-full">
      <TrendingDown size={10} /> {fmt(num)}
    </span>
  );
};

export default function CashRegisterPage() {
  const { updateActionHeader } = useHeaderAction();
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const { role, restaurant } = useRestaurantRole();

  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [sessions, setSessions] = useState<CashRegisterSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSessions = useCallback(async () => {
    if (!restaurantId) return;
    setIsLoading(true);
    try {
      const data = await getCashRegisterSessions(restaurantId, 20);
      setSessions(data);
    } catch (e) {
      console.error("Error fetching cash register sessions", e);
    } finally {
      setIsLoading(false);
    }
  }, [restaurantId]);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  // Header action
  useEffect(() => {
    updateActionHeader(
      <section className="flex justify-between w-full items-center">
        <div className="flex flex-col">
          <h1 className="text-base lg:text-lg font-bold text-gray-900 dark:text-white">
            Cierre de Caja
          </h1>
          <p className="hidden lg:block text-xs text-gray-500 dark:text-gray-400">
            Gestiona el cierre de turno y el Reporte Z
          </p>
        </div>
        <button
          id="open-cash-register-wizard"
          onClick={() => setIsWizardOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-keleo-600 hover:bg-keleo-700 text-white rounded-xl shadow-lg shadow-keleo-500/20 transition text-sm font-bold cursor-pointer"
        >
          <Vault size={18} />
          <span className="hidden sm:inline">Cerrar Caja</span>
        </button>
      </section>
    );
    return () => updateActionHeader(null);
  }, [updateActionHeader]);

  const handleWizardClose = () => {
    setIsWizardOpen(false);
    fetchSessions(); // Refresh after close
  };

  return (
    <>
      {/* Sessions history */}
      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-20 bg-gray-100 dark:bg-white/5 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : sessions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-white/5 flex items-center justify-center">
            <Vault size={32} className="text-gray-400" />
          </div>
          <div>
            <p className="text-base font-semibold text-gray-700 dark:text-gray-300">
              Sin cierres registrados
            </p>
            <p className="text-sm text-gray-400 mt-1">
              El historial de cierres de caja aparecerá aquí.
            </p>
          </div>
          <button
            onClick={() => setIsWizardOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-keleo-600 hover:bg-keleo-700 text-white rounded-xl text-sm font-bold transition shadow-lg shadow-keleo-500/20"
          >
            <Plus size={16} />
            Realizar primer cierre
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="bg-white dark:bg-dark-card border border-gray-100 dark:border-white/8 rounded-2xl p-4 flex items-center gap-4 hover:shadow-md dark:hover:shadow-black/20 transition"
            >
              {/* Status dot */}
              <div
                className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                  session.status === "closed"
                    ? "bg-emerald-500"
                    : "bg-amber-500 animate-pulse"
                }`}
              />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {session.users_opened.name}
                  </span>
                  <DiffChip value={session.difference_total} />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
                  <Clock size={11} />
                  {fmtDate(session.created_at)}
                </div>
              </div>

              {/* Amounts */}
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-gray-900 dark:text-white font-mono">
                  {fmt(session.system_total)}
                </p>
                <p className="text-[10px] text-gray-400">Sistema</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Wizard */}
      {restaurantId && (
        <CashRegisterWizard
          isOpen={isWizardOpen}
          onClose={handleWizardClose}
          restaurantId={restaurantId}
          restaurantName={restaurant?.name || "Restaurante"}
          role={role || "cashier"}
        />
      )}
    </>
  );
}
