import React, { useMemo } from "react";
import type { KitchenActiveAccount } from "../api/kitchen.api";
import { OrderItemEntry } from "./OrderItemEntry";

interface KitchenTicketProps {
  account: KitchenActiveAccount;
  onRefresh: () => void;
}

export const KitchenTicket: React.FC<KitchenTicketProps> = ({ account, onRefresh }) => {
  const tableTitle = account.tables?.name
    ? `Mesa ${account.tables.name}`
    : account.order_alias || "Para Llevar";

  // Calculate elapsed time since account opened
  const elapsedMinutes = useMemo(() => {
    const start = new Date(account.opened_at).getTime();
    const now = new Date().getTime();
    return Math.floor((now - start) / 60000);
  }, [account.opened_at]);

  const isOld = elapsedMinutes > 15;

  return (
    <div className="bg-white dark:bg-dark-bg border border-gray-200 shadow-sm dark:border-white/10 rounded-2xl overflow-hidden flex flex-col">
      <div
        className={`px-4 py-3 border-b flex justify-between items-center ${
          isOld
            ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900/30"
            : "bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10"
        }`}
      >
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white text-lg">
            {tableTitle}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">
            {account.orders_details.length}{" "}
            {account.orders_details.length === 1 ? "platillo" : "platillos"}
          </p>
        </div>
        <div
          className={`px-2.5 py-1 rounded-lg text-xs font-bold border flex items-center gap-1.5 ${
            isOld
              ? "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-800"
              : "bg-white text-gray-700 border-gray-200 shadow-sm dark:bg-dark-elem dark:text-gray-300 dark:border-white/10"
          }`}
        >
          <div
            className={`w-1.5 h-1.5 rounded-full ${
              isOld ? "bg-red-500 animate-pulse" : "bg-green-500"
            }`}
          />
          {elapsedMinutes} min
        </div>
      </div>
      
      <div className="p-3 flex flex-col gap-3 flex-1 overflow-y-auto max-h-[400px] custom-scrollbar">
        {account.orders_details.map((item) => (
          <OrderItemEntry key={item.id} item={item} onRefresh={onRefresh} />
        ))}
      </div>
    </div>
  );
};
