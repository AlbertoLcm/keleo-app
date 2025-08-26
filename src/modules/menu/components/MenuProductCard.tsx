import React from 'react';
import { Pencil } from 'lucide-react';
import { Toggle } from '@/modules/shared';

export interface MenuProductCardProps {
  id: string;
  name: string;
  description?: string;
  price: number | string;
  image?: string;
  available: boolean;
  onEdit?: (id: string) => void;
  onToggleAvailability?: (id: string, available: boolean) => void;
}

const MenuProductCard: React.FC<MenuProductCardProps> = ({ 
  id, name, description, price, image, available, onEdit, onToggleAvailability 
}) => {
  return (
    <div
      className={`bg-white/80 dark:bg-dark-card/80 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 dark:border-white/5 overflow-hidden hover:shadow-xl hover:shadow-keleo-500/5 transition duration-300 group ${
        !available ? "opacity-75 hover:opacity-100" : ""
      }`}
    >
      <div
        className={`h-40 bg-gray-200 relative overflow-hidden ${
          !available ? "grayscale group-hover:grayscale-0" : ""
        } transition duration-500`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
        <img
          src={
            image ||
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400"
          }
          alt={name}
          className={`w-full h-full object-cover ${
            available ? "group-hover:scale-110" : ""
          } transition duration-500`}
        />
        <div className="absolute top-3 right-3 z-20">
          {!available ? (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-sm">
              Agotado
            </span>
          ) : (
            <span className="bg-white/90 dark:bg-black/70 backdrop-blur text-gray-800 dark:text-white text-xs font-bold px-2 py-1 rounded-lg shadow-sm">
              ${Number(price).toFixed(2)}
            </span>
          )}
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-800 dark:text-white leading-tight">
            {name}
          </h3>
          <button 
            className="text-gray-400 hover:text-keleo-600 transition"
            onClick={() => onEdit?.(id)}
          >
            <Pencil size={16} />
          </button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
          {description || "Sin descripción"}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-white/5">
          {available ? (
            <span className="text-xs font-semibold text-green-600 dark:text-green-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>{" "}
              Disponible
            </span>
          ) : (
            <span className="text-xs font-semibold text-red-500 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>{" "}
              No Disponible
            </span>
          )}
          <Toggle 
            id={`toggle-${id}`}
            checked={available}
            onChange={(val) => onToggleAvailability?.(id, val)}
          />
        </div>
      </div>
    </div>
  );
};

export default MenuProductCard;
