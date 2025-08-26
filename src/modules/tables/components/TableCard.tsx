import { DeviceTabletSpeakerIcon } from "@phosphor-icons/react";
import { Button } from "../../../shared";

type TableCardProps = {
  tableId: number;
  name: string;
  status: "Disponible" | "Ocupada" | "Reservada";
  capacity: number;
  onClick?: (tableId: number) => void;
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
    Disponible: "bg-green-200 text-green-800",
    Ocupada: "bg-orange-200 text-orange-800",
    Reservada: "bg-yellow-200 text-yellow-800",
  };

  return (
    <div className="bg-white rounded-lg p-4 ring ring-gray-900/5">
      <h3 className="flex items-center gap-2 mb-3 text-gray-900 text-xl font-medium tracking-tight">
        <DeviceTabletSpeakerIcon size={32} weight="fill" />
        {name}
        <span
          className={`text-xs font-bold rounded-4xl p-1 px-2 my-2 ${statusStyles[status]}`}
        >
          {status}
        </span>
      </h3>

      <p className="text-gray-500 my-4 text-sm">
        Capacidad para {capacity} personas
      </p>
      <Button variant="secondary" onClick={handleClick}>
        Ver detalles
      </Button>
    </div>
  );
}
