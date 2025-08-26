import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, MoreVertical, Edit2, Trash2 } from 'lucide-react';

export interface EmployeeStat {
  label: string;
  value: string | number;
  valueClassName?: string;
}

export interface EmployeeCardProps {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  status: 'active' | 'inactive';
  statusText: string;
  stats: [EmployeeStat, EmployeeStat];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  id,
  name,
  role,
  avatarUrl,
  status,
  statusText,
  stats,
  onEdit,
  onDelete
}) => {
  const isActive = status === 'active';
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
    <div className={`bg-white/80 dark:bg-dark-card/80 backdrop-blur-md rounded-2xl shadow-sm border border-l-4 border-t-white/50 border-r-white/50 border-b-white/50 dark:border-t-white/5 dark:border-r-white/5 dark:border-b-white/5 overflow-visible transition duration-300 group ${isActive
      ? "border-l-green-500 hover:shadow-xl hover:shadow-keleo-500/5"
      : "border-l-gray-300 dark:border-l-gray-600 hover:shadow-md opacity-75 hover:opacity-100"
      }`}>
      <div className="p-5">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <img
              src={avatarUrl}
              alt="Avatar"
              className={`min-w-14 min-h-14 max-w-14 max-h-14 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm ${!isActive ? 'grayscale' : ''}`}
            />
            <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-2 border-white dark:border-dark-card rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-400'}`}></span>
          </div>
          <div className="flex-1 overflow-hidden">
            <h3 className="font-bold text-gray-800 dark:text-white leading-tight truncate">
              {name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {role}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4 bg-gray-50 dark:bg-white/5 rounded-xl p-2">
          <div className="text-center border-r border-gray-200 dark:border-white/10 overflow-hidden">
            <p className="text-[10px] text-gray-400 uppercase truncate">{stats[0].label}</p>
            <p className={`text-sm font-bold truncate ${stats[0].valueClassName || (isActive ? 'text-gray-700 dark:text-gray-200' : 'text-gray-500')}`}>
              {stats[0].value}
            </p>
          </div>
          <div className="text-center overflow-hidden">
            <p className="text-[10px] text-gray-400 uppercase truncate">{stats[1].label}</p>
            <p className={`text-sm font-bold truncate ${stats[1].valueClassName || (isActive ? 'text-gray-700 dark:text-gray-200' : 'text-gray-500')}`}>
              {stats[1].value}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className={`px-2 py-1 rounded-lg text-xs font-bold ${isActive
            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
            : "bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400"
            }`}>
            {statusText}
          </span>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 hover:text-keleo-600 transition flex items-center justify-center">
              <MessageSquare size={16} />
            </button>
            <div className="relative" ref={menuRef}>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`w-8 h-8 rounded-lg transition flex items-center justify-center ${isMenuOpen ? 'bg-keleo-50 text-keleo-600 dark:bg-keleo-900/20 dark:text-keleo-400' : 'hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 hover:text-keleo-600'}`}
              >
                <MoreVertical size={16} />
              </button>
              
              {isMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-36 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50">
                  <button 
                    onClick={() => { setIsMenuOpen(false); onEdit?.(id); }} 
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition flex items-center gap-2"
                  >
                    <Edit2 size={14} /> Editar Rol
                  </button>
                  <button 
                    onClick={() => { setIsMenuOpen(false); onDelete?.(id); }} 
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition flex items-center gap-2"
                  >
                    <Trash2 size={14} /> Eliminar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;

