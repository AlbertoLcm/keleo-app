import { useEffect, useRef, type RefObject } from "react";

type DropdownProps = {
  open: boolean;
  onClose: () => void;
  buttonRef: RefObject<HTMLDivElement | null>;
};

export default function DropdownRestaurant({ open, onClose, buttonRef }: DropdownProps) {
  const ref = useRef<HTMLDivElement>(null);
  const refButton = buttonRef;

  // Cierra al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node) && refButton.current && !refButton.current.contains(e.target as Node)) {
        onClose();
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className={`
        absolute top-2 w-full min-h-32 rounded-md shadow-2xl 
        bg- outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in
        ${open ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"}
      `}
    >
      <h1>Prueba</h1>
    </div>
  );
}
