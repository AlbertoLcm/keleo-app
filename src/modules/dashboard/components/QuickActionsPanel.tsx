import { BanknoteArrowUp, Calendar, FileChartLine, Plus, Zap } from "lucide-react";
import ShortcutButton from "./ShortcutButton";

interface QuickActionsPanelProps {
  onNewOrder: () => void;
  onReserve: () => void;
  onCloseBox: () => void;
  onZReport: () => void;
}

const QuickActionsPanel: React.FC<QuickActionsPanelProps> = ({
  onNewOrder,
  onReserve,
  onCloseBox,
  onZReport,
}) => (
  <div className="bg-gradient-to-br from-keleo-600 to-indigo-600 rounded-2xl shadow-xl shadow-keleo-500/20 p-6 text-white relative overflow-hidden flex flex-col justify-center">
    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3" />
    <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl translate-y-1/3 -translate-x-1/3" />

    <h3 className="font-bold text-lg mb-4 relative z-10 flex items-center gap-2">
      <Zap className="text-yellow-300" /> Acciones Rápidas
    </h3>

    <div className="grid grid-cols-2 gap-3 relative z-10">
      <ShortcutButton icon={<Plus size={18} />} label="Nueva Orden" onClick={onNewOrder} />
      <ShortcutButton icon={<Calendar size={18} />} label="Reservar" onClick={onReserve} />
      <ShortcutButton
        icon={<BanknoteArrowUp size={18} />}
        label="Cerrar Caja"
        onClick={onCloseBox}
      />
      <ShortcutButton
        icon={<FileChartLine size={18} />}
        label="Reporte Z"
        onClick={onZReport}
      />
    </div>
  </div>
);

export default QuickActionsPanel;
