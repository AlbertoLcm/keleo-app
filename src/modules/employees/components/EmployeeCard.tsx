import React from 'react';
import { MessageSquare, MoreVertical } from 'lucide-react';

export interface EmployeeStat {
  label: string;
  value: string | number;
  valueClassName?: string;
}

export interface EmployeeCardProps {
  name: string;
  role: string;
  avatarUrl: string;
  status: 'active' | 'inactive';
  statusText: string;
  stats: [EmployeeStat, EmployeeStat];
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ 
  name, 
  role, 
  avatarUrl, 
  status, 
  statusText, 
  stats 
}) => {
  const isActive = status === 'active';
  
  return (
    <div className={`bg-white/80 dark:bg-dark-card/80 backdrop-blur-md rounded-2xl shadow-sm border border-l-4 border-t-white/50 border-r-white/50 border-b-white/50 dark:border-t-white/5 dark:border-r-white/5 dark:border-b-white/5 overflow-hidden transition duration-300 group ${
      isActive 
        ? "border-l-green-500 hover:shadow-xl hover:shadow-keleo-500/5" 
        : "border-l-gray-300 dark:border-l-gray-600 hover:shadow-md opacity-75 hover:opacity-100"
    }`}>
      <div className="p-5">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <img
              src={avatarUrl}
              alt="Avatar"
              className={`w-14 h-14 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm ${!isActive ? 'grayscale' : ''}`}
            />
            <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-2 border-white dark:border-dark-card rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-400'}`}></span>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 dark:text-white leading-tight">
              {name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {role}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4 bg-gray-50 dark:bg-white/5 rounded-xl p-2">
          <div className="text-center border-r border-gray-200 dark:border-white/10">
            <p className="text-[10px] text-gray-400 uppercase">{stats[0].label}</p>
            <p className={`text-sm font-bold ${stats[0].valueClassName || (isActive ? 'text-gray-700 dark:text-gray-200' : 'text-gray-500')}`}>
              {stats[0].value}
            </p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-gray-400 uppercase">{stats[1].label}</p>
            <p className={`text-sm font-bold ${stats[1].valueClassName || (isActive ? 'text-gray-700 dark:text-gray-200' : 'text-gray-500')}`}>
              {stats[1].value}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
            isActive 
              ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" 
              : "bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400"
          }`}>
            {statusText}
          </span>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 hover:text-keleo-600 transition flex items-center justify-center">
              <MessageSquare size={16} />
            </button>
            <button className="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 hover:text-keleo-600 transition flex items-center justify-center">
              <MoreVertical size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
