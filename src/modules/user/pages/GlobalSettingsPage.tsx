import { Container, NavBar } from "@/modules/shared";
import { Bell, Moon, Lock, Smartphone, Camera, User, CreditCard, Sparkles, Mail } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { getInitialsString } from "@/utils/getInitialsString";
import { useNavigate } from "react-router";
import { ROUTES } from "@/routes/paths";

export default function GlobalSettingsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [theme, setTheme] = useState("system");
  const [notifications, setNotifications] = useState(true);

  const fullName = `${user?.name || ""} ${user?.lastname || ""}`.trim();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-200 pb-12">
      <NavBar />
      <Container>
        <div className="max-w-4xl mx-auto mt-8 md:mt-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Configuración</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Ajusta tus preferencias de cuenta, suscripción y diseño de la plataforma.</p>
          </div>

          <div className="space-y-6">
            
            {/* Perfil */}
            <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-100 dark:border-white/5 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-white/5 pb-4 flex items-center gap-2">
                <User size={20} className="text-keleo-500" />
                Perfil de Usuario
              </h3>

              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative group cursor-pointer w-24 h-24 rounded-full">
                    {user?.profile_image ? (
                      <img
                        src={user.profile_image}
                        alt={fullName}
                        className="w-full h-full rounded-full object-cover border-4 border-white dark:border-dark-card shadow-sm"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-keleo-100 dark:bg-keleo-900/30 flex items-center justify-center text-2xl font-bold text-keleo-600 dark:text-keleo-400 border-4 border-white dark:border-dark-card shadow-sm">
                        {getInitialsString(fullName)}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                      <Camera className="text-white" size={24} />
                    </div>
                  </div>
                  <button className="text-sm font-bold text-keleo-600 dark:text-keleo-400 hover:text-keleo-700 dark:hover:text-keleo-300 transition">
                    Cambiar foto
                  </button>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Nombre</label>
                    <input 
                      type="text" 
                      defaultValue={user?.name}
                      className="w-full bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-keleo-500/50 transition-all font-medium"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Apellidos</label>
                    <input 
                      type="text" 
                      defaultValue={user?.lastname}
                      className="w-full bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-keleo-500/50 transition-all font-medium"
                      placeholder="Tus apellidos"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Correo electrónico</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 text-gray-400" />
                      </div>
                      <input 
                        type="email" 
                        readOnly
                        defaultValue={user?.email}
                        className="w-full bg-gray-100 dark:bg-white/[0.05] border border-gray-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-gray-500 dark:text-gray-400 cursor-not-allowed font-medium"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">El correo electrónico no se puede modificar.</p>
                  </div>
                  <div className="md:col-span-2 flex justify-end mt-2">
                    <button className="px-5 py-2.5 bg-keleo-500 hover:bg-keleo-600 text-white text-sm font-bold rounded-xl transition-colors shadow-sm shadow-keleo-500/20 active:scale-[0.98]">
                      Guardar cambios
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Suscripción */}
            <div className="bg-gradient-to-br from-white to-gray-50 dark:from-dark-card dark:to-dark-card/80 rounded-2xl p-6 border border-gray-100 dark:border-white/5 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 opacity-5 dark:opacity-10 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
                <Sparkles size={200} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-white/5 pb-4 flex items-center gap-2">
                <CreditCard size={20} className="text-keleo-500" />
                Suscripción
              </h3>

              <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 w-full cursor-default">
                <div className="w-full">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs font-bold mb-3 border border-green-200/50 dark:border-green-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    Activa
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white flex items-baseline gap-2">
                    Plan Pro
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-md">
                    Tu suscripción actual se renovará automáticamente en tu próxima fecha de facturación.
                  </p>
                </div>
                
                <div className="flex flex-col w-full md:w-auto gap-3 shrink-0">
                  <button 
                    onClick={() => navigate(ROUTES.SUBSCRIPTION)}
                    className="w-full md:w-auto px-5 py-2.5 bg-keleo-50 dark:bg-keleo-900/20 text-keleo-600 dark:text-keleo-400 border border-keleo-200 dark:border-keleo-500/20 hover:bg-keleo-100 dark:hover:bg-keleo-900/40 text-sm font-bold rounded-xl transition-colors text-center">
                    Ver planes disponibles
                  </button>
                  <button className="w-full md:w-auto px-5 py-2.5 bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 text-sm font-bold rounded-xl transition-colors shadow-sm active:scale-[0.98] text-center">
                    Gestionar pago
                  </button>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-100 dark:border-white/5 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-white/5 pb-4">Apariencia</h3>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/[0.02] flex items-center justify-center text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-white/5">
                    <Moon size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">Tema de la interfaz</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Selecciona el tema oscuro, claro o del sistema.</p>
                  </div>
                </div>
                <div className="flex items-center bg-gray-100 dark:bg-white/5 rounded-lg p-1">
                  <button
                    onClick={() => setTheme("light")}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${theme === "light" ? "bg-white dark:bg-white/10 shadow-sm text-gray-900 dark:text-white" : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"}`}
                  >
                    Claro
                  </button>
                  <button
                    onClick={() => setTheme("dark")}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${theme === "dark" ? "bg-white dark:bg-white/10 shadow-sm text-gray-900 dark:text-white" : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"}`}
                  >
                    Oscuro
                  </button>
                  <button
                    onClick={() => setTheme("system")}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${theme === "system" ? "bg-white dark:bg-white/10 shadow-sm text-gray-900 dark:text-white" : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"}`}
                  >
                    Sistema
                  </button>
                </div>
              </div>
            </div>

            {/* Notificaciones */}
            <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-100 dark:border-white/5 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-white/5 pb-4">Comunicaciones</h3>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-900/10 flex items-center justify-center text-orange-500 border border-orange-100 dark:border-orange-500/20">
                    <Bell size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">Notificaciones push</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Recibe actualizaciones de tus sucursales al instante.</p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={notifications} onChange={() => setNotifications(!notifications)} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-keleo-500"></div>
                </label>
              </div>

            </div>

            {/* Security */}
            <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-100 dark:border-white/5 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-white/5 pb-4">Seguridad</h3>

              <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-white/5 pb-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/10 flex items-center justify-center text-blue-500 border border-blue-100 dark:border-blue-500/20">
                    <Lock size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">Contraseña</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Actualiza tu contraseña periódicamente.</p>
                  </div>
                </div>
                <button className="text-sm font-bold text-keleo-600 dark:text-keleo-400 hover:text-keleo-700 dark:hover:text-keleo-300 transition">
                  Actualizar
                </button>
              </div>

              <div className="flex items-center justify-between py-3 mt-2">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-900/10 flex items-center justify-center text-red-500 border border-red-100 dark:border-red-500/20">
                    <Smartphone size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">Sesiones activas</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Cierra sesiones en otros dispositivos.</p>
                  </div>
                </div>
                <button className="text-sm font-bold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition">
                  Revisar
                </button>
              </div>
            </div>

          </div>
        </div>
      </Container>
    </div>
  );
}

