import api from "@/api/axios";

export interface OrderProduct {
  name: string;
  image?: string | null;
}

export interface UserShort {
  name: string;
}

export interface KitchenOrderItem {
  id: string;
  account_id: string;
  product_id: string;
  mesero_id: string;
  quantity: number;
  applied_unit_price: string;
  notas: string | null;
  status: "pending" | "preparing" | "ready";
  created_at: string;
  updated_at: string;
  products: OrderProduct;
  users: UserShort;
}

export interface KitchenActiveAccount {
  id: string;
  table_id: string | null;
  user_id: string;
  restaurant_id: string;
  type: string;
  order_alias: string | null;
  status: string;
  opened_at: string;
  tables: {
    name: string;
    zone_id: string | null;
  } | null;
  orders_details: KitchenOrderItem[];
}

export const getKitchenActiveOrders = async (
  restaurantId: string
): Promise<KitchenActiveAccount[]> => {
  const { data } = await api.get<KitchenActiveAccount[]>(
    `/kitchen/${restaurantId}/active-orders`
  );
  return data;
};

export const updateKitchenOrderStatus = async ({
  restaurantId,
  orderId,
  status,
}: {
  restaurantId: string;
  orderId: string;
  status: "preparing" | "ready";
}) => {
  const { data } = await api.patch(
    `/kitchen/orders/${orderId}/status?restaurantId=${restaurantId}`,
    { status }
  );
  return data;
};
