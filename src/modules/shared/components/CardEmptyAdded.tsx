import { PlusIcon } from "lucide-react";

interface CardEmptyAddedProps {
  onAction?: () => void;
  title: string;
  description: string;
}

const CardEmptyAdded: React.FC<CardEmptyAddedProps> = ({
  onAction,
  title,
  description,
}) => {
  return (
    <button
      onClick={onAction}
      className="cursor-pointer border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl flex flex-col items-center justify-center p-6 text-gray-400 hover:text-keleo-600 hover:border-keleo-500 hover:bg-keleo-50/50 dark:hover:bg-keleo-900/10 transition duration-300 group min-h-60 h-full"
    >
      <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition shadow-inner">
        <PlusIcon size={32} />
      </div>
      <h3 className="font-bold text-gray-600 dark:text-gray-300">{title}</h3>
      <p className="text-xs mt-1 text-center">{description}</p>
    </button>
  );
};

export default CardEmptyAdded;
