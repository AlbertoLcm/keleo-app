import { useState } from "react";
import {
  Store,
  MapPin,
  Phone,
  UploadCloud,
  Utensils,
  Coffee,
  Beer,
  Plus,
  ArrowLeft,
} from "lucide-react";
import { Button, Container, InputText, NavBar, TypeCardForm } from "@/modules/shared";
import { ROUTES } from "@/routes/paths";
import { useNavigate } from "react-router";
import { type DataNewRestaurant } from "../types";
import api from "@/api/axios";

function CreateRestaurant() {
  const navigate = useNavigate();

  const [dataRestaurant, setDataRestaurant] = useState<DataNewRestaurant>({
    name: "",
    type_restaurant: "restaurant",
    phone: "",
    address: "",
    city: "",
    postal_code: "",
    logo_url: "",
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [sendingForm, setSendingForm] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataRestaurant((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setErrors([]);
    setSendingForm(true);
    e.preventDefault();

    try {
      await api.post("restaurants", dataRestaurant);

      setDataRestaurant({
        name: "",
        type_restaurant: "restaurant",
        phone: "",
        address: "",
        city: "",
        postal_code: "",
        logo_url: "",
      });

      navigate(ROUTES.RESTAURANTS.INDEX);
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
    <>
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-keleo-200/40 dark:bg-keleo-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute top-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-200/30 dark:bg-blue-900/10 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] bg-purple-100/40 dark:bg-purple-900/10 rounded-full blur-[120px]"></div>
      </div>
      <NavBar />

      <Container className="flex justify-center">
        <div className="w-full max-w-3xl">
          <button
            className="flex gap-2 items-center text-gray-500 dark:text-white/50 hover:text-keleo-700 dark:hover:text-keleo-600 transition-all mb-6 mt-2"
            onClick={() => navigate(ROUTES.RESTAURANTS.INDEX)}
          >
            <ArrowLeft size={18} /> Volver al Panel
          </button>
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Registrar Nuevo Restaurante
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Configura los detalles básicos de tu nueva sucursal en minutos.
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-4 py-6 md:p-10 md:py-10 shadow-xl">
            {errors.length > 0 && (
              <div className="rounded-xl bg-red-50 border-2 border-red-200 p-4 text-red-400 font-medium mb-6 dark:bg-red-900/30 dark:border-red-900">
                <ul className="list-inside text-sm space-y-1 list-none">
                  {errors.map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              </div>
            )}
            <form className="space-y-8" onSubmit={handleSubmit}>
              {/* Sección 1: Información Básica */}
              <div className="space-y-6">
                <h3 className="text-sm font-bold text-keleo-600 dark:text-keleo-500 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
                  1. Información General
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputText
                    label="NOMBRE DEL RESTAURANTE"
                    id="nameRestaurant"
                    name="name"
                    type="text"
                    icon={<Store size={20} />}
                    placeholder="Ej. Cafetería Central"
                    value={dataRestaurant.name}
                    onChange={handleChange}
                    required
                  />
                  <InputText
                    label="TELÉFONO DE LA SUCURSAL"
                    id="phoneRestaurant"
                    name="phone"
                    type="text"
                    icon={<Phone size={20} />}
                    placeholder="Ej. +52 55 1234 5678"
                    value={dataRestaurant.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-bold text-gray-500 dark:text-gray-400">
                    TIPO ESTABLECIMIENTO
                  </label>
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    <TypeCardForm
                      key={"Restaurante"}
                      icon={<Utensils size={24} />}
                      label="Restaurante"
                      selected={dataRestaurant.type_restaurant === "restaurant"}
                      onClick={() =>
                        setDataRestaurant({
                          ...dataRestaurant,
                          type_restaurant: "restaurant",
                        })
                      }
                    />
                    <TypeCardForm
                      key={"Cafetería"}
                      icon={<Coffee size={24} />}
                      label="Cafetería"
                      selected={dataRestaurant.type_restaurant === "coffee"}
                      onClick={() =>
                        setDataRestaurant({
                          ...dataRestaurant,
                          type_restaurant: "coffee",
                        })
                      }
                    />
                    <TypeCardForm
                      key={"Bar"}
                      icon={<Beer size={24} />}
                      label="Bar"
                      selected={dataRestaurant.type_restaurant === "bar"}
                      onClick={() =>
                        setDataRestaurant({
                          ...dataRestaurant,
                          type_restaurant: "bar",
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Sección 2: Ubicación */}
              <div className="space-y-6 pt-4">
                <h3 className="text-sm font-bold text-keleo-600 dark:text-keleo-500 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
                  2. Ubicación
                </h3>

                <div className="relative group">
                  <InputText
                    label="DIRECCIÓN"
                    id="addressRestaurant"
                    name="address"
                    type="text"
                    icon={<MapPin size={20} />}
                    placeholder="Dirección completa (Calle, Número, Colonia)"
                    value={dataRestaurant.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <InputText
                    label="CIUDAD"
                    id="cityRestaurant"
                    name="city"
                    type="text"
                    placeholder="Ej. CDMX"
                    value={dataRestaurant.city}
                    onChange={handleChange}
                  />
                  <InputText
                    label="CÓDIGO POSTAL"
                    id="postalRestaurant"
                    name="postal_code"
                    type="text"
                    placeholder="Ej. 06600"
                    value={dataRestaurant.postal_code}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Sección 3: Branding */}
              <div className="space-y-6 pt-4">
                <h3 className="text-sm font-bold text-keleo-600 dark:text-keleo-500 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
                  3. Identidad Visual (Opcional)
                </h3>

                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:border-keleo-500 hover:bg-keleo-50/50 dark:hover:bg-keleo-900/10 transition cursor-pointer group">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center text-gray-400 group-hover:text-keleo-600 group-hover:scale-110 transition mb-4">
                    <UploadCloud size={32} />
                  </div>
                  <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
                    Sube el logo de tu restaurante
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    PNG, JPG hasta 5MB
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100 dark:border-gray-700/50">
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => navigate(ROUTES.RESTAURANTS.INDEX)}
                  disabled={sendingForm}
                >
                  Cancelar
                </Button>
                <Button type="submit" loading={sendingForm}>
                  <Plus />
                  Crear
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
}

export default CreateRestaurant;
