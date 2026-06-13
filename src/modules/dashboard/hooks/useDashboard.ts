import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import api from "@/api/axios";
import { getDashboardStats } from "../services/dashboard.service";
import type { DashboardStats } from "../services/dashboard.service";
import { ROUTES } from "@/routes/paths";
import { sileo } from "sileo";

export interface Toast {
  message: string;
  type: "success" | "info" | "warning";
}

export interface ReserveForm {
  tableId: string;
  clientName: string;
  people: string;
  date: string;
  time: string;
}

export interface CloseBoxForm {
  cash: string;
  credit_card: string;
  debit_card: string;
  bank_transfer: string;
  other: string;
  notes: string;
  real_amount: string;
  observations: string
}

const DEFAULT_RESERVE_FORM: ReserveForm = {
  tableId: "",
  clientName: "",
  people: "2",
  date: new Date().toISOString().split("T")[0],
  time: "19:00",
};

export function useDashboard() {
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  // ─── Data ─────────────────────────────────────────────────────────────────
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ─── Modal visibility ─────────────────────────────────────────────────────
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);

  // ─── Reserve form ─────────────────────────────────────────────────────────
  const [reserveForm, setReserveForm] = useState<ReserveForm>(DEFAULT_RESERVE_FORM);
  const [isReserving, setIsReserving] = useState(false);
  const [tablesList, setTablesList] = useState<any[]>([]);

  // ─── Effects ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!restaurantId) return;
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        setStats(await getDashboardStats(restaurantId));
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, [restaurantId]);

  useEffect(() => {
    if (restaurantId && isReserveModalOpen) {
      api
        .get("tables", { params: { restaurantId } })
        .then(({ data }) => setTablesList(data))
        .catch((err) => console.error("Error fetching tables for reservation:", err));
    }
  }, [restaurantId, isReserveModalOpen]);

  // ─── Handlers ─────────────────────────────────────────────────────────────
  const handleNewOrder = () => {
    if (restaurantId) {
      navigate(`${ROUTES.RESTAURANTS.PANEL(restaurantId)}/${ROUTES.TABLES.INDEX}`);
    }
  };

  const handleSubmitReserve = async () => {
    if (!reserveForm.tableId || !reserveForm.clientName) {
      sileo.show({
        title: "Error",
        description: "Por favor completa los campos obligatorios",
        type: "warning",
        position: "top-center",
      });
      return;
    }
    setIsReserving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const selected = tablesList.find((t) => t.table_id === reserveForm.tableId);
      sileo.show({
        title: "Reserva confirmada",
        description: `¡Reserva confirmada para ${selected?.name ?? "Mesa"} a nombre de ${reserveForm.clientName}!`,
        type: "success",
        position: "top-center",
      });
      setIsReserveModalOpen(false);
      setReserveForm(DEFAULT_RESERVE_FORM);
    } catch {
      sileo.show({
        title: "Error",
        description: "Error al crear la reservación",
        type: "error",
        position: "top-center",
      });
    } finally {
      setIsReserving(false);
    }
  };

  const handleCloseBox = () => {
    if (restaurantId) {
      navigate(`${ROUTES.RESTAURANTS.PANEL(restaurantId)}/${ROUTES.CASH_REGISTER.INDEX}`);
    }
  };

  const handleZReport = () => {
    if (restaurantId) {
      navigate(`${ROUTES.RESTAURANTS.PANEL(restaurantId)}/${ROUTES.CASH_REGISTER.INDEX}`);
    }
  };

  return {
    // Data
    stats,
    isLoading,
    // Modals
    isReserveModalOpen,
    setIsReserveModalOpen,
    // Reserve
    reserveForm,
    setReserveForm,
    isReserving,
    tablesList,
    handleSubmitReserve,
    // Quick actions
    handleNewOrder,
    handleCloseBox,
    handleZReport,
  };
}
