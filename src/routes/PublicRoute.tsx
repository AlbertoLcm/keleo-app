import { useAuth } from "@/modules/auth/hooks/useAuth";
import type { JSX } from "react";
import { Navigate, useLocation } from "react-router";
import { ROUTES } from "./paths";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (isLoggedIn) {
    const from = location.state?.from?.pathname || ROUTES.RESTAURANTS.INDEX;
    return <Navigate to={from} replace />;
  }

  return children;
};

export default PublicRoute;
