import { ArrowRight, EllipsisVertical, MapPin, Moon } from "lucide-react";
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
  dailySales: number;
  status: "open" | "closed";
  onClick?: (cardId: string) => void;
};

const RESTAURANT_ICONS: Record<TypeRestaurant, string> = {
  restaurant: "🍔",
  coffee: "☕",
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
  status,
  dailySales,
}: CardRestaurantProps) {
  
  const isOpen = status === "open";

  const handleClick = () => {
    if (onClick) onClick(cardId);
  };

  const getIconRestaurant = (type: TypeRestaurant): string => {
    return RESTAURANT_ICONS[type] || "🍴";
  };

  return (
    <div 
      className={`glass-panel rounded-2xl p-6 shadow-sm transition duration-300 border border-gray-200 dark:border-dark-border group relative overflow-hidden 
      ${isOpen ? "hover:shadow-xl hover:shadow-keleo-500/10" : "opacity-75 hover:opacity-100"}`}
    >
      {/* Barra superior solo visible si está abierto */}
      {isOpen && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition duration-500"></div>
      )}

      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-4">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-inner transition 
            ${isOpen ? "bg-gray-100 dark:bg-gray-700/50" : "bg-gray-100 dark:bg-gray-800 grayscale"}`}>
            {getIconRestaurant(typeRestaurant)}
          </div>
          <div>
            <h3 className={`text-lg font-bold transition ${isOpen ? "text-gray-900 dark:text-white group-hover:text-keleo-600" : "text-gray-500 dark:text-gray-400"}`}>
              {name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 flex gap-1 mt-1">
              <MapPin size={18} /> <span className="truncate w-48">{city}</span>
            </p>
          </div>
        </div>
        <button className="text-gray-300 hover:text-gray-500 dark:hover:text-gray-200 transition cursor-pointer">
          <EllipsisVertical size={20} />
        </button>
      </div>

      {/* Grid de Stats con opacidad si está cerrado */}
      <div className={`grid grid-cols-2 gap-4 mb-6`}>
        <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-xl">
          <p className="text-xs text-gray-400 mb-1">Ventas Hoy</p>
          <p className="font-bold text-gray-800 dark:text-white">
            {formatCurrency(dailySales)}
          </p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-xl">
          <p className="text-xs text-gray-400 mb-1">Mesas</p>
          <p className="font-bold text-gray-800 dark:text-white">
            <span className={isOpen ? "text-orange-500" : "text-gray-400"}>
              {tablesInUse}
            </span> / {totalTables}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto">
        {isOpen ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>{" "}
            Abierto
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
            <Moon size={12} /> Cerrado
          </span>
        )}

        <button
          onClick={handleClick}
          className={`cursor-pointer flex items-center gap-2 text-sm font-bold transition 
            ${isOpen 
              ? "text-keleo-600 dark:text-keleo-400 hover:text-keleo-700" 
              : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"}`}
        >
          {isOpen ? "Entrar al Panel" : "Ver Historial"} 
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}