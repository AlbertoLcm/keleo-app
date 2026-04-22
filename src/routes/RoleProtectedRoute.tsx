import { useRestaurantRole } from "@/modules/restaurants";
import { Navigate } from "react-router";
import { type ReactNode } from "react";
import { LoadingScreen } from "@/modules/shared";

interface RoleProtectedRouteProps {
  children: ReactNode;
  allowedRoles: string[];
}

export const RoleProtectedRoute = ({ children, allowedRoles }: RoleProtectedRouteProps) => {
  const { role, isLoading } = useRestaurantRole();

  if (isLoading) return <LoadingScreen />;

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="../" replace />;
  }

  return <>{children}</>;
};
