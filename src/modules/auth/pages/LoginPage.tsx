import { useState } from "react";
import { Utensils, Mail, Lock, Check, ArrowLeft } from "lucide-react";
import KeleoLogo from "@/assets/keleo.png";
import { Button, InputText, ToggleDarkMode } from "@/modules/shared";
import { ROUTES } from "@/routes/paths";
import { useAuth } from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import type { SigninData } from "../types";

export default function Login() {
  const { login } = useAuth();

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState<SigninData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [sendingForm, setSendingForm] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setErrors([]);
    setSendingForm(true);
    e.preventDefault();

    try {
      await login(loginData.email, loginData.password);

      setLoginData({ email: "", password: "" });

      const location = useLocation();
      const from = location.state?.from?.pathname || ROUTES.RESTAURANTS;

      // después de login exitoso
      navigate(from, { replace: true });
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
    <div className="font-sans text-gray-700 bg-keleo-50 dark:bg-dark-bg dark:text-dark-text h-screen flex flex-col md:flex-row overflow-hidden transition-colors duration-300">
      {/* Estilos locales para variables de color OKLCH y animaciones */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .bg-pattern {
          background-image: url('https://www.transparenttextures.com/patterns/cubes.png');
        }
      `}</style>

      {/* --- LEFT SIDE: BRANDING & VISUALS --- */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-keleo-600 to-blue-600 dark:from-keleo-900 dark:to-dark-bg relative items-center justify-center p-12 overflow-hidden h-full">
        {/* Background Patterns */}
        <div className="absolute inset-0 bg-pattern opacity-20 pointer-events-none"></div>
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-keleo-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Floating Card Content */}
        <div className="relative z-10 max-w-md text-center">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-2xl animate-float">
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-white font-medium text-sm">
                  Actividad en Vivo
                </span>
              </div>
              <span className="text-white/60 text-xs">Hoy, 14:30 PM</span>
            </div>

            <div className="space-y-4 text-left">
              {/* Notification Item 1 */}
              <div className="bg-white/90 p-3 rounded-xl shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-500">
                    <Utensils size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">Mesa 5</p>
                    <p className="text-xs text-gray-500">
                      Nuevo pedido en cocina
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-keleo-600">+ $450</span>
              </div>

              {/* Notification Item 2 */}
              <div className="bg-white/90 p-3 rounded-xl shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-500">
                    <Check size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">Mesa 2</p>
                    <p className="text-xs text-gray-500">Cuenta cerrada</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-green-600">Pagado</span>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-white text-lg font-medium">
                "Keleo ha transformado la velocidad de nuestro servicio."
              </p>
              <div className="mt-4 flex items-center justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: FORM --- */}
      <div className="w-full md:w-1/2 flex flex-col h-full bg-white dark:bg-dark-bg overflow-y-auto transition-colors duration-300">
        {/* Navigation */}
        <div className="flex justify-between items-center p-6 md:p-10 shrink-0">
          <a href="#" className="flex items-center gap-2 group">
            <img src={KeleoLogo} alt="Keleo" width={32} />
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              Keleo<span className="text-keleo-600">App</span>
            </span>
          </a>

          <div className="flex items-center gap-4">
            <ToggleDarkMode />
            <a
              href="#"
              className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-keleo-600 dark:text-gray-400 dark:hover:text-keleo-500 transition"
            >
              <ArrowLeft size={16} /> Volver
            </a>
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 flex flex-col justify-center px-6 pt-6 md:pt-0 md:px-16 lg:px-24 pb-12">
          <div className="max-w-md mx-auto w-full">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Bienvenido de nuevo
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Ingresa tus credenciales para acceder al panel.
            </p>

            {errors.length > 0 && (
              <div className="rounded-xl bg-red-50 border-2 border-red-200 p-4 text-red-400 font-medium mb-6 dark:bg-red-900/30 dark:border-red-900">
                <ul className="list-inside text-sm space-y-1 list-none">
                  {errors.map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Campo de Correo Electrónico (sin cambios) */}
              <InputText
                label="Correo Electrónico"
                id="email"
                name="email"
                type="email"
                icon={<Mail size={20} />}
                placeholder="nombre@restaurante.com"
                value={loginData.email}
                onChange={handleChange}
                required
              />

              {/* Campo de Contraseña (ahora con el botón de alternar visibilidad) */}
              <InputText
                label="Contraseña"
                id="password"
                name="password"
                type="password" // Esto activa la funcionalidad del "ojo"
                icon={<Lock size={20} />}
                placeholder="••••••••"
                value={loginData.password}
                onChange={handleChange}
                required
                extraLink={{
                  text: "¿Olvidaste tu contraseña?",
                  href: ROUTES.FORGOT_PASSWORD,
                }}
              />

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-keleo-600 focus:ring-keleo-500 border-gray-300 rounded cursor-pointer accent-keleo-600"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-600 dark:text-gray-400 cursor-pointer select-none"
                >
                  Mantener sesión iniciada
                </label>
              </div>

              <Button
                variant="primary"
                className="w-full"
                type="submit"
                loading={sendingForm}
              >
                Iniciar Sesión
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-dark-bg text-gray-500 dark:text-gray-400">
                  O continúa con
                </span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-keleo-50 dark:hover:bg-dark-card transition bg-white dark:bg-transparent text-gray-700 dark:text-white">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  className="w-5 h-5"
                  alt="Google"
                />
                <span className="text-sm font-medium">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-keleo-50 dark:hover:bg-dark-card transition bg-white dark:bg-transparent text-gray-700 dark:text-white">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.1 1.88-2.54 5.79.1 6.94-.65 1.73-1.63 3.45-2.15 4.27zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                <span className="text-sm font-medium">Apple</span>
              </button>
            </div>

            {/* Sign Up Link */}
            <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
              ¿No tienes una cuenta?{" "}
              <a
                href="#"
                className="font-bold text-keleo-600 hover:text-keleo-700 dark:text-keleo-500 dark:hover:text-keleo-100 transition"
              >
                Solicita una Demo
              </a>
            </p>
          </div>

          {/* Mobile Footer */}
          <div className="mt-auto pt-10 text-center text-xs text-gray-400 md:hidden shrink-0 pb-6">
            &copy; {new Date().getFullYear()} Keleo App.
          </div>
        </div>
      </div>
    </div>
  );
}
