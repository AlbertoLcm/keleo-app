import React, { useState, useEffect, useRef } from 'react';
import { MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { Toggle } from '@/modules/shared';

export interface MenuProductCardProps {
  id: string;
  name: string;
  description?: string;
  price: number | string;
  image?: string;
  available: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onToggleAvailability?: (id: string, available: boolean) => void;
}

const MenuProductCard: React.FC<MenuProductCardProps> = ({
  id, name, description, price, image, available, onEdit, onDelete, onToggleAvailability
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div
      className={`group bg-white/80 dark:bg-dark-card/80 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 dark:border-white/5 relative hover:shadow-xl hover:shadow-keleo-500/5 transition duration-300 ${!available ? "opacity-75 hover:opacity-100" : ""}`}
    >
      <div
        className={`h-40 bg-gray-200 relative rounded-t-2xl overflow-hidden transition duration-500 ${!available ? "grayscale group-hover:grayscale-0" : ""}`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
        <img
          src={
            image ||
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400"
          }
          alt={name}
          className={`w-full h-full object-cover transition duration-500 ${available ? "group-hover:scale-110" : ""}`}
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
          <h3 className="font-bold text-lg text-gray-800 dark:text-white leading-tight pr-2 truncate flex-1">
            {name}
          </h3>
          <div className="relative shrink-0 z-20" ref={menuRef}>
            <button
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <MoreVertical size={20} />
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-1 w-32 bg-white dark:bg-dark-card border border-gray-100 dark:border-white/5 rounded-xl shadow-lg py-1 z-30 animate-in fade-in slide-in-from-top-2 duration-150">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onEdit?.(id);
                  }}
                  className="flex items-center w-full px-3 py-2 text-xs font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 transition text-left cursor-pointer"
                >
                  <Pencil size={14} className="mr-2 text-gray-400" />
                  Editar
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onDelete?.(id);
                  }}
                  className="flex items-center w-full px-3 py-2 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition text-left cursor-pointer"
                >
                  <Trash2 size={14} className="mr-2" />
                  Eliminar
                </button>
              </div>
            )}
          </div>
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
