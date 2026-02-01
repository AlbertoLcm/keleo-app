import {
  Container,
  StatusBadge,
  useHeaderAction,
  useLockBodyScroll,
} from "@/modules/shared";
import { ROUTES } from "@/routes/paths";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  CircleCheck,
  Minus,
  Pencil,
  Plus,
  Receipt,
  Search,
  Send,
  Star,
  X,
} from "lucide-react";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import type { Table, Product } from "../types";
import CardProduct from "../components/CardProduct";
import api from "@/api/axios";
import GridCardsProducts from "../components/GridCardsProducts";
import {
  motion,
  AnimatePresence,
  LazyMotion,
  domAnimation,
} from "framer-motion";

const listProducts = [
  {
    id: "1",
    imageUrl: "",
    name: "Keleo Burger",
    price: 0,
    description: "Doble carne premium, queso cheddar, cebolla caramelizda",
  },
  {
    id: "2",
    imageUrl: "",
    name: "Keleo Burger",
    price: 0,
    description: "Doble carne premium, queso cheddar, cebolla caramelizda",
  },
  {
    id: "3",
    imageUrl: "",
    name: "Keleo Burger",
    price: 0,
    description: "Doble carne premium, queso cheddar, cebolla caramelizda",
  },
  {
    id: "4",
    imageUrl: "",
    name: "Keleo Burger",
    price: 0,
    description: "Doble carne premium, queso cheddar, cebolla caramelizda",
  },
  {
    id: "5",
    imageUrl: "",
    name: "Keleo Burger",
    price: 0,
    description: "Doble carne premium, queso cheddar, cebolla caramelizda",
  },
  {
    id: "2",
    imageUrl: "",
    name: "Keleo Burger",
    price: 0,
    description: "Doble carne premium, queso cheddar, cebolla caramelizda",
  },
  {
    id: "3",
    imageUrl: "",
    name: "Keleo Burger",
    price: 0,
    description: "Doble carne premium, queso cheddar, cebolla caramelizda",
  },
  {
    id: "4",
    imageUrl: "",
    name: "Keleo Burger",
    price: 0,
    description: "Doble carne premium, queso cheddar, cebolla caramelizda",
  },
  {
    id: "5",
    imageUrl: "",
    name: "Keleo Burger",
    price: 0,
    description: "Doble carne premium, queso cheddar, cebolla caramelizda",
  },
  {
    id: "2",
    imageUrl: "",
    name: "Keleo Burger",
    price: 0,
    description: "Doble carne premium, queso cheddar, cebolla caramelizda",
  },
  {
    id: "3",
    imageUrl: "",
    name: "Keleo Burger",
    price: 0,
    description: "Doble carne premium, queso cheddar, cebolla caramelizda",
  },
  {
    id: "4",
    imageUrl: "",
    name: "Keleo Burger",
    price: 0,
    description: "Doble carne premium, queso cheddar, cebolla caramelizda",
  },
  {
    id: "5",
    imageUrl: "",
    name: "Keleo Burger",
    price: 0,
    description: "Doble carne premium, queso cheddar, cebolla caramelizda",
  },
];

