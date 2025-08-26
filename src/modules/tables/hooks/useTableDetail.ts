import { useCallback, useState } from "react";
import api from "@/api/axios";
import type { Table } from "../types";
import { getAccountDetails } from "../services/accounts.service";

export const useTableDetail = (tableId: string | undefined) => {
  const [tableInfo, setTableInfo] = useState<Table>();
  const [uiState, setUiState] = useState({
    loadingInfoTable: false,
  });
  const [errors, setErrors] = useState<{ infoTable: string[] }>({
    infoTable: [],
  });

  const fetchTableInfo = useCallback(async () => {
    if (!tableId) return;
    setUiState((prev) => ({ ...prev, loadingInfoTable: true }));
    try {
      const response = await api.get(`/table/${tableId}`);
      const table: Table = response.data;

      // The /table/:id endpoint uses a DB view that does not include orders_details.
      // We fetch the account details separately to get the orders placed on this account.
      if (table.account_id) {
        const orders_details = await getAccountDetails(table.account_id);
        setTableInfo({ ...table, orders_details });
      } else {
        setTableInfo(table);
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        infoTable: ["No se pudo obtener el detalle de la mesa."],
      }));
    } finally {
      setUiState((prev) => ({ ...prev, loadingInfoTable: false }));
    }
  }, [tableId]);

  return {
    tableInfo,
    uiState,
    errors,
    fetchTableInfo,
  };
};
