import { ChevronUp } from "lucide-react";

interface MobileCartBarProps {
  onOpenTicket: () => void;
  itemsCount: number;
  total: number;
}

export const MobileCartBar = ({ onOpenTicket, itemsCount, total }: MobileCartBarProps) => {
  return (
    <div
      className="bg-white dark:bg-dark-card fixed bottom-4 left-4 right-4 z-40 lg:hidden rounded-2xl p-3 flex items-center justify-between cursor-pointer transform duration-200 border border-white/20 shadow-2xl"
      onClick={onOpenTicket}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full flex items-center justify-center font-bold text-sm shadow-md">
          {itemsCount}
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            Ver Orden
          </span>
          <span className="text-base font-bold text-gray-900 dark:text-white font-mono">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 text-keleo-600 dark:text-keleo-400 font-bold text-sm px-2">
        Ver detalle <ChevronUp size={18} />
      </div>
    </div>
  );
};

export default MobileCartBar;
