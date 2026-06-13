import api from "@/api/axios";
import type { DailySummary, BlindCount, CashRegisterSession } from "../types";

export const getDailySummary = async (restaurantId: string): Promise<DailySummary> => {
  const response = await api.get(`/cash-register/${restaurantId}/summary`);
  return response.data;
};

export const closeCashRegister = async (
  restaurantId: string,
  data: {
    blindCount: BlindCount;
    notes?: string;
    sessionStart: string;
  }
): Promise<CashRegisterSession> => {
  const response = await api.post(`/cash-register/${restaurantId}/close`, {
    countedCash: data.blindCount.cash,
    countedCreditCard: data.blindCount.credit_card,
    countedDebitCard: data.blindCount.debit_card,
    countedTransfer: data.blindCount.bank_transfer,
    countedOther: data.blindCount.other,
    notes: data.notes,
    sessionStart: data.sessionStart,
  });
  return response.data;
};

export const getCashRegisterSessions = async (
  restaurantId: string,
  limit = 10
): Promise<CashRegisterSession[]> => {
  const response = await api.get(`/cash-register/${restaurantId}/sessions`, {
    params: { limit },
  });
  return response.data;
};
