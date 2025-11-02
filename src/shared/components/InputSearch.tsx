import { useEffect, useState } from "react";

type InputSearchProps = {
  onSearch: (value: string) => void;
  value?: string;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  delay?: number; // tiempo de espera antes de ejecutar onSearch
};

export default function InputSearch({
  onSearch,
  value = "",
  placeholder = "Buscar...",
  size = "md",
  className = "",
  delay = 400,
}: InputSearchProps) {
  const [inputValue, setInputValue] = useState(value);

  // 🕒 Debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(inputValue.trim());
    }, delay);

    return () => clearTimeout(handler);
  }, [inputValue, delay, onSearch]);

  // Tamaños predefinidos
  const sizeClasses =
    size === "sm"
      ? "px-3 py-1 text-sm"
      : size === "lg"
      ? "px-5 py-3 text-lg"
      : "px-4 py-2 text-base";

  return (
    <div className={`relative w-64 ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        aria-label="Buscar"
        className={`w-full border border-gray-300 rounded-full transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-400 pr-10 ${sizeClasses}`}
      />
      <button
        type="button"
        onClick={() => onSearch(inputValue.trim())}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
  );
}
