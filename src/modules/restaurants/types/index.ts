export type TypeRestaurant = "restaurant" | "coffee" | "bar";

export interface DataNewRestaurant {
  name: string;
  phone?: string;
  type_restaurant: TypeRestaurant;
  address?: string;
  city?: string;
  postal_code?: string;
  logo_url?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  phone: string;
  type_restaurant: TypeRestaurant;
  address: string;
  city: string;
  postal_code: string;
  logo_url: string;
  tables_in_use: number;
  role: string;
  total_tables: number;
  daily_sales: number;
  my_orders?: number;
  active_staff?: number;
  status: "open" | "closed";
}

export interface DashboardStats {
  sales: {
    total: number;
    yesterdayTotal: number;
    percentageComparation: number;
  };
  activeOrders: number;
  staff: {
    active: number;
    total: number;
    percentageOnline: number;
  };
  operationalPeriod: {
    start: string;
    end: string;
  };
}
