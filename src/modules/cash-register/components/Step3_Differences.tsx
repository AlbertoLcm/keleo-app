import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, ArrowRight, ShieldAlert } from "lucide-react";
import type { DailySummary, BlindCount, CashRegisterDifferences } from "../types";
import { DIFFERENCE_THRESHOLD } from "../types";

interface Step3Props {
  summary: DailySummary;
  blindCount: BlindCount;
  differences: CashRegisterDifferences;
  onContinue: () => void;
}

const PAYMENT_LABELS: Record<string, string> = {
  cash: "Efectivo",
  credit_card: "Tarjeta Crédito",
  debit_card: "Tarjeta Débito",
  bank_transfer: "Transferencia",
  other: "Otros",
};

const fmt = (v: number) =>
  `$${v.toLocaleString("es-MX", { minimumFractionDigits: 2 })}`;

const fmtDiff = (v: number) => {
  const abs = Math.abs(v).toLocaleString("es-MX", { minimumFractionDigits: 2 });
  if (v > 0.01) return `+$${abs}`;
  if (v < -0.01) return `-$${abs}`;
  return "$0.00";
};

const DiffBadge = ({ value }: { value: number }) => {
  if (Math.abs(value) < 0.01) {
    return (
      <span className="flex items-center gap-1 text-xs font-bold text-gray-500 dark:text-gray-400">
        <Minus size={12} /> {fmtDiff(value)}
      </span>
    );
  }
  if (value > 0) {
    return (
      <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
        <TrendingUp size={12} /> {fmtDiff(value)}
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1 text-xs font-bold text-red-600 dark:text-red-400">
      <TrendingDown size={12} /> {fmtDiff(value)}
    </span>
  );
};

const methods = ["cash", "credit_card", "debit_card", "bank_transfer", "other"] as const;

export const Step3_Differences = ({
  summary,
  blindCount,
  differences,
  onContinue,
}: Step3Props) => {
  const hasSignificantDifference = Math.abs(differences.total) > DIFFERENCE_THRESHOLD;
  const countedTotal =
    blindCount.cash +
    blindCount.credit_card +
    blindCount.debit_card +
    blindCount.bank_transfer +
    blindCount.other;

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.25 }}
      className="space-y-4"
    >
      {/* Admin-only notice */}
      <div className="flex items-center gap-2 bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/30 rounded-xl px-4 py-2.5">
        <ShieldAlert size={15} className="text-violet-500 shrink-0" />
        <p className="text-xs text-violet-700 dark:text-violet-300 font-medium">
          Esta información es visible solo para administradores y propietarios.
        </p>
      </div>

      {/* Comparison table */}
      <div className="rounded-xl border border-gray-100 dark:border-white/10 overflow-hidden">
        <div className="grid grid-cols-4 bg-gray-50 dark:bg-white/5 px-4 py-2">
          <span className="text-[10px] font-bold text-gray-400 uppercase col-span-2">Método</span>
          <span className="text-[10px] font-bold text-gray-400 uppercase text-right">Sistema</span>
          <span className="text-[10px] font-bold text-gray-400 uppercase text-right">Diferencia</span>
        </div>

        {methods.map((method, idx) => {
          const sysAmount =
            method === "bank_transfer"
              ? summary.systemTotals.bank_transfer
              : summary.systemTotals[method];
          const diff = (differences as any)[method] ?? 0;

          return (
            <div
              key={method}
              className={`grid grid-cols-4 px-4 py-3 items-center ${idx % 2 === 0 ? "" : "bg-gray-50/50 dark:bg-white/3"}`}
            >
              <span className="text-xs text-gray-700 dark:text-gray-300 font-medium col-span-2">
                {PAYMENT_LABELS[method]}
              </span>
              <span className="text-xs text-gray-600 dark:text-gray-400 text-right font-mono">
                {fmt(sysAmount)}
              </span>
              <div className="flex justify-end">
                <DiffBadge value={diff} />
              </div>
            </div>
          );
        })}

        {/* Total row */}
        <div className="grid grid-cols-4 px-4 py-3 items-center bg-keleo-50 dark:bg-keleo-900/20 border-t border-keleo-100 dark:border-keleo-500/20">
          <span className="text-sm font-bold text-keleo-700 dark:text-keleo-400 col-span-2">
            TOTAL
          </span>
          <span className="text-sm font-bold text-keleo-700 dark:text-keleo-400 text-right font-mono">
            {fmt(summary.systemTotals.total)}
          </span>
          <div className="flex justify-end">
            <DiffBadge value={differences.total} />
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10 p-3">
          <p className="text-[10px] text-gray-400 mb-1">Sistema reporta</p>
          <p className="text-base font-bold text-gray-900 dark:text-white font-mono">
            {fmt(summary.systemTotals.total)}
          </p>
        </div>
        <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10 p-3">
          <p className="text-[10px] text-gray-400 mb-1">Cajero contó</p>
          <p className="text-base font-bold text-gray-900 dark:text-white font-mono">
            {fmt(countedTotal)}
          </p>
        </div>
      </div>

      {/* Alert if significant difference */}
      {hasSignificantDifference && (
        <div className="flex items-start gap-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl px-4 py-3">
          <TrendingDown size={16} className="text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-red-700 dark:text-red-400">
              Diferencia significativa detectada ({fmtDiff(differences.total)})
            </p>
            <p className="text-xs text-red-600 dark:text-red-400 mt-0.5">
              Se requerirá una justificación en el siguiente paso.
            </p>
          </div>
        </div>
      )}

      <button
        onClick={onContinue}
        className="w-full py-3.5 bg-keleo-600 hover:bg-keleo-700 text-white rounded-xl font-bold text-sm transition shadow-lg shadow-keleo-500/25 flex items-center justify-center gap-2"
      >
        {hasSignificantDifference ? "Continuar y Justificar" : "Confirmar y Cerrar"}
        <ArrowRight size={16} />
      </button>
    </motion.div>
  );
};
