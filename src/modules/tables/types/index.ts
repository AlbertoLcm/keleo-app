import type { UUID } from "crypto";

export interface Platillo {
  id: UUID;
  name: string;
  quantity: number;
  priceUnitary: number;
}

export interface InfoMesa {
  id: UUID;
  status: string | "Disponible" | "Ocupada" | "Reservada";
  capacity: number;
  name: string;
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
  name: string,
  capacity: number,
}