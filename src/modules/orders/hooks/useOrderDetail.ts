import { useCallback, useState } from "react";
import type { DirectOrder } from "../types";
import { getOrderById } from "../services/orders.service";

export const useOrderDetail = (accountId: string | undefined) => {
  const [orderInfo, setOrderInfo] = useState<DirectOrder>();
  const [uiState, setUiState] = useState({
    loadingInfoOrder: false,
  });
  const [errors, setErrors] = useState<{ infoOrder: string[] }>({
    infoOrder: [],
  });

  const fetchOrderInfo = useCallback(async () => {
    if (!accountId) return;
    setUiState((prev) => ({ ...prev, loadingInfoOrder: true }));
    try {
      const order = await getOrderById(accountId);
      setOrderInfo(order);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        infoOrder: ["No se pudo obtener el detalle de la orden."],
      }));
    } finally {
      setUiState((prev) => ({ ...prev, loadingInfoOrder: false }));
    }
  }, [accountId]);

  return {
    orderInfo,
    uiState,
    errors,
    fetchOrderInfo,
  };
};
