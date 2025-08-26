import React, { useState } from "react";
import type { KitchenOrderItem } from "../api/kitchen.api";
import { Check, Clock, Loader2 } from "lucide-react";
import { updateKitchenOrderStatus } from "../api/kitchen.api";
import { useParams } from "react-router";

interface OrderItemEntryProps {
  item: KitchenOrderItem;
  onRefresh: () => void;
}

export const OrderItemEntry: React.FC<OrderItemEntryProps> = ({ item, onRefresh }) => {
  const { restaurantId } = useParams();
  const [isMutating, setIsMutating] = useState(false);

  const isDone = item.status === "ready";

  const handleMarkReady = async () => {
    if (!restaurantId || isDone) return;

    setIsMutating(true);
    try {
      await updateKitchenOrderStatus({
        restaurantId,
        orderId: item.id,
        status: "ready",
      });
      onRefresh();
    } catch (e) {
      console.error("Failed to update status", e);
    } finally {
      setIsMutating(false);
    }
  };

  const time = new Date(item.created_at).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="rounded-xl border transition-colors bg-white dark:bg-dark-elem border-gray-200 dark:border-white/5">
      {/* ── Fila superior: cantidad + nombre ── */}
      <div className="px-3 pt-3 pb-2">
        <div className="flex items-start gap-2.5">
          {/* Cantidad — badge grande y visible */}
          <span className="shrink-0 min-w-[2rem] h-8 rounded-lg flex items-center justify-center text-sm font-black tabular-nums bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-200">
            {item.quantity}×
          </span>

          {/* Nombre completo — sin truncate */}
          <p className="font-semibold text-gray-900 dark:text-white text-sm leading-snug pt-1">
            {item.products.name}
          </p>
        </div>

        {/* Nota especial — siempre visible si existe */}
        {item.notas && (
          <div className="mt-2 flex items-start gap-1.5 bg-yellow-50 dark:bg-yellow-900/15 border border-yellow-200 dark:border-yellow-800/40 rounded-lg px-2.5 py-1.5">
            <span className="text-yellow-500 font-bold text-xs shrink-0 mt-px">!</span>
            <p className="text-xs text-yellow-700 dark:text-yellow-300 font-medium leading-snug">
              {item.notas}
            </p>
          </div>
        )}
      </div>

      {/* ── Fila inferior: meta + botón ── */}
      <div
        className={`px-3 pb-2.5 flex items-center justify-between gap-2 ${item.notas ? "" : "pt-0"
          }`}
      >
        {/* Meta: mesero + hora */}
        <div className="flex items-center gap-2 text-[11px] text-gray-400 dark:text-gray-500 font-medium min-w-0">
          <Clock size={11} className="shrink-0" />
          <span className="truncate">{item.users.name}</span>
          <span className="shrink-0">· {time}</span>
        </div>

        {/* Botón de acción — un solo click → listo */}
        <button
          onClick={handleMarkReady}
          disabled={isMutating || isDone}
          className="shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold shadow-sm transition-all cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed bg-green-500 hover:bg-green-600 text-white"
        >
          {isMutating ? (
            <Loader2 size={13} className="animate-spin" />
          ) : (
            <>
              <Check size={13} />
              Listo
            </>
          )}
        </button>
      </div>
    </div>
  );
};
