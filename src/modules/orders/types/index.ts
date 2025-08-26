export interface OrderDetailItem {
  id: string;
  account_id: string;
  product_id: string;
  mesero_id: string;
  quantity: number;
  applied_unit_price: string;
  notas: string | null;
  created_at: string;
  status: "pending" | "preparing" | "ready" | "delivered" | "cancelled";
  products: {
    name: string;
    price: string;
    image: string | null;
  };
}

export interface DirectOrder {
  id: string;
  table_id: string | null;
  user_id: string;
  type: "dine_in" | "takeout" | "delivery";
  order_alias: string | null;
  payment_method: string | null;
  opened_at: string;
  status: "open" | "payment" | "closed" | "cancelled";
  total_final: string;
  restaurant_id: string;
  orders_details?: OrderDetailItem[];
  users?: {
    name: string;
    email: string;
  };
}
