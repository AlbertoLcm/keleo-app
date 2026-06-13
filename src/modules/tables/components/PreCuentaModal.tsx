import { Printer, Loader2 } from "lucide-react";
import type { OrderDetail } from "../types";
import { useState } from "react";
import { Modal } from "@/modules/shared";

interface PreCuentaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  orders: OrderDetail[];
  tableName?: string;
  isLocked?: boolean;
}

const PreCuentaModal = ({ isOpen, onClose, onConfirm, orders, tableName, isLocked }: PreCuentaModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = orders.reduce((acc, item) => acc + item.applied_unit_price * item.quantity, 0);
  const tax = subtotal * 0.16;
  const total = subtotal + tax;

  const handleConfirm = async () => {
    setIsProcessing(true);
    try {
      await onConfirm();
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    if (isProcessing) return;
    onClose();
  };

  const getButtonConfig = () => {
    if (isProcessing) {
      return {
        text: "Procesando...",
        icon: <Loader2 className="animate-spin" size={18} />,
      }
    }

    if (isLocked) {
      return {
        text: "Volver a imprimir",
        icon: <Printer size={18} />
      }
    }

    return {
      text: "Emitir y Bloquear Mesa",
      icon: <Printer size={18} />,
    }
  }

  const { text, icon } = getButtonConfig();
  const isDisabled = orders.length === 0 || isProcessing;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Generar Pre-cuenta"
      description={tableName ? `Mesa: ${tableName}` : "Vista previa del ticket"}
      footer={
        <div className="bg-white dark:bg-dark-card shrink-0 flex gap-3">
          <button
            onClick={handleClose}
            className="px-6 py-3 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white rounded-xl font-bold transition hover:bg-gray-200 dark:hover:bg-white/20"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={isDisabled}
            className="flex-1 py-3 bg-gray-900 dark:bg-white hover:bg-black dark:hover:bg-gray-100 text-white dark:text-gray-900 rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {icon}
            {text}
          </button>
        </div>
      }
    >
      <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-4 shadow-sm font-mono text-sm">
        <div className="text-center pb-4 border-b border-dashed border-gray-300 dark:border-white/20 mb-4">
          <p className="font-bold text-lg text-gray-800 dark:text-white">TICKET DE PRE-CUENTA</p>
          <p className="text-xs text-gray-500 mt-1">{new Date().toLocaleString()}</p>
          <p className="text-xs font-bold text-gray-600 dark:text-gray-400 mt-1">{tableName}</p>
        </div>

        <div className="space-y-3">
          {orders.length === 0 ? (
            <p className="text-center text-gray-500 py-4 font-sans text-sm">No hay productos enviados a cocina.</p>
          ) : (
            orders.map((item) => (
              <div key={item.id} className="flex justify-between items-start">
                <div className="flex-1 pr-2">
                  <span className="text-gray-800 dark:text-gray-200">{item.quantity}x {item.products.name}</span>
                  {item.notas && <p className="text-xs text-gray-500 pl-4 uppercase">*{item.notas}</p>}
                </div>
                <span className="text-gray-800 dark:text-gray-200 shrink-0 text-right">
                  ${(item.applied_unit_price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-dashed border-gray-300 dark:border-white/20 space-y-1">
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>I.V.A (16%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base font-bold text-gray-900 dark:text-white mt-2 pt-2 border-t border-gray-200 dark:border-white/10">
            <span>Total Neto</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-gray-500 mt-4 px-4 font-sans">
        Al emitir la pre-cuenta, la mesa se bloqueará y no podrá recibir nuevos productos a menos que sea reabierta manualmente.
      </p>
    </Modal>
  )
};

export default PreCuentaModal;
