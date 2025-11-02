import { CaretRightIcon, DeviceTabletSpeakerIcon } from "@phosphor-icons/react";
import type { UUID } from "crypto";

type TableCardProps = {
  tableId: UUID;
  name: string;
  status: "Disponible" | "Ocupada" | "Reservada";
  capacity: number;
  onClick?: (tableId: UUID) => void;
};

export default function TableCard({
  tableId,
  name,
  status,
  capacity,
  onClick,
}: TableCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(tableId);
    }
  };

  const statusStyles = {
    Disponible: "bg-green-100 text-green-800",
    Ocupada: "bg-orange-100 text-orange-800",
    Reservada: "bg-yellow-100 text-yellow-800",
  };

  return (
    <div
      className="bg-white group ring-1 ring-gray-200 rounded-xl p-4 cursor-pointer hover:ring-blue-500 transition-all duration-200 h-[200px] relative"
      key={tableId}
      onClick={handleClick}
    >
      <h3 className="flex items-center gap-2 mb-3 text-xl tracking-tight">
        <span className="text-gray-950">
          <DeviceTabletSpeakerIcon size={40} weight="thin" />
        </span>
        {name}
      </h3>
      <span
        className={`text-xs rounded-4xl p-1 px-2 my-2 ${statusStyles[status]}`}
      >
        {status}
      </span>
      <p className="text-gray-500 my-4 text-sm">
        Capacidad para {capacity} personas
      </p>

      <span className="text-gray-400 absolute bottom-4 right-4 transition-colors duration-200 group-hover:text-blue-500">
        <CaretRightIcon size={24} />
      </span>
    </div>
  );
}
