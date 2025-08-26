import React, { type ReactNode } from 'react';

export type MetricColor = 'blue' | 'green' | 'red' | 'yellow' | 'orange';

interface MetricCardProps {
  title: string;
  value: ReactNode;
  icon: ReactNode;
  color?: MetricColor;
  className?: string;
  iconContainerClassName?: string;
  valueClassName?: string;
  children?: ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  icon, 
  color = 'blue', 
  className = '', 
  iconContainerClassName = '',
  valueClassName = 'text-gray-800 dark:text-white',
  children 
}) => {
  const colorMap: Record<MetricColor, { bg: string, text: string }> = {
    blue: { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-500' },
    green: { bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-500' },
    red: { bg: 'bg-red-50 dark:bg-red-900/20', text: 'text-red-500' },
    yellow: { bg: 'bg-yellow-50 dark:bg-yellow-900/20', text: 'text-yellow-500' },
    orange: { bg: 'bg-orange-50 dark:bg-orange-900/20', text: 'text-orange-500' },
  };

  const theme = colorMap[color] || colorMap.blue;

  return (
    <div className={`p-4 rounded-xl border border-white/50 dark:border-white/5 flex items-center justify-between relative ${className}`}>
      {children}
      <div className="relative z-10">
        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
          {title}
        </p>
        <p className={`text-2xl font-bold ${valueClassName}`}>
          {value}
        </p>
      </div>
      <div className={`relative z-10 w-10 h-10 rounded-lg flex items-center justify-center ${theme.bg} ${theme.text} ${iconContainerClassName}`}>
        {icon}
      </div>
    </div>
  );
};

export default MetricCard;
