type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  full?: boolean;
  disabled?: boolean;
};

export default function Button({ children, onClick, variant = "primary", disabled, full = false }: ButtonProps) {
  if (disabled) {
    return (
      <button className="flex gap-1 items-center rounded-4xl p-2 pl-4 pr-4 bg-gray-400 text-white cursor-not-allowed">
        {children}
      </button>
    );
  }
  
  const variantStyle = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "border bg-transparent border-gray-300 text-gray-800",
  }
  
    const fullWidth = full ? "w-full" : "";

  return (
    <button className={`flex gap-1 items-center rounded-4xl p-2 pl-4 pr-4 ${variantStyle[variant]} ${fullWidth} cursor-pointer`} onClick={onClick}>
      {children}
    </button>
  );
}
