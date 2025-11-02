import { Routes, Route, Navigate } from "react-router";
import { ROUTES } from "./paths";

import { TablesPage, TableDetailPage, FormNewTable } from "../modules/tables";
import { LoginPage, SignupPage } from "@/modules/auth";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import { LayoutSidebar } from "@/shared";
import { NewRestaurantPage, RestaurantsPage } from "@/modules/restaurants";
import { HomeDashboard } from "@/modules/dashboard";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth */}
      <Route
        path={ROUTES.LOGIN}
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path={ROUTES.SIGNUP}
        element={
          <PublicRoute>
            <SignupPage />
          </PublicRoute>
        }
      />

      <Route path={ROUTES.RESTAURANTS.LIST} element={<ProtectedRoute><RestaurantsPage /></ProtectedRoute>}/>
      <Route path={ROUTES.RESTAURANTS.NEW} element={<ProtectedRoute><NewRestaurantPage /></ProtectedRoute>}/>

      <Route path={ROUTES.RESTAURANTS.DETAIL(":id_restaurante")} element={<ProtectedRoute><LayoutSidebar /></ProtectedRoute>}>
        <Route index element={<Navigate to={ROUTES.DASHBOARD.INDEX} replace />} />
        <Route path={ROUTES.DASHBOARD.INDEX} element={<HomeDashboard />} />
        <Route path={ROUTES.EMPLOYEES.LIST} element={<h1>Empleados</h1>} />
        <Route path={ROUTES.MENU.INDEX} element={<h1>Menú</h1>} />
        <Route path={ROUTES.CONFIG} element={<h1>Configuración</h1>} />
        <Route path={ROUTES.TABLES.LIST}>
          <Route index element={<TablesPage />} />
          <Route path=":id_table" element={<TableDetailPage />} />
          <Route path="new" element={<FormNewTable />} />
        </Route>
      </Route>

      <Route path="*" element={<div>Página no encontrada</div>} />
      <Route path="/" element={<Navigate to={ROUTES.RESTAURANTS.LIST} replace />} />
    </Routes>
  );
}
