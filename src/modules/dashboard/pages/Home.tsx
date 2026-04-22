import {
  Armchair,
  BanknoteArrowUp,
  Calendar,
  CalendarClock,
  ChevronRight,
  DollarSign,
  Eye,
  FileChartLine,
  Flame,
  Plus,
  Zap,
} from "lucide-react";
import StatCard from "../components/StatCard";
import ShortcutButton from "../components/ShortcutButton";
import { LoadingScreen, StatusBadge, useHeaderAction } from "@/modules/shared";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getDashboardStats } from "../services/dashboard.service";
import type { DashboardStats } from "../services/dashboard.service";

const getBadgeColor = (
  status: DashboardStats["recentOrders"][number]["status"],
): "yellow" | "green" | "blue" => {
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

const getStatusText = (
  status: DashboardStats["recentOrders"][number]["status"],
): "En Cocina" | "Servido" | "Listo" => {
  switch (status) {
    case "pending":
      return "En Cocina";
    case "served":
      return "Servido";
    case "ready":
      return "Listo";
  }
};

const Dashboard: React.FC = () => {
  const { updateActionHeader } = useHeaderAction();
  const { restaurantId } = useParams();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!restaurantId) return;

    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const data = await getDashboardStats(restaurantId);
        setStats(data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [restaurantId]);

  useEffect(() => {
    updateActionHeader(
      <section className="flex justify-between w-full items-center">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <div className="hidden md:flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <a
                href="dashboard.html"
                className="hover:text-keleo-600 transition"
              >
                Mis Restaurantes
              </a>
              <ChevronRight size={14} />
              <span className="text-gray-800 dark:text-white font-medium bg-gray-100 dark:bg-white/10 px-2 py-0.5 rounded-md">
                Cafetería Central
              </span>
            </div>
            <h1 className="text-base md:text-xl font-bold text-gray-900 dark:text-white mt-1">
              Panel de Control
            </h1>
          </div>
        </div>

        <StatusBadge
          color="green"
          text={
            <>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-1"></span>
              Abierto
            </>
          }
        />
      </section>,
    );

    return () => updateActionHeader(null);
  }, []);

  if (isLoading || !stats) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <>
      <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="w-[85vw] sm:w-auto shrink-0 snap-center">
          <StatCard
            title="Ventas Hoy"
            value={`$${stats.sales.total.toLocaleString()}`}
            icon={<DollarSign />}
            color="green"
            trend={`${stats.sales.percentageComparation >= 0 ? '+' : ''}${stats.sales.percentageComparation}% vs ayer`}
            trendUp={stats.sales.percentageComparation >= 0}
          />
        </div>

        <div className="w-[85vw] sm:w-auto shrink-0 snap-center">
          <StatCard
            title="Mesas Activas"
            value={
              <>
                {stats.activeTables.occupied}{" "}
                <span className="text-sm font-normal text-gray-400">/ {stats.activeTables.total}</span>
              </>
            }
            icon={<Armchair />}
            color="orange"
            progress={stats.activeTables.total > 0 ? (stats.activeTables.occupied / stats.activeTables.total) * 100 : 0}
          />
        </div>

        <div className="w-[85vw] sm:w-auto shrink-0 snap-center">
          <StatCard
            title="Pedidos Cocina"
            value={stats.kitchenOrders.toString()}
            icon={<Flame />}
            color="red"
            customContent={
              stats.kitchenOrders > 0 ? (
                <p className="text-xs text-red-500 font-medium animate-pulse flex items-center gap-1 mt-auto">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> Activos
                </p>
              ) : null
            }
          />
        </div>

        <div className="w-[85vw] sm:w-auto shrink-0 snap-center">
          <StatCard
            title="Staff Turno"
            value={stats.staff.active.toString()}
            icon={<CalendarClock />}
            color="blue"
            customContent={
              <div className="flex items-center gap-2 mt-auto">
                <div className="flex -space-x-2">
                  {Array.from({ length: Math.min(stats.staff.active, 3) }).map((_, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white dark:border-dark-card"
                    ></div>
                  ))}
                </div>
                <span className="text-xs text-gray-400">/ {stats.staff.total} total</span>
              </div>
            }
          />
        </div>
      </div>

      {/* ROW 2: Graph & Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        {/* SHORTCUTS */}
        <div className="bg-gradient-to-br from-keleo-600 to-indigo-600 rounded-2xl shadow-xl shadow-keleo-500/20 p-6 text-white relative overflow-hidden flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl translate-y-1/3 -translate-x-1/3"></div>

          <h3 className="font-bold text-lg mb-4 relative z-10 flex items-center gap-2">
            <Zap className="text-yellow-300" /> Acciones Rápidas
          </h3>

          <div className="grid grid-cols-2 gap-3 relative z-10">
            <ShortcutButton icon={<Plus size={18} />} label="Nueva Orden" />
            <ShortcutButton icon={<Calendar size={18} />} label="Reservar" />
            <ShortcutButton
              icon={<BanknoteArrowUp size={18} />}
              label="Cerrar Caja"
            />
            <ShortcutButton
              icon={<FileChartLine size={18} />}
              label="Reporte Z"
            />
          </div>
        </div>
        {/* CHART SECTION */}
        <div className="lg:col-span-2 bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-white/50 dark:border-white/5 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-gray-800 dark:text-white">
              Rendimiento de Ventas
            </h2>
            <select className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-transparent rounded-lg text-xs px-2 py-1 text-gray-600 dark:text-gray-300 outline-none focus:ring-1 focus:ring-keleo-500">
              <option>Hoy</option>
              <option>Esta Semana</option>
            </select>
          </div>

          <div className="flex-grow flex items-end justify-between gap-2 md:gap-4 h-48 px-2">
            {stats.chartData.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 w-full group"
              >
                <div className="w-full bg-keleo-100 dark:bg-keleo-900/20 rounded-t-md relative h-32 flex items-end justify-center group-hover:bg-keleo-200 dark:group-hover:bg-keleo-900/40 transition-all cursor-pointer">
                  <div
                    className="w-full bg-keleo-500 rounded-t-md bar-animate relative"
                    style={{ height: `${item.value}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition z-10 whitespace-nowrap">
                      {item.amount}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] text-gray-400">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROW 3: Tables & Top Selling */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Active Orders Table */}
        <div className="lg:col-span-2 bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-white/50 dark:border-white/5 overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-center">
            <h2 className="font-bold text-gray-800 dark:text-white">
              Pedidos Recientes
            </h2>
            <a
              href="#"
              className="text-sm text-keleo-600 dark:text-keleo-400 hover:underline"
            >
              Ver todos
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 dark:bg-white/5 text-xs text-gray-500 dark:text-gray-400 uppercase">
                  <th className="px-6 py-4 font-semibold">Orden</th>
                  <th className="px-6 py-4 font-semibold">Mesa</th>
                  <th className="px-6 py-4 font-semibold ">Estado</th>
                  <th className="px-6 py-4 font-semibold">Total</th>
                  <th className="px-6 py-4 font-semibold text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                {stats.recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500 text-sm">
                      No hay pedidos recientes
                    </td>
                  </tr>
                ) : (
                  stats.recentOrders.map((order) => (
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

        {/* Top Selling Items */}
        <div className="bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-white/50 dark:border-white/5 p-6 h-full">
          <h3 className="font-bold text-gray-800 dark:text-white mb-4">
            Más Vendidos Hoy
          </h3>
          <div className="space-y-4">
            {stats.topItems.length === 0 ? (
              <div className="text-center text-gray-500 text-sm py-4">
                No hay ventas registradas hoy
              </div>
            ) : (
              stats.topItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-2 hover:bg-white/40 dark:hover:bg-white/5 rounded-xl transition cursor-pointer group"
                >
                  <div
                    className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 bg-cover bg-center shadow-sm"
                    style={{ backgroundImage: `url('${item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=200"}')` }}
                  ></div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-800 dark:text-white group-hover:text-keleo-600 transition line-clamp-1">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">{item.count} unidades</p>
                  </div>
                  <span className="text-sm font-bold text-gray-800 dark:text-white">
                    ${item.revenue.toLocaleString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
