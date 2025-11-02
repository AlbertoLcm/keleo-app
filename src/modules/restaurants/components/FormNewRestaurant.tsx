import { useState } from "react";
import axios from "axios";
import { Button, InputText } from "@/shared";
import type { DataNewRestaurant } from "../types";
import { ROUTES } from "@/routes/paths";
import api from "@/api/axios";
import { useNavigate } from "react-router";
import { CaretRightIcon } from "@phosphor-icons/react";

interface Suggestion {
  display_name: string;
  lat: string;
  lon: string;
}

export default function FormNewRestaurant() {
  const [dataNewRestaurant, setDataNewRestaurant] = useState<DataNewRestaurant>({
    name: "",
    address: "",
    phone: "",
    logo_url: "",
  });

  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataNewRestaurant((prev) => ({ ...prev, [name]: value }));

    if (name === "address") handleAddressSearch(value);
  };

  const handleAddressSearch = async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    setLoadingSuggestions(true);
    try {
      const response = await axios.get("https://nominatim.openstreetmap.org/search", {
        params: {
          q: query,
          format: "json",
          addressdetails: 1,
          limit: 5,
        },
      });

      setSuggestions(response.data);
    } catch (error) {
      console.error("Error al obtener sugerencias:", error);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const handleSelectAddress = (address: string) => {
    setDataNewRestaurant((prev) => ({ ...prev, address }));
    setSuggestions([]);
  };

  const [errors, setErrors] = useState<string[]>([]);
  const [sendingForm, setSendingForm] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setErrors([]);
    setSendingForm(true);
    e.preventDefault();

    try {
      await api.post("/restaurants", dataNewRestaurant);

      setDataNewRestaurant({
        name: "",
        address: "",
        phone: "",
        logo_url: "",
      });

      navigate(ROUTES.RESTAURANTS.LIST);
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
      <h2 className="text-2xl text-gray-950 mb-4">
        Crear Nuevo Restaurante
      </h2>

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
        label="Nombre del Restaurante"
        id="name"
        name="name"
        type="text"
        required
        value={dataNewRestaurant.name}
        onChange={handleChange}
      />

      <div className="relative">
        <InputText
          label="Dirección"
          id="address"
          name="address"
          type="text"
          required
          autocomplete="off"
          value={dataNewRestaurant.address}
          onChange={handleChange}
        />

        {loadingSuggestions && (
          <p className="text-sm text-gray-500 mt-1">Buscando direcciones...</p>
        )}

        {suggestions.length > 0 && (
          <ul className="absolute z-10 bg-white border border-gray-200 rounded-md mt-1 w-full shadow-lg max-h-48 overflow-y-auto">
            {suggestions.map((sug, index) => (
              <li
                key={index}
                className="px-3 py-2 hover:bg-blue-100 cursor-pointer text-sm text-gray-700"
                onClick={() => handleSelectAddress(sug.display_name)}
              >
                {sug.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <InputText
        label="Teléfono"
        id="phone"
        name="phone"
        type="text"
        required
        value={dataNewRestaurant.phone}
        onChange={handleChange}
      />

      <div className="flex justify-end mt-3">
        <Button disabled={sendingForm}>
          Crear Restaurante
          <CaretRightIcon size={22} />
        </Button>
      </div>

    </form>
  );
}
