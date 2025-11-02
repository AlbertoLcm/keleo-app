import React from "react";

interface InputTextProps {
  label?: string;
  id: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  className?: string;
  autocomplete?: string;
}

const InputText: React.FC<InputTextProps> = ({
  label,
  id,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  placeholder = "",
  autocomplete = "on",
  className = "",
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        autoComplete={autocomplete}
        className={`mt-2 w-full px-4 py-2 border border-gray-300 rounded-4xl focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-150 ${className}`}
      />
    </div>
  );
};

export default InputText;
