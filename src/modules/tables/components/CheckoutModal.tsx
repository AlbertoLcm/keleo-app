import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Banknote,
  CreditCard,
  ArrowRight,
  ArrowLeft,
  Landmark,
  Gift,
  MoreHorizontal,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import type { OrderDetail } from "../types";
import { Modal } from "@/modules/shared";

type PaymentMethod =
  | "cash"
  | "credit_card"
  | "debit_card"
  | "bank_transfer"
  | "complimentary"
  | "other";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (paymentMethod: PaymentMethod) => Promise<void>;
  orders: OrderDetail[];
  tableName?: string;
}

const PAYMENT_OPTIONS: { method: PaymentMethod; label: string; icon: React.ReactNode; color: string }[] = [
  {
    method: "cash",
    label: "Efectivo",
    icon: <Banknote size={28} />,
    color: "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-500/40 text-emerald-700 dark:text-emerald-400",
  },
  {
    method: "credit_card",
    label: "Tarjeta Crédito",
    icon: <CreditCard size={28} />,
    color: "bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-500/40 text-blue-700 dark:text-blue-400",
  },
  {
    method: "debit_card",
    label: "Tarjeta Débito",
    icon: <CreditCard size={28} />,
    color: "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-300 dark:border-indigo-500/40 text-indigo-700 dark:text-indigo-400",
  },
  {
    method: "bank_transfer",
    label: "Transferencia",
    icon: <Landmark size={28} />,
    color: "bg-purple-50 dark:bg-purple-900/20 border-purple-300 dark:border-purple-500/40 text-purple-700 dark:text-purple-400",
  },
  {
    method: "complimentary",
    label: "Cortesía",
    icon: <Gift size={28} />,
    color: "bg-rose-50 dark:bg-rose-900/20 border-rose-300 dark:border-rose-500/40 text-rose-700 dark:text-rose-400",
  },
  {
    method: "other",
    label: "Otro",
    icon: <MoreHorizontal size={28} />,
    color: "bg-gray-50 dark:bg-white/5 border-gray-300 dark:border-white/10 text-gray-600 dark:text-gray-400",
  },
];

const CheckoutModal = ({ isOpen, onClose, onConfirm, orders, tableName }: CheckoutModalProps) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = orders.reduce((acc, item) => acc + item.applied_unit_price * item.quantity, 0);
  const tax = subtotal * 0.16;
  const total = subtotal + tax;

  const handleConfirm = async () => {
    if (!selectedMethod) return;
    setIsProcessing(true);
    try {
      await onConfirm(selectedMethod);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    if (isProcessing) return;
    setStep(1);
    setSelectedMethod(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={step === 1 ? "Resumen de Cuenta" : "Método de Pago"}
      description={tableName}
    >
      {/* Step Indicator */}
      <div className="flex gap-1.5">
        {[1, 2].map((s) => (
          <div
            key={s}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${s <= step ? "bg-keleo-500" : "bg-gray-200 dark:bg-white/10"
              }`}
          />
        ))}
      </div>

      {/* Step 1 — Order Summary */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Items list */}
            <div className="py-3 max-h-56 overflow-y-auto space-y-2">
              {orders.length === 0 ? (
                <p className="text-center text-sm text-gray-500 py-4">No hay productos en esta cuenta.</p>
              ) : (
                orders.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm py-1.5 border-b border-gray-50 dark:border-white/5 last:border-0">
                    <div>
                      <span className="font-medium text-gray-800 dark:text-white">{item.products.name}</span>
                      {item.notas && (
                        <p className="text-[11px] text-gray-400 mt-0.5">{item.notas}</p>
                      )}
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      <span className="text-gray-500 dark:text-gray-400 text-xs mr-2">{item.quantity}x</span>
                      <span className="font-bold text-gray-800 dark:text-white">
                        ${(item.applied_unit_price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Totals */}
            <div className="pb-2 space-y-1 border-t border-gray-100 dark:border-white/5 pt-3">
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>I.V.A. (16%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-100 dark:border-white/5 mt-1">
                <span>Total</span>
                <span className="text-keleo-600 dark:text-keleo-400">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Action */}
            <div className="pb-6 pt-3">
              <button
                onClick={() => setStep(2)}
                disabled={orders.length === 0}
                className="w-full py-3.5 bg-keleo-600 hover:bg-keleo-700 text-white rounded-xl font-bold text-base transition flex items-center justify-center gap-2 shadow-lg shadow-keleo-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Seleccionar Pago <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2 — Payment Method */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="py-4">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Selecciona cómo pagará el cliente:</p>
              <div className="grid grid-cols-3 gap-2">
                {PAYMENT_OPTIONS.map(({ method, label, icon, color }) => (
                  <button
                    key={method}
                    onClick={() => setSelectedMethod(method)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all duration-150 ${color} ${selectedMethod === method
                      ? "ring-2 ring-keleo-500 ring-offset-1 dark:ring-offset-dark-card scale-[0.97]"
                      : "hover:scale-[0.98]"
                      }`}
                  >
                    {icon}
                    <span className="text-[11px] font-bold leading-tight text-center">{label}</span>
                    {selectedMethod === method && (
                      <CheckCircle2 size={14} className="text-keleo-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Total reminder */}
            <div className="mb-3 px-4 py-2.5 bg-gray-50 dark:bg-white/5 rounded-xl flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">Total a cobrar</span>
              <span className="text-xl font-bold text-keleo-600 dark:text-keleo-400">${total.toFixed(2)}</span>
            </div>

            {/* Actions */}
            <div className="pb-6 flex gap-2">
              <button
                onClick={() => setStep(1)}
                className="py-3 px-4 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white rounded-xl font-bold text-sm flex items-center gap-1 hover:bg-gray-200 dark:hover:bg-white/20 transition"
              >
                <ArrowLeft size={16} /> Volver
              </button>
              <button
                onClick={handleConfirm}
                disabled={!selectedMethod || isProcessing}
                className="flex-1 py-3 bg-keleo-600 hover:bg-keleo-700 text-white rounded-xl font-bold text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-keleo-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Procesando...
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={16} /> Confirmar Cobro
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  )
};

export default CheckoutModal;
