import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import { useCallback } from "react";

interface InputNumberProps {
  id: string;
  quantity: number;
  setQuantity: (val: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

export default function InputNumber({
  id,
  quantity,
  setQuantity,
  min = 1,
  max = 99,
  step = 1,
  disabled = false,
}: InputNumberProps) {
  const decrease = useCallback(() => {
    setQuantity(Math.max(min, quantity - step));
  }, [min, step, setQuantity]);

  const increase = useCallback(() => {
    setQuantity(Math.min(max, quantity + step));
  }, [max, step, setQuantity]);

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={decrease}
        disabled={disabled || quantity <= min}
        className={`rounded-full p-2 transition ${
          disabled || quantity <= min
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-600 hover:bg-gray-100 active:bg-gray-200"
        }`}
        aria-label="Disminuir cantidad"
      >
        <CaretLeftIcon size={20} />
      </button>

      <input
        id={id}
        type="number"
        min={min}
        max={max}
        step={step}
        value={quantity}
        disabled={disabled}
        onChange={(e) => {
          const val = Number(e.target.value);
          if (!isNaN(val)) setQuantity(Math.min(max, Math.max(min, val)));
        }}
        className={`border text-center w-20 rounded-full p-2 outline-none transition ${
          disabled
            ? "border-gray-200 bg-gray-50 text-gray-400"
            : "border-gray-300 text-gray-800 focus:ring-2 focus:ring-blue-300"
        }`}
      />

      <button
        type="button"
        onClick={increase}
        disabled={disabled || quantity >= max}
        className={`rounded-full p-2 transition ${
          disabled || quantity >= max
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-600 hover:bg-gray-100 active:bg-gray-200"
        }`}
        aria-label="Aumentar cantidad"
      >
        <CaretRightIcon size={20} />
      </button>
    </div>
  );
}
