import { useNavigate, useParams } from "react-router";
import { Button, InputNumber, InputText } from "@/shared";
import type { NewTable } from "../types";
import { useState } from "react";
import { CaretRightIcon } from "@phosphor-icons/react";
import api from "@/api/axios";
import type { UUID } from "crypto";
import { ROUTES } from "@/routes/paths";

export default function FormNewTable() {
  const { id_restaurante } = useParams<{ id_restaurante: UUID }>();

  const [dataNewTable, setDataNewTable] = useState<NewTable>({
    name: "",
    capacity: 1,
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [sendingForm, setSendingForm] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setDataNewTable((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await api.post(
        `/tables/new/${id_restaurante}`,
        dataNewTable
      );
      setDataNewTable({
        name: "",
        capacity: 0,
      });
      setErrors([]);
      setSendingForm(false);
      navigate(`/restaurants/${id_restaurante}/${ROUTES.TABLES.LIST}`);
    } catch (err: any) {
      if (err.response) {
        const msg = err.response.data.message;
        if (Array.isArray(msg)) {
          setErrors(msg);
        } else {
          setErrors([msg]);
        }
      } else {
        setErrors(["Error de conexión"]);
      }
    } finally {
      setSendingForm(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 p-6 bg-white rounded-xl max-w-lg mx-auto mt-6 ring-1 ring-gray-200"
    >
      <h2 className="text-2xl text-gray-950 mb-4">Crear Nueva Mesa</h2>

      {/* ALERT DE ERRORES */}
      {errors.length > 0 && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-red-700">
          <ul className="list-inside text-sm space-y-1 list-none">
            {errors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <InputText
        label="Nombre de la mesa"
        id="name"
        name="name"
        type="text"
        required
        value={dataNewTable.name}
        onChange={handleChange}
      />

      <div className="flex flex-col gap-2 justify-center items-center">
        <label htmlFor="capacity" className="text-sm font-medium text-gray-700">
          Capacidad de la mesa
        </label>
        <InputNumber
          id="capacity"
          quantity={dataNewTable.capacity}
          setQuantity={(val) =>
            setDataNewTable((prev) => ({ ...prev, capacity: val }))
          }
        />
      </div>


      <div className="flex justify-end mt-3">
        <Button disabled={sendingForm}>
          Crear Mesa
          <CaretRightIcon size={22} />
        </Button>
      </div>
    </form>
  );
}
