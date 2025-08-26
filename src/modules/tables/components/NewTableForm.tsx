import { useEffect, useState, useCallback } from "react";
import {
  Check,
  Hash,
  Users,
  Square,
  Circle,
  RectangleHorizontal,
  Save,
  AlertCircle,
} from "lucide-react";
import {
  Button,
  InputText,
  TypeCardForm,
  useLockBodyScroll,
} from "@/modules/shared";
import api from "@/api/axios";
import { useParams } from "react-router";
import type { FormDataType, Zone } from "../types";

interface NewTableFormProps {
  onCancel: () => void;
  onUpdateTables: () => void;
  zones: Zone[];
  onZoneAdded: (zone: Zone) => void;
}

const SHAPES = [
  { id: "square", icon: Square, label: "Cuadrada" },
  { id: "circle", icon: Circle, label: "Redonda" },
  { id: "rectangle", icon: RectangleHorizontal, label: "Rectangular" },
] as const;

const NewTableForm: React.FC<NewTableFormProps> = ({
  onCancel,
  onUpdateTables,
  zones,
  onZoneAdded,
}) => {
  useLockBodyScroll();
  const { restaurantId } = useParams();

  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    capacity: 4,
    zoneId: "",
    shape: "square",
  });

  const [uiState, setUiState] = useState({
    isSendingForm: false,
    isSendingZone: false,
    isAddingZone: false,
  });

  const [errors, setErrors] = useState<{ form: string[]; zone: string[] }>({
    form: [],
    zone: [],
  });

  const [newZoneName, setNewZoneName] = useState("");

  useEffect(() => {
    if (zones.length > 0 && !formData.zoneId) {
      setFormData((prev) => ({ ...prev, zoneId: zones[0].id }));
    }
  }, [zones, formData.zoneId]);

  const handleAddZone = async () => {
    const trimmedName = newZoneName.trim();
    if (!trimmedName) return;

    setUiState((prev) => ({ ...prev, isSendingZone: true }));
    setErrors((prev) => ({ ...prev, zone: [] }));

    try {
      const { data } = await api.post<Zone>("zones", {
        name: trimmedName,
        restaurantId,
      });

      onZoneAdded(data);

      setFormData((prev) => ({ ...prev, zoneId: data.id }));
      setNewZoneName("");
      setUiState((prev) => ({ ...prev, isAddingZone: false }));
    } catch (err: any) {
      const msg = err.response?.data?.message || "Error al crear zona";
      setErrors((prev) => ({
        ...prev,
        zone: Array.isArray(msg) ? msg : [msg],
      }));
    } finally {
      setUiState((prev) => ({ ...prev, isSendingZone: false }));
    }
  };

  const handleSendForm = async (e: React.FormEvent) => {
    e.preventDefault();

    // 3. Validación local antes de enviar
    if (!formData.zoneId) {
      setErrors((prev) => ({
        ...prev,
        form: ["Debes seleccionar o crear una zona para la mesa."],
      }));
      return;
    }

    setUiState((prev) => ({ ...prev, isSendingForm: true }));
    setErrors((prev) => ({ ...prev, form: [] }));

    try {
      await api.post("tables", { ...formData, restaurantId });
      onUpdateTables();
      onCancel();
    } catch (err: any) {
      const msg = err.response?.data?.message || "Error al guardar la mesa";
      setErrors((prev) => ({
        ...prev,
        form: Array.isArray(msg) ? msg : [msg],
      }));
    } finally {
      setUiState((prev) => ({ ...prev, isSendingForm: false }));
    }
  };

  // 4. Memorizamos las funciones de incremento/decremento para evitar recrearlas en cada render
  const handleCapacityChange = useCallback((amount: number) => {
    setFormData((prev) => ({
      ...prev,
      capacity: Math.max(1, prev.capacity + amount),
    }));
  }, []);

  return (
    <form className="space-y-8" onSubmit={handleSendForm}>
      {errors.form.length > 0 && (
        <div className="flex items-start gap-3 rounded-xl bg-red-50 border-2 border-red-200 p-4 text-red-600 dark:bg-red-900/30 dark:border-red-900/50 text-sm">
          <AlertCircle size={20} className="shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1">
            {errors.form.map((err, i) => (
              <p key={i} className="font-medium">
                {err}
              </p>
            ))}
          </div>
        </div>
      )}

      <section className="space-y-5">
        <h3 className="text-sm font-bold text-keleo-600 dark:text-keleo-500 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
          1. Detalles Básicos
        </h3>
        <InputText
          id="nameTable"
          label="NOMBRE DE LA MESA"
          name="name"
          icon={<Hash size={20} />}
          placeholder="Ej. Mesa 1"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          required
        />

        <div className="flex gap-2 flex-col">
          <label className="text-xs font-bold text-gray-500 ml-1 dark:text-gray-400">
            CAPACIDAD
          </label>
          <div className="flex w-full py-2 rounded-xl bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white transition-all focus-within:border-keleo-500 focus-within:ring-2 focus-within:ring-keleo-200 dark:focus-within:ring-keleo-900">
            <button
              type="button"
              className="w-14 font-bold text-xl text-gray-400 hover:text-keleo-600 transition-colors"
              onClick={() => handleCapacityChange(-1)}
            >
              -
            </button>
            <div className="flex-1 flex justify-center items-center gap-2 font-black text-lg">
              <Users size={20} className="text-keleo-500" /> {formData.capacity}
            </div>
            <button
              type="button"
              className="w-14 font-bold text-xl text-gray-400 hover:text-keleo-600 transition-colors"
              onClick={() => handleCapacityChange(1)}
            >
              +
            </button>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
          <h3 className="text-sm font-bold text-keleo-600 dark:text-keleo-500 uppercase tracking-wider">
            2. Ubicación
          </h3>
          <button
            type="button"
            onClick={() => {
              setUiState((p) => ({ ...p, isAddingZone: !p.isAddingZone }));
              setErrors((p) => ({ ...p, zone: [] })); // Limpiar errores al alternar
            }}
            className="text-xs font-bold text-keleo-600 hover:underline px-2 py-1 rounded-md hover:bg-keleo-50 dark:hover:bg-keleo-900/20 transition-colors"
          >
            {uiState.isAddingZone ? "Cancelar" : "+ Nueva Zona"}
          </button>
        </div>

        {uiState.isAddingZone ? (
          <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex gap-2">
              <div className="flex-1">
                <InputText
                  id="nameZone"
                  autoFocus
                  value={newZoneName}
                  onChange={(e) => setNewZoneName(e.target.value)}
                  placeholder="Ej. Terraza Principal"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault(); // Evita que se envíe el formulario principal
                      handleAddZone();
                    }
                  }}
                />
              </div>

              <Button
                type="button"
                onClick={handleAddZone}
                loading={uiState.isSendingZone}
                disabled={!newZoneName.trim()}
                className="px-4" // Asegura que el botón no colapse
              >
                <Check size={18} />
              </Button>
            </div>
            {errors.zone.map((err, i) => (
              <p key={i} className="text-xs text-red-500 font-medium ml-1">
                {err}
              </p>
            ))}
          </div>
        ) : zones.length === 0 ? (
          <div className="text-center py-4 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
            No hay zonas registradas. Crea una nueva para continuar.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {zones.map((zone) => (
              <button
                key={zone.id}
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, zoneId: zone.id }))
                }
                className={`py-2.5 px-3 rounded-xl border text-sm font-bold transition-all truncate ${
                  formData.zoneId === zone.id
                    ? "bg-keleo-600 border-keleo-600 text-white shadow-md shadow-keleo-600/20"
                    : "bg-transparent border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-keleo-400 hover:text-keleo-600 dark:hover:text-keleo-400"
                }`}
              >
                {zone.name}
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-5">
        <h3 className="text-sm font-bold text-keleo-600 dark:text-keleo-500 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
          3. Diseño Visual
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {SHAPES.map((shape) => (
            <TypeCardForm
              key={shape.id}
              icon={<shape.icon size={24} />}
              label={shape.label}
              selected={formData.shape === shape.id}
              onClick={() =>
                setFormData((prev) => ({ ...prev, shape: shape.id }))
              }
            />
          ))}
        </div>
      </section>

      <div className="pt-8 flex gap-3 sticky bottom-0 bg-white dark:bg-gray-900 pb-4 border-t border-gray-100 dark:border-gray-800 mt-auto">
        <Button
          variant="secondary"
          type="button"
          onClick={onCancel}
          className="w-1/3"
        >
          Cancelar
        </Button>
        <Button type="submit" className="w-2/3" loading={uiState.isSendingForm}>
          <Save size={20} className="mr-2" /> Guardar Mesa
        </Button>
      </div>
    </form>
  );
};

export default NewTableForm;
