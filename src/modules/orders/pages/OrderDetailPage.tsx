import { useHeaderAction } from "@/modules/shared";
import { ROUTES } from "@/routes/paths";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

import { useOrderDetail } from "../hooks/useOrderDetail";
import { closeOrder, requestPayment, cancelOrder } from "../services/orders.service";
import { SharedPosHeader } from "@/modules/shared/components/SharedPosHeader";
import { SharedPosLayout } from "@/modules/shared/components/SharedPosLayout";

const OrderDetailPage = () => {
  const navigate = useNavigate();
  const { updateActionHeader } = useHeaderAction();
  const { restaurantId, orderId } = useParams();

  const { orderInfo, fetchOrderInfo } = useOrderDetail(orderId);

  const handleCheckout = async (paymentMethod: string) => {
    if (!orderId) return;
    await closeOrder(orderId, paymentMethod);
    const targetRoute = `${ROUTES.RESTAURANTS.PANEL(restaurantId || "")}/${ROUTES.ORDERS.INDEX}`;
    navigate(targetRoute);
  };

  const handleCancel = async () => {
    if (!orderId) return;
    await cancelOrder(orderId);
    const targetRoute = `${ROUTES.RESTAURANTS.PANEL(restaurantId || "")}/${ROUTES.ORDERS.INDEX}`;
    navigate(targetRoute);
  };

  useEffect(() => {
    updateActionHeader(
      <SharedPosHeader
        title={orderInfo?.order_alias || "Detalle de Orden"}
        status={orderInfo?.status || "free"}
        backUrl={`${ROUTES.RESTAURANTS.PANEL(restaurantId || "")}/${ROUTES.ORDERS.INDEX}`}
        onCancel={handleCancel}
      />
    );
    return () => updateActionHeader(null);
  }, [orderId, orderInfo?.order_alias, orderInfo?.status, updateActionHeader, restaurantId]);

  useEffect(() => {
    fetchOrderInfo();
  }, [fetchOrderInfo]);

  return (
    <SharedPosLayout
      accountId={orderId}
      accountName={orderInfo?.order_alias || ""}
      status={orderInfo?.status}
      ordersDetails={orderInfo?.orders_details}
      restaurantId={restaurantId}
      onRefresh={fetchOrderInfo}
      onRequestPayment={() => requestPayment(orderId!)}
      onCheckout={handleCheckout}
    />
  );
};

export default OrderDetailPage;
