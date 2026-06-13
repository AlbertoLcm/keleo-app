import { AlertCircle } from "lucide-react";
import type { CloseBoxForm } from "../hooks/useDashboard";
import { Modal } from "@/modules/shared";

interface CloseBoxModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: CloseBoxForm;
  onChange: (form: CloseBoxForm) => void;
  isSubmitting: boolean;
  onSubmit: () => void;
  totalSales: number;
  totalOrders: number;
}

const CloseBoxModal: React.FC<CloseBoxModalProps> = ({
  isOpen,
  onClose,
  form,
  onChange,
  isSubmitting,
  onSubmit,
  totalSales,
  totalOrders,
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title="Cierre de Caja"
  >
    <div className="flex flex-col gap-4">
      <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-xl p-3.5 flex gap-3 text-red-600 dark:text-red-400 text-xs leading-relaxed">
        <AlertCircle className="shrink-0 mt-0.5" size={16} />
        <p>
          <strong>ATENCIÓN:</strong> El cierre de caja consolidará todas las ventas del
          turno actual y reiniciará el balance a cero para el próximo turno. Asegúrate de
          contar bien el efectivo.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 py-2 border-y border-gray-100 dark:border-white/5 text-sm">
        <div>
          <span className="text-xs text-gray-400 uppercase font-bold block">
            Ventas Estimadas
          </span>
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            ${totalSales.toLocaleString()}
          </span>
        </div>
        <div>
          <span className="text-xs text-gray-400 uppercase font-bold block">
            Pedidos Atendidos
          </span>
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            {totalOrders} pedidos
          </span>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="space-y-4"
      >
        <div>
          <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase">
            Efectivo Real en Caja ($)
          </label>
          <input
            type="number"
            step="0.01"
            placeholder={`Ej. ${totalSales}`}
            value={form.real_amount}
            onChange={(e) => onChange({ ...form, real_amount: e.target.value })}
            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-xl px-3 py-2.5 text-sm text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-keleo-500"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase">
            Observaciones (Opcional)
          </label>
          <textarea
            placeholder="Escribe discrepancias, notas del arqueo o novedades..."
            value={form.observations}
            onChange={(e) => onChange({ ...form, observations: e.target.value })}
            className="w-full h-20 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-xl px-3 py-2 text-sm text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-keleo-500 resize-none"
          />
        </div>

        <div className="flex gap-3 pt-3 border-t border-gray-100 dark:border-white/5">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 font-semibold rounded-xl text-sm transition cursor-pointer text-center"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl text-sm transition flex items-center justify-center cursor-pointer"
          >
            {isSubmitting ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            ) : (
              "Confirmar Cierre"
            )}
          </button>
        </div>
      </form>
    </div>
  </Modal>
);

export default CloseBoxModal;
