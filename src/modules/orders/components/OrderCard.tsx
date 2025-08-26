import { StatusBadge, type StatusBadgeColor } from "@/modules/shared";
import { getInitialsString } from "@/utils/getInitialsString";
import { ChevronRight, CreditCard, ShoppingBag, Bike } from "lucide-react";
import { useNavigate } from "react-router";
import type { DirectOrder } from "../types";

interface OrderCardProps {
  order: DirectOrder;
  restaurantId: string;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, restaurantId }) => {
  const navigate = useNavigate();

  const statusConfig: Record<string, { label: string; color: StatusBadgeColor }> = {
    open: { label: "Abierta", color: "green" },
    payment: { label: "Por Pagar", color: "blue" },
    closed: { label: "Cerrada", color: "gray" },
    cancelled: { label: "Cancelada", color: "red" },
  };

  const typeConfig: Record<string, { label: string; icon: React.ReactNode }> = {
    takeout: { label: "Para Llevar", icon: <ShoppingBag size={14} className="mr-1" /> },
    delivery: { label: "Delivery", icon: <Bike size={14} className="mr-1" /> },
  };

  const config = statusConfig[order.status] || { label: order.status, color: "gray" };
  const typeDetails = typeConfig[order.type] || { label: order.type, icon: null };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);

    if (diffMins < 60) return `${diffMins} min`;
    const hours = Math.floor(diffMins / 60);
    const mins = diffMins % 60;
    return mins === 0 ? `${hours} h` : `${hours} h ${mins} min`;
  };

  return (
    <div className="relative bg-white dark:bg-dark-card rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-4 border border-white/50 dark:border-white/5 group cursor-pointer">
      <div className="flex justify-between items-start mb-2">
        <div className="flex flex-col">
          <h3 className="text-base md:text-xl font-bold text-gray-800 dark:text-white flex items-center">
            {order.order_alias || `Orden #${order.id.slice(-4)}`}
          </h3>
          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-1 font-medium">
            {typeDetails.icon} {typeDetails.label}
          </span>
        </div>
        <StatusBadge color={config.color} text={config.label} />
      </div>

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white dark:border-dark-card flex items-center justify-center text-xs font-bold text-gray-500">
            {getInitialsString(order.users?.name || "U")}
          </div>
          <span className="text-xs text-gray-500">{order.users?.name || "Usuario"}</span>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">
            {order.status === "open" ? "Tiempo" : "Método"}
          </p>
          <p className="text-sm font-bold text-gray-700 dark:text-gray-200 flex items-center justify-end">
            {order.status === "payment" && <CreditCard size={14} className="mr-1" />}
            {order.status === "open" ? formatTime(order.opened_at) : order.payment_method || "N/A"}
          </p>
        </div>
      </div>

      <div className="pt-2 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400">Total</p>
          <p className="text-lg font-bold text-keleo-600 dark:text-keleo-400">
            ${Number(order.total_final || 0).toLocaleString()}
          </p>
        </div>

        <button
          onClick={() => navigate(`/restaurants/${restaurantId}/orders/${order.id}`)}
          className={`transition-all active:scale-90 cursor-pointer px-3 py-1.5 rounded-lg text-white text-xs font-bold shadow-md ${
            order.status === "payment"
              ? "bg-blue-500 hover:bg-blue-600 shadow-blue-500/30 flex items-center"
              : "bg-keleo-600 hover:bg-keleo-700 shadow-keleo-500/30 flex items-center"
          }`}
        >
          {order.status === "payment" ? "Cobrar" : "Detalles"}
          <ChevronRight size={14} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
