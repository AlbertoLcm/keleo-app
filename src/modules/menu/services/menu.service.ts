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
