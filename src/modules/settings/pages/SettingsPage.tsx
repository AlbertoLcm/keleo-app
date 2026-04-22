import { useState, useEffect } from "react";
import { Store, Image as ImageIcon, Clock, Settings, Save, Trash2, Palette } from "lucide-react";
import { Toggle, useHeaderAction, useDarkMode } from "@/modules/shared";
import { useParams, useNavigate } from "react-router";
import {
  getRestaurantSettings,
  updateRestaurantSettings,
  deleteRestaurant,
  type RestaurantSettingsResponse,
  type RestaurantHour,
} from "../services/settings.service";

const DAYS_OF_WEEK = [
  { id: 1, name: "Lunes" },
  { id: 2, name: "Martes" },
  { id: 3, name: "Miércoles" },
  { id: 4, name: "Jueves" },
  { id: 5, name: "Viernes" },
  { id: 6, name: "Sábado" },
  { id: 7, name: "Domingo" },
];

const parseTimeFromISO = (isoString?: string) => {
  if (!isoString) return "09:00";
  // The ISO string is expected to be like "1970-01-01T09:00:00.000Z"
  try {
    return isoString.substring(11, 16);
  } catch {
    return "09:00";
  }
};

const formatTimeToISO = (time: string) => {
  return `1970-01-01T${time}:00Z`;
};

