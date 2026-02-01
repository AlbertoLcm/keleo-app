import { Salad, Utensils } from "lucide-react";

interface CardProductProps {
  productId: string;
  name: string;
  price: number;
  description: string;
  onClick?: () => void;
}

const CardProduct: React.FC<CardProductProps> = () => {
  return (
    <div className="glass-card p-2 rounded-xl flex sm:flex-col gap-3 group active:scale-[0.98] transition-transform duration-100 relative overflow-hidden glass-panel">
      <div className="w-24 h-24 sm:w-full sm:h-36 flex-shrink-0 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center relative overflow-hidden">
        <Salad size={69} className="text-orange-300 dark:text-[#9B4417]" />
      </div>
      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          <div className="flex justify-between items-start">
            <h4 className="font-bold text-gray-800 dark:text-white text-base leading-tight mb-1">
              Pizza Italiana
            </h4>
            <span className="bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-white text-xs font-bold px-2 py-0.5 rounded-md">
              $220
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
            Mozzarella fresca, albahaca, tomate san marzano.
          </p>
        </div>
        <button
          onclick="addToCart()"
          className="mt-2 w-full py-2 bg-keleo-50 dark:bg-white/5 text-keleo-700 dark:text-keleo-300 rounded-lg text-sm font-bold flex items-center justify-center gap-2 active:bg-keleo-100 dark:active:bg-white/10 transition"
        >
          <i className="fas fa-plus"></i> Agregar
        </button>
      </div>
    </div>
  );
};

export default CardProduct;
