import React from 'react';

export interface FilterTabOption {
  id: string | null;
  label: string;
}

interface FilterTabsProps {
  options: FilterTabOption[];
  activeId: string | null;
  onChange: (id: string | null) => void;
  className?: string;
  contentBefore?: React.ReactNode;
  contentAfter?: React.ReactNode;
}

const FilterTabs: React.FC<FilterTabsProps> = ({ 
  options, 
  activeId, 
  onChange, 
  className = '', 
  contentBefore,
  contentAfter
}) => {

  if (!options || options.length === 1) return null;

  return (
    <div className={`flex items-center overflow-x-auto no-scrollbar touch-pan-x gap-1 md:gap-2 ${className}`}>
      {contentBefore}
      {options.map((option) => {
        const isActive = activeId === option.id;
        
        return (
          <button
            key={option.id ?? 'null'}
            onClick={() => onChange(option.id)}
            className={`
              flex-shrink-0 px-4 py-2 rounded-full text-xs md:text-sm font-bold whitespace-nowrap transition shadow-sm
              ${
                isActive
                  ? "bg-keleo-600 text-white border-transparent"
                  : "border border-gray-300 dark:border-white/20 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 active:bg-gray-100 dark:active:bg-white/10"
              }
            `}
          >
            {option.label}
          </button>
        );
      })}
      {contentAfter}
    </div>
  );
};

export default FilterTabs;
