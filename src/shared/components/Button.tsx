type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "red";
  full?: boolean;
  disabled?: boolean;
};

export default function Button({ children, onClick, variant = "primary", disabled, full = false }: ButtonProps) {
  const variantStyle = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "border bg-transparent border-gray-300 text-gray-800",
    red: "bg-red-500 text-white hover:bg-re d-700",
  }

  const variantStyleDisable = {
    primary: "bg-blue-300 text-white",
    secondary: "border bg-gray-300 text-gray-800 ",
    red: "bg-red-200 text-white",
  }

  const fullWidth = full ? "w-full text-center justify-center" : "";

  if (disabled) {
    return (
      <button className={`flex gap-1 text-base items-center rounded-4xl p-2 pl-4 pr-4 ${variantStyleDisable[variant]} ${fullWidth} cursor-not-allowed`}>
        {children}
      </button>
    );
  }

  return (
    <button className={`flex gap-1 text-base items-center rounded-4xl p-2 pl-4 pr-4 ${variantStyle[variant]} ${fullWidth} cursor-pointer`} onClick={onClick}>
      {children}
    </button>
  );
}
