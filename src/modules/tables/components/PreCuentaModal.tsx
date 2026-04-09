import { motion, AnimatePresence } from "framer-motion";
import { X, Printer, Loader2 } from "lucide-react";
import type { OrderDetail } from "../types";
import { useState } from "react";

interface PreCuentaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  orders: OrderDetail[];
  tableName?: string;
}

const PreCuentaModal = ({ isOpen, onClose, onConfirm, orders, tableName }: PreCuentaModalProps) => {
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="precuenta-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          <motion.div
            key="precuenta-modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[61] flex items-end sm:items-center justify-center p-0 sm:p-4"
          >
            <div className="w-full sm:max-w-md bg-white dark:bg-dark-card rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              
              <div className="flex items-center justify-between px-5 pt-6 pb-4 border-b border-gray-100 dark:border-white/5 shrink-0">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">Generar Pre-cuenta</h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {tableName ? `Mesa: ${tableName}` : "Vista previa del ticket"}
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20 transition"
                >
                  <X size={16} />
                </button>
              </div>

              {/* TICKET PREVIEW */}
              <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-black/10 p-5">
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
              </div>

              {/* FOOTER ACTIONS */}
              <div className="p-5 bg-white dark:bg-dark-card border-t border-gray-100 dark:border-white/5 shrink-0 flex gap-3">
                <button
                  onClick={handleClose}
                  className="px-6 py-3 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white rounded-xl font-bold transition hover:bg-gray-200 dark:hover:bg-white/20"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={orders.length === 0 || isProcessing}
                  className="flex-1 py-3 bg-gray-900 dark:bg-white hover:bg-black dark:hover:bg-gray-100 text-white dark:text-gray-900 rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <><Loader2 size={18} className="animate-spin" /> Procesando...</>
                  ) : (
                    <><Printer size={18} /> Emitir y Bloquear Mesa</>
                  )}
                </button>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PreCuentaModal;
