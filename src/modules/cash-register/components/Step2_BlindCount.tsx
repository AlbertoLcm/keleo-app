import { motion } from "framer-motion";
import {
  Banknote,
  CreditCard,
  Landmark,
  MoreHorizontal,
  ArrowRight,
  EyeOff,
} from "lucide-react";
import type { BlindCount } from "../types";

interface Step2Props {
  blindCount: BlindCount;
  onChange: (key: keyof BlindCount, value: number) => void;
  onContinue: () => void;
}

const FIELDS: {
  key: keyof BlindCount;
  label: string;
  icon: React.ReactNode;
  color: string;
}[] = [
  {
    key: "cash",
    label: "Efectivo",
    icon: <Banknote size={18} />,
    color: "text-emerald-600 dark:text-emerald-400",
  },
  {
    key: "credit_card",
    label: "Tarjeta Crédito",
    icon: <CreditCard size={18} />,
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    key: "debit_card",
    label: "Tarjeta Débito",
    icon: <CreditCard size={18} />,
    color: "text-indigo-600 dark:text-indigo-400",
  },
  {
    key: "bank_transfer",
    label: "Transferencia",
    icon: <Landmark size={18} />,
    color: "text-purple-600 dark:text-purple-400",
  },
  {
    key: "other",
    label: "Otros",
    icon: <MoreHorizontal size={18} />,
    color: "text-gray-600 dark:text-gray-400",
  },
];

const fmt = (v: number) =>
  `$${v.toLocaleString("es-MX", { minimumFractionDigits: 2 })}`;

export const Step2_BlindCount = ({ blindCount, onChange, onContinue }: Step2Props) => {
  const total =
    blindCount.cash +
    blindCount.credit_card +
    blindCount.debit_card +
    blindCount.bank_transfer +
    blindCount.other;

  const handleChange = (key: keyof BlindCount, raw: string) => {
    const parsed = parseFloat(raw);
    onChange(key, isNaN(parsed) ? 0 : Math.max(0, parsed));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.25 }}
      className="space-y-4"
    >
      {/* Blind count notice */}
      <div className="flex items-center gap-2 bg-gray-50 dark:bg-white/5 rounded-xl px-4 py-3 border border-gray-100 dark:border-white/10">
        <EyeOff size={16} className="text-gray-400 shrink-0" />
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Ingresa los montos físicamente contados{" "}
          <strong className="text-gray-700 dark:text-gray-300">sin consultar el sistema</strong>.
        </p>
      </div>

      {/* Fields */}
      <div className="space-y-3">
        {FIELDS.map(({ key, label, icon, color }) => (
          <div key={key} className="flex items-center gap-3">
            <div
              className={`w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-white/8 shrink-0 ${color}`}
            >
              {icon}
            </div>
            <label className="flex-1 text-sm font-medium text-gray-700 dark:text-gray-300 min-w-0">
              {label}
            </label>
            <div className="relative w-36 shrink-0">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
                $
              </span>
              <input
                id={`blind-${key}`}
                type="number"
                min="0"
                step="0.01"
                value={blindCount[key] === 0 ? "" : blindCount[key]}
                placeholder="0.00"
                onChange={(e) => handleChange(key, e.target.value)}
                className="w-full pl-7 pr-3 py-2.5 bg-white dark:bg-white/8 border border-gray-200 dark:border-white/10 rounded-xl text-sm text-right font-mono font-semibold text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-keleo-500/40 transition"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="flex justify-between items-center bg-keleo-50 dark:bg-keleo-900/20 border border-keleo-200 dark:border-keleo-500/30 rounded-xl px-4 py-3">
        <span className="text-sm font-bold text-keleo-700 dark:text-keleo-400">
          Total Contado
        </span>
        <span className="text-lg font-bold text-keleo-700 dark:text-keleo-400 font-mono">
          {fmt(total)}
        </span>
      </div>

      <button
        onClick={onContinue}
        className="w-full py-3.5 bg-keleo-600 hover:bg-keleo-700 text-white rounded-xl font-bold text-sm transition shadow-lg shadow-keleo-500/25 flex items-center justify-center gap-2"
      >
        Confirmar Conteo <ArrowRight size={16} />
      </button>
    </motion.div>
  );
};
