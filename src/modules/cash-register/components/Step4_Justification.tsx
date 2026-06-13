import { motion } from "framer-motion";
import { MessageSquare, ArrowRight } from "lucide-react";

interface Step4Props {
  notes: string;
  onChange: (value: string) => void;
  onContinue: () => void;
  differenceAmount: number;
}

const fmtDiff = (v: number) => {
  const abs = Math.abs(v).toLocaleString("es-MX", { minimumFractionDigits: 2 });
  if (v > 0.01) return `sobrante de $${abs}`;
  if (v < -0.01) return `faltante de $${abs}`;
  return "$0.00";
};

export const Step4_Justification = ({
  notes,
  onChange,
  onContinue,
  differenceAmount,
}: Step4Props) => {
  const canContinue = notes.trim().length >= 10;

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.25 }}
      className="space-y-4"
    >
      {/* Context */}
      <div className="text-center py-2">
        <div className="w-14 h-14 rounded-2xl bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 flex items-center justify-center mx-auto mb-3">
          <MessageSquare size={24} className="text-orange-500" />
        </div>
        <h3 className="text-base font-bold text-gray-900 dark:text-white">
          Justificación Requerida
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Se detectó un{" "}
          <span className={`font-bold ${differenceAmount < 0 ? "text-red-500" : "text-emerald-500"}`}>
            {fmtDiff(differenceAmount)}
          </span>
          . Describe la razón.
        </p>
      </div>

      {/* Text area */}
      <div className="space-y-1.5">
        <label
          htmlFor="cash-register-notes"
          className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide"
        >
          Comentario del Supervisor
        </label>
        <textarea
          id="cash-register-notes"
          value={notes}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          maxLength={500}
          placeholder="Ej: Diferencia por error en cambio otorgado al cliente de la mesa 3. Se devolvió $30 extra por equivocación..."
          className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-keleo-500/40 resize-none transition"
        />
        <div className="flex justify-between items-center">
          <span
            className={`text-xs ${
              notes.trim().length < 10
                ? "text-red-400"
                : "text-gray-400 dark:text-gray-500"
            }`}
          >
            {notes.trim().length < 10
              ? `Mínimo 10 caracteres (${notes.trim().length}/10)`
              : `${notes.length}/500`}
          </span>
        </div>
      </div>

      <button
        onClick={onContinue}
        disabled={!canContinue}
        className="w-full py-3.5 bg-keleo-600 hover:bg-keleo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold text-sm transition shadow-lg shadow-keleo-500/25 flex items-center justify-center gap-2"
      >
        Guardar y Cerrar Caja <ArrowRight size={16} />
      </button>
    </motion.div>
  );
};
