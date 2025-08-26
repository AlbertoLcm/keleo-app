import api from "@/api/axios";
import { StatusBadge, type StatusBadgeColor } from "@/modules/shared";
import { ROUTES } from "@/routes/paths";
import { getInitialsString } from "@/utils/getInitialsString";
import { Armchair, ChevronRight, Clock, Plus, CreditCard } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

export type TableStatus = "free" | "occupied" | "payment" | "reserved";

interface TableCardProps {
  tableId: string;
  name: string;
  area: string;
  status: TableStatus;
  capacity?: number;
  timeActive?: number;
  totalAmount?: number;
  employeeName?: string;
  paymentMethod?: string;
  reservationTime?: string;
  reservationName?: string;
  reservationPeople?: number;
  timeUntilReservation?: string;
  accountId: string;
  onClick?: () => void;
  onAction?: (e: React.MouseEvent) => void;
}

const TableCard: React.FC<TableCardProps> = ({
  tableId,
  name,
  area,
  status,
  capacity,
  timeActive,
  totalAmount,
  employeeName,
  paymentMethod,
  reservationTime,
  reservationName,
  reservationPeople,
  timeUntilReservation,
}) => {
  interface StatusConfig {
    label: string;
    color: StatusBadgeColor;
  }

  const statusConfig: Record<string, StatusConfig> = {
    free: {
      label: "Libre",
      color: "green",
    },
    occupied: {
      label: "Ocupada",
      color: "red",
    },
    payment: {
      label: "Por Pagar",
      color: "blue",
    },
    reserved: {
      label: "Reservada",
      color: "orange",
    },
  };

  const { restaurantId } = useParams();
  const navigate = useNavigate();

  const [isAssigning, setIsAssigning] = useState(false);

  const assignTable = async () => {
    setIsAssigning(true);

    const dataAssignTable = {
      restaurantId,
      tableId,
      type: 'dine_in'
    };
    try {
      await api.post("accounts/open", dataAssignTable);

      navigate(ROUTES.TABLES.DETAIL(tableId));
    } catch (error: any) {
      console.error("No se pudo asignar la mesa", error);
    } finally {
      setIsAssigning(false);
    }
  };

  const formatTimeOccupied = (minutes: number) => {
    const totalMinutes = Math.round(minutes);

    if (totalMinutes <= 0) return "0 min";

    if (totalMinutes < 60) {
      return `${totalMinutes} min`;
    }

    if (totalMinutes < 1440) {
      const hours = Math.floor(totalMinutes / 60);
      const remainingMinutes = totalMinutes % 60;

      return remainingMinutes === 0
        ? `${hours} h`
        : `${hours} h ${remainingMinutes} min`;
    }

    const days = Math.floor(totalMinutes / 1440);
    const remainingHours = Math.floor((totalMinutes % 1440) / 60);

    return remainingHours === 0 ? `${days} d` : `${days} d ${remainingHours} h`;
  };

  const config = statusConfig[status];

  return (
    <div
      className={`relative bg-white dark:bg-dark-card rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-4 border border-white/50 dark:border-white/5 group cursor-pointer`}
    >
      <div
        className={`flex justify-between items-start mb-2`}
      >
        <div className="flex flex-col">
          <h3 className="text-base md:text-xl font-bold text-gray-800 dark:text-white">
            {name}
          </h3>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {area}
          </span>
        </div>

        <StatusBadge color={config.color} text={config.label} />
      </div>

      {status === "free" && (
        <>
          <div className="flex flex-col items-center justify-center py-2 opacity-50 group-hover:opacity-100 my-4">
            <Armchair size={40} className="text-gray-400" />
            <p className="text-xs text-gray-400">Capacidad: {capacity}</p>
          </div>
          <div className="absolute inset-0 bg-white/90 dark:bg-dark-card/90 opacity-0 group-hover:opacity-100 transition  flex items-center justify-center rounded-2xl backdrop-blur-sm">
            <button
              onClick={assignTable}
              disabled={isAssigning}
              className="transition-all active:scale-90 cursor-pointer px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg transform scale-90 group-hover:scale-100"
            >
              Asignar Mesa
            </button>
          </div>
        </>
      )}

      {(status === "occupied" || status === "payment") && (
        <div className="flex items-center justify-between mb-2">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white dark:border-dark-card flex items-center justify-center text-xs font-bold text-gray-500">
              {getInitialsString(employeeName || "")}
            </div>

            {status === "occupied" && (
              <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white dark:border-dark-card flex items-center justify-center">
                <Plus size={14} className="text-gray-400" />
              </div>
            )}
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">
              {status === "occupied" ? "Tiempo" : "Método"}
            </p>
            <p className="text-sm font-bold text-gray-700 dark:text-gray-200 flex items-center justify-end">
              {status === "payment" && (
                <CreditCard size={14} className="mr-1" />
              )}
              {status === "occupied"
                ? formatTimeOccupied(timeActive || 0)
                : paymentMethod}
            </p>
          </div>
        </div>
      )}

      {status === "reserved" && (
        <div className="flex flex-col justify-center h-20 mb-2">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="text-amber-500" size={20} />
            <span className="font-bold text-gray-800 dark:text-white">
              {reservationTime}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {reservationName} ({reservationPeople}p)
          </p>
        </div>
      )}

      {status !== "free" && (
        <div className="pt-2 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">
              {status === "occupied"
                ? "Total actual"
                : status === "payment"
                  ? "Total final"
                  : "Inicia en"}
            </p>
            <p
              className={`text-lg font-bold ${
                status === "occupied"
                  ? "text-keleo-600 dark:text-keleo-400"
                  : "text-gray-800 dark:text-white"
              }`}
            >
              {status === "reserved"
                ? timeUntilReservation
                : `$${totalAmount?.toLocaleString()}`}
            </p>
          </div>

          {status === "occupied" ? (
            <button
              onClick={() => navigate(ROUTES.TABLES.DETAIL(tableId))}
              className="transition-all active:scale-90 cursor-pointer w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-keleo-600 hover:text-white dark:hover:bg-keleo-600 flex items-center justify-center text-gray-500"
            >
              <ChevronRight size={18} />
            </button>
          ) : (
            <button
              onClick={() => navigate(ROUTES.TABLES.DETAIL(tableId))}
              className={`transition-all active:scale-90 cursor-pointer px-3 py-1.5 rounded-lg text-white text-xs font-bold shadow-md ${
                status === "payment"
                  ? "bg-blue-500 hover:bg-blue-600 shadow-blue-500/30"
                  : "bg-amber-500 hover:bg-amber-600 shadow-amber-500/30"
              }`}
            >
              {status === "payment" ? "Cobrar" : "Check-in"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TableCard;
