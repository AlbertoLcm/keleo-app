import type { UUID } from "crypto";

export const ROUTES = {
  LOGIN: "/login",
  SIGNUP: "/signup",

  RESTAURANTS: { 
    LIST: "/restaurants",
    DETAIL: (id_restaurante: UUID | string = ":id_restaurante") => `/restaurants/${id_restaurante}`,
    NEW: "/restaurants/new"
  },
  // Estas rutas ya no empiezan con "/"
  DASHBOARD: { INDEX: "dashboard" },
  EMPLOYEES: { LIST: "employees" },
  MENU: { INDEX: "menu" },
  TABLES: {
    LIST: "tables",
    DETAIL: (id: UUID | string = ":id_table") => `tables/${id}`,
    NEW: "new"
  },
  CONFIG: "config",
};
