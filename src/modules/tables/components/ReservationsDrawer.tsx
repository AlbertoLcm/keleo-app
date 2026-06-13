import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  CalendarClock,
  Plus,
  Trash2,
  Users,
  Clock,
  MapPin,
} from "lucide-react";
import api from "@/api/axios";
import { useParams } from "react-router";
import NewReservationForm from "./NewReservationForm";
import type { Table } from "../types";

interface Reservation {
  id: string;
  table_id: string;
  reservation_name: string;
  num_people: number;
  scheduled_at: string;
  tables: {
    name: string;
  };
}

interface ReservationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  tables: Table[];
}

const ReservationsDrawer: React.FC<ReservationsDrawerProps> = ({
  isOpen,
  onClose,
  tables,
}) => {
  const { restaurantId } = useParams();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showNewForm, setShowNewForm] = useState(false);

  const fetchReservations = useCallback(async () => {
    if (!restaurantId) return;
    setLoading(true);
    try {
      const { data } = await api.get<Reservation[]>("reservations", {
        params: { restaurantId },
      });
      setReservations(data);
    } catch (err) {
      console.error("Error al cargar reservas", err);
    } finally {
      setLoading(false);
    }
  }, [restaurantId]);

  useEffect(() => {
    if (isOpen) {
      fetchReservations();
      setShowNewForm(false);
    }
  }, [isOpen, fetchReservations]);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await api.delete(`reservations/${id}`, {
        params: { restaurantId },
      });
      setReservations((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error("Error al cancelar reserva", err);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const isToday = date.toDateString() === today.toDateString();
    const isTomorrow = date.toDateString() === tomorrow.toDateString();

    const timeStr = date.toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (isToday) return `Hoy, ${timeStr}`;
    if (isTomorrow) return `Mañana, ${timeStr}`;

    return date.toLocaleDateString("es-MX", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTimeUntil = (dateStr: string) => {
    const now = new Date();
    const target = new Date(dateStr);
    const diffMs = target.getTime() - now.getTime();

    if (diffMs < 0) return "Ya pasó";

    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 60) return `en ${diffMin} min`;

    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `en ${diffHours}h ${diffMin % 60}m`;

    const diffDays = Math.floor(diffHours / 24);
    return `en ${diffDays}d`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md shadow-2xl z-[101] flex flex-col border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <CalendarClock
                    size={20}
                    className="text-amber-600 dark:text-amber-400"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {showNewForm ? "Nueva Reserva" : "Reservas"}
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {showNewForm
                      ? "Programa una nueva reserva"
                      : `${reservations.length} reserva${reservations.length !== 1 ? "s" : ""} programada${reservations.length !== 1 ? "s" : ""}`}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                {showNewForm ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="p-6"
                  >
                    <NewReservationForm
                      tables={tables}
                      onCancel={() => setShowNewForm(false)}
                      onReservationAdded={() => {
                        setShowNewForm(false);
                        fetchReservations();
                      }}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="list"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="p-6 space-y-3"
                  >
                    {loading ? (
                      <div className="space-y-3">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <div
                            key={i}
                            className="animate-pulse rounded-xl bg-gray-100 dark:bg-gray-800 h-24"
                          />
                        ))}
                      </div>
                    ) : reservations.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                          <CalendarClock
                            size={28}
                            className="text-gray-400"
                          />
                        </div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                          Sin reservas programadas
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          Crea una nueva reserva para empezar
                        </p>
                      </div>
                    ) : (
                      reservations.map((reservation) => (
                        <motion.div
                          key={reservation.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          className="group relative bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-100 dark:border-gray-700/50 hover:border-amber-200 dark:hover:border-amber-800/50 transition-all"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-gray-900 dark:text-white truncate">
                                {reservation.reservation_name}
                              </h4>
                              <div className="flex items-center gap-3 mt-1.5">
                                <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                  <Users size={12} />
                                  {reservation.num_people}p
                                </span>
                                <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                  <MapPin size={12} />
                                  {reservation.tables.name}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => handleDelete(reservation.id)}
                              disabled={deletingId === reservation.id}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                            >
                              <Trash2
                                size={16}
                                className={
                                  deletingId === reservation.id
                                    ? "animate-spin"
                                    : ""
                                }
                              />
                            </button>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-sm font-semibold text-amber-600 dark:text-amber-400">
                              <Clock size={14} />
                              {formatDate(reservation.scheduled_at)}
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700/50 px-2 py-0.5 rounded-full">
                              {getTimeUntil(reservation.scheduled_at)}
                            </span>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer action — only show in list mode */}
            {!showNewForm && (
              <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                <button
                  onClick={() => setShowNewForm(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl shadow-lg shadow-amber-500/20 transition font-bold text-sm cursor-pointer"
                >
                  <Plus size={20} />
                  Nueva Reserva
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ReservationsDrawer;
