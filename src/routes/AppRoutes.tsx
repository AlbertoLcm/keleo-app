import { Routes, Route, Navigate } from "react-router";
import { ROUTES } from "./paths";

import { TableDetailPage, TablesPage } from "../modules/tables";
import { LoginPage, SignupPage, VerifyEmail } from "@/modules/auth";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import { HeaderActionProvider, LayoutSidebar } from "@/modules/shared";
import { NewRestaurantPage, RestaurantsPage } from "@/modules/restaurants";
import { HomeDashboard } from "@/modules/dashboard";
import { OrdersPage } from "@/modules/orders";
import EmployeesPage from "@/modules/employees/pages/EmployeesPage";
import { MenuPage } from "@/modules/menu";
import { SettingsPage } from "@/modules/settings";
import ScrollToTop from "@/modules/shared/components/ScrollTop";

export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />
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
        <Route path={ROUTES.VERIFY} element={<VerifyEmail />} />

        <Route
          path={ROUTES.RESTAURANTS.INDEX}
          element={
            <ProtectedRoute>
              <RestaurantsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.RESTAURANTS.NEW}
          element={
            <ProtectedRoute>
              <NewRestaurantPage />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.RESTAURANTS.PANEL(":restaurantId")}
          element={
            <ProtectedRoute>
              <HeaderActionProvider>
                <LayoutSidebar />
              </HeaderActionProvider>
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<Navigate to={ROUTES.DASHBOARD.INDEX} replace />}
          />
          <Route path={ROUTES.DASHBOARD.INDEX} element={<HomeDashboard />} />
          <Route path={ROUTES.ORDERS.INDEX} element={<OrdersPage />} />
          <Route path={ROUTES.EMPLOYEES.INDEX} element={<EmployeesPage />} />
          <Route path={ROUTES.MENU.INDEX} element={<MenuPage />} />
          <Route path={ROUTES.SETTINGS.INDEX} element={<SettingsPage />} />
          <Route path={ROUTES.TABLES.INDEX}>
            <Route index element={<TablesPage />} />
            <Route path=":tableId" element={<TableDetailPage />} />
          </Route>
        </Route>

        <Route path="*" element={<div>Página no encontrada</div>} />
        <Route
          path="/"
          element={<Navigate to={ROUTES.RESTAURANTS.INDEX} replace />}
        />
      </Routes>
    </>
  );
}
