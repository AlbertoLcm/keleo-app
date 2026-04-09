import React, { useState } from "react";
import type { KitchenOrderItem } from "../api/kitchen.api";
import { Check, ChefHat } from "lucide-react";
import { updateKitchenOrderStatus } from "../api/kitchen.api";
import { useParams } from "react-router";

interface OrderItemEntryProps {
  item: KitchenOrderItem;
  onRefresh: () => void;
}

export const OrderItemEntry: React.FC<OrderItemEntryProps> = ({ item, onRefresh }) => {
  const { restaurantId } = useParams();
  const [isMutating, setIsMutating] = useState(false);

  const isPending = item.status === "pending";
  const isPreparing = item.status === "preparing";

  const handleAdvanceStatus = async () => {
    if (!restaurantId) return;
    
    let newStatus: "preparing" | "ready" = "preparing";
    if (isPending) newStatus = "preparing";
    else if (isPreparing) newStatus = "ready";
    else return;

    setIsMutating(true);
    try {
      await updateKitchenOrderStatus({
        restaurantId,
        orderId: item.id,
        status: newStatus,
      });
      onRefresh();
    } catch (e) {
      console.error("Failed to update status", e);
    } finally {
      setIsMutating(false);
    }
  };

  return (
    <div
      className={`p-3 rounded-lg flex items-start gap-3 border transition-colors ${
        isPending
          ? "bg-white dark:bg-dark-elem border-gray-200 dark:border-white/5"
          : "bg-blue-50/50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-900/30"
      }`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-bold text-gray-900 dark:text-white">
            {item.quantity}x
          </span>
          <h4 className="font-medium text-gray-800 dark:text-gray-100 truncate">
            {item.products.name}
          </h4>
        </div>
        
        {item.notas && (
          <p className="text-xs text-red-600 dark:text-red-400 font-medium mb-2 bg-red-50 dark:bg-red-900/10 p-1.5 rounded-md inline-block">
            Nota: {item.notas}
          </p>
        )}

        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <span>Mesero: {item.users.name}</span>
          <span>•</span>
          <span>
            {new Date(item.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2 shrink-0">
        <button
          onClick={handleAdvanceStatus}
          disabled={isMutating}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold shadow-sm transition-all cursor-pointer active:scale-95 ${
            isPending
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-green-500 hover:bg-green-600 text-white"
          } disabled:opacity-50 disabled:active:scale-100`}
        >
          {isMutating ? (
            <span className="animate-pulse">...</span>
          ) : isPending ? (
            <>
              <ChefHat size={16} /> Preparar
            </>
          ) : (
            <>
              <Check size={16} /> Listo
            </>
          )}
        </button>

        <span
          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
            isPending
              ? "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300"
              : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
          }`}
        >
          {isPending ? "Pendiente" : "Preparando"}
        </span>
      </div>
    </div>
  );
};
