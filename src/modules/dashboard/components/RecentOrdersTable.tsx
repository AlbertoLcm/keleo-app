import { Eye } from "lucide-react";
import { StatusBadge } from "@/modules/shared";
import type { DashboardStats } from "../services/dashboard.service";

type OrderStatus = DashboardStats["recentOrders"][number]["status"];

const getBadgeColor = (status: OrderStatus): "yellow" | "green" | "blue" => {
  switch (status) {
    case "pending":
      return "yellow";
    case "served":
      return "green";
    case "ready":
      return "blue";
    default:
      return "yellow";
  }
};

const getStatusText = (status: OrderStatus): "En Cocina" | "Servido" | "Listo" => {
  switch (status) {
    case "pending":
      return "En Cocina";
    case "served":
      return "Servido";
    case "ready":
      return "Listo";
  }
};

interface RecentOrdersTableProps {
  orders: DashboardStats["recentOrders"];
}

const RecentOrdersTable: React.FC<RecentOrdersTableProps> = ({ orders }) => (
  <div className="lg:col-span-2 bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-white/50 dark:border-white/5 overflow-hidden">
    <div className="p-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-center">
      <h2 className="font-bold text-gray-800 dark:text-white">Pedidos Recientes</h2>
      <a href="#" className="text-sm text-keleo-600 dark:text-keleo-400 hover:underline">
        Ver todos
      </a>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50/50 dark:bg-white/5 text-xs text-gray-500 dark:text-gray-400 uppercase">
            <th className="px-6 py-4 font-semibold">Orden</th>
            <th className="px-6 py-4 font-semibold">Mesa</th>
            <th className="px-6 py-4 font-semibold">Estado</th>
            <th className="px-6 py-4 font-semibold">Total</th>
            <th className="px-6 py-4 font-semibold text-right">Acción</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-white/5">
          {orders.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-8 text-center text-gray-500 text-sm">
                No hay pedidos recientes
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-gray-50 dark:hover:bg-white/5 transition"
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                  {order.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  {order.table}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge
                    color={getBadgeColor(order.status)}
                    text={getStatusText(order.status)}
                  />
                </td>
                <td className="px-6 py-4 text-sm font-bold text-gray-800 dark:text-white">
                  ${order.total.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-keleo-600 transition p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full">
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default RecentOrdersTable;
