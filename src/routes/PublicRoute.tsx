import { useAuth } from "@/modules/auth/hooks/useAuth";
import type { JSX } from "react";
import { Navigate, useLocation } from "react-router";
import { ROUTES } from "./paths";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (isLoggedIn) {
    // Si el usuario ya está logueado, redirige a la ruta principal
    // o a la que haya guardado en el state
    const from = location.state?.from?.pathname || ROUTES.TABLES.LIST;
    return <Navigate to={from} replace />;
  }

  // Si no está logueado, deja renderizar el componente público (login/register)
  return children;
};

export default PublicRoute;
