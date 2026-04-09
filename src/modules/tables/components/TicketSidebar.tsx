import {
  ChevronDown,
  Receipt,
  Send,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TicketItem from "./TicketItem";
import type { CartItem, OrderDetail } from "../types";

interface TicketSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items?: CartItem[];
  sentItems?: OrderDetail[];
  total?: number;
  totalSent?: number;
  isSending?: boolean;
  isLocked?: boolean;
  onIncrease?: (productId: string) => void;
  onDecrease?: (productId: string) => void;
  onRemove?: (productId: string) => void;
  onAddNote?: (productId: string, note: string) => void;
  onClear?: () => void;
  onSendToKitchen?: () => void;
  onPreCuenta?: () => void;
  onCheckout?: () => void;
}

export const TicketSidebar = ({
  isOpen,
  onClose,
  items = [],
  sentItems = [],
  total = 0,
  totalSent = 0,
  isSending = false,
  isLocked = false,
  onIncrease,
  onDecrease,
  onRemove,
  onAddNote,
  onClear,
  onSendToKitchen,
  onPreCuenta,
  onCheckout,
}: TicketSidebarProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          key="ticket-panel"
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "100%" }}
          transition={{
            type: "tween",
            ease: [0.25, 0.1, 0.25, 1],
            duration: 0.3,
          }}
          style={{
            willChange: "transform",
            backfaceVisibility: "hidden",
          }}
          className="ticket-hidden lg:ticket-visible fixed inset-0 lg:static lg:inset-auto z-50 w-full lg:w-96 flex flex-col bg-gray-50 dark:bg-dark-bg lg:bg-transparent transition-transform duration-300 ease-out lg:border-l lg:border-gray-200 lg:dark:border-white/5"
        >
          <div className="px-4 h-16 border-b border-gray-200 dark:border-white/5 flex justify-between items-center shadow-sm lg:shadow-none">
            <h2 className="font-bold text-gray-800 dark:text-white text-lg flex items-center gap-2">
              <Receipt className="text-keleo-500" /> Orden Actual
            </h2>
            <button
              onClick={onClose}
              className="lg:hidden w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-600 dark:text-gray-300"
            >
              <ChevronDown />
            </button>
            <button onClick={onClear} className="hidden lg:block text-xs text-keleo-600 dark:text-keleo-400 font-bold hover:underline">
              Limpiar
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50 dark:bg-black/10">

            {sentItems.length > 0 && (
              <div className="mb-4">
                <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2 tracking-wider">
                  Enviado a Cocina
                </h3>
                <div className="space-y-2">
                  {sentItems.map((item) => (
                    <TicketItem
                      key={item.id}
                      Editable={false}
                      name={item.products.name}
                      price={item.applied_unit_price}
                      quantity={item.quantity}
                      note={item.notas || undefined}
                      status={item.status}
                    />
                  ))}
                </div>
              </div>
            )}

            {!isLocked ? (
              <>
                <div className="mb-2 mt-4">
                  <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2 tracking-wider">
                    Para Enviar
                  </h3>
                </div>

                {items.length === 0 ? (
                  <div className="text-center text-sm text-gray-500 mt-6 mb-10">
                    La orden está vacía. Selecciona productos para agregarlos.
                  </div>
                ) : (
                  items.map((item) => (
                    <TicketItem
                      key={item.productId}
                      Editable
                      name={item.name}
                      note={item.notas}
                      price={item.price}
                      quantity={item.quantity}
                      onIncrease={() => onIncrease?.(item.productId)}
                      onDecrease={() => onDecrease?.(item.productId)}
                      onRemove={() => onRemove?.(item.productId)}
                      onAddNote={(note) => onAddNote?.(item.productId, note)}
                    />
                  ))
                )}
              </>
            ) : (
              <div className="mt-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-500/30 text-center">
                <Receipt className="mx-auto text-blue-500 mb-2" size={24} />
                <h4 className="font-bold text-blue-700 dark:text-blue-400 text-sm mb-1">Pre-cuenta Emitida</h4>
                <p className="text-xs text-blue-600 dark:text-blue-300">
                  La mesa está bloqueada. Para agregar nuevos artículos debes reabrir la cuenta primero.
                </p>
              </div>
            )}

            <div className="h-20 lg:hidden"></div>
          </div>

          <div className="p-4 bg-white dark:bg-dark-card border-t border-gray-200 dark:border-white/5 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-20">
            <div className="space-y-1 mb-3">
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Subtotal</span>
                <span>${((totalSent + total) / 1.16).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Impuestos</span>
                <span>${((totalSent + total) - (totalSent + total) / 1.16).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-100 dark:border-white/5 mt-1">
                <span>Total Mesa</span>
                <span className="text-keleo-600 dark:text-keleo-400">
                  ${(totalSent + total).toFixed(2)}
                </span>
              </div>
            </div>

            <button 
              onClick={onSendToKitchen}
              disabled={isSending || items.length === 0 || isLocked}
              className={`w-full py-3.5 rounded-xl shadow-lg font-bold text-base transition transform active:scale-[0.98] flex items-center justify-center gap-2 mb-2 ${
                 isLocked 
                 ? "bg-gray-100 text-gray-400 dark:bg-white/5 dark:text-gray-500 cursor-not-allowed shadow-none"
                 : "bg-keleo-600 hover:bg-keleo-700 text-white shadow-keleo-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
              }`}>
              <Send size={18} />
              {isSending ? "Enviando..." : `Enviar a Cocina (${items.reduce((acc, i) => acc + i.quantity, 0)})`}
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={onPreCuenta}
                disabled={!sentItems || sentItems.length === 0}
                className="py-3 bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-white rounded-xl font-bold text-sm hover:bg-gray-200 dark:hover:bg-white/20 transition flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Receipt size={16} /> Pre-cuenta
              </button>
              <button
                onClick={onCheckout}
                disabled={!sentItems || sentItems.length === 0}
                className="py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold text-sm shadow-md shadow-blue-500/20 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Cobrar
              </button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default TicketSidebar;
