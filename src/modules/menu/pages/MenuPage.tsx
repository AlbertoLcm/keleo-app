import { useParams } from "react-router";
import { getCategories, getProducts } from "../services/menu.service";
import type { Category, Product } from "../models/menu.model";
import { CardEmptyAdded, useHeaderAction, FilterTabs, MetricCard } from "@/modules/shared";
import { Layers, Plus, X, Utensils, Star, Ban } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { NewProductForm, MenuProductCard } from "../components";
import { useEffect, useMemo, useState } from "react";

const MenuPage = () => {
  const { updateActionHeader } = useHeaderAction();

  const { restaurantId } = useParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const closeDrawer = () => setIsDrawerOpen(false);

  useEffect(() => {
    if (restaurantId) {
      loadCategories(restaurantId);
    }
  }, [restaurantId]);

  useEffect(() => {
    if (restaurantId) {
      loadProducts(restaurantId, selectedCategoryId || undefined);
    }
  }, [restaurantId, selectedCategoryId]);

  const loadCategories = async (id: string) => {
    try {
      const data = await getCategories(id);
      setCategories(data);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const loadProducts = async (id: string, catId?: string) => {
    setIsLoading(true);
    try {
      const data = await getProducts(id, catId);
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const headerContent = useMemo(
    () => (
      <section className="flex justify-between w-full items-center">
        <div className="flex flex-col">
          <h1 className="text-base md:text-xl font-bold text-gray-900 dark:text-white">
            Menú Digital
          </h1>
          <p className="hidden md:block text-xs text-gray-500 dark:text-gray-400">
            Administra tus productos, precios y disponibilidad
          </p>
        </div>

        <div className="flex">
          <button className="flex mr-2 items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-white/5 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-white/10 transition">
            <Layers size={16} />
            <span className="hidden sm:inline">Categorías</span>
          </button>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-keleo-600 hover:bg-keleo-700 text-white rounded-xl shadow-lg shadow-keleo-500/20 transition text-sm font-bold"
          >
            <Plus size={20} />
            <span className="hidden sm:inline">Nuevo Platillo</span>
          </button>
        </div>
      </section>
    ),
    [setIsDrawerOpen],
  );

  useEffect(() => {
    updateActionHeader(headerContent);
    return () => updateActionHeader(null);
  }, [headerContent, updateActionHeader]);

  return (
    <>
      <FilterTabs
        options={[
          { id: null, label: "Todos" },
          ...categories.map(c => ({ id: c.id, label: c.name || "Sin nombre" }))
        ]}
        activeId={selectedCategoryId}
        onChange={setSelectedCategoryId}
        className="-mx-4 md:-mx-6 w-full md:w-auto pb-2 md:pb-0 mb-4"
        contentBefore={<div className="w-3 md:w-4 shrink-0" aria-hidden="true"></div>}
      />

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-keleo-600"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <MetricCard
              className="bg-white dark:bg-dark-bg"
              title="Total Platillos"
              value={products.length}
              icon={<Utensils />}
              color="blue"
            />
            <MetricCard
              className="bg-white dark:bg-dark-bg"
              title="Más Vendido"
              value="N/A"
              icon={<Star />}
              color="green"
              valueClassName="text-lg text-gray-800 dark:text-white truncate max-w-[120px]"
            />
            <MetricCard
              className="bg-white dark:bg-dark-bg"
              title="Agotados"
              value={products.filter((p) => !p.available).length}
              icon={<Ban />}
              color="red"
              valueClassName="text-red-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => (
              <MenuProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description ?? undefined}
                price={product.price}
                image={product.image ?? undefined}
                available={product.available}
              />
            ))}

            <CardEmptyAdded
              onAction={() => setIsDrawerOpen(true)}
              title="Añadir Platillo"
              description="Registra un nuevo producto en el menú"
            />
          </div>
        </>
      )}

      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
              onClick={closeDrawer}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md shadow-2xl z-[101] flex flex-col border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
            >
              <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Agregar Producto</h2>
                  <p className="text-xs text-gray-500">
                    Configura los detalles del nuevo platillo
                  </p>
                </div>
                <button
                  onClick={closeDrawer}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                <NewProductForm
                  categories={categories}
                  onCategoryAdded={(newCat) =>
                    setCategories((prev) => [...prev, newCat])
                  }
                  onCancel={closeDrawer}
                  onUpdateProducts={() => {
                    if (restaurantId) {
                      loadProducts(
                        restaurantId,
                        selectedCategoryId || undefined,
                      );
                    }
                  }}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MenuPage;
