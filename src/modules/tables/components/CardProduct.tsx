import formatCurrency from "@/modules/restaurants/utils/formatCurrency";
import { Salad, Plus } from "lucide-react";

interface CardProductProps {
  productId: string;
  name: string;
  price: number;
  description: string | undefined;
  onClick?: () => void;
  isLocked?: boolean;
}

const CardProduct: React.FC<CardProductProps> = ({
  productId,
  name,
  price,
  description,
  onClick,
  isLocked,
}) => {
  return (
    <div key={productId} className="bg-white dark:bg-dark-card p-2 rounded-xl flex sm:flex-col gap-3 group active:scale-[0.98] transition-transform duration-100 relative overflow-hidden">
      <div className="w-24 h-24 sm:w-full sm:h-36 flex-shrink-0 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center relative overflow-hidden">
        <Salad size={69} className="text-orange-300 dark:text-[#9B4417]" />
      </div>
      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          <div className="flex justify-between items-start">
            <h4 className="font-bold text-gray-800 dark:text-white text-base leading-tight mb-1">
              {name}
            </h4>
            <span className="bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-white text-xs font-bold px-2 py-0.5 rounded-md">
              {formatCurrency(price)}
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>
        <button
          onClick={onClick}
          disabled={isLocked}
          className={`mt-2 w-full py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition ${
            isLocked
              ? "bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-500 cursor-not-allowed"
              : "bg-keleo-50 dark:bg-white/5 text-keleo-700 dark:text-keleo-300 active:bg-keleo-100 dark:active:bg-white/10 hover:bg-keleo-100 dark:hover:bg-white/10"
          }`}
        >
          <Plus size={16} /> Agregar
        </button>
      </div>
    </div>
  );
};

export default CardProduct;
