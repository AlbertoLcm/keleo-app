import { motion } from "framer-motion";
import { LockKeyhole, AlertTriangle } from "lucide-react";

interface Step1Props {
  restaurantName: string;
  onContinue: () => void;
}

export const Step1_PreCuenta = ({ restaurantName, onContinue }: Step1Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col items-center text-center py-4 gap-6"
    >
      {/* Icon */}
      <div className="w-20 h-20 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 flex items-center justify-center">
        <LockKeyhole size={36} className="text-amber-500" />
      </div>

      {/* Text */}
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Cierre de Caja
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
          Estás iniciando el proceso de cierre de caja para{" "}
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            {restaurantName}
          </span>
          .
        </p>
      </div>

      {/* Warning notice */}
      <div className="w-full flex items-start gap-3 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 text-left">
        <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
        <div className="text-sm text-amber-800 dark:text-amber-300 space-y-1">
          <p className="font-semibold">Antes de continuar:</p>
          <ul className="list-disc list-inside space-y-0.5 text-amber-700 dark:text-amber-400">
            <li>Asegúrate de haber cerrado todas las cuentas activas.</li>
            <li>El conteo de caja se realizará a ciegas (sin ver los totales del sistema).</li>
            <li>Solo un administrador puede ver las diferencias.</li>
          </ul>
        </div>
      </div>

      <button
        onClick={onContinue}
        className="w-full py-3.5 bg-keleo-600 hover:bg-keleo-700 text-white rounded-xl font-bold text-sm transition shadow-lg shadow-keleo-500/25 flex items-center justify-center gap-2"
      >
        <LockKeyhole size={16} />
        Iniciar Cierre de Caja
      </button>
    </motion.div>
  );
};
