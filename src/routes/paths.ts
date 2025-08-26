export const ROUTES = {
  TABLES: {
    LIST: "/tables",
    DETAIL: (id: number | string) => `/tables/${id}`,
  },
  ORDERS: {
    LIST: "/orders",
    DETAIL: (id: number | string) => `/orders/${id}`,
  },
  PRODUCTS: {
    LIST: "/products",
    DETAIL: (id: number | string) => `/products/${id}`,
  },
  LOGIN: "/login",
  SIGNUP: "/signup",
};
