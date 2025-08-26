import { CardEmptyAdded, useHeaderAction, useWebSocket } from "@/modules/shared";
import { useEffect, useState, useMemo, useCallback } from "react";
import { Plus, LayoutGrid, List } from "lucide-react";
import { useParams, useNavigate } from "react-router";
import type { DirectOrder } from "../types";
import { getOrders, createOrder } from "../services/orders.service";
import OrderCard from "../components/OrderCard";
import NewOrderModal from "../components/NewOrderModal";
import { useRestaurantRole } from "@/modules/restaurants";

type ViewModeType = "grid" | "list";

export default function OrdersPage() {
  const { updateActionHeader } = useHeaderAction();
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const { socket } = useWebSocket();
  const { role } = useRestaurantRole();
  const canAddOrder = ['owner', 'admin', 'manager', 'cashier'].includes(role || '');

  const [orders, setOrders] = useState<DirectOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [viewMode, setViewMode] = useState<ViewModeType>("grid");

  const fetchDirectOrders = useCallback(async () => {
    if (!restaurantId) return;
    setLoading(true);
    try {
      const data = await getOrders(restaurantId);
      setOrders(data);
    } catch (err) {
      console.error("Error al cargar ordenes directas", err);
    } finally {
      setLoading(false);
    }
  }, [restaurantId]);

  useEffect(() => {
    fetchDirectOrders();
  }, [fetchDirectOrders]);

  useEffect(() => {
    if (socket) {
      socket.on("orderUpdated", fetchDirectOrders);
      return () => {
        socket.off("orderUpdated", fetchDirectOrders);
      };
    }
  }, [socket, fetchDirectOrders]);

  const handleCreateOrder = async (data: { orderAlias: string; type: "takeout" | "delivery" }) => {
    if (!restaurantId) return;
    setIsCreating(true);
    try {
      const newOrder = await createOrder({
        restaurantId,
        orderAlias: data.orderAlias,
        type: data.type,
      });
      setIsModalOpen(false);
      navigate(`/restaurants/${restaurantId}/orders/${newOrder.id}`);
    } catch (error) {
      console.error("Error creating order", error);
    } finally {
      setIsCreating(false);
    }
  };

  const headerContent = useMemo(
    () => (
      <section className="flex justify-between w-full items-center">
        <div className="flex flex-col">
          <h1 className="text-base lg:text-lg font-bold text-gray-900 dark:text-white">
            Órdenes Directas
          </h1>
          <p className="hidden lg:block text-xs text-gray-500 dark:text-gray-400">
            Gestiona pedidos para llevar, delivery o mostrador
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

          {canAddOrder && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-keleo-600 hover:bg-keleo-700 text-white rounded-xl shadow-lg shadow-keleo-500/20 transition text-sm font-bold cursor-pointer"
            >
              <Plus size={20} />
              <span className="hidden sm:inline">Nueva Orden</span>
            </button>
          )}
        </div>
      </section>
    ),
    [viewMode, canAddOrder],
  );

  useEffect(() => {
    updateActionHeader(headerContent);
    return () => updateActionHeader(null);
  }, [headerContent, updateActionHeader]);

  return (
    <>
      <div className="mx-4 md:mx-6 flex items-center gap-4 text-xs font-medium text-gray-500 dark:text-gray-400 bg-white/40 dark:bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm mb-6 w-max">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>{" "}
          Abiertas
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>{" "}
          Por Pagar
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-40 bg-gray-100 dark:bg-white/5 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className={`grid gap-4 md:gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} restaurantId={restaurantId!} />
          ))}
          
          {orders.length === 0 && canAddOrder && (
            <div className="col-span-full">
              <CardEmptyAdded
                onAction={() => setIsModalOpen(true)}
                title="Añadir Orden Directa"
                description="Registra un nuevo pedido para llevar o delivery"
              />
            </div>
          )}
        </div>
      )}

      <NewOrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateOrder}
        isSubmitting={isCreating}
      />
    </>
  );
}
