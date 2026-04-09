import React from 'react';

interface ToggleProps {
  id?: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

const Toggle: React.FC<ToggleProps> = ({ id, checked, onChange, disabled }) => {
  return (
    <div className={`relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in ${disabled ? 'opacity-50' : ''}`}>
      <input
        type="checkbox"
        id={id}
        className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300 checked:right-0 checked:border-keleo-600 transition-all duration-300"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        disabled={disabled}
      />
      <label 
        htmlFor={id} 
        className={`toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      ></label>
    </div>
  );
};

export default Toggle;
