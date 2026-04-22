import { Routes, Route, Navigate } from "react-router";
import { ROUTES } from "./paths";

import { TableDetailPage, TablesPage } from "../modules/tables";
import { GoogleSuccess, LoginPage, SignupPage, VerifyEmail } from "@/modules/auth";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import { RoleProtectedRoute } from "./RoleProtectedRoute";
import { IndexRedirect } from "./IndexRedirect";
import { HeaderActionProvider, LayoutSidebar } from "@/modules/shared";
import { NewRestaurantPage, RestaurantsPage } from "@/modules/restaurants";
import { HomeDashboard } from "@/modules/dashboard";
import { KitchenPage } from "@/modules/kitchen";
import EmployeesPage from "@/modules/employees/pages/EmployeesPage";
import { MenuPage } from "@/modules/menu";
import { SettingsPage } from "@/modules/settings";
import ScrollToTop from "@/modules/shared/components/ScrollTop";
import { ProfilePage, SubscriptionPage, GlobalSettingsPage } from "@/modules/user";

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
          path={ROUTES.AUTH_SUCCESS}
          element={
            <PublicRoute>
              <GoogleSuccess />
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
          path={ROUTES.PROFILE}
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.SUBSCRIPTION}
          element={
            <ProtectedRoute>
              <SubscriptionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.GLOBAL_SETTINGS}
          element={
            <ProtectedRoute>
              <GlobalSettingsPage />
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
          <Route index element={<IndexRedirect />} />
          <Route
            path={ROUTES.DASHBOARD.INDEX}
            element={
              <RoleProtectedRoute allowedRoles={['owner', 'manager', 'admin']}>
                <HomeDashboard />
              </RoleProtectedRoute>
            }
          />
          <Route
            path={ROUTES.KITCHEN.INDEX}
            element={
              <RoleProtectedRoute allowedRoles={['owner', 'manager', 'kitchen', 'admin']}>
                <KitchenPage />
              </RoleProtectedRoute>
            }
          />
          <Route
            path={ROUTES.EMPLOYEES.INDEX}
            element={
              <RoleProtectedRoute allowedRoles={['owner', 'manager', 'admin']}>
                <EmployeesPage />
              </RoleProtectedRoute>
            }
          />
          <Route
            path={ROUTES.MENU.INDEX}
            element={
              <RoleProtectedRoute allowedRoles={['owner', 'manager', 'admin']}>
                <MenuPage />
              </RoleProtectedRoute>
            }
          />
          <Route
            path={ROUTES.SETTINGS.INDEX}
            element={
              <RoleProtectedRoute allowedRoles={['owner', 'admin']}>
                <SettingsPage />
              </RoleProtectedRoute>
            }
          />
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
