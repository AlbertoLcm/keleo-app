import { useHeaderAction } from "@/modules/shared";
import { ROUTES } from "@/routes/paths";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

import { useTableDetail } from "../hooks/useTableDetail";
import { closeAccount, requestPayment, cancelAccount, reopenAccount } from "../services/accounts.service";
import { SharedPosHeader } from "@/modules/shared/components/SharedPosHeader";
import { SharedPosLayout } from "@/modules/shared/components/SharedPosLayout";

const TableDetailPage = () => {
  const navigate = useNavigate();
  const { updateActionHeader } = useHeaderAction();
  const { restaurantId, tableId } = useParams();

  const { tableInfo, fetchTableInfo } = useTableDetail(tableId);

  const handleCheckout = async (paymentMethod: string) => {
    if (!tableInfo?.account_id) return;
    await closeAccount(tableInfo.account_id, paymentMethod);
    const targetRoute = `${ROUTES.RESTAURANTS.PANEL(restaurantId || "")}/${ROUTES.TABLES.INDEX}`;
    navigate(targetRoute);
  };

  const handleReopen = async () => {
    if (!tableInfo?.account_id) return;
    await reopenAccount(tableInfo.account_id);
    await fetchTableInfo();
  };

  const handleCancel = async () => {
    if (!tableInfo?.account_id) return;
    await cancelAccount(tableInfo.account_id);
    const targetRoute = `${ROUTES.RESTAURANTS.PANEL(restaurantId || "")}/${ROUTES.TABLES.INDEX}`;
    navigate(targetRoute);
  };

  useEffect(() => {
    updateActionHeader(
      <SharedPosHeader 
        title={tableInfo?.name || "Cargando..."} 
        subtitle={tableInfo?.capacity ? `Capacidad para ${tableInfo.capacity} personas` : undefined}
        status={tableInfo?.status || "free"}
        backUrl={`${ROUTES.RESTAURANTS.PANEL(restaurantId || "")}/${ROUTES.TABLES.INDEX}`}
        onReopen={handleReopen}
        onCancel={handleCancel}
      />
    );
    return () => updateActionHeader(null);
  }, [tableId, tableInfo?.name, tableInfo?.capacity, tableInfo?.status, tableInfo?.account_id, updateActionHeader, restaurantId]);

  useEffect(() => {
    fetchTableInfo();
  }, [fetchTableInfo]);

  return (
    <SharedPosLayout 
      accountId={tableInfo?.account_id}
      accountName={tableInfo?.name}
      status={tableInfo?.status}
      ordersDetails={tableInfo?.orders_details}
      restaurantId={restaurantId}
      onRefresh={fetchTableInfo}
      onRequestPayment={() => requestPayment(tableInfo?.account_id!)}
      onCheckout={handleCheckout}
    />
  );
};

export default TableDetailPage;
