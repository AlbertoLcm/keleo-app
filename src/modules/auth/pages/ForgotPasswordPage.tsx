import { useState } from "react";
import { Mail, ArrowLeft, KeyRound, MailCheck } from "lucide-react";
import { Button, InputText, KeleoLogo } from "@/modules/shared";
import { ROUTES } from "@/routes/paths";
import { Link } from "react-router";
import api from "@/api/axios";
import type { AxiosError } from "axios";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);

    try {
      await api.post("/auth/forgot-password", { email });
      setSent(true);
    } catch (err) {
      const error = err as AxiosError<{ message: string | string[] }>;
      if (error.response) {
        const msg = error.response.data.message;
        setErrors(Array.isArray(msg) ? msg : [msg]);
      } else {
        setErrors(["Error de conexión al servidor"]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans text-gray-700 bg-keleo-50 dark:bg-dark-bg dark:text-dark-text h-screen flex flex-col md:flex-row overflow-hidden transition-colors duration-300">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .bg-pattern { background-image: url('https://www.transparenttextures.com/patterns/cubes.png'); }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fade-up 0.4s ease-out both; }
      `}</style>

      {/* ── LEFT: Branding ─────────────────────────────────────────────── */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-keleo-600 to-violet-600 dark:from-keleo-900 dark:to-dark-bg relative items-center justify-center p-12 overflow-hidden h-full">
        <div className="absolute inset-0 bg-pattern opacity-20 pointer-events-none" />
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-sm text-center">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-2xl animate-float">
            <div className="w-16 h-16 mx-auto mb-6 bg-white/20 rounded-2xl flex items-center justify-center">
              <KeyRound className="text-white w-9 h-9" />
            </div>
            <h2 className="text-white text-2xl font-bold mb-3">
              Recupera tu acceso
            </h2>
            <p className="text-white/70 text-sm leading-relaxed mb-8">
              Te enviaremos un enlace seguro a tu correo para que puedas crear una nueva contraseña.
            </p>
            <div className="space-y-3 text-left">
              {[
                "Ingresa tu correo registrado",
                "Revisa tu bandeja de entrada",
                "Haz clic en el enlace del correo",
              ].map((tip, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white/20 text-white text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="text-white/80 text-sm">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT: Form ────────────────────────────────────────────────── */}
      <div className="w-full md:w-1/2 flex flex-col h-full bg-white dark:bg-dark-bg overflow-y-auto transition-colors duration-300">
        {/* Header */}
        <div className="flex justify-between items-center p-6 md:p-10 shrink-0">
          <Link to="/" className="flex items-center gap-2">
            <KeleoLogo size={36} />
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              Keleo<span className="text-keleo-600">App</span>
            </span>
          </Link>
          <Link
            to={ROUTES.LOGIN}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-keleo-600 dark:text-gray-400 dark:hover:text-keleo-400 transition-colors"
          >
            <ArrowLeft size={16} />
            Volver al inicio de sesión
          </Link>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center px-6 pt-6 md:pt-0 md:px-16 lg:px-24 pb-12">
          <div className="max-w-md mx-auto w-full">

            {/* ── SUCCESS STATE ──────────────────────────────────────── */}
            {sent ? (
              <div className="animate-fade-up text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-keleo-50 dark:bg-keleo-900/30 flex items-center justify-center">
                  <MailCheck className="w-10 h-10 text-keleo-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  ¡Correo enviado!
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mb-2">
                  Enviamos un enlace de recuperación a{" "}
                  <span className="font-semibold text-gray-700 dark:text-gray-200">
                    {email}
                  </span>
                  .
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mb-8">
                  El enlace expirará en <strong>10 minutos</strong>. Revisa también tu carpeta de spam.
                </p>
                <button
                  onClick={() => { setSent(false); setEmail(""); }}
                  className="text-sm text-keleo-600 hover:text-keleo-700 dark:text-keleo-400 dark:hover:text-keleo-300 font-medium transition-colors cursor-pointer"
                >
                  ¿No recibiste el correo? Intentar con otro
                </button>
              </div>
            ) : (

              /* ── REQUEST FORM ─────────────────────────────────────── */
              <div className="animate-fade-up">
                <div className="w-14 h-14 mb-6 rounded-2xl bg-keleo-50 dark:bg-keleo-900/30 flex items-center justify-center">
                  <KeyRound className="w-7 h-7 text-keleo-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  ¿Olvidaste tu contraseña?
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mb-8">
                  Ingresa tu correo y te enviaremos un enlace para recuperar el acceso a tu cuenta.
                </p>

                {errors.length > 0 && (
                  <div className="rounded-xl bg-red-50 border-2 border-red-200 p-4 text-red-400 font-medium mb-6 dark:bg-red-900/30 dark:border-red-900">
                    <ul className="list-none text-sm space-y-1">
                      {errors.map((err, idx) => (
                        <li key={idx}>{err}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <InputText
                    label="Correo Electrónico"
                    id="forgot-email"
                    name="email"
                    type="email"
                    icon={<Mail size={20} />}
                    placeholder="nombre@restaurante.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button
                    variant="primary"
                    className="w-full"
                    type="submit"
                    loading={loading}
                  >
                    Enviar enlace de recuperación
                  </Button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                  ¿Recordaste tu contraseña?{" "}
                  <Link
                    to={ROUTES.LOGIN}
                    className="font-bold text-keleo-600 hover:text-keleo-700 dark:text-keleo-500 dark:hover:text-keleo-100 transition"
                  >
                    Iniciar sesión
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
