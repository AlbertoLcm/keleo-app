import SalesChart from "../components/SalesChart";
import TopProductsChart from "../components/TopProductsChart";
import StatsCard from "../components/StatsCard";
import { CurrencyDollarIcon, ShoppingCartIcon, TrendUpIcon, UsersIcon } from "@phosphor-icons/react";

const salesData = [
  { date: "Ene", sales: 200 },
  { date: "Feb", sales: 300 },
  { date: "Mar", sales: 150 },
  { date: "Abr", sales: 400 },
  { date: "May", sales: 250 },
  { date: "Jun", sales: 350 },
  { date: "Jul", sales: 280 },
  { date: "Ago", sales: 420 },
  { date: "Sep", sales: 380 },
  { date: "Oct", sales: 450 },
  { date: "Nov", sales: 320 },
  { date: "Dic", sales: 500 },
];

const topProducts = [
  { name: "Hamburguesa", value: 120 },
  { name: "Pizza", value: 90 },
  { name: "Tacos", value: 80 },
  { name: "Refrescos", value: 60 },
  { name: "Postres", value: 40 },
];

const recentOrders = [
  { id: "A001", cliente: "Luis Pérez", total: "$250", fecha: "14 Oct 2025" },
  { id: "A002", cliente: "Ana Torres", total: "$180", fecha: "13 Oct 2025" },
  { id: "A003", cliente: "Carlos Díaz", total: "$320", fecha: "12 Oct 2025" },
  { id: "A004", cliente: "Amelina G.", total: "$210", fecha: "11 Oct 2025" },
];

export default function HomeDashboard() {
  return (
    <section>
      <div className="mb-5">
        <h1 className="flex text-2xl sm:text-3xl text-gray-800 mb-3">Reporte diario de ventas</h1>
        <p className="text-sm text-gray-500">Viernes, 10 de octubre de 2023</p>
      </div>
      {/* 🔹 Estadísticas rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Ventas del día" value="$1,250" subtitle="+12% vs ayer" icon={<CurrencyDollarIcon size={32} />} />
        <StatsCard title="Pedidos" value="84" subtitle="+8% esta semana" icon={<ShoppingCartIcon size={32} />} />
        <StatsCard title="Clientes" value="56" subtitle="Nuevos hoy" icon={<UsersIcon size={32} />} />
        <StatsCard title="Tasa de crecimiento" value="15%" subtitle="Últimos 30 días" icon={<TrendUpIcon size={32} />} />
      </div>

      {/* 🔹 Gráficas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <SalesChart data={salesData} />
        <TopProductsChart data={topProducts} />
      </div>

      {/* 🔹 Tabla de pedidos recientes */}
      <div className="bg-white rounded-xl ring-1 ring-gray-200 p-6 mt-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Pedidos recientes</h2>
        <table className="w-full text-sm text-left">
          <thead className="border-b border-gray-200 text-gray-700">
            <tr>
              <th className="pb-2">ID</th>
              <th className="pb-2">Cliente</th>
              <th className="pb-2">Total</th>
              <th className="pb-2">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id} className="border-b border-gray-200 last:border-none hover:bg-gray-50 transition">
                <td className="py-2">{order.id}</td>
                <td>{order.cliente}</td>
                <td className="font-medium text-gray-500">{order.total}</td>
                <td>{order.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
