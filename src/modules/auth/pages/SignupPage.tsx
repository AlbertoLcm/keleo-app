import { useState } from "react";
import { Mail, Lock, ArrowLeft, User, Building, Rocket } from "lucide-react";
import { Button, InputText, KeleoLogo } from "@/modules/shared";
import { ROUTES } from "@/routes/paths";
import { Link } from "react-router";
import api from "@/api/axios";
import type { AxiosError } from "axios";
import type { SignupData } from "../types";
import GoogleLoginButton from "../components/GoogleLoginButton";
import MessageValidateAccount from "../components/MessageValidateAccount";
export default function SignupPage() {
  const [signupData, setSignupData] = useState<SignupData>({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [validateAccount, setValidateAccount] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [sendingForm, setSendingForm] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setErrors([]);
    setSendingForm(true);
    e.preventDefault();

    try {
      await api.post("/auth/signup", signupData);
      setSignupData({ name: "", lastname: "", email: "", password: "" });
      setValidateAccount(true);
    } catch (err) {
      const error = err as AxiosError<{ message: string | string[] }>;
      if (error.response) {
        const msg = error.response.data.message;
        setErrors(Array.isArray(msg) ? msg : [msg]);
      } else {
        setErrors(["Error de conexión al servidor"]);
      }
    } finally {
      setSendingForm(false);
    }
  };

  return (
    <div className="font-sans text-gray-700 bg-keleo-50 dark:bg-dark-bg dark:text-dark-text h-screen flex flex-col md:flex-row overflow-hidden transition-colors duration-300">
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
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-keleo-600 to-indigo-600 dark:from-keleo-900 dark:to-indigo-950 relative items-center justify-center p-12 overflow-hidden h-full">
        <div className="absolute inset-0 bg-pattern opacity-20 pointer-events-none"></div>
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-keleo-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-md text-center">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-2xl animate-float">
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Rocket className="text-white w-5 h-5" />
                <span className="text-white font-medium text-sm">
                  Impulsa tu negocio
                </span>
              </div>
            </div>

            <div className="space-y-4 text-left">
              <div className="bg-white/90 p-4 rounded-xl shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 bg-keleo-100 rounded-lg flex shrink-0 items-center justify-center text-keleo-600">
                  <Building size={24} />
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">Gestión integral</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Controla mesas, pedidos, inventario y personal desde un solo lugar.
                  </p>
                </div>
              </div>

              <div className="bg-white/90 p-4 rounded-xl shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex shrink-0 items-center justify-center text-indigo-500">
                  <User size={24} />
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">Fácil para tu equipo</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Una interfaz intuitiva que no requiere semanas de entrenamiento.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-left">
              <p className="text-white text-lg font-medium leading-snug">
                "Desde que usamos Keleo, la organización de nuestro restaurante mejoró un 100%."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
                  JS
                </div>
                <div>
                  <p className="text-white text-sm font-bold">Juan Sánchez</p>
                  <p className="text-white/70 text-xs">Dueño de restaurante</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: FORM --- */}
      <div className="w-full md:w-1/2 flex flex-col h-full bg-white dark:bg-dark-bg overflow-y-auto transition-colors duration-300">
        <div className="flex justify-between items-center p-6 md:p-10 shrink-0">
          <Link to="/" className="flex items-center gap-2 group">
            <KeleoLogo size={36} />
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              Keleo<span className="text-keleo-600">App</span>
            </span>
          </Link>

            <Link
              to={ROUTES.LOGIN}
              className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-keleo-600 dark:text-gray-400 dark:hover:text-keleo-500 transition"
            >
              <ArrowLeft size={16} /> Volver al login
            </Link>
        </div>

        <div className="flex-1 flex flex-col justify-center px-6 pt-6 md:pt-0 md:px-16 lg:px-24 pb-12">
          <div className="max-w-md mx-auto w-full">
            
            {validateAccount ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  ¡Cuenta creada!
                </h1>
                <MessageValidateAccount />
              </div>
            ) : (
              <div className="animate-in fade-in duration-500">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Crea tu cuenta gratis
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mb-8">
                  Únete a Keleo y transforma la gestión de tu negocio hoy mismo.
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

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <InputText
                        label="Nombre (s)"
                        id="name"
                        name="name"
                        type="text"
                        icon={<User size={20} />}
                        placeholder="Tu nombre"
                        value={signupData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <InputText
                        label="Apellidos"
                        id="lastname"
                        name="lastname"
                        type="text"
                        icon={<User size={20} />}
                        placeholder="Tus apellidos"
                        value={signupData.lastname}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <InputText
                    label="Correo Electrónico"
                    id="email"
                    name="email"
                    type="email"
                    icon={<Mail size={20} />}
                    placeholder="nombre@restaurante.com"
                    value={signupData.email}
                    onChange={handleChange}
                    required
                  />

                  <InputText
                    label="Contraseña"
                    id="password"
                    name="password"
                    type="password"
                    icon={<Lock size={20} />}
                    placeholder="••••••••"
                    value={signupData.password}
                    onChange={handleChange}
                    required
                  />

                  <div className="pt-2">
                    <Button
                      variant="primary"
                      className="w-full"
                      type="submit"
                      loading={sendingForm}
                    >
                      Crear Cuenta
                    </Button>
                  </div>
                </form>

                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-dark-bg text-gray-500 dark:text-gray-400">
                      O regístrate con
                    </span>
                  </div>
                </div>

                <GoogleLoginButton />
                
                <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                  ¿Ya tienes una cuenta?{" "}
                  <Link
                    to={ROUTES.LOGIN}
                    className="font-bold text-keleo-600 hover:text-keleo-700 dark:text-keleo-500 dark:hover:text-keleo-100 transition"
                  >
                    Ingresa aquí
                  </Link>
                </p>
              </div>
            )}
          </div>

          <div className="mt-auto pt-10 text-center text-xs text-gray-400 md:hidden shrink-0 pb-6">
            &copy; {new Date().getFullYear()} Keleo App.
          </div>
        </div>
      </div>
    </div>
  );
}
