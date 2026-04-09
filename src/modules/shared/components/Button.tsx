import type { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode; // Contenido del botón (texto o iconos)
  variant?: ButtonVariant; // La variante que define el estilo (primary por defecto)
  loading?: boolean; // Opcional: para mostrar un spinner/estado de carga
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  disabled = false,
  loading = false,
  className = '', 
  ...rest 
}) => {
  const baseStyles = 'cursor-pointer text-sm md:text-base font-bold rounded-xl transition transform active:scale-[0.98] flex items-center justify-center gap-2 px-6 py-3.5 focus:outline-none focus:ring-4';
  
  const variantStyles = {
    primary: `
      shadow-lg
      bg-keleo-600 text-white 
      hover:bg-keleo-700 
      shadow-keleo-500/30 
      focus:ring-keleo-500/50 
      dark:bg-keleo-700 dark:hover:bg-keleo-600
    `,
    secondary: `
      bg-white text-keleo-700
      border-2 border-keleo-100
      hover:border-keleo-300 hover:bg-gray-50
      transition text-center
      dark:bg-transparent dark:text-white dark:border-gray-600 dark:hover:bg-gray-800 
    `,
  };

  const disabledStyles = disabled 
    ? 'opacity-50 cursor-not-allowed pointer-events-none shadow-none' 
    : '';

  const allClasses = `${baseStyles} ${variantStyles[variant]} ${disabledStyles} ${className}`;

  return (
    <button
      className={allClasses}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;