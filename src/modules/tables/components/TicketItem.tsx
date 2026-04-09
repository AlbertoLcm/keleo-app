import { useState } from "react";
import { Minus, Pencil, Plus, X, CircleCheck, Clock, ChefHat, Check } from "lucide-react";

const TicketItem = ({
  name,
  note,
  price,
  quantity,
  status,
  onIncrease,
  onDecrease,
  onRemove,
  onAddNote,
  Editable,
}: {
  name: string;
  note?: string;
  price: number;
  quantity: number;
  status?: "pending" | "in_preparation" | "ready" | "served" | "cancelled";
  onIncrease?: () => void;
  onDecrease?: () => void;
  onRemove?: () => void;
  onAddNote?: (note: string) => void;
  Editable?: boolean;
}) => {
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [tempNote, setTempNote] = useState(note || "");

  const getStatusColor = () => {
    switch (status) {
      case "pending": return "text-yellow-600 dark:text-yellow-400";
      case "in_preparation": return "text-blue-600 dark:text-blue-400";
      case "ready": return "text-purple-600 dark:text-purple-400";
      case "served": return "text-green-600 dark:text-green-400";
      case "cancelled": return "text-red-600 dark:text-red-400";
      default: return "text-gray-500";
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "pending": return <Clock size={14} />;
      case "in_preparation": return <ChefHat size={14} />;
      case "ready": return <CircleCheck size={14} />;
      case "served": return <Check size={14} />;
      case "cancelled": return <X size={14} />;
      default: return null;
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case "pending": return "Pendiente";
      case "in_preparation": return "Preparando";
      case "ready": return "Listo";
      case "served": return "Servido";
      case "cancelled": return "Cancelado";
      default: return "";
    }
  };

  const handleSaveNote = () => {
    onAddNote?.(tempNote);
    setIsEditingNote(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSaveNote();
    } else if (e.key === "Escape") {
      setTempNote(note || "");
      setIsEditingNote(false);
    }
  };

  return (
    <div className={`flex flex-col p-3 rounded-xl bg-white dark:bg-dark-card border-l-4 shadow-sm relative group ${Editable ? "border-keleo-500" : "border-gray-300 dark:border-white/10 opacity-80"}`}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex gap-3">
          {/* Stepper (Only if Editable) */}
          {Editable ? (
            <div className="flex flex-col items-center gap-1 bg-gray-100 dark:bg-white/5 rounded-lg p-0.5 shadow-inner shrink-0">
              <button onClick={onIncrease} className="w-7 h-7 flex items-center justify-center text-xs text-gray-500 hover:text-keleo-500 active:bg-gray-200 dark:active:bg-white/10 rounded">
                <Plus size={18} />
              </button>
              <span className="text-sm font-bold text-gray-800 dark:text-white">
                {quantity}
              </span>
              <button onClick={onDecrease} className="w-7 h-7 flex items-center justify-center text-xs text-gray-500 hover:text-red-500 active:bg-gray-200 dark:active:bg-white/10 rounded">
                <Minus size={18} />
              </button>
            </div>
          ) : (
            <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-bold px-2 py-0.5 rounded h-fit shrink-0 mt-0.5">
              {quantity}x
            </span>
          )}
          <div className="flex-1 w-full max-w-[150px] lg:max-w-none">
            <p className="text-sm font-bold text-gray-800 dark:text-white truncate">
              {name}
            </p>
            {isEditingNote ? (
              <div className="flex mt-1 w-full gap-1">
                <input
                  type="text"
                  value={tempNote}
                  onChange={(e) => setTempNote(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={handleSaveNote}
                  autoFocus
                  placeholder="Nota (sin cebolla...)"
                  className="w-full text-xs bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded px-2 py-1 outline-none focus:border-keleo-500 text-gray-700 dark:text-gray-300"
                />
              </div>
            ) : (
              note && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 break-words line-clamp-2">
                  {note}
                </p>
              )
            )}
            
            {status && (
               <p className={`text-xs font-medium mt-1 flex items-center gap-1 ${getStatusColor()}`}>
                 {getStatusIcon()}
                 {getStatusLabel()}
               </p>
            )}

            {Editable && !isEditingNote && (
              <button 
                onClick={() => setIsEditingNote(true)}
                className="text-[10px] text-blue-500 font-bold mt-2 px-2 py-1 bg-blue-50 dark:bg-blue-900/20 rounded hover:bg-blue-100 transition flex gap-1 items-center"
              >
                <Pencil size={14} />
                {note ? "Editar nota" : "Añadir nota"}
              </button>
            )}
          </div>
      </div>
      <span className="text-sm font-bold text-gray-800 dark:text-white mr-5">
        ${(price * quantity).toFixed(2)}
      </span>
    </div>
      {Editable && (
        <button onClick={onRemove} className="absolute right-0 top-0 p-2 text-gray-500 hover:text-red-500 transition">
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default TicketItem;