const SettingsPage = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const { updateActionHeader } = useHeaderAction();
  const { theme, setTheme } = useDarkMode();

  const [restaurant, setRestaurant] = useState<RestaurantSettingsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!restaurantId) return;

    const fetchSettings = async () => {
      try {
        setIsLoading(true);
        const data = await getRestaurantSettings(restaurantId);
        // Ensure all days exist in state
        const completeHours = DAYS_OF_WEEK.map(d => {
          const existing = data.restaurant_hours.find(h => h.day_of_week === d.id);
          return existing || {
            day_of_week: d.id,
            open_time: formatTimeToISO("09:00"),
            close_time: formatTimeToISO("21:00"),
            is_closed: false,
          };
        });
        setRestaurant({ ...data, restaurant_hours: completeHours });
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, [restaurantId]);

  const handleSave = async () => {
    if (!restaurant || !restaurantId) return;
    try {
      setIsSaving(true);
      await updateRestaurantSettings(restaurantId, {
        name: restaurant.name,
        phone: restaurant.phone || "",
        address: restaurant.address || "",
        logo_url: restaurant.logo_url || "",
        restaurant_hours: restaurant.restaurant_hours,
        restaurant_settings: restaurant.restaurant_settings,
      });
      // maybe a toast here in the future
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    updateActionHeader(
      <section className="flex justify-between w-full items-center">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Configuración
        </h1>
        <button
          onClick={handleSave}
          disabled={isSaving || isLoading}
          className="flex items-center gap-2 bg-keleo-600 hover:bg-keleo-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition disabled:opacity-50"
        >
          <Save size={16} />
          {isSaving ? "Guardando..." : "Guardar Cambios"}
        </button>
      </section>
    );

    return () => updateActionHeader(null);
  }, [isSaving, isLoading, restaurant]);

  const handleFieldChange = (field: keyof RestaurantSettingsResponse, value: string) => {
    setRestaurant(prev => prev ? { ...prev, [field]: value } : prev);
  };

  const handleHourChange = (dayOfWeek: number, field: keyof RestaurantHour, value: any) => {
    setRestaurant((prev) => {
      if (!prev) return prev;
      const hours = [...prev.restaurant_hours];
      const idx = hours.findIndex(h => h.day_of_week === dayOfWeek);
      if (idx > -1) {
        hours[idx] = { ...hours[idx], [field]: value };
      }
      return { ...prev, restaurant_hours: hours };
    });
  };

  const handleSettingChange = (key: string, value: string) => {
    setRestaurant((prev) => {
      if (!prev) return prev;
      const settings = [...prev.restaurant_settings];
      const idx = settings.findIndex((s) => s.key_name === key);
      if (idx > -1) {
        settings[idx] = { ...settings[idx], value_text: value };
      } else {
        settings.push({ key_name: key, value_text: value });
      }
      return { ...prev, restaurant_settings: settings };
    });
  };

  const getSettingValue = (key: string, defaultValue: string = "") => {
    return restaurant?.restaurant_settings.find(s => s.key_name === key)?.value_text || defaultValue;
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm("¿Estás seguro de que deseas eliminar este restaurante? Esta acción no se puede deshacer.");
    if (!isConfirmed || !restaurantId) return;

    try {
      await deleteRestaurant(restaurantId);
      navigate("/restaurants");
    } catch (error) {
      console.error("Error deleting restaurant:", error);
      alert("Hubo un error al eliminar el restaurante.");
    }
  };

  if (isLoading || !restaurant) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-keleo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="space-y-6">
        <section
          id="perfil"
          className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-100 dark:border-white/5 shadow-sm"
        >
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-white/5 pb-4">
            <Store className="text-keleo-500 mr-2 inline" /> Perfil del
            Restaurante
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 flex items-center gap-6">
              <div className="w-24 h-24 rounded-2xl bg-gray-100 dark:bg-white/5 border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-400 overflow-hidden relative group">
                {restaurant.logo_url ? (
                   <img src={restaurant.logo_url} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                   <ImageIcon size={30} />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-gray-800 dark:text-white">
                  Logo del Restaurante
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  URL de la imagen (temporalmente manejado como texto)
                </p>
                <input
                  type="text"
                  value={restaurant.logo_url || ""}
                  onChange={(e) => handleFieldChange("logo_url", e.target.value)}
                  placeholder="https://ejemplo.com/logo.png"
                  className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-gray-700 focus:border-keleo-500 outline-none text-sm dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">
                Nombre del Negocio
              </label>
              <input
                type="text"
                value={restaurant.name}
                onChange={(e) => handleFieldChange("name", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-gray-700 focus:border-keleo-500 focus:ring-2 focus:ring-keleo-500/20 outline-none transition text-sm dark:text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">
                Teléfono de Contacto
              </label>
              <input
                type="text"
                value={restaurant.phone || ""}
                onChange={(e) => handleFieldChange("phone", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-gray-700 focus:border-keleo-500 focus:ring-2 focus:ring-keleo-500/20 outline-none transition text-sm dark:text-white"
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">
                Dirección
              </label>
              <input
                type="text"
                value={restaurant.address || ""}
                onChange={(e) => handleFieldChange("address", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-gray-700 focus:border-keleo-500 focus:ring-2 focus:ring-keleo-500/20 outline-none transition text-sm dark:text-white"
              />
            </div>
          </div>
        </section>

        <section
          id="horarios"
          className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-100 dark:border-white/5 shadow-sm"
        >
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-white/5 pb-4">
            <Clock className="text-keleo-500 mr-2 inline" /> Horarios de
            Atención
          </h2>

          <div className="space-y-4">
            {DAYS_OF_WEEK.map((day) => {
              const hourSetting = restaurant.restaurant_hours.find(h => h.day_of_week === day.id)!;
              const isClosed = hourSetting.is_closed;

              return (
                <div key={day.id} className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl hover:bg-white/50 dark:hover:bg-white/5 transition ${isClosed ? "opacity-60" : ""}`}>
                  <div className="flex items-center gap-3 mb-2 sm:mb-0">
                    <input
                      type="checkbox"
                      checked={!isClosed}
                      onChange={(e) => handleHourChange(day.id, "is_closed", !e.target.checked)}
                      className="w-4 h-4 text-keleo-600 rounded focus:ring-keleo-500"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-24">
                      {day.name}
                    </span>
                  </div>
                  
                  {!isClosed ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="time"
                        value={parseTimeFromISO(hourSetting.open_time)}
                        onChange={(e) => handleHourChange(day.id, "open_time", formatTimeToISO(e.target.value))}
                        className="bg-gray-50 dark:bg-white/10 border border-gray-200 dark:border-transparent rounded-lg text-xs px-2 py-1.5 text-gray-800 dark:text-white outline-none"
                      />
                      <span className="text-gray-400">-</span>
                      <input
                        type="time"
                        value={parseTimeFromISO(hourSetting.close_time)}
                        onChange={(e) => handleHourChange(day.id, "close_time", formatTimeToISO(e.target.value))}
                        className="bg-gray-50 dark:bg-white/10 border border-gray-200 dark:border-transparent rounded-lg text-xs px-2 py-1.5 text-gray-800 dark:text-white outline-none"
                      />
                    </div>
                  ) : (
                    <span className="text-xs font-bold text-gray-400 px-2">CERRADO</span>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section
          id="cocina"
          className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-100 dark:border-white/5 shadow-sm"
        >
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-white/5 pb-4">
            <Settings className="text-keleo-500 mr-2 inline" /> Operación y Cocina
          </h2>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-800 dark:text-white">
                  Notificaciones de Cocina
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Sonido de alerta al recibir nueva comanda
                </p>
              </div>
              <Toggle 
                id="kitchen_sound_enabled"
                checked={getSettingValue("kitchen_sound_enabled", "true") === "true"}
                onChange={() => {
                  const current = getSettingValue("kitchen_sound_enabled", "true");
                  handleSettingChange("kitchen_sound_enabled", current === "true" ? "false" : "true");
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">
                  IP Impresora Cocina (Opcional)
                </label>
                <input
                  type="text"
                  value={getSettingValue("printer_ip", "")}
                  onChange={(e) => handleSettingChange("printer_ip", e.target.value)}
                  placeholder="Ej: 192.168.1.50"
                  className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-gray-700 focus:border-keleo-500 outline-none text-sm dark:text-white font-mono"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">
                  Tiempo Alerta Retraso (min)
                </label>
                <input
                  type="number"
                  value={getSettingValue("alert_delay_min", "15")}
                  onChange={(e) => handleSettingChange("alert_delay_min", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-gray-700 focus:border-keleo-500 outline-none text-sm dark:text-white"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="apariencia"
          className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-100 dark:border-white/5 shadow-sm"
        >
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-white/5 pb-4">
            <Palette className="text-keleo-500 mr-2 inline" /> Apariencia de la App
          </h2>

          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-gray-800 dark:text-white">
                  Tema de la Aplicación
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Elige el esquema de colores para interactuar con Keleo
                </p>
              </div>
              <div className="flex bg-gray-100 dark:bg-dark-bg p-1 rounded-xl w-fit">
                {(["light", "dark", "system"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                      theme === t
                        ? "bg-white dark:bg-gray-700 text-keleo-600 dark:text-white shadow-sm"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                    }`}
                  >
                    {t === "light" ? "Claro" : t === "dark" ? "Oscuro" : "Automático"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-100 dark:border-white/5 shadow-sm">
          <h2 className="text-lg font-bold text-red-600 dark:text-red-400 mb-4 flex items-center gap-2">
            <Trash2 size={20} /> Zona de Peligro
          </h2>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Eliminar este restaurante borrará todos los datos de ventas,
              empleados y menús permanentemente.
            </p>
            <button 
              onClick={handleDelete}
              className="px-5 py-2 bg-white dark:bg-transparent border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs font-bold rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition whitespace-nowrap"
            >
              Eliminar Restaurante
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;