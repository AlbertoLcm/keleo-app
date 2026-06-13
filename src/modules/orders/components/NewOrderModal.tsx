import { Button, InputText, Modal } from "@/modules/shared";
import { useState } from "react";
import { ShoppingBag, Bike } from "lucide-react";

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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Nueva Orden Directa"
      description="Para llevar o delivery"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
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
    </Modal>
  )
};

export default NewOrderModal;
