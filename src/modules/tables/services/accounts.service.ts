import api from "@/api/axios";
import type { OrderDetail } from "../types";

export const getAccountDetails = async (accountId: string): Promise<OrderDetail[]> => {
  const response = await api.get(`/accounts/${accountId}`);
  return response.data?.orders_details ?? [];
};

export const closeAccount = async (accountId: string, paymentMethod: string): Promise<void> => {
  await api.post(`/accounts/${accountId}/close`, { paymentMethod });
};

export const requestPayment = async (accountId: string): Promise<void> => {
  await api.post(`/accounts/${accountId}/request-payment`);
};

export const reopenAccount = async (accountId: string): Promise<void> => {
  await api.post(`/accounts/${accountId}/reopen`);
};

export const cancelAccount = async (accountId: string): Promise<void> => {
  await api.post(`/accounts/${accountId}/cancel`);
};

export const sendOrderItems = async (accountId: string, items: { productId: string; quantity: number; notas?: string }[]) => {
  const promises = items.map((item) =>
    api.post(`/accounts/${accountId}/items`, {
      productId: item.productId,
      quantity: item.quantity,
      notas: item.notas,
    })
  );

  return Promise.all(promises);
};
