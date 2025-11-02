import { Button } from "@/shared";
import GoogleLoginButton from "./GoogleLoginButton";
import { Link } from "react-router";
import { ROUTES } from "@/routes/paths";
import { useState } from "react";
import type { SignupData } from "../types";
import api from "@/api/axios";
import type { AxiosError } from "axios";
import MessageValidateAccount from "./MessageValidateAccount";

export default function SignupForm() {
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
    // limpiar errores si se registró
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
      <h2 className="text-2xl">Crear una cuenta</h2>
      <p className="text-gray-500 mt-2">
        ¿Ya tienes una cuenta?{" "}
        <Link to={ROUTES.LOGIN} className="text-blue-500 hover:underline">
          Ingresa aquí
        </Link>
      </p>

      {/* ALERT DE ERRORES */}
      {errors.length > 0 && (
        <div className="mt-6 mb-4 rounded-xl bg-red-50 border border-red-200 p-4 text-red-700">
          <ul className="list-inside text-sm space-y-1 list-none">
            {errors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {validateAccount ? <MessageValidateAccount /> : (
      <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre (s)
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={signupData.name}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-4xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
          </div>
          <div className="flex-1">
            <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
              Apellidos
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={signupData.lastname}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-4xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={signupData.email}
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-4xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={signupData.password}
            required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-4xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          />
        </div>

        <Button variant="primary" full disabled={sendingForm}>
          Crear Cuenta
        </Button>
      </form> 
      )}
      

      <div className="flex items-center my-8">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-gray-700 text-sm">O ingresa con</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <GoogleLoginButton />
    </section>
  );
}