const TableDetailPage = () => {
  const refAsideBar = useRef<HTMLDivElement>(null);

  const [isTicketPanelOpen, setIsTicketPanelOpen] = useState<boolean>(true);

  const { updateActionHeader } = useHeaderAction();
  const { restaurantId, tableId } = useParams();
  const [uiState, setUiState] = useState({
    loadingInfoTable: false,
  });
  const [errors, setErrors] = useState<{ infoTable: string[] }>({
    infoTable: [],
  });

  const [tableInfo, setTableInfo] = useState<Table>();

  const fetchTableInfo = useCallback(async () => {
    setUiState((prev) => ({ ...prev, loadingInfoTable: true }));
    try {
      const response = await api.get(`/table/${tableId}`);
      setTableInfo(response.data);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        infoTable: ["No se pudo obtener el detalle de la mesa."],
      }));
    } finally {
      setUiState((prev) => ({ ...prev, loadingInfoTable: false }));
    }
  }, [tableId]);

  useEffect(() => {
    fetchTableInfo();
  }, [fetchTableInfo]);

  useEffect(() => {
    updateActionHeader(
      <section className="flex justify-between w-full items-center">
        <div className="flex items-center gap-4">
          <Link
            to={ROUTES.TABLES.INDEX}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300"
          >
            <ArrowLeft />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              {tableInfo?.name || "Cargando..."}{" "}
              <StatusBadge color="orange" text="Ocupada" />
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Capacidad para {tableInfo?.capacity} personas
            </p>
          </div>
        </div>

        <div className="hidden lg:block w-64 relative">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full pl-9 pr-4 py-2 bg-gray-100/50 dark:bg-black/20 border focus:bg-white dark:focus:bg-dark-card border-gray-200 dark:border-white/5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-keleo-500/50 transition-all text-gray-700 dark:text-gray-200"
          />
          <Search
            width={18}
            className="absolute left-3 top-2 text-gray-400 text-xs"
          />
        </div>
      </section>,
    );

    return () => updateActionHeader(null);
  }, [tableId, tableInfo]);

  // 2. OPTIMIZAR EL LISTENER DE RESIZE
  // Usar un listener más limpio para evitar re-renders innecesarios
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    // Set inicial
    setIsTicketPanelOpen(!mediaQuery.matches);

    const handleResize = (e: MediaQueryListEvent) => {
      setIsTicketPanelOpen(!e.matches);
    };

    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []); // Array vacío para que solo corra al montar

  const MemoizedProductGrid = memo(({ products }: { products: Product[] }) => (
    <GridCardsProducts>
      {products.map((product) => (
        <CardProduct
          key={product.id}
          name={product.name}
          description={product.description}
          price={product.price}
          productId={product.id}
          onClick={() => console.log(product.id)}
        />
      ))}
    </GridCardsProducts>
  ));

  return (
    <LazyMotion features={domAnimation}>
      <section className="flex overflow-hidden relative flex-1 -mt-20">
        {/* PRODUCT MENU (Full Width on Mobile) */}
        <div className="flex-1 flex flex-col w-full relative overflow-auto pt-20 no-scrollbar">
          {/* Category Tabs (Horizontal Scroll) */}
          <div className="px-4 flex items-center gap-1 z-10 glass-panel sticky top-0 min-h-16 overflow-x-auto no-scrollbar">
            <button className="flex gap-1 items-center px-4 py-2 bg-keleo-600 text-white rounded-full shadow-md shadow-keleo-500/30 text-sm font-bold whitespace-nowrap">
              <Star size={18} /> Top
            </button>
            <button className="flex-shrink-0 px-4 py-2 bg-white dark:bg-dark-card border border-gray-200 dark:border-white/5 text-gray-700 dark:text-gray-300 rounded-full text-sm font-bold whitespace-nowrap active:bg-gray-100 dark:active:bg-white/10 transition shadow-sm">
              Burgers
            </button>
            <button className="flex-shrink-0 px-4 py-2 bg-white dark:bg-dark-card border border-gray-200 dark:border-white/5 text-gray-700 dark:text-gray-300 rounded-full text-sm font-bold whitespace-nowrap active:bg-gray-100 dark:active:bg-white/10 transition shadow-sm">
              Pizzas
            </button>
            <button className="flex-shrink-0 px-4 py-2 bg-white dark:bg-dark-card border border-gray-200 dark:border-white/5 text-gray-700 dark:text-gray-300 rounded-full text-sm font-bold whitespace-nowrap active:bg-gray-100 dark:active:bg-white/10 transition shadow-sm">
              Tacos
            </button>
            <button className="flex-shrink-0 px-4 py-2 bg-white dark:bg-dark-card border border-gray-200 dark:border-white/5 text-gray-700 dark:text-gray-300 rounded-full text-sm font-bold whitespace-nowrap active:bg-gray-100 dark:active:bg-white/10 transition shadow-sm">
              Bebidas
            </button>
          </div>

          {/* Products Grid */}
          <Container className="max-w-[1168px]">
            <div className="flex-1 touch-pan-y">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-1">
                Recomendados
              </h3>

              <MemoizedProductGrid products={listProducts} />

              {/* Space for bottom bar on mobile */}
              <div className="h-20 lg:hidden"></div>
            </div>
          </Container>
        </div>

        {/* MOBILE BOTTOM CART BAR (Floating) */}
        <div
          id="bottom-cart-bar"
          className="glass-panel fixed bottom-4 left-4 right-4 z-40 lg:hidden rounded-2xl p-3 flex items-center justify-between cursor-pointer-transform duration-200 border border-white/20 shadow-2xl"
          onClick={() => setIsTicketPanelOpen(true)}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full flex items-center justify-center font-bold text-sm shadow-md">
              3
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                Ver Orden
              </span>
              <span className="text-base font-bold text-gray-900 dark:text-white font-mono">
                $446.60
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-keleo-600 dark:text-keleo-400 font-bold text-sm px-2">
            Ver detalle <ChevronUp size={18} />
          </div>
        </div>

        {/* TICKET PANEL (Overlay on Mobile, Sidebar on Desktop) */}
        <AnimatePresence>
          {isTicketPanelOpen && (
            <motion.aside
              key="ticket-panel"
              id="ticket-panel"
              ref={refAsideBar}
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "100%" }}
              transition={{
                type: "tween",
                ease: [0.25, 0.1, 0.25, 1], // Curva Bezier similar a iOS (snappy)
                duration: 0.3,
              }}
              style={{
                willChange: "transform", // CRÍTICO: Prepara la GPU
                backfaceVisibility: "hidden", // Evita parpadeos en algunos navegadores
              }}
              className="lg:mt-20 lg:ticket-visible fixed inset-0 lg:static lg:inset-auto z-50 w-full lg:w-96 flex flex-col lg:border-l lg:border-gray-200 lg:dark:border-white/5 glass-panel"
            >
              <div
                className="px-4 h-16 border-b border-gray-200 dark:border-white/5 flex justify-between items-center shadow-sm lg:shadow-none"
                onClick={() => setIsTicketPanelOpen(false)}
              >
                <h2 className="font-bold text-gray-800 dark:text-white text-lg flex items-center gap-2">
                  <Receipt className="text-keleo-500" /> Orden Actual
                </h2>
                <button className="lg:hidden w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-600 dark:text-gray-300">
                  <ChevronDown />
                </button>
                <button className="hidden lg:block text-xs text-keleo-600 dark:text-keleo-400 font-bold hover:underline">
                  Limpiar
                </button>
              </div>

              {/* Ticket Items List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50 dark:bg-black/10">
                {/* Item Sent */}
                <div className="flex flex-col p-3 rounded-xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 opacity-70">
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex gap-3">
                      <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-bold px-2 py-0.5 rounded h-fit">
                        2x
                      </span>
                      <div>
                        <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
                          Cerveza Nacional
                        </p>
                        <p className="text-xs text-green-600 dark:text-green-400 font-medium mt-0.5 flex items-center gap-1">
                          <CircleCheck size={18} />
                          Enviado
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                      $120
                    </span>
                  </div>
                </div>

                {/* Item New (Editable) */}
                <div className="flex flex-col p-3 rounded-xl bg-white dark:bg-dark-card border-l-4 border-keleo-500 shadow-sm relative group">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex gap-3">
                      {/* Stepper */}
                      <div className="flex flex-col items-center gap-1 bg-gray-100 dark:bg-white/5 rounded-lg p-0.5 shadow-inner">
                        <button className="w-7 h-7 flex items-center justify-center text-xs text-gray-500 hover:text-keleo-500 active:bg-gray-200 dark:active:bg-white/10 rounded">
                          <Plus size={18} />
                        </button>
                        <span className="text-sm font-bold text-gray-800 dark:text-white">
                          1
                        </span>
                        <button className="w-7 h-7 flex items-center justify-center text-xs text-gray-500 hover:text-red-500 active:bg-gray-200 dark:active:bg-white/10 rounded">
                          <Minus size={18} />
                        </button>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800 dark:text-white">
                          Keleo Burger
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          Término medio
                        </p>
                        <button className="text-[10px] text-blue-500 font-bold mt-2 px-2 py-1 bg-blue-50 dark:bg-blue-900/20 rounded hover:bg-blue-100 transition flex gap-1 items-center">
                          <Pencil size={14} />
                          Editar nota
                        </button>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-gray-800 dark:text-white mr-5">
                      $180
                    </span>
                  </div>
                  <button className="absolute right-0 top-0 p-2 text-gray-500 hover:text-red-500 transition">
                    <X size={18} />
                  </button>
                </div>

                {/* Item New (Editable) */}
                <div className="flex flex-col p-3 rounded-xl bg-white dark:bg-dark-card border-l-4 border-keleo-500 shadow-sm relative group">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex gap-3">
                      {/* Stepper */}
                      <div className="flex flex-col items-center gap-1 bg-gray-100 dark:bg-white/5 rounded-lg p-0.5 shadow-inner">
                        <button className="w-7 h-7 flex items-center justify-center text-xs text-gray-500 hover:text-keleo-500 active:bg-gray-200 dark:active:bg-white/10 rounded">
                          <Plus size={18} />
                        </button>
                        <span className="text-sm font-bold text-gray-800 dark:text-white">
                          1
                        </span>
                        <button className="w-7 h-7 flex items-center justify-center text-xs text-gray-500 hover:text-red-500 active:bg-gray-200 dark:active:bg-white/10 rounded">
                          <Minus size={18} />
                        </button>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800 dark:text-white">
                          Keleo Burger
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          Término medio
                        </p>
                        <button className="text-[10px] text-blue-500 font-bold mt-2 px-2 py-1 bg-blue-50 dark:bg-blue-900/20 rounded hover:bg-blue-100 transition flex gap-1 items-center">
                          <Pencil size={14} />
                          Editar nota
                        </button>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-gray-800 dark:text-white mr-5">
                      $180
                    </span>
                  </div>
                  <button className="absolute right-0 top-0 p-2 text-gray-500 hover:text-red-500 transition">
                    <X size={18} />
                  </button>
                </div>

                <div className="h-20 lg:hidden"></div>
              </div>

              {/* Footer Summary (Fixed at bottom of ticket panel) */}
              <div className="p-4 bg-white dark:bg-dark-card border-t border-gray-200 dark:border-white/5 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-20">
                <div className="space-y-1 mb-3">
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span>$385.00</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Impuestos</span>
                    <span>$61.60</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-100 dark:border-white/5 mt-1">
                    <span>Total</span>
                    <span className="text-keleo-600 dark:text-keleo-400">
                      $446.60
                    </span>
                  </div>
                </div>

                <button className="w-full py-3.5 bg-keleo-600 hover:bg-keleo-700 text-white rounded-xl shadow-lg shadow-keleo-500/30 font-bold text-base transition transform active:scale-[0.98] flex items-center justify-center gap-2 mb-2">
                  <Send />
                  Enviar a Cocina (2)
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button className="py-3 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white rounded-xl font-bold text-sm">
                    Pre-cuenta
                  </button>
                  <button className="py-3 bg-blue-500 text-white rounded-xl font-bold text-sm shadow-md shadow-blue-500/20">
                    Cobrar
                  </button>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </section>
    </LazyMotion>
  );
};

export default TableDetailPage;
