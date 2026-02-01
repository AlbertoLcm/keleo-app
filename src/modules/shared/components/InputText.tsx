import { useState, type InputHTMLAttributes, type ReactNode } from "react";
// Importamos los iconos que usaremos (ej: Eye para mostrar, EyeOff para ocultar)
import { Eye, EyeOff } from "lucide-react"; // Asegúrate de tener 'lucide-react' instalado
import { Link } from "react-router";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
  icon?: ReactNode; // Icono para el lado izquierdo del input
  extraLink?: {
    text: string;
    href: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  };
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  icon,
  extraLink,
  className = "",
  type = "text", // Establecemos 'text' como tipo por defecto
  ...rest
}) => {
  // Estado para controlar la visibilidad de la contraseña
  const [showPassword, setShowPassword] = useState(false);

  // Determina el tipo de input real basado en 'type' prop y 'showPassword' state
  const currentInputType = type === "password" && showPassword ? "text" : type;

  // Estilos de Tailwind CSS (se mantienen igual)
  const inputBaseClasses = `
    w-full pr-4 py-3 rounded-xl 
    bg-gray-50 dark:bg-dark-card 
    border border-gray-200 dark:border-gray-700 
    text-gray-900 dark:text-white 
    focus:border-keleo-500 focus:ring-2 focus:ring-keleo-200 dark:focus:ring-keleo-900 
    outline-none transition placeholder-gray-400
    ${icon ? "pl-11" : "pl-4"}
    ${
      type === "password" ? "pr-11" : ""
    }  // Añade padding a la derecha si es password
  `;

  const iconContainerClasses = `
    absolute inset-y-0 left-0 pl-4 flex items-center 
    pointer-events-none text-gray-400 
    group-focus-within:text-keleo-500 transition-colors
  `;

  return (
    <div>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <label
            htmlFor={id}
            className="block text-xs font-bold text-gray-500 dark:text-gray-400"
          >
            {label}
          </label>

          {extraLink && (
            <Link
              to={extraLink.href}
              onClick={extraLink.onClick}
              className="text-sm font-medium text-keleo-600 hover:text-keleo-700 dark:text-keleo-500 dark:hover:text-keleo-100"
            >
              {extraLink.text}
            </Link>
          )}
        </div>
      )}

      <div className="relative group">
        {/* Icono del lado izquierdo */}
        <div className={iconContainerClasses}>{icon}</div>

        {/* Input */}
        <input
          id={id}
          type={currentInputType} // Usa el tipo dinámico
          className={`${inputBaseClasses} ${className}`}
          {...rest}
        />

        {/* Botón para alternar visibilidad de contraseña (solo si el tipo original es 'password') */}
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="cursor-pointer absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-keleo-600 dark:hover:text-keleo-400 focus:outline-none"
            aria-label={
              showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;
