import type { UUID } from "crypto";

export interface DataNewRestaurant {
  name: string,
  address: string,
  phone: string,
  logo_url: string,
}

export interface Restaurant {
  id: UUID,
  name: string,
  address: string,
  phone: string,
  logo_url: string
}