import type { ReserveForm } from "../hooks/useDashboard";
import { Modal } from "@/modules/shared";

interface ReserveModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: ReserveForm;
  onChange: (form: ReserveForm) => void;
  tablesList: any[];
  isSubmitting: boolean;
  onSubmit: () => void;
}

const ReserveModal: React.FC<ReserveModalProps> = ({
  isOpen,
  onClose,
  form,
  onChange,
  tablesList,
  isSubmitting,
  onSubmit,
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title="Reservar Mesa"
    description="Llena los campos para reservar una mesa."
  >
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-4"
    >
      <div>
        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase">
          Seleccionar Mesa *
        </label>
        <select
          value={form.tableId}
          onChange={(e) => onChange({ ...form, tableId: e.target.value })}
          className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-xl px-3 py-2.5 text-sm text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-keleo-500"
          required
        >
          <option value="" disabled>-- Elige una mesa --</option>
          {tablesList.map((t) => (
            <option key={t.table_id} value={t.table_id}>
              {t.name} ({t.zone || "Sin Zona"}) - Capac: {t.capacity}p
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase">
          Nombre del Cliente *
        </label>
        <input
          type="text"
          placeholder="Ej. Juan Pérez"
          value={form.clientName}
          onChange={(e) => onChange({ ...form, clientName: e.target.value })}
          className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-xl px-3 py-2.5 text-sm text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-keleo-500"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase">
            Personas
          </label>
          <input
            type="number"
            min="1"
            value={form.people}
            onChange={(e) => onChange({ ...form, people: e.target.value })}
            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-xl px-3 py-2.5 text-sm text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-keleo-500"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase">
            Hora
          </label>
          <input
            type="time"
            value={form.time}
            onChange={(e) => onChange({ ...form, time: e.target.value })}
            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-xl px-3 py-2.5 text-sm text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-keleo-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase">
          Fecha
        </label>
        <input
          type="date"
          value={form.date}
          onChange={(e) => onChange({ ...form, date: e.target.value })}
          className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-xl px-3 py-2.5 text-sm text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-keleo-500"
          required
        />
      </div>

      <div className="flex gap-3 pt-3 border-t border-gray-100 dark:border-white/5">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 font-semibold rounded-xl text-sm transition cursor-pointer text-center"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 py-2.5 px-4 bg-keleo-600 hover:bg-keleo-700 text-white font-semibold rounded-xl text-sm transition flex items-center justify-center cursor-pointer"
        >
          {isSubmitting ? (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
          ) : (
            "Reservar"
          )}
        </button>
      </div>
    </form>
  </Modal>
);

export default ReserveModal;
