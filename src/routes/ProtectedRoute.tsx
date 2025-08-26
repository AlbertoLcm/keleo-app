import { useAuth } from "@/modules/auth/hooks/useAuth";
import type { JSX } from "react";
import { Navigate, useLocation } from "react-router";
import { ROUTES } from "./paths";
import { LoadingScreen } from "@/modules/shared";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isLoggedIn) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
