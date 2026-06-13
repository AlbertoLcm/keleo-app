import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle2, Download, Loader2 } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";

import type { DailySummary, BlindCount, CashRegisterDifferences } from "../types";
import { DIFFERENCE_THRESHOLD } from "../types";
import { getDailySummary, closeCashRegister } from "../services/cash-register.service";
import { Step1_PreCuenta } from "./Step1_PreCuenta";
import { Step2_BlindCount } from "./Step2_BlindCount";
import { Step3_Differences } from "./Step3_Differences";
import { Step4_Justification } from "./Step4_Justification";
import { ReporteZDocument } from "./ReporteZDocument";

type Step = 1 | 2 | 3 | 4 | 5;

interface CashRegisterWizardProps {
  isOpen: boolean;
  onClose: () => void;
  restaurantId: string;
  restaurantName: string;
  /** User role — determines if differences step is shown */
  role: string;
  /** Cashier display name for PDF signature */
  cashierName?: string;
}

const STEP_TITLES: Record<Step, string> = {
  1: "Cierre de Caja",
  2: "Conteo a Ciegas",
  3: "Revisión de Diferencias",
  4: "Justificación",
  5: "Cierre Completado",
};

const TOTAL_STEPS_VISIBLE = 4; // Steps 1–4 shown in progress (step 5 is success)

const ADMIN_ROLES = ["owner", "admin", "manager"];

const defaultBlindCount: BlindCount = {
  cash: 0,
  credit_card: 0,
  debit_card: 0,
  bank_transfer: 0,
  other: 0,
};

function computeDifferences(
  summary: DailySummary,
  blindCount: BlindCount
): CashRegisterDifferences {
  const countedTotal =
    blindCount.cash +
    blindCount.credit_card +
    blindCount.debit_card +
    blindCount.bank_transfer +
    blindCount.other;

  return {
    cash: summary.systemTotals.cash - blindCount.cash,
    credit_card: summary.systemTotals.credit_card - blindCount.credit_card,
    debit_card: summary.systemTotals.debit_card - blindCount.debit_card,
    bank_transfer: summary.systemTotals.bank_transfer - blindCount.bank_transfer,
    other: summary.systemTotals.other - blindCount.other,
    total: summary.systemTotals.total - countedTotal,
  };
}

