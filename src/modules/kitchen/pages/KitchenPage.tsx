import { useEffect, useState, useCallback, useMemo } from "react";
import { useParams } from "react-router";
import { getKitchenActiveOrders } from "../api/kitchen.api";
import type { KitchenActiveAccount } from "../api/kitchen.api";
import { KitchenTicket } from "../components/KitchenTicket";
import { ChefHat, RefreshCw } from "lucide-react";
import { useHeaderAction, useWebSocket } from "../../shared";

export default function KitchenPage() {
  const { restaurantId } = useParams();
  const { updateActionHeader } = useHeaderAction();
  const { socket } = useWebSocket();
  
  const [data, setData] = useState<KitchenActiveAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefetching, setIsRefetching] = useState(false);

  const fetchOrders = useCallback(async (background = false) => {
    if (!restaurantId) return;
    
    if (background) {
      setIsRefetching(true);
    } else {
      setIsLoading(true);
    }

    try {
      const orders = await getKitchenActiveOrders(restaurantId);
      setData(orders);
    } catch (error) {
      console.error("Failed to fetch kitchen orders", error);
    } finally {
      setIsLoading(false);
      setIsRefetching(false);
    }
  }, [restaurantId]);

  useEffect(() => {
    fetchOrders();
    
    if (socket) {
      const handleKitchenUpdated = () => {
        fetchOrders(true);
      };

      socket.on("kitchenUpdated", handleKitchenUpdated);

      return () => {
        socket.off("kitchenUpdated", handleKitchenUpdated);
      };
    }
  }, [fetchOrders, socket]);

  const handleRefresh = () => {
    fetchOrders(true);
  };

  const headerContent = useMemo(
    () => (
      <section className="flex justify-between w-full items-center">
        <div className="flex flex-col">
          <h1 className="text-base lg:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            Cocina
          </h1>
          <p className="hidden md:block text-xs text-gray-500 dark:text-gray-400">
            Vista de comandas en preparación
          </p>
        </div>

        <div className="flex">
          <button
            onClick={() => fetchOrders(false)}
            disabled={isRefetching || isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-dark-bg border border-gray-200 dark:border-white/10 rounded-xl text-sm font-bold shadow-sm hover:bg-gray-50 dark:hover:bg-white/5 transition-colors disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw
              size={16}
              className={isRefetching || isLoading ? "animate-spin" : ""}
            />
            <span className="hidden sm:inline">Actualizar</span>
          </button>
        </div>
      </section>
    ),
    [fetchOrders, isRefetching, isLoading]
  );

  useEffect(() => {
    updateActionHeader(headerContent);
    return () => updateActionHeader(null);
  }, [headerContent, updateActionHeader]);

  return (
    <>
      <div className="py-2 min-h-[calc(100vh-120px)]">
        {isLoading ? (
          <div className="flex items-center justify-center h-[50vh]">
            <div className="flex flex-col items-center gap-4">
              <RefreshCw size={32} className="animate-spin text-keleo-500" />
              <p className="text-gray-500 font-medium animate-pulse">
                Cargando comandas...
              </p>
            </div>
          </div>
        ) : data.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[50vh] text-center border-2 border-dashed border-gray-200 dark:border-white/10 rounded-2xl mx-1 max-w-2xl mx-auto p-12">
            <div className="w-20 h-20 bg-gray-50 dark:bg-dark-elem rounded-full flex items-center justify-center mb-4">
              <ChefHat size={36} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Cocina despejada
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              No hay pedidos pendientes en este momento. ¡Buen trabajo!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
            {data.map((account) => (
              <KitchenTicket key={account.id} account={account} onRefresh={handleRefresh} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
