import { CardEmptyAdded, useHeaderAction, FilterTabs, useWebSocket } from "@/modules/shared";
import {
  CardTable,
  CardTableSkeleton,
  GridCardsTables,
  NewTableForm,
} from "..";
import { useEffect, useState, useMemo, useCallback } from "react";
import { LayoutGrid, List, Plus, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import api from "@/api/axios";
import { useParams, useSearchParams } from "react-router";
import type { Table, Zone } from "../types";
import { useRestaurantRole } from "@/modules/restaurants";

type ViewModeType = "grid" | "list";

export default function TablesPage() {
  const { updateActionHeader } = useHeaderAction();
  let { restaurantId } = useParams();
  const { socket } = useWebSocket();
  

  const [searchParams, setSearchParams] = useSearchParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<ViewModeType>("grid");
  const { role } = useRestaurantRole();
  const canAddTable = ['owner', 'admin', 'manager', 'waiter'].includes(role || '');
  // const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [tables, setTables] = useState<Table[]>([]);

  const zoneFiltered = searchParams.get("zone") || "all";

  const [zones, setZones] = useState<Zone[]>([]);

  const fetchZones = useCallback(async () => {
    try {
      const { data } = await api.get<Zone[]>("zones", {
        params: { restaurantId },
      });
      setZones(data);
    } catch (err) {
      console.error("Error al cargar zonas", err);
    }
  }, [restaurantId]);

  const fetchTables = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get<Table[]>("tables", {
        params: {
          restaurantId,
          zoneId:
            zoneFiltered && zoneFiltered !== "all" ? zoneFiltered : undefined,
        },
      });
      setTables(data);
    } catch (err: any) {
      console.error("Error al cargar mesas", err);
    } finally {
      setLoading(false);
    }
  }, [restaurantId, zoneFiltered]);

  useEffect(() => {
    fetchZones();
  }, [fetchZones]);

  useEffect(() => {
    fetchTables();
  }, [fetchTables]);

  useEffect(() => {
    if (socket) {
      const handleTableUpdated = () => {
        fetchTables();
      };

      socket.on("tableUpdated", handleTableUpdated);

      return () => {
        socket.off("tableUpdated", handleTableUpdated);
      };
    }
  }, [socket, fetchTables]);

  const headerContent = useMemo(
    () => (
      <section className="flex justify-between w-full items-center">
        <div className="flex flex-col">
          <h1 className="text-base lg:text-lg font-bold text-gray-900 dark:text-white">
            Mapa de Mesas
          </h1>
          <p className="hidden lg:block text-xs text-gray-500 dark:text-gray-400">
            Gestiona la distribución y estado en tiempo real
          </p>
        </div>

        <div className="flex">
          <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-lg mr-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md cursor-pointer transition-colors ${
                viewMode === "grid"
                  ? "bg-white dark:bg-white/20 shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-md cursor-pointer transition-colors ${
                viewMode === "list"
                  ? "bg-white dark:bg-white/20 shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <List size={16} />
            </button>
          </div>

          {canAddTable && (
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-keleo-600 hover:bg-keleo-700 text-white rounded-xl shadow-lg shadow-keleo-500/20 transition text-sm font-bold"
            >
              <Plus size={20} />
              <span className="hidden sm:inline">Nueva Mesa</span>
            </button>
          )}
        </div>
      </section>
    ),
    [viewMode, canAddTable],
  );

  useEffect(() => {
    updateActionHeader(headerContent);
    return () => updateActionHeader(null);
  }, [headerContent, updateActionHeader]);

  const tablesContent = useMemo(() => {
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
        {tables.length === 0 && canAddTable && (
          <CardEmptyAdded
            onAction={() => setIsDrawerOpen(true)}
            title="Añadir Mesa"
            description="Registra una nueva mesa"
          />
        )}
      </GridCardsTables>
    );
  }, [loading, tables, canAddTable]);

  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  const handleZoneClick = (zoneId: string) => {
    if (zoneId === "all") {
      searchParams.delete("zone");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ zone: zoneId });
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 -mx-4 md:-mx-6">
        <FilterTabs
          options={[
            { id: "all", label: "Todas" },
            ...zones.map((zone) => ({ id: zone.id, label: zone.name }))
          ]}
          activeId={zoneFiltered}
          onChange={(id) => handleZoneClick(id || "all")}
          className="w-full md:w-auto pb-2 md:pb-0"
          contentBefore={<div className="w-3 md:w-4 shrink-0" aria-hidden="true"></div>}
          contentAfter={<div className="w-3 md:w-4 shrink-0" aria-hidden="true"></div>}
        />

        <div className="mx-4 md:mx-6 flex items-center gap-4 text-xs font-medium text-gray-500 dark:text-gray-400 bg-white/40 dark:bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">
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

      {tablesContent}

      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
              onClick={closeDrawer}
            />

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
                  onClick={closeDrawer}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                <NewTableForm
                  zones={zones}
                  onZoneAdded={(newZone) =>
                    setZones((prev) => [...prev, newZone])
                  }
                  onCancel={closeDrawer}
                  onUpdateTables={fetchTables}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
