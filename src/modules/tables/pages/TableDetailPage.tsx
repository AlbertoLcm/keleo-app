import { FilterTabs, useHeaderAction } from "@/modules/shared";

import { ROUTES } from "@/routes/paths";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { LazyMotion, domAnimation } from "framer-motion";
import {
  getCategories,
  getProducts,
} from "@/modules/menu/services/menu.service";
import type { Category, Product } from "@/modules/menu/models/menu.model";

import { useTableDetail } from "../hooks/useTableDetail";
import { useLocalCart } from "../hooks/useLocalCart";
import ProductGrid from "../components/ProductGrid";
import MobileCartBar from "../components/MobileCartBar";
import TicketSidebar from "../components/TicketSidebar";
import CheckoutModal from "../components/CheckoutModal";
import PreCuentaModal from "../components/PreCuentaModal";
import ContentHeaderDetailPage from "../components/ContentHeaderDetailPage";
import { closeAccount, requestPayment } from "../services/accounts.service";

const TableDetailPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const categoryFiltered = searchParams.get("category") || undefined;
  const searchFiltered = searchParams.get("q") || undefined;
  const [products, setProducts] = useState<Product[]>([]);

  const [isTicketPanelOpen, setIsTicketPanelOpen] = useState<boolean>(true);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPreCuentaOpen, setIsPreCuentaOpen] = useState(false);

  const { updateActionHeader } = useHeaderAction();
  const { restaurantId, tableId } = useParams();

  const { tableInfo, fetchTableInfo } = useTableDetail(tableId);
  const cart = useLocalCart(tableInfo?.account_id);

  const handleRequestPayment = async () => {
    if (!tableInfo?.account_id) return;
    await requestPayment(tableInfo.account_id);
    setIsPreCuentaOpen(false);
    await fetchTableInfo();
  };

  const handleSendToKitchen = async () => {
    await cart.sendToKitchen();
    await fetchTableInfo();
  };

  const handleCheckout = async (paymentMethod: string) => {
    if (!tableInfo?.account_id) return;
    await closeAccount(tableInfo.account_id, paymentMethod);
    cart.clearCart();
    const targetRoute = `${ROUTES.RESTAURANTS.PANEL(restaurantId || "")}/${ROUTES.TABLES.INDEX}`;
    navigate(targetRoute);
  };

  const fetchCategories = useCallback(async () => {
    if (!restaurantId) return;
    try {
      const data = await getCategories(restaurantId);
      setCategories(data);
    } catch (error) {
      console.error("Error al cargar categorías", error);
    }
  }, [restaurantId]);

  const loadProducts = async (id: string, catId?: string, search?: string) => {
    setIsLoadingProducts(true);
    try {
      const data = await getProducts(id, catId, search);
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  useEffect(() => {
    if (restaurantId) {
      loadProducts(restaurantId, categoryFiltered, searchFiltered);
    }
  }, [restaurantId, categoryFiltered, searchFiltered]);

  useEffect(() => {
    fetchTableInfo();
  }, [fetchTableInfo]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    updateActionHeader(<ContentHeaderDetailPage />);

    return () => updateActionHeader(null);
  }, [tableId, updateActionHeader]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    setIsTicketPanelOpen(!mediaQuery.matches);

    const handleResize = (e: MediaQueryListEvent) => {
      setIsTicketPanelOpen(!e.matches);
    };

    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === "all") {
      searchParams.delete("category");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: categoryId });
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <section className="flex-1 flex relative -m-4 md:-m-6 w-[calc(100%+2rem)] md:w-[calc(100%+3rem)] h-[calc(100%+2rem)] md:h-[calc(100%+3rem)]">
        <div className="flex-1 overflow-y-auto touch-pan-y p-4 md:p-6">
          <div className="-mx-4 md:-mx-6">
            <FilterTabs
              options={[
                { id: "all", label: "Todos" },
                ...categories.map((category) => ({
                  id: category.id,
                  label: category.name,
                })),
              ]}
              className="mb-4 md:mb-6"
              activeId={categoryFiltered || "all"}
              onChange={(id) => handleCategoryClick(id || "all")}
              contentBefore={
                <div className="w-3 md:w-4 shrink-0" aria-hidden="true"></div>
              }
              contentAfter={
                <div className="w-3 md:w-4 shrink-0" aria-hidden="true"></div>
              }
            />
          </div>

          <ProductGrid 
            products={products} 
            isLoading={isLoadingProducts} 
            onAddToCart={cart.addItem} 
            isLocked={tableInfo?.status === "payment"} 
          />

          <div className="h-20 lg:hidden"></div>
        </div>

        <MobileCartBar
          onOpenTicket={() => setIsTicketPanelOpen(true)}
          itemsCount={cart.itemsCount + (tableInfo?.orders_details?.length || 0)}
          total={cart.total + (tableInfo?.orders_details?.reduce((acc, i) => acc + (i.applied_unit_price * i.quantity), 0) || 0)}
        />

        <TicketSidebar
          isOpen={isTicketPanelOpen}
          onClose={() => setIsTicketPanelOpen(false)}
          isLocked={tableInfo?.status === "payment"}
          onPreCuenta={() => setIsPreCuentaOpen(true)}
          items={cart.items}
          sentItems={tableInfo?.orders_details}
          total={cart.total}
          totalSent={tableInfo?.orders_details?.reduce((acc, i) => acc + (i.applied_unit_price * i.quantity), 0) || 0}
          isSending={cart.isSending}
          onIncrease={(id) => cart.updateQuantity(id, 1)}
          onDecrease={(id) => cart.updateQuantity(id, -1)}
          onRemove={cart.removeItem}
          onAddNote={cart.updateNote}
          onClear={cart.clearCart}
          onSendToKitchen={handleSendToKitchen}
          onCheckout={() => setIsCheckoutOpen(true)}
        />

        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          onConfirm={handleCheckout}
          orders={tableInfo?.orders_details ?? []}
          tableName={tableInfo?.name ?? undefined}
        />

        <PreCuentaModal
          isOpen={isPreCuentaOpen}
          onClose={() => setIsPreCuentaOpen(false)}
          onConfirm={handleRequestPayment}
          orders={tableInfo?.orders_details ?? []}
          tableName={tableInfo?.name ?? undefined}
        />
      </section>
    </LazyMotion>
  );
};

export default TableDetailPage;
