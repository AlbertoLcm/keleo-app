export const ROUTES = {
  INDEX: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  AUTH_SUCCESS: "/auth/success",
  RESTAURANTS: { 
    INDEX: "/restaurants",
    PANEL: (restaurantId: string | string = ":restaurantId") => `/restaurants/${restaurantId}`,
    NEW: "/restaurants/new"
  },
  // Estas rutas ya no empiezan con "/"
  DASHBOARD: { INDEX: "dashboard" },
  EMPLOYEES: { INDEX: "employees" },
  MENU: { INDEX: "menu" },
  KITCHEN: { INDEX: 'kitchen' },
  ORDERS: { INDEX: 'orders' },
  TABLES: {
    INDEX: "tables",
    DETAIL: (id: string | string = ":tableId") => `${id}`,
  },
  SETTINGS: { INDEX: "config" },
  VERIFY: "/verify",
  FORGOT_PASSWORD: "/forgot-password",
  PROFILE: "/profile",
  SUBSCRIPTION: "/subscription",
  GLOBAL_SETTINGS: "/settings",
};
