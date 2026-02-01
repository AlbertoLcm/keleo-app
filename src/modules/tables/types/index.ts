import type { UUID } from "crypto";

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

export interface FormDataType {
  name: string;
  capacity: number;
  zoneId: string;
  shape: string;
}

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
  table_id: string;
  time_active_minutes: number;
  time_until_reservation: string;
  total_amount: number;
  zone: string;
  zone_id: string;
}

export interface Product {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  description: string;
}
