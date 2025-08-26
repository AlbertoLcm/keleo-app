import { useEffect, useState } from "react";
import { Lock, ShieldCheck, ShieldX, Loader2 } from "lucide-react";
import { Button, InputText, KeleoLogo } from "@/modules/shared";
import { ROUTES } from "@/routes/paths";
import { Link, useNavigate, useSearchParams } from "react-router";
import api from "@/api/axios";
import type { AxiosError } from "axios";

type Status = "validating" | "valid" | "invalid" | "success";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token") ?? "";

  const [status, setStatus] = useState<Status>("validating");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Valida el token automáticamente al cargar la página
  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }

    // Decodificamos el JWT sin verificar firma (solo para revisar expiración en cliente)
    // La validación real la hace el backend. Aquí solo comprobamos que haya token.
    try {
      const [, payloadB64] = token.split(".");
      const payload = JSON.parse(atob(payloadB64));
      const isExpired = payload.exp && Date.now() / 1000 > payload.exp;

      if (isExpired) {
        setStatus("invalid");
      } else {
        setStatus("valid");
      }
    } catch {
      setStatus("invalid");
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);

    if (newPassword !== confirmPassword) {
      setErrors(["Las contraseñas no coinciden"]);
      return;
    }
    if (newPassword.length < 6) {
      setErrors(["La contraseña debe tener al menos 6 caracteres"]);
      return;
    }

    setLoading(true);

    try {
      await api.post("/auth/reset-password", { code: token, newPassword });
      setStatus("success");
    } catch (err) {
      const error = err as AxiosError<{ message: string | string[] }>;
      if (error.response) {
        const msg = error.response.data.message;
        // Si el backend dice que el token expiró, mostramos estado inválido
        const msgStr = Array.isArray(msg) ? msg.join(" ") : msg;
        if (msgStr.toLowerCase().includes("expir") || msgStr.toLowerCase().includes("invalid")) {
          setStatus("invalid");
        } else {
          setErrors(Array.isArray(msg) ? msg : [msg]);
        }
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
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* ── LEFT: Branding ─────────────────────────────────────────────── */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-keleo-600 to-violet-600 dark:from-keleo-900 dark:to-dark-bg relative items-center justify-center p-12 overflow-hidden h-full">
        <div className="absolute inset-0 bg-pattern opacity-20 pointer-events-none" />
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-sm text-center">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-2xl animate-float">
            <div className="w-16 h-16 mx-auto mb-6 bg-white/20 rounded-2xl flex items-center justify-center">
              <ShieldCheck className="text-white w-9 h-9" />
            </div>
            <h2 className="text-white text-2xl font-bold mb-3">
              Nueva contraseña
            </h2>
            <p className="text-white/70 text-sm leading-relaxed">
              Elige una contraseña segura para proteger tu cuenta en Keleo App.
            </p>
            <div className="mt-6 space-y-2 text-left">
              {["Mínimo 6 caracteres", "Evita usar datos personales", "Úsala solo en Keleo"].map((tip, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/50 flex-shrink-0" />
                  <span className="text-white/70 text-sm">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT: Content ─────────────────────────────────────────────── */}
      <div className="w-full md:w-1/2 flex flex-col h-full bg-white dark:bg-dark-bg overflow-y-auto transition-colors duration-300">
        {/* Header */}
        <div className="flex items-center p-6 md:p-10 shrink-0">
          <Link to="/" className="flex items-center gap-2">
            <KeleoLogo size={36} />
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              Keleo<span className="text-keleo-600">App</span>
            </span>
          </Link>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center px-6 pt-6 md:pt-0 md:px-16 lg:px-24 pb-12">
          <div className="max-w-md mx-auto w-full">

            {/* ── VALIDATING ─────────────────────────────────────────── */}
            {status === "validating" && (
              <div className="animate-fade-up text-center">
                <Loader2 className="w-12 h-12 text-keleo-500 mx-auto mb-4 animate-spin" />
                <p className="text-gray-500 dark:text-gray-400">Verificando enlace…</p>
              </div>
            )}

            {/* ── INVALID / EXPIRED ──────────────────────────────────── */}
            {status === "invalid" && (
              <div className="animate-fade-up text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                  <ShieldX className="w-10 h-10 text-red-500" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  Enlace inválido
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mb-8">
                  Este enlace de recuperación ha expirado o ya fue utilizado. Los enlaces son válidos por <strong>10 minutos</strong>.
                </p>
                <Link to={ROUTES.FORGOT_PASSWORD}>
                  <Button variant="primary" className="w-full">
                    Solicitar nuevo enlace
                  </Button>
                </Link>
                <p className="mt-4 text-center text-sm">
                  <Link
                    to={ROUTES.LOGIN}
                    className="text-keleo-600 hover:text-keleo-700 dark:text-keleo-400 font-medium transition-colors"
                  >
                    Volver al inicio de sesión
                  </Link>
                </p>
              </div>
            )}

            {/* ── FORM ───────────────────────────────────────────────── */}
            {status === "valid" && (
              <div className="animate-fade-up">
                <div className="w-14 h-14 mb-6 rounded-2xl bg-keleo-50 dark:bg-keleo-900/30 flex items-center justify-center">
                  <Lock className="w-7 h-7 text-keleo-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Crea una nueva contraseña
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mb-8">
                  Elige una contraseña segura para tu cuenta.
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

                <form onSubmit={handleSubmit} className="space-y-5">
                  <InputText
                    label="Nueva contraseña"
                    id="new-password"
                    name="newPassword"
                    type="password"
                    icon={<Lock size={20} />}
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <InputText
                    label="Confirmar contraseña"
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    icon={<Lock size={20} />}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <Button
                    variant="primary"
                    className="w-full"
                    type="submit"
                    loading={loading}
                  >
                    Guardar nueva contraseña
                  </Button>
                </form>
              </div>
            )}

            {/* ── SUCCESS ────────────────────────────────────────────── */}
            {status === "success" && (
              <div className="animate-fade-up text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                  <ShieldCheck className="w-10 h-10 text-green-500" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  ¡Contraseña actualizada!
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mb-8">
                  Tu contraseña fue cambiada exitosamente. Ya puedes iniciar sesión con ella.
                </p>
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => navigate(ROUTES.LOGIN)}
                >
                  Ir a iniciar sesión
                </Button>
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
