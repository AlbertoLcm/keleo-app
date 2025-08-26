import { useState } from "react";
import {
  User,
  Mail,
  Save,
  AlertCircle,
} from "lucide-react";
import {
  Button,
  InputText,
  useLockBodyScroll,
} from "@/modules/shared";
import { useParams } from "react-router";
import { createEmployee } from "../services/employee.service";
import type { CreateEmployeeDto } from "../models/employee.model";

const ROLES = [
  { id: "waiter", label: "Mesero" },
  { id: "kitchen", label: "Cocina" },
  { id: "manager", label: "Gerencia" },
  { id: "cashier", label: "Cajero" },
  { id: "admin", label: "Admin" },
];

interface NewEmployeeFormProps {
  onCancel: () => void;
  onUpdateEmployees: () => void;
}

const NewEmployeeForm: React.FC<NewEmployeeFormProps> = ({
  onCancel,
  onUpdateEmployees,
}) => {
  useLockBodyScroll();
  const { restaurantId } = useParams();

  const [formData, setFormData] = useState<CreateEmployeeDto>({
    name: "",
    lastname: "",
    email: "",
    role: "waiter",
  });

  const [uiState, setUiState] = useState({
    isSendingForm: false,
  });

  const [errors, setErrors] = useState<{ form: string[] }>({
    form: [],
  });

  const handleSendForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      setErrors({ form: ["El nombre y el correo son obligatorios."] });
      return;
    }

    if (!restaurantId) return;

    setUiState({ isSendingForm: true });
    setErrors({ form: [] });

    try {
      await createEmployee(restaurantId, formData);
      onUpdateEmployees();
      onCancel();
    } catch (err: any) {
      const msg = err.response?.data?.message || "Error al registrar empleado";
      setErrors({
        form: Array.isArray(msg) ? msg : [msg],
      });
    } finally {
      setUiState({ isSendingForm: false });
    }
  };

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
          1. Detalles Generales
        </h3>

        <InputText
          id="nameEmployee"
          label="NOMBRE"
          name="name"
          icon={<User size={20} />}
          placeholder="Ej. Juan"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          required
        />

        <InputText
          id="lastnameEmployee"
          label="APELLIDOS"
          name="lastname"
          icon={<User size={20} />}
          placeholder="Ej. Pérez"
          value={formData.lastname}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, lastname: e.target.value }))
          }
        />

        <InputText
          id="emailEmployee"
          label="CORREO ELECTRÓNICO"
          name="email"
          type="email"
          icon={<Mail size={20} />}
          placeholder="Ej. juan@restaurante.com"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          required
        />
      </section>

      <section className="space-y-5">
        <h3 className="text-sm font-bold text-keleo-600 dark:text-keleo-500 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
          2. Rol Asignado
        </h3>
        <p className="text-xs text-gray-500 mb-2">
          El rol determina los accesos que tendrá en la aplicación.
        </p>
        <div className="flex flex-wrap gap-2">
          {ROLES.map((role) => (
            <button
              key={role.id}
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, role: role.id }))
              }
              className={`py-2.5 px-4 rounded-xl border text-sm font-bold transition-all truncate ${formData.role === role.id
                  ? "bg-keleo-600 border-keleo-600 text-white shadow-md shadow-keleo-600/20"
                  : "bg-transparent border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-keleo-400 hover:text-keleo-600 dark:hover:text-keleo-400"
                }`}
            >
              {role.label}
            </button>
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
          <Save size={20} className="mr-2" /> Enviar Invitación
        </Button>
      </div>
    </form>
  );
};

export default NewEmployeeForm;
