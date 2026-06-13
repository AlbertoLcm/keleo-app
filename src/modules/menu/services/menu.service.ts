import api from "@/api/axios";
import type { Category, Product } from "../models/menu.model";

export const getCategories = async (restaurantId: string): Promise<Category[]> => {
  const { data } = await api.get<Category[]>(`categories`, {
    params: { restaurantId },
  });
  return data;
};

export const getProducts = async (
  restaurantId: string,
  categoryId?: string,
  search?: string
): Promise<Product[]> => {
  const { data } = await api.get<Product[]>(`products`, {
    params: { restaurantId, categoryId, search },
  });
  return data;
};

export interface UpdateProductPayload {
  name?: string;
  description?: string;
  price?: number;
  available?: boolean;
  categoryId?: string;
  image?: string;
}

export const updateProduct = async (
  id: string,
  restaurantId: string,
  payload: UpdateProductPayload
): Promise<Product> => {
  const { data } = await api.patch<Product>(`products/${id}`, payload, {
    params: { restaurantId },
  });
  return data;
};

export const deleteProduct = async (
  id: string,
  restaurantId: string
): Promise<{ message: string }> => {
  const { data } = await api.delete<{ message: string }>(`products/${id}`, {
    params: { restaurantId },
  });
  return data;
};
