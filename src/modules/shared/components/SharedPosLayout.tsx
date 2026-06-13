import { FilterTabs } from "@/modules/shared";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { LazyMotion, domAnimation } from "framer-motion";
import { getCategories, getProducts } from "@/modules/menu/services/menu.service";
import type { Category, Product } from "@/modules/menu/models/menu.model";
import { useLocalCart } from "@/modules/tables/hooks/useLocalCart";
import ProductGrid from "@/modules/tables/components/ProductGrid";
import MobileCartBar from "@/modules/tables/components/MobileCartBar";
import TicketSidebar from "@/modules/tables/components/TicketSidebar";
import CheckoutModal from "@/modules/tables/components/CheckoutModal";
import PreCuentaModal from "@/modules/tables/components/PreCuentaModal";

interface SharedPosLayoutProps {
  accountId?: string;
  accountName?: string;
  status?: string;
  ordersDetails?: any[];
  restaurantId?: string;
  onRefresh: () => Promise<void>;
  onRequestPayment: () => Promise<void>;
  onCheckout: (paymentMethod: string) => Promise<void>;
}

export const SharedPosLayout = ({
  accountId,
  accountName,
  status,
  ordersDetails,
  restaurantId,
  onRefresh,
  onRequestPayment,
  onCheckout,
}: SharedPosLayoutProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const categoryFiltered = searchParams.get("category") || undefined;
  const searchFiltered = searchParams.get("q") || undefined;
  const [products, setProducts] = useState<Product[]>([]);

  const [isTicketPanelOpen, setIsTicketPanelOpen] = useState<boolean>(true);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPreCuentaOpen, setIsPreCuentaOpen] = useState(false);

  const cart = useLocalCart(accountId);

  const handleRequestPayment = async () => {
    if (!accountId) return;
    await onRequestPayment();
    setIsPreCuentaOpen(false);
    await onRefresh();
  };

  const handleSendToKitchen = async () => {
    await cart.sendToKitchen();
    await onRefresh();
  };

  const handleCheckout = async (paymentMethod: string) => {
    if (!accountId) return;
    await onCheckout(paymentMethod);
    cart.clearCart();
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
      console.log(data)
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
    fetchCategories();
  }, [fetchCategories]);

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
              contentBefore={<div className="w-3 md:w-4 shrink-0" aria-hidden="true"></div>}
              contentAfter={<div className="w-3 md:w-4 shrink-0" aria-hidden="true"></div>}
            />
          </div>

          <ProductGrid
            products={products}
            isLoading={isLoadingProducts}
            onAddToCart={cart.addItem}
            isLocked={status === "payment"}
          />

          <div className="h-20 lg:hidden"></div>
        </div>

        <MobileCartBar
          onOpenTicket={() => setIsTicketPanelOpen(true)}
          itemsCount={cart.itemsCount + (ordersDetails?.length || 0)}
          total={cart.total + (ordersDetails?.reduce((acc, i) => acc + (Number(i.applied_unit_price) * i.quantity), 0) || 0)}
        />

        <TicketSidebar
          isOpen={isTicketPanelOpen}
          onClose={() => setIsTicketPanelOpen(false)}
          isLocked={status === "payment"}
          onPreCuenta={() => setIsPreCuentaOpen(true)}
          items={cart.items}
          sentItems={ordersDetails}
          total={cart.total}
          totalSent={ordersDetails?.reduce((acc, i) => acc + (Number(i.applied_unit_price) * i.quantity), 0) || 0}
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
          orders={ordersDetails ?? []}
          tableName={accountName}
        />

        <PreCuentaModal
          isOpen={isPreCuentaOpen}
          onClose={() => setIsPreCuentaOpen(false)}
          onConfirm={handleRequestPayment}
          orders={ordersDetails ?? []}
          tableName={accountName}
          isLocked={status === "payment"}
        />
      </section>
    </LazyMotion>
  );
};
