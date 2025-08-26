import { Routes, Route } from "react-router";
import { ROUTES } from "./paths";

import { LoginPage } from "../modules/auth"; 
import { TablesPage, TableDetailPage } from "../modules/tables";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth */}
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.SIGNUP} element={<LoginPage />} />
      
      {/* Mesas */}
      <Route path={ROUTES.TABLES.LIST} element={<TablesPage />} />
      <Route path={ROUTES.TABLES.DETAIL(":id")} element={<TableDetailPage />} />
    </Routes>
  );
}
