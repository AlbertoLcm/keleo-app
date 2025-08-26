import React, { useMemo } from "react";
import type { KitchenActiveAccount } from "../api/kitchen.api";
import { OrderItemEntry } from "./OrderItemEntry";
import { AlertTriangle } from "lucide-react";

interface KitchenTicketProps {
  account: KitchenActiveAccount;
  onRefresh: () => void;
}

export const KitchenTicket: React.FC<KitchenTicketProps> = ({ account, onRefresh }) => {
  console.log(account);
  const tableTitle = account.tables?.name
    ? `${account.tables.name}`
    : account.order_alias || "Para Llevar";

  const elapsedMinutes = useMemo(() => {
    const start = new Date(account.orders_details[0].created_at).getTime();
    const now = Date.now();
    return Math.floor((now - start) / 60000);
  }, [account.opened_at]);

  const isOld = elapsedMinutes > 15;

  const pendingCount = account.orders_details.filter((d) => d.status === "pending").length;
  const preparingCount = account.orders_details.filter((d) => d.status === "preparing").length;

  return (
    <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-white/10 shadow-sm rounded-2xl overflow-hidden flex flex-col">
      {/* ── Header del ticket ── */}
      <div
        className={`px-4 py-3 border-b flex items-center justify-between gap-3 ${isOld
          ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900/30"
          : "bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10"
          }`}
      >
        <div className="min-w-0">
          {/* Nombre de mesa */}
          <h3 className="font-black text-gray-900 dark:text-white text-base leading-tight truncate">
            {tableTitle}
          </h3>

          {/* Contadores de estado */}
          <div className="flex items-center gap-2 mt-0.5">
            {pendingCount > 0 && (
              <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400">
                {pendingCount} pendiente{pendingCount > 1 ? "s" : ""}
              </span>
            )}
            {pendingCount > 0 && preparingCount > 0 && (
              <span className="text-gray-300 dark:text-white/20">·</span>
            )}
            {preparingCount > 0 && (
              <span className="text-[11px] font-semibold text-blue-500 dark:text-blue-400">
                {preparingCount} preparando
              </span>
            )}
          </div>
        </div>

        {/* Timer */}
        <div
          className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${isOld
            ? "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-800"
            : "bg-white text-gray-600 border-gray-200 shadow-sm dark:bg-dark-elem dark:text-gray-300 dark:border-white/10"
            }`}
        >
          {isOld ? (
            <AlertTriangle size={12} className="text-red-500 animate-pulse" />
          ) : (
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
          )}
          {elapsedMinutes} min
        </div>
      </div>

      {/* ── Lista de platillos ── */}
      <div className="p-3 flex flex-col gap-2 flex-1 overflow-y-auto custom-scrollbar">
        {account.orders_details.map((item) => (
          <OrderItemEntry key={item.id} item={item} onRefresh={onRefresh} />
        ))}
      </div>
    </div>
  );
};
