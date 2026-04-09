import { StatusBadge, type StatusBadgeColor } from "@/modules/shared";
import { ROUTES } from "@/routes/paths";
import { ArrowLeft, Search, X, MoreVertical, Unlock, Trash2, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useParams, useSearchParams } from "react-router";
import { useTableDetail } from "../hooks/useTableDetail";
import { useEffect, useRef, useState } from "react";
import { reopenAccount, cancelAccount } from "../services/accounts.service";
import type { mesa_status } from "../types";
import { AnimatePresence, motion } from "framer-motion";

interface StatusConfig {
  label: string;
  color: StatusBadgeColor;
}

const statusConfig: Record<mesa_status, StatusConfig> = {
  free: {
    label: "Libre",
    color: "green",
  },
  occupied: {
    label: "Ocupada",
    color: "red",
  },
  payment: {
    label: "Por Pagar",
    color: "blue",
  },
  reserved: {
    label: "Reservada",
    color: "orange",
  },
};

const ContentHeaderDetailPage: React.FC = () => {
  const { tableId } = useParams();
  const { tableInfo, fetchTableInfo } = useTableDetail(tableId);

  const config = statusConfig[tableInfo?.status ?? "free"];

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get("q") || "");
  const [searchMobileActive, setSearchMobileActive] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { restaurantId } = useParams();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setConfirmCancel(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchValue(val);

    const newParams = new URLSearchParams(searchParams);
    if (val.trim() === "") {
      newParams.delete("q");
    } else {
      newParams.set("q", val);
    }
    setSearchParams(newParams, { replace: true });
  };

  const handleCloseMobileSearch = () => {
    setSearchMobileActive(false);
    setSearchValue("");
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("q");
    setSearchParams(newParams, { replace: true });
  };

  const handleClearInput = () => {
    setSearchValue("");
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("q");
    setSearchParams(newParams, { replace: true });
    inputRef.current?.focus();
  };

  const handleReopen = async () => {
    if (!tableInfo?.account_id) return;
    setIsProcessing(true);
    try {
      await reopenAccount(tableInfo.account_id);
      await fetchTableInfo();
      setIsMenuOpen(false);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancel = async () => {
    if (!confirmCancel) {
      setConfirmCancel(true);
      return;
    }
    
    if (!tableInfo?.account_id) return;
    setIsProcessing(true);
    try {
      await cancelAccount(tableInfo.account_id);
      navigate(`${ROUTES.RESTAURANTS.PANEL(restaurantId || "")}/${ROUTES.TABLES.INDEX}`);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    fetchTableInfo();
  }, [fetchTableInfo]);

  return (
    <section className="flex justify-between w-full items-center relative">
      <div className="flex items-center gap-4">
        <Link
          to={ROUTES.TABLES.INDEX}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300"
        >
          <ArrowLeft />
        </Link>
        <div>
          <h1 className="text-base md:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            {tableInfo?.name || "Cargando..."}
            {config && <StatusBadge color={config.color} text={config.label} />}
          </h1>
          <p className="hidden md:block text-xs text-gray-500 dark:text-gray-400">
            {tableInfo?.capacity
              ? `Capacidad para ${tableInfo.capacity} personas`
              : "Cargando..."}
          </p>
        </div>
      </div>

      {/* Desktop search */}
      <div className="hidden md:flex relative ml-auto mr-3">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchValue}
          onChange={handleSearchChange}
          className="w-full pl-9 pr-4 py-2 bg-gray-100/50 dark:bg-black/20 border focus:bg-white dark:focus:bg-dark-card border-gray-200 dark:border-white/5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-keleo-500/50 transition-all text-gray-700 dark:text-gray-200"
        />
        <Search
          size={18}
          className="absolute left-3 top-2 text-gray-400 pointer-events-none"
        />
      </div>

      {/* Mobile search trigger button */}
      <div className="flex items-center gap-2 md:gap-0 ml-auto md:ml-0">
        <button
          type="button"
          onClick={() => setSearchMobileActive(true)}
          className="md:hidden w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300"
          aria-label="Abrir buscador"
        >
          <Search size={16} />
        </button>

        {/* Options Menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              setConfirmCancel(false);
            }}
            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition"
          >
            <MoreVertical size={20} />
          </button>
          
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-dark-card rounded-xl shadow-xl border border-gray-100 dark:border-white/10 overflow-hidden z-50 flex flex-col"
              >
                {tableInfo?.status === "payment" && (
                  <button
                    onClick={handleReopen}
                    disabled={isProcessing}
                    className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 transition text-left"
                  >
                    {isProcessing ? <Loader2 size={16} className="animate-spin" /> : <Unlock size={16} />} 
                    Reabrir Cuenta
                  </button>
                )}
                
                <button
                  onClick={handleCancel}
                  disabled={isProcessing}
                  className={`flex items-center gap-2 px-4 py-3 text-sm transition text-left ${
                    confirmCancel 
                    ? "bg-red-500 text-white hover:bg-red-600" 
                    : "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"
                  } ${tableInfo?.status === "payment" ? "border-t border-gray-100 dark:border-white/5" : ""}`}
                >
                  {isProcessing ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Trash2 size={16} />
                  )}
                  {confirmCancel ? "Confirmar Cancelar" : "Cancelar Cuenta"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile search overlay — covers full header */}
      <AnimatePresence>
        {searchMobileActive && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
            className="absolute inset-0 z-10 flex items-center gap-3 bg-white dark:bg-dark-bg"
          >
            {/* Search input with back button inside — fills full width */}
            <div className="relative flex-1 flex items-center h-9 rounded-full bg-gray-100 dark:bg-white/8 focus-within:ring-2 focus-within:ring-keleo-500/30 transition-all duration-200">
              {/* ArrowLeft inside pill — signals it closes the search, not the page */}
              <button
                type="button"
                onClick={handleCloseMobileSearch}
                aria-label="Cancelar búsqueda"
                className="absolute left-1 w-7 h-7 flex items-center justify-center rounded-full text-gray-500 dark:text-gray-400 shrink-0"
              >
                <ArrowLeft size={16} />
              </button>

              <input
                ref={inputRef}
                type="text"
                inputMode="search"
                placeholder="Buscar producto..."
                value={searchValue}
                onChange={handleSearchChange}
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
                className="w-full h-full pl-9 pr-8 bg-transparent text-sm text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none"
              />

              <AnimatePresence>
                {searchValue && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ type: "spring", stiffness: 500, damping: 28 }}
                    type="button"
                    onClick={handleClearInput}
                    aria-label="Borrar búsqueda"
                    className="absolute right-2.5 w-[18px] h-[18px] flex items-center justify-center rounded-full bg-gray-400/60 dark:bg-white/25 text-white shrink-0"
                  >
                    <X size={10} strokeWidth={3} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ContentHeaderDetailPage;