export const CashRegisterWizard = ({
  isOpen,
  onClose,
  restaurantId,
  restaurantName,
  role,
  cashierName,
}: CashRegisterWizardProps) => {
  const [step, setStep] = useState<Step>(1);
  const [summary, setSummary] = useState<DailySummary | null>(null);
  const [blindCount, setBlindCount] = useState<BlindCount>(defaultBlindCount);
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionStart] = useState(() => new Date().toISOString());
  // const [closedSession, setClosedSession] = useState<any | null>(null);

  const isAdmin = ADMIN_ROLES.includes(role);

  const differences = summary
    ? computeDifferences(summary, blindCount)
    : null;

  const needsJustification =
    differences !== null && Math.abs(differences.total) > DIFFERENCE_THRESHOLD;

  const handleClose = () => {
    if (isLoading) return;
    // Reset state
    setStep(1);
    setSummary(null);
    setBlindCount(defaultBlindCount);
    setNotes("");
    setError(null);
    // setClosedSession(null);
    onClose();
  };

  // Step 1 → 2: fetch daily summary
  const handleStep1Continue = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getDailySummary(restaurantId);
      setSummary(data);
      setStep(2);
    } catch (e: any) {
      setError(e?.response?.data?.message || "Error al obtener el resumen del día.");
    } finally {
      setIsLoading(false);
    }
  }, [restaurantId]);

  // Step 2 → 3 (admin) or submit directly (cashier)
  const handleStep2Continue = useCallback(() => {
    if (isAdmin) {
      setStep(3);
    } else {
      // Cashier goes straight to submit without seeing differences
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, blindCount, notes]);

  // Step 3 → 4 or submit
  const handleStep3Continue = useCallback(() => {
    if (needsJustification) {
      setStep(4);
    } else {
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [needsJustification]);

  const handleSubmit = useCallback(async () => {
    if (!summary) return;
    setIsLoading(true);
    setError(null);
    try {
      await closeCashRegister(restaurantId, {
        blindCount,
        notes: notes || undefined,
        sessionStart,
      });
      // setClosedSession(session);
      setStep(5);
    } catch (e: any) {
      setError(e?.response?.data?.message || "Error al cerrar la caja.");
    } finally {
      setIsLoading(false);
    }
  }, [summary, restaurantId, blindCount, notes, sessionStart]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[120]"
        onClick={step !== 5 ? handleClose : undefined}
      />

      {/* Modal */}
      <motion.div
        key="wizard"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed inset-0 z-[121] flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none"
      >
        <div className="pointer-events-auto w-full sm:max-w-lg bg-white dark:bg-dark-card rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92dvh]">

          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100 dark:border-white/5 shrink-0">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">
                {STEP_TITLES[step]}
              </h2>
              {step < 5 && (
                <p className="text-xs text-gray-400 mt-0.5">{restaurantName}</p>
              )}
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20 transition"
            >
              <X size={16} />
            </button>
          </div>

          {/* Progress bar (steps 1-4) */}
          {step < 5 && (
            <div className="flex gap-1.5 px-5 pt-3 shrink-0">
              {Array.from({ length: TOTAL_STEPS_VISIBLE }, (_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${i + 1 <= step
                      ? "bg-keleo-500"
                      : "bg-gray-200 dark:bg-white/10"
                    }`}
                />
              ))}
            </div>
          )}

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-5 py-4">
            {/* Global error */}
            {error && (
              <div className="mb-4 px-4 py-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl text-sm text-red-700 dark:text-red-400">
                {error}
              </div>
            )}

            <AnimatePresence mode="wait">
              {/* Loading overlay */}
              {isLoading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-16 gap-3"
                >
                  <Loader2 size={32} className="animate-spin text-keleo-500" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Procesando...
                  </p>
                </motion.div>
              )}

              {!isLoading && step === 1 && (
                <Step1_PreCuenta
                  key="step1"
                  restaurantName={restaurantName}
                  onContinue={handleStep1Continue}
                />
              )}

              {!isLoading && step === 2 && (
                <Step2_BlindCount
                  key="step2"
                  blindCount={blindCount}
                  onChange={(key, val) =>
                    setBlindCount((prev) => ({ ...prev, [key]: val }))
                  }
                  onContinue={handleStep2Continue}
                />
              )}

              {!isLoading && step === 3 && summary && differences && (
                <Step3_Differences
                  key="step3"
                  summary={summary}
                  blindCount={blindCount}
                  differences={differences}
                  onContinue={handleStep3Continue}
                />
              )}

              {!isLoading && step === 4 && differences && (
                <Step4_Justification
                  key="step4"
                  notes={notes}
                  onChange={setNotes}
                  onContinue={handleSubmit}
                  differenceAmount={differences.total}
                />
              )}

              {/* Step 5 — Success */}
              {!isLoading && step === 5 && summary && differences && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-6 gap-5"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border-2 border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center">
                    <CheckCircle2 size={40} className="text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      ¡Caja Cerrada!
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      El cierre de caja fue registrado exitosamente.
                    </p>
                  </div>

                  {/* Quick summary */}
                  <div className="w-full grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-3 border border-gray-100 dark:border-white/10">
                      <p className="text-[10px] text-gray-400 mb-1">Sistema</p>
                      <p className="text-base font-bold text-gray-900 dark:text-white font-mono">
                        ${summary.systemTotals.total.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div className={`rounded-xl p-3 border ${Math.abs(differences.total) < 0.01
                        ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30"
                        : differences.total < 0
                          ? "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30"
                          : "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30"
                      }`}>
                      <p className="text-[10px] text-gray-400 mb-1">Diferencia</p>
                      <p className={`text-base font-bold font-mono ${Math.abs(differences.total) < 0.01
                          ? "text-emerald-600 dark:text-emerald-400"
                          : differences.total < 0
                            ? "text-red-600 dark:text-red-400"
                            : "text-emerald-600 dark:text-emerald-400"
                        }`}>
                        {(() => {
                          const abs = Math.abs(differences.total).toLocaleString("es-MX", { minimumFractionDigits: 2 });
                          if (differences.total > 0.01) return `+$${abs}`;
                          if (differences.total < -0.01) return `-$${abs}`;
                          return "$0.00";
                        })()}
                      </p>
                    </div>
                  </div>

                  {/* Download PDF */}
                  <PDFDownloadLink
                    document={
                      <ReporteZDocument
                        summary={summary}
                        blindCount={blindCount}
                        differences={differences}
                        cashierName={cashierName}
                        notes={notes || undefined}
                        showDifferences={isAdmin}
                      />
                    }
                    fileName={`Reporte-Z_${new Date().toISOString().split("T")[0]}.pdf`}
                    className="w-full py-3.5 bg-gray-900 dark:bg-white hover:bg-black dark:hover:bg-gray-100 text-white dark:text-gray-900 rounded-xl font-bold text-sm transition shadow-lg flex items-center justify-center gap-2"
                  >
                    {({ loading }) =>
                      loading ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Generando PDF...
                        </>
                      ) : (
                        <>
                          <Download size={16} />
                          Descargar Reporte Z
                        </>
                      )
                    }
                  </PDFDownloadLink>

                  <button
                    onClick={handleClose}
                    className="text-sm text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition"
                  >
                    Cerrar ventana
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
