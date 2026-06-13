import { Armchair, CalendarClock, DollarSign, Flame } from "lucide-react";
import StatCard from "./StatCard";
import type { DashboardStats } from "../services/dashboard.service";

interface DashboardStatsRowProps {
  stats: DashboardStats;
}

const DashboardStatsRow: React.FC<DashboardStatsRowProps> = ({ stats }) => (
  <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
    <div className="w-[85vw] sm:w-auto shrink-0 snap-center">
      <StatCard
        title="Ventas Hoy"
        value={`$${stats.sales.total.toLocaleString()}`}
        icon={<DollarSign />}
        color="green"
        trend={`${stats.sales.percentageComparation >= 0 ? "+" : ""}${stats.sales.percentageComparation}% vs ayer`}
        trendUp={stats.sales.percentageComparation >= 0}
      />
    </div>

    <div className="w-[85vw] sm:w-auto shrink-0 snap-center">
      <StatCard
        title="Mesas Activas"
        value={
          <>
            {stats.activeTables.occupied}{" "}
            <span className="text-sm font-normal text-gray-400">
              / {stats.activeTables.total}
            </span>
          </>
        }
        icon={<Armchair />}
        color="orange"
        progress={
          stats.activeTables.total > 0
            ? (stats.activeTables.occupied / stats.activeTables.total) * 100
            : 0
        }
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
                />

              ))}
            </div>
            <span className="text-xs text-gray-400">/ {stats.staff.total} total</span>
          </div>
        }
      />
    </div>
  </div>
);

export default DashboardStatsRow;
