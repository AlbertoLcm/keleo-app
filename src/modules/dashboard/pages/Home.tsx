import {
  Armchair,
  BanknoteArrowUp,
  Calendar,
  CalendarClock,
  ChevronRight,
  DollarSign,
  FileChartLine,
  Flame,
  Plus,
  Zap,
} from "lucide-react";
import StatCard from "../components/StatCard";
import ShortcutButton from "../components/ShortcutButton";
import { Container, StatusBadge, useHeaderAction } from "@/modules/shared";
import { useEffect } from "react";

// --- Types ---
interface Order {
  id: string;
  table: string;
  status: "pending" | "served" | "ready";
  total: number;
}

interface TopItem {
  name: string;
  count: number;
  revenue: number;
  image: string;
}

// --- Mock Data ---
const recentOrders: Order[] = [
  { id: "#1024", table: "Mesa 4", status: "pending", total: 450.0 },
  { id: "#1023", table: "Mesa 2", status: "served", total: 120.0 },
  { id: "#1022", table: "Para Llevar", status: "ready", total: 85.0 },
];

const topItems: TopItem[] = [
  {
    name: "Hamburguesa Clásica",
    count: 24,
    revenue: 3200,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=200",
  },
  {
    name: "Bowl de Ensalada",
    count: 18,
    revenue: 1980,
    image:
      "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?q=80&w=200",
  },
  {
    name: "Cheesecake Fresa",
    count: 12,
    revenue: 960,
    image:
      "https://images.unsplash.com/photo-1579306194872-64d3b7bac4c2?q=80&w=200",
  },
];

const chartData = [
  { time: "12pm", value: 30, amount: "$1,200" },
  { time: "2pm", value: 85, amount: "$3,500" },
  { time: "4pm", value: 45, amount: "$1,800" },
  { time: "6pm", value: 60, amount: "$2,100" },
  { time: "8pm", value: 90, amount: "$4,100" },
];

const getBadgeColor = (
  status: Order["status"],
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
  status: Order["status"],
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

  useEffect(() => {
    updateActionHeader(
      <section className="flex justify-between w-full items-center">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
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
            <h1 className="text-xl font-bold text-gray-900 dark:text-white mt-1">
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

  return (
    <Container>
      {/* ROW 1: Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Ventas Hoy"
          value="$4,250"
          icon={<DollarSign />}
          color="green"
          trend="+8% vs ayer"
          trendUp={true}
        />

        <StatCard
          title="Mesas Activas"
          value={
            <>
              8 <span className="text-sm font-normal text-gray-400">/ 12</span>
            </>
          }
          icon={<Armchair />}
          color="orange"
          progress={66}
        />

        <StatCard
          title="Pedidos Cocina"
          value="5"
          icon={<Flame />}
          color="red"
          customContent={
            <p className="text-xs text-red-500 font-medium animate-pulse flex items-center gap-1 mt-auto">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> 2
              con retraso 15m
            </p>
          }
        />

        <StatCard
          title="Staff Turno"
          value="4"
          icon={<CalendarClock />}
          color="blue"
          customContent={
            <div className="flex -space-x-2 mt-auto">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white dark:border-dark-card"
                ></div>
              ))}
            </div>
          }
        />
      </div>

      {/* ROW 2: Graph & Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* CHART SECTION */}
        <div className="lg:col-span-2 bg-white/60 dark:bg-dark-card/60 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 dark:border-white/5 p-6 flex flex-col">
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
            {chartData.map((item, index) => (
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
      </div>

      {/* ROW 3: Tables & Top Selling */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Orders Table */}
        <div className="lg:col-span-2 bg-white/60 dark:bg-dark-card/60 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 dark:border-white/5 overflow-hidden">
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
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 dark:hover:bg-white/5 transition"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
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
                        <i className="fas fa-eye"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Selling Items */}
        <div className="bg-white/60 dark:bg-dark-card/60 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 dark:border-white/5 p-6 h-full">
          <h3 className="font-bold text-gray-800 dark:text-white mb-4">
            Más Vendidos Hoy
          </h3>
          <div className="space-y-4">
            {topItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-2 hover:bg-white/40 dark:hover:bg-white/5 rounded-xl transition cursor-pointer group"
              >
                <div
                  className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 bg-cover bg-center shadow-sm"
                  style={{ backgroundImage: `url('${item.image}')` }}
                ></div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-800 dark:text-white group-hover:text-keleo-600 transition">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500">{item.count} unidades</p>
                </div>
                <span className="text-sm font-bold text-gray-800 dark:text-white">
                  ${item.revenue.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
