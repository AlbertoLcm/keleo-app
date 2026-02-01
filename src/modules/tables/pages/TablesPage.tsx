import { CardEmptyAdded, Container, useHeaderAction } from "@/modules/shared";
import {
  CardTable,
  CardTableSkeleton,
  GridCardsTables,
  NewTableForm,
} from "..";
import { useEffect, useState } from "react";
import { LayoutGrid, List, Plus, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import api from "@/api/axios";
import { useParams } from "react-router";
import type { Table } from "../types";

type ViewModeType = "grid" | "list";

export default function TablesPage() {
  const { updateActionHeader } = useHeaderAction();

  let { restaurantId } = useParams();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<ViewModeType>("grid");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [tables, setTables] = useState<Table[]>([]);

  const fetchAllTables = async () => {
    try {
      const tablesRes = await api.get<Table[]>("tables", {
        params: {
          restaurantId,
        },
      });

      setTables(tablesRes.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al cargar datos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTables();
  }, [restaurantId]);

  useEffect(() => {
    updateActionHeader(
      <section className="flex justify-between w-full items-center">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Mapa de Mesas
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Gestiona la distribución y estado en tiempo real
          </p>
        </div>

        <div className="flex gap-2">
          <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-lg mr-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md cursor-pointer ${
                viewMode === "grid"
                  ? "bg-white dark:bg-white/20 shadow-sm"
                  : "text-gray-400"
              }`}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-md cursor-pointer ${
                viewMode === "list"
                  ? "bg-white dark:bg-white/20 shadow-sm"
                  : "text-gray-400"
              }`}
            >
              <List size={16} />
            </button>
          </div>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-keleo-600 hover:bg-keleo-700 text-white rounded-xl shadow-lg shadow-keleo-500/20 transition text-sm font-bold"
          >
            <Plus size={20} />{" "}
            <span className="hidden sm:inline">Nueva Mesa</span>
          </button>
        </div>
      </section>
    );

    return () => updateActionHeader(null);
  }, [viewMode]);

  const renderTables = () => {
    if (loading) {
      return (
        <GridCardsTables>
          {Array.from({ length: 3 }).map((_, i) => (
            <CardTableSkeleton key={i} />
          ))}
        </GridCardsTables>
      );
    }

    return (
      <GridCardsTables>
        {tables.map((table: Table) => (
          <CardTable
            tableId={table.table_id}
            key={table.table_id}
            name={table.name}
            area={table.zone}
            status={table.status}
            capacity={table.capacity}
            timeActive={table.time_active_minutes}
            totalAmount={table.total_amount}
            employeeName={table.mesero_principal}
            paymentMethod={table.payment_method}
            reservationTime={table.time_until_reservation}
            reservationName={table.reservation_name}
            reservationPeople={table.reservation_people}
            timeUntilReservation={table.time_until_reservation}
            accountId={table.account_id}
          />
        ))}
        <CardEmptyAdded
          onAction={() => setIsDrawerOpen(true)}
          title="Añadir Mesa"
          description="Registra una nueva mesa"
        />
      </GridCardsTables>
    );
  };

  return (
    <Container>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
          <button className="cursor-pointer px-4 py-2 bg-keleo-600 text-white rounded-xl shadow-md shadow-keleo-500/20 text-sm font-bold whitespace-nowrap transition">
            Todos
          </button>
          <button className="cursor-pointer px-4 py-2 bg-white/60 dark:bg-dark-card/60 backdrop-blur-md hover:bg-white dark:hover:bg-dark-card text-gray-600 dark:text-gray-300 rounded-xl border border-white/50 dark:border-white/5 text-sm font-medium whitespace-nowrap transition">
            Salón Principal
          </button>
          <button className="cursor-pointer px-4 py-2 bg-white/60 dark:bg-dark-card/60 backdrop-blur-md hover:bg-white dark:hover:bg-dark-card text-gray-600 dark:text-gray-300 rounded-xl border border-white/50 dark:border-white/5 text-sm font-medium whitespace-nowrap transition">
            Terraza
          </button>
          <button className="cursor-pointer px-4 py-2 bg-white/60 dark:bg-dark-card/60 backdrop-blur-md hover:bg-white dark:hover:bg-dark-card text-gray-600 dark:text-gray-300 rounded-xl border border-white/50 dark:border-white/5 text-sm font-medium whitespace-nowrap transition">
            Barra
          </button>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium text-gray-500 dark:text-gray-400 bg-white/40 dark:bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>{" "}
            Libre
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>{" "}
            Ocupada
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>{" "}
            Pagando
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>{" "}
            Reservada
          </div>
        </div>
      </div>

      {renderTables()}

      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Overlay/Fondo oscuro */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
              onClick={() => setIsDrawerOpen(false)}
            />

            {/* Panel Lateral (Drawer) */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md shadow-2xl z-[101] flex flex-col border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
            >
              <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Agregar Mesa</h2>
                  <p className="text-xs text-gray-500">
                    Configura los detalles de la ubicación
                  </p>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                <NewTableForm
                  onCancel={() => setIsDrawerOpen(false)}
                  onUpdateTables={() => fetchAllTables()}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Container>
  );
}
