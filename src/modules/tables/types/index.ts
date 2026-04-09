export type mesa_status = "free" | "occupied" | "payment" | "reserved";
export type payment_method =
  | "cash"
  | "credit_card"
  | "debit_card"
  | "bank_transfer"
  | "complimentary"
  | "other";

export interface Platillo {
  id: string;
  name: string;
  quantity: number;
  priceUnitary: number;
}

export interface ItemMenu {
  name: string;
  price: number;
}

export interface CategoriaMenu {
  categoria: string;
  items: ItemMenu[];
}

export interface NewTable {
  name: string;
  capacity: number;
}

export interface Zone {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface FormDataType {
  name: string;
  capacity: number;
  zoneId: string;
  shape: string;
}

export type order_status = "pending" | "in_preparation" | "ready" | "served" | "cancelled";

export interface OrderDetail {
  id: string;
  account_id: string;
  product_id: string;
  quantity: number;
  applied_unit_price: number;
  notas: string | null;
  status: order_status;
  products: {
    name: string;
    price: number;
    image: string | null;
  };
}

export type account_status = "open" | "payment" | "closed" | "cancelled";

export interface Table {
  account_id: string;
  capacity: number;
  mesero_principal: string;
  name: string;
  order_alias: string;
  payment_method: payment_method;
  reservation_name: string;
  reservation_people: number;
  restaurant_id: string;
  status: mesa_status;
  account_status?: account_status;
  table_id: string;
  time_active_minutes: number;
  time_until_reservation: string;
  total_amount: number;
  zone: string;
  zone_id: string;
  orders_details?: OrderDetail[];
}

export interface Product {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  description: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  notas?: string;
}
