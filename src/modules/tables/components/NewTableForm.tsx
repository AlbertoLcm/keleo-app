import { useEffect, useState, useCallback } from "react";
import {
  Check,
  Hash,
  Users,
  Square,
  Circle,
  RectangleHorizontal,
  Save,
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
}

const NewTableForm: React.FC<NewTableFormProps> = ({
  onCancel,
  onUpdateTables,
}) => {
  useLockBodyScroll();

  const { restaurantId } = useParams();

  // Estados Agrupados
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    capacity: 4,
    zoneId: "",
    shape: "square",
  });

  const [zones, setZones] = useState<Zone[]>([]);
  const [uiState, setUiState] = useState({
    loadingZones: false,
    isSendingForm: false,
    isSendingZone: false,
    isAddingZone: false,
  });

  const [errors, setErrors] = useState<{ form: string[]; zone: string[] }>({
    form: [],
    zone: [],
  });

  const [newZoneName, setNewZoneName] = useState("");

  // Carga de zonas
  const fetchZones = useCallback(async () => {
    setUiState((prev) => ({ ...prev, loadingZones: true }));
    try {
      const { data } = await api.get<Zone[]>("zones", {
        params: { restaurantId },
      });
      setZones(data);
      // Si no hay zona seleccionada, ponemos la primera por defecto
      if (data.length > 0 && !formData.zoneId) {
        setFormData((prev) => ({ ...prev, zoneId: data[0].id }));
      }
    } catch (err: any) {
      setErrors((prev) => ({
        ...prev,
        form: ["No se pudieron cargar las zonas."],
      }));
    } finally {
      setUiState((prev) => ({ ...prev, loadingZones: false }));
    }
  }, [restaurantId, formData.zoneId]);

  useEffect(() => {
    fetchZones();
  }, [fetchZones]);

  // Manejo de creación de zona
  const handleAddZone = async () => {
    if (!newZoneName.trim()) return;

    setUiState((prev) => ({ ...prev, isSendingZone: true }));
    setErrors((prev) => ({ ...prev, zone: [] }));

    try {
      const { data } = await api.post<Zone>("zones", {
        name: newZoneName.trim(),
        restaurantId,
      });

      setZones((prev) => [...prev, data]);
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

  // Envío de formulario principal
  const handleSendForm = async (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <form className="space-y-8" onSubmit={handleSendForm}>
      {/* Mensajes de Error de Formulario */}
      {errors.form.length > 0 && (
        <div className="rounded-xl bg-red-50 border-2 border-red-200 p-4 text-red-600 dark:bg-red-900/30 dark:border-red-900 text-sm">
          {errors.form.map((err, i) => (
            <p key={i}>{err}</p>
          ))}
        </div>
      )}

      {/* 1. Detalles */}
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
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <div className="flex gap-2 flex-col">
          <label className="text-xs font-bold text-gray-500 ml-1 dark:text-gray-400">
            CAPACIDAD
          </label>
          <div className="flex w-full pr-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:border-keleo-500 focus:ring-2 focus:ring-keleo-200 dark:focus:ring-keleo-900 outline-none transition placeholder-gray-400">
            <button
              type="button"
              className="w-10 font-bold"
              onClick={() =>
                setFormData((f) => ({
                  ...f,
                  capacity: Math.max(1, f.capacity - 1),
                }))
              }
            >
              -
            </button>
            <div className="flex-1 flex justify-center gap-2 font-black">
              <Users size={20} className="text-keleo-500" /> {formData.capacity}
            </div>
            <button
              type="button"
              className="w-10 font-bold"
              onClick={() =>
                setFormData((f) => ({ ...f, capacity: f.capacity + 1 }))
              }
            >
              +
            </button>
          </div>
        </div>
      </section>

      {/* 2. Ubicación */}
      <section className="space-y-5">
        <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
          <h3 className="text-sm font-bold text-keleo-600 dark:text-keleo-500 uppercase tracking-wider">
            2. Ubicación
          </h3>
          <button
            type="button"
            onClick={() =>
              setUiState((p) => ({ ...p, isAddingZone: !p.isAddingZone }))
            }
            className="text-xs font-bold text-keleo-600 hover:underline"
          >
            {uiState.isAddingZone ? "Cancelar" : "+ Nueva Zona"}
          </button>
        </div>

        {uiState.isAddingZone ? (
          <div className="space-y-2">
            <div className="flex gap-2">
              <InputText
                id="nameZone"
                autoFocus
                value={newZoneName}
                onChange={(e) => setNewZoneName(e.target.value)}
                placeholder="Nombre de zona..."
              />
              <Button
                type="button"
                onClick={handleAddZone}
                loading={uiState.isSendingZone}
              >
                <Check size={18} />
              </Button>
            </div>
            {errors.zone.map((err, i) => (
              <p key={i} className="text-xs text-red-500">
                {err}
              </p>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {zones.map((zone) => (
              <button
                key={zone.id}
                type="button"
                onClick={() => setFormData({ ...formData, zoneId: zone.id })}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                  formData.zoneId === zone.id
                    ? "bg-keleo-600 border-keleo-600 text-white"
                    : "bg-transparent border-gray-200 dark:border-gray-700 text-gray-500 hover:border-keleo-500"
                }`}
              >
                {zone.name}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* 3. Diseño */}
      <section className="space-y-5">
        <h3 className="text-sm font-bold text-keleo-600 dark:text-keleo-500 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
          3. Diseño Visual
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: "square", icon: Square, label: "Cuadrada" },
            { id: "circle", icon: Circle, label: "Redonda" },
            {
              id: "rectangle",
              icon: RectangleHorizontal,
              label: "Rectangular",
            },
          ].map((shape) => (
            <TypeCardForm
              key={shape.id}
              icon={<shape.icon size={24} />}
              label={shape.label}
              selected={formData.shape === shape.id}
              onClick={() => setFormData({ ...formData, shape: shape.id })}
            />
          ))}
        </div>
      </section>

      <div className="pt-10 flex gap-3">
        <Button
          variant="secondary"
          type="button"
          onClick={onCancel}
          className="w-full"
        >
          Descartar
        </Button>
        <Button
          type="submit"
          className="w-full"
          loading={uiState.isSendingForm}
        >
          <Save size={20} className="mr-2" /> Guardar
        </Button>
      </div>
    </form>
  );
};

export default NewTableForm;
