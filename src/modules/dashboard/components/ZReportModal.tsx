import { Download, Printer } from "lucide-react";
import type { DashboardStats } from "../services/dashboard.service";
import { Modal } from "@/modules/shared";

interface ZReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: DashboardStats;
  onDownloadPDF: () => void;
  onPrint: () => void;
}

const ZReportModal: React.FC<ZReportModalProps> = ({
  isOpen,
  onClose,
  stats,
  onDownloadPDF,
  onPrint,
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title="Reporte Z del Día"
    footer={
      <div className="flex gap-2 pt-2">
        <button
          type="button"
          onClick={onDownloadPDF}
          className="flex-1 py-2 px-3 bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 font-semibold rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
        >
          <Download size={14} /> PDF
        </button>
        <button
          type="button"
          onClick={onPrint}
          className="flex-1 py-2 px-3 bg-keleo-600 hover:bg-keleo-700 text-white font-semibold rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
        >
          <Printer size={14} /> Imprimir
        </button>
      </div>
    }
  >
    <div className="bg-gray-50 dark:bg-black/30 border border-gray-200 dark:border-white/5 rounded-xl p-5 font-mono text-[11px] text-gray-700 dark:text-gray-300 leading-normal flex flex-col gap-2 relative">
      <div className="text-center font-bold text-gray-900 dark:text-white text-xs mt-1 border-b border-dashed border-gray-300 dark:border-white/10 pb-2">
        *** REPORTE Z DIARIO ***
        <br />
        CAFETERÍA CENTRAL
      </div>
      <div className="flex justify-between mt-1">
        <span>FECHA: {new Date().toLocaleDateString()}</span>
        <span>HORA: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
      <div className="border-b border-dashed border-gray-300 dark:border-white/10 pb-1">
        REG: 43210C93 / LOCAL: 01
      </div>

      <div className="flex justify-between font-bold text-xs text-gray-900 dark:text-white py-1">
        <span>TOTAL VENTAS BRUTAS</span>
        <span>${stats.sales.total.toFixed(2)}</span>
      </div>

      <div className="flex flex-col gap-1 border-y border-dashed border-gray-300 dark:border-white/10 py-1.5">
        <div className="flex justify-between">
          <span>DESGLOSE IVA (16%)</span>
          <span>${(stats.sales.total * 0.16).toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>VENTA NETAS SIN IVA</span>
          <span>${(stats.sales.total * 0.84).toFixed(2)}</span>
        </div>
      </div>

      <div className="flex flex-col gap-1 border-b border-dashed border-gray-300 dark:border-white/10 pb-1.5">
        <span className="font-bold text-[10px] uppercase text-gray-400 block mt-1">
          Métodos de Pago
        </span>
        <div className="flex justify-between">
          <span>EFECTIVO (60%)</span>
          <span>${(stats.sales.total * 0.60).toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>TARJETA (40%)</span>
          <span>${(stats.sales.total * 0.40).toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-between font-bold">
        <span>TRANSACCIONES</span>
        <span>{stats.recentOrders.length}</span>
      </div>
      <div className="text-center font-bold text-gray-400 dark:text-gray-500 text-[9px] mt-2 border-t border-dashed border-gray-300 dark:border-white/10 pt-2">
        FIN DE REPORTE DIARIO DE TURNO
      </div>
    </div>
  </Modal>
);

export default ZReportModal;
