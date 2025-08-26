import api from "@/api/axios";
import type { DirectOrder } from "../types";
  
export const getOrders = async (restaurantId: string): Promise<DirectOrder[]> => {
  const response = await api.get(`/accounts`, {
    params: { restaurantId },
  });
  // Filter out dine_in accounts, we only want direct orders (takeout, delivery)
  return response.data.filter((account: DirectOrder) => account.type !== "dine_in" && account.status !== "closed" && account.status !== "cancelled");
};

export const getOrderById = async (accountId: string): Promise<DirectOrder> => {
  const response = await api.get(`/accounts/${accountId}`);
  return response.data;
};

export const createOrder = async (data: {
  restaurantId: string;
  orderAlias: string;
  type: "takeout" | "delivery";
}): Promise<DirectOrder> => {
  const response = await api.post(`/accounts/open`, data);
  return response.data;
};

export const closeOrder = async (accountId: string, paymentMethod: string): Promise<void> => {
  await api.post(`/accounts/${accountId}/close`, { paymentMethod });
};

export const requestPayment = async (accountId: string): Promise<void> => {
  await api.post(`/accounts/${accountId}/request-payment`);
};

export const cancelOrder = async (accountId: string): Promise<void> => {
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
