import { useAuth } from "@/modules/auth/hooks/useAuth";
import type { JSX } from "react";
import { Navigate, useLocation } from "react-router";
import { ROUTES } from "./paths";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
