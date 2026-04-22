import { ChevronRight, MapPin } from "lucide-react";
import type { TypeRestaurant } from "../types";
import formatCurrency from "../utils/formatCurrency";

type CardRestaurantProps = {
  cardId: string;
  name: string;
  city: string;
  logo: string;
  typeRestaurant: TypeRestaurant;
  totalTables: number;
  tablesInUse: number;
  role: string;
  dailySales: number;
  myOrders?: number;
  activeStaff?: number;
  status: "open" | "closed";
  onClick?: (cardId: string) => void;
  isOwner?: boolean;
};

const RESTAURANT_ICONS: Record<TypeRestaurant, string> = {
  restaurant: "🍔",
  coffee: "☕️",
  bar: "🍺",
};

export default function CardRestaurant({
  cardId,
  name,
  city,
  typeRestaurant,
  onClick,
  totalTables,
  tablesInUse,
  role,
  status,
  dailySales,
  myOrders = 0,
  activeStaff = 0,
  isOwner = true,
}: CardRestaurantProps) {

  const isOpen = status === "open";

  const handleClick = () => {
    if (onClick) onClick(cardId);
  };

  const getIconRestaurant = (type: TypeRestaurant): string => {
    return RESTAURANT_ICONS[type] || "🍴";
  };

  if (isOwner) {
    return (
      <div
        className="bg-white dark:bg-dark-card rounded-2xl p-6 shadow-sm border border-keleo-100 dark:border-keleo-900/20 group relative overflow-hidden transition hover:shadow-xl hover:shadow-keleo-500/5 cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-4">
            <div className="w-14 h-14 rounded-2xl bg-keleo-50 dark:bg-keleo-900/20 flex items-center justify-center text-2xl shadow-inner group-hover:scale-105 transition">
              {getIconRestaurant(typeRestaurant)}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-keleo-600 transition truncate w-32 md:w-auto">
                {name}
              </h3>
              <p className="text-xs text-gray-500 flex items-center gap-1 w-32 md:w-auto"><MapPin size={12} /> <span className="truncate">{city}</span></p>
            </div>
          </div>
          <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-1 bg-keleo-100 text-keleo-700 dark:bg-keleo-900/50 dark:text-keleo-300 rounded-md">
            {role}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 dark:bg-gray-800/40 p-3 rounded-xl">
            <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Ventas Hoy</p>
            <p className="font-bold text-gray-800 dark:text-white">{formatCurrency(dailySales)}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/40 p-3 rounded-xl">
            <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Staff</p>
            <p className="font-bold text-gray-800 dark:text-white">{activeStaff} activos</p>
          </div>
        </div>

        <button className="w-full flex items-center justify-center gap-2 py-3 bg-gray-900 dark:bg-keleo-600 text-white rounded-xl font-bold text-sm hover:opacity-90 transition transform active:scale-95">
          Gestionar Negocio <ChevronRight size={14} />
        </button>
      </div>
    );
  }

  // Staff Card Handling different staff roles like manager, admin
  if (role.toLowerCase() === 'manager' || role.toLowerCase() === 'admin') {
    return (
      <div
        className="bg-white dark:bg-dark-card rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-dark-border group relative transition hover:shadow-lg cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-4">
            <div className="w-14 h-14 rounded-2xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-2xl group-hover:scale-105 transition">
              {getIconRestaurant(typeRestaurant)}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate w-32 md:w-auto">{name}</h3>
              <p className="text-xs text-gray-500 flex items-center gap-1 w-32 md:w-auto"><MapPin size={12} /> <span className="truncate">{city}</span></p>
            </div>
          </div>
          <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-1 bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300 rounded-md">
            {role}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 dark:bg-gray-800/40 p-3 rounded-xl">
            <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Ventas Local</p>
            <p className="font-bold text-gray-800 dark:text-white">{formatCurrency(dailySales)}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/40 p-3 rounded-xl">
            <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Mesas Libres</p>
            <p className="font-bold text-gray-800 dark:text-white">
              {totalTables - tablesInUse} / {totalTables}
            </p>
          </div>
        </div>

        <button className="w-full flex items-center justify-center gap-2 py-3 bg-orange-500 text-white rounded-xl font-bold text-sm hover:opacity-90 transition transform active:scale-95">
          Panel Administrativo <ChevronRight size={14} />
        </button>
      </div>
    );
  }

  // Default Staff Card (Waiter, Kitchen, etc.)
  return (
    <div
      className="bg-white dark:bg-dark-card rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-dark-border group relative transition hover:shadow-lg cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-2xl group-hover:scale-105 transition">
            {getIconRestaurant(typeRestaurant)}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate w-32 md:w-auto">{name}</h3>
            <p className="text-xs text-gray-500 flex items-center gap-1 w-32 md:w-auto"><MapPin size={12} /> <span className="truncate">{city}</span></p>
          </div>
        </div>
        <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 rounded-md">
          {role}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 dark:bg-gray-800/40 p-3 rounded-xl">
          <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Mis Órdenes</p>
          <p className="font-bold text-gray-800 dark:text-white">{myOrders} hoy</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800/40 p-3 rounded-xl">
          <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Estado</p>
          <p className={`font-bold ${isOpen ? "text-green-500" : "text-gray-400"}`}>
            {isOpen ? "En Turno" : "Cerrado"}
          </p>
        </div>
      </div>

      <button className="w-full flex items-center justify-center gap-2 py-3 border-2 border-keleo-600 text-keleo-600 dark:text-keleo-400 rounded-xl font-bold text-sm hover:bg-keleo-600 hover:text-white transition transform active:scale-95">
        Ir a Toma de Pedidos
      </button>
    </div>
  );
}