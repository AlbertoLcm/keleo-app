import { Button, InputText } from "@/modules/shared";
import { useState } from "react";
import { ShoppingBag, Bike, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NewOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { orderAlias: string; type: "takeout" | "delivery" }) => void;
  isSubmitting?: boolean;
}

const NewOrderModal: React.FC<NewOrderModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting = false,
}) => {
  const [orderAlias, setOrderAlias] = useState("");
  const [type, setType] = useState<"takeout" | "delivery">("takeout");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderAlias.trim()) {
      setError("El nombre o identificador es obligatorio.");
      return;
    }
    setError("");
    onSubmit({ orderAlias, type });
  };

  const handleClose = () => {
    if (isSubmitting) return;
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="neworder-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Modal */}
          <motion.div
            key="neworder-modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[61] flex items-end sm:items-center justify-center p-0 sm:p-4"
          >
            <div className="w-full sm:max-w-md bg-white dark:bg-dark-card rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-5 pt-6 pb-4 border-b border-gray-100 dark:border-white/5">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    Nueva Orden Directa
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Para llevar o delivery
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20 transition"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="p-5 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tipo de Servicio
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      onClick={() => setType("takeout")}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${type === "takeout"
                        ? "border-keleo-500 bg-keleo-50 dark:bg-keleo-900/20 text-keleo-700 dark:text-keleo-300"
                        : "border-gray-200 dark:border-gray-700 hover:border-keleo-300 text-gray-500"
                        }`}
                    >
                      <ShoppingBag size={24} className="mb-2" />
                      <span className="font-semibold text-sm">Para Llevar</span>
                    </div>
                    <div
                      onClick={() => setType("delivery")}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${type === "delivery"
                        ? "border-keleo-500 bg-keleo-50 dark:bg-keleo-900/20 text-keleo-700 dark:text-keleo-300"
                        : "border-gray-200 dark:border-gray-700 hover:border-keleo-300 text-gray-500"
                        }`}
                    >
                      <Bike size={24} className="mb-2" />
                      <span className="font-semibold text-sm">Delivery</span>
                    </div>
                  </div>
                </div>

                <InputText
                  id="orderAlias"
                  label="Nombre del Cliente o Identificador"
                  name="orderAlias"
                  value={orderAlias}
                  onChange={(e) => setOrderAlias(e.target.value)}
                  placeholder="Ej: Juan Pérez / Orden #42"
                  error={error}
                />

                {/* Actions */}
                <Button
                  loading={isSubmitting}
                  onClick={handleSubmit}
                  variant="primary"
                  className="w-full mt-2"
                  disabled={isSubmitting}
                >
                  Crear Orden
                </Button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NewOrderModal;
