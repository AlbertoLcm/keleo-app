import { Button, InputText } from "@/shared";
import GoogleLoginButton from "./GoogleLoginButton";
import { Link, useLocation, useNavigate } from "react-router";
import { ROUTES } from "@/routes/paths";
import { useState } from "react";
import type { SigninData } from "../types";
import { useAuth } from "../hooks/useAuth";

export default function LoginForm() {
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
      const from = location.state?.from?.pathname || ROUTES.TABLES.LIST;

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
    <section className="w-md mx-auto bg-white p-10 rounded-2xl ring-1 ring-gray-100">
      <h2 className="text-2xl">Inicia sesión con tu cuenta</h2>
      <p className="text-gray-500 mt-2 mb-5">
        ¿Aún no tienes una cuenta?{" "}
        <Link to={ROUTES.SIGNUP} className="text-blue-500">
          Crea una cuenta
        </Link>
      </p>

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

      <form className="mt-5 flex flex-col gap-4" onSubmit={handleSubmit}>
        <InputText
          label="Correo Electrónico"
          id="email"
          name="email"
          type="email"
          required
          value={loginData.email}
          onChange={handleChange}
        />
        <InputText
          label="Contraseña"
          id="password"
          name="password"
          type="password"
          required
          value={loginData.password}
          onChange={handleChange}
        />
        <p className="text-right text-blue-500">
          <a href="#">¿Olvidaste tu contraseña?</a>
        </p>

        <Button variant="primary" full disabled={sendingForm}>
          Iniciar Sesión
        </Button>
      </form>
      <div className="flex items-center my-8">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-gray-700 text-sm">O ingresa con</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <GoogleLoginButton />
    </section>
  );
}
