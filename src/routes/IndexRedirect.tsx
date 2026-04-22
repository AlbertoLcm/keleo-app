import { useRestaurantRole } from "@/modules/restaurants";
import { Navigate } from "react-router";
import { ROUTES } from "./paths";
import { LoadingScreen } from "@/modules/shared";

export const IndexRedirect = () => {
  const { role, isLoading } = useRestaurantRole();

  if (isLoading) return <LoadingScreen />;

  if (role === 'waiter') {
    return <Navigate to={ROUTES.TABLES.INDEX} replace />;
  }

  if (role === 'kitchen') {
    return <Navigate to={ROUTES.KITCHEN.INDEX} replace />;
  }

  return <Navigate to={ROUTES.DASHBOARD.INDEX} replace />;
};
