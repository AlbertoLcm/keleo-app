import { useState, useCallback } from "react";
import {
  User,
  Users,
  Save,
  AlertCircle,
} from "lucide-react";
import { Button, InputText } from "@/modules/shared";
import api from "@/api/axios";
import { useParams } from "react-router";
import type { Table } from "../types";

interface NewReservationFormProps {
  onCancel: () => void;
  onReservationAdded: () => void;
  tables: Table[];
}

const NewReservationForm: React.FC<NewReservationFormProps> = ({
  onCancel,
  onReservationAdded,
  tables,
}) => {
  const { restaurantId } = useParams();

  const [formData, setFormData] = useState({
    tableId: "",
    reservationName: "",
    numPeople: 2,
    date: "",
    time: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleNumPeopleChange = useCallback((amount: number) => {
    setFormData((prev) => ({
      ...prev,
      numPeople: Math.max(1, prev.numPeople + amount),
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    if (!formData.tableId) {
      setErrors(["Debes seleccionar una mesa."]);
      return;
    }
    if (!formData.reservationName.trim()) {
      setErrors(["Debes ingresar un nombre para la reserva."]);
      return;
    }
    if (!formData.date || !formData.time) {
      setErrors(["Debes seleccionar fecha y hora."]);
      return;
    }

    const scheduledAt = new Date(`${formData.date}T${formData.time}:00`).toISOString();

    setIsSending(true);
    try {
      await api.post("reservations", {
        tableId: formData.tableId,
        reservationName: formData.reservationName.trim(),
        numPeople: formData.numPeople,
        scheduledAt,
      }, {
        params: { restaurantId },
      });
      onReservationAdded();
    } catch (err: any) {
      const msg = err.response?.data?.message || "Error al crear la reserva";
      setErrors(Array.isArray(msg) ? msg : [msg]);
    } finally {
      setIsSending(false);
    }
  };

  // Filter to only show free tables (available for reservation)
  const availableTables = tables.filter(
    (t) => t.status === "free" || t.status === "reserved"
  );

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {errors.length > 0 && (
        <div className="flex items-start gap-3 rounded-xl bg-red-50 border-2 border-red-200 p-4 text-red-600 dark:bg-red-900/30 dark:border-red-900/50 text-sm">
          <AlertCircle size={20} className="shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1">
            {errors.map((err, i) => (
              <p key={i} className="font-medium">
                {err}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Guest Name */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold text-keleo-600 dark:text-keleo-500 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700 pb-2">
          1. Información del Cliente
        </h3>
        <InputText
          id="reservationName"
          label="NOMBRE DE LA RESERVA"
          name="reservationName"
          icon={<User size={20} />}
          placeholder="Ej. Familia Pérez"
          value={formData.reservationName}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, reservationName: e.target.value }))
          }
          required
        />

        <div className="flex gap-2 flex-col">
          <label className="text-xs font-bold text-gray-500 ml-1 dark:text-gray-400">
            NÚMERO DE PERSONAS
          </label>
          <div className="flex w-full py-2 rounded-xl bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white transition-all focus-within:border-keleo-500 focus-within:ring-2 focus-within:ring-keleo-200 dark:focus-within:ring-keleo-900">
            <button
              type="button"
              className="w-14 font-bold text-xl text-gray-400 hover:text-keleo-600 transition-colors"
              onClick={() => handleNumPeopleChange(-1)}
            >
              -
            </button>
            <div className="flex-1 flex justify-center items-center gap-2 font-black text-lg">
              <Users size={20} className="text-keleo-500" /> {formData.numPeople}
            </div>
            <button
              type="button"
              className="w-14 font-bold text-xl text-gray-400 hover:text-keleo-600 transition-colors"
              onClick={() => handleNumPeopleChange(1)}
            >
              +
            </button>
          </div>
        </div>
      </section>

      {/* Date & Time */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold text-keleo-600 dark:text-keleo-500 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700 pb-2">
          2. Fecha y Hora
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-500 dark:text-gray-400">
              FECHA
            </label>
            <div className="relative">
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, date: e.target.value }))
                }
                min={new Date().toISOString().split("T")[0]}
                required
                className="w-full pl-3 pr-3 py-2.5 rounded-xl bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm transition-all focus:border-keleo-500 focus:ring-2 focus:ring-keleo-200 dark:focus:ring-keleo-900 outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-500 ml-1 dark:text-gray-400">
              HORA
            </label>
            <div className="relative">
              <input
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, time: e.target.value }))
                }
                required
                className="w-full pl-3 pr-3 py-2.5 rounded-xl bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm transition-all focus:border-keleo-500 focus:ring-2 focus:ring-keleo-200 dark:focus:ring-keleo-900 outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Table Selection */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold text-keleo-600 dark:text-keleo-500 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700 pb-2">
          3. Seleccionar Mesa
        </h3>
        {availableTables.length === 0 ? (
          <div className="text-center py-4 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
            No hay mesas disponibles para reservar.
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {availableTables.map((table) => (
              <button
                key={table.table_id}
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, tableId: table.table_id }))
                }
                className={`py-3 px-3 rounded-xl border text-sm font-bold transition-all flex flex-col items-center gap-1 ${formData.tableId === table.table_id
                  ? "bg-keleo-600 border-keleo-600 text-white shadow-md shadow-keleo-600/20"
                  : "bg-transparent border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-keleo-400 hover:text-keleo-600 dark:hover:text-keleo-400"
                  }`}
              >
                <span className="truncate w-full text-center">{table.name}</span>
                <span
                  className={`text-[10px] font-medium ${formData.tableId === table.table_id
                    ? "text-white/70"
                    : "text-gray-400"
                    }`}
                >
                  {table.capacity}p · {table.zone || "Sin zona"}
                </span>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Actions */}
      <div className="pt-6 flex gap-3 sticky bottom-0 bg-white dark:bg-gray-900 pb-4 border-t border-gray-100 dark:border-gray-800 mt-auto">
        <Button
          variant="secondary"
          type="button"
          onClick={onCancel}
          className="w-1/3"
        >
          Cancelar
        </Button>
        <Button type="submit" className="w-2/3" loading={isSending}>
          <Save size={20} className="mr-2" /> Guardar Reserva
        </Button>
      </div>
    </form>
  );
};

export default NewReservationForm;
