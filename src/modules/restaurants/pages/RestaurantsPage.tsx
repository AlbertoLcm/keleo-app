import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import CardRestaurant from "../components/CardRestaurant";
import { ROUTES } from "@/routes/paths";
import { Button, CardEmptyAdded, Container, NavBar } from "@/modules/shared";
import type { DashboardStats, Restaurant } from "../types";
import api from "@/api/axios";
import { PlusIcon } from "@phosphor-icons/react";
import SkeletonCardRestaurant from "../components/SkeletonCardRestaurant";
import GridCardsRestaurants from "../components/GridCardsRestaurants";
import { ArrowDown, ArrowUp, Coins, SearchIcon, Tag, Users } from "lucide-react";
import formatCurrency from "../utils/formatCurrency";

export default function RestaurantsPage() {
  const navigate = useNavigate();

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Tipamos las respuestas de Axios
        const [statsRes, restRes] = await Promise.all([
          api.get<DashboardStats>("restaurants/stats"),
          api.get<Restaurant[]>("restaurants"),
        ]);

        setStats(statsRes.data);
        setRestaurants(restRes.data);

      } catch (err: any) {
        setError(err.response?.data?.message || "Error al cargar datos");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const renderRestaurants = () => {
    if (loading) {
      return (
        <GridCardsRestaurants>
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonCardRestaurant key={i} />
          ))}
        </GridCardsRestaurants>
      );
    }

    return (
      <GridCardsRestaurants>
        {restaurants.map((restaurant: Restaurant) => (
          <CardRestaurant
            key={restaurant.id}
            cardId={restaurant.id}
            name={restaurant.name}
            typeRestaurant={restaurant.type_restaurant}
            city={restaurant.city}
            logo={restaurant.logo_url}
            tablesInUse={restaurant.tables_in_use}
            totalTables={restaurant.total_tables}
            status={restaurant.status}
            dailySales={restaurant.daily_sales}
            onClick={() => navigate(ROUTES.RESTAURANTS.PANEL(restaurant.id))}
          />
        ))}
        <CardEmptyAdded
          onAction={() => navigate(ROUTES.RESTAURANTS.NEW)}
          title="Añadir Restaurante"
          description="Registra un nuevo restaurante"
        />
      </GridCardsRestaurants>
    );
  };

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-keleo-200/40 dark:bg-keleo-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute top-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-200/30 dark:bg-blue-900/10 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] bg-purple-100/40 dark:bg-purple-900/10 rounded-full blur-[120px]"></div>
      </div>
      <NavBar />
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Hola, Luis{" "}
              <span className="inline-block animate-wave origin-[70%_70%]">
                👋
              </span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Aquí tienes el resumen de tu imperio gastronómico hoy.
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => navigate(ROUTES.RESTAURANTS.NEW)}
          >
            <PlusIcon size={20} /> Nueva Sucursal
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass-panel p-6 rounded-2xl shadow-sm hover:shadow-md transition group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-keleo-50 dark:bg-keleo-900/20 text-keleo-600 flex items-center justify-center text-xl group-hover:scale-110 transition">
                <Coins size={32} />
              </div>
              {stats?.sales.percentageComparation || 0 >= 0 ? (
                <span className="text-xs font-bold text-green-500 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-lg flex items-center gap-1">
                  <ArrowUp size={14} /> {stats?.sales.percentageComparation || 0}%
                </span>
              ) : (
                <span className="text-xs font-bold text-red-500 bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-lg flex items-center gap-1">
                  <ArrowDown size={14} /> {stats?.sales.percentageComparation || 0}%
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">
              Ventas Totales (Hoy)
            </p>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(stats?.sales.total || 0)}
            </h3>
          </div>

          <div className="glass-panel p-6 rounded-2xl shadow-sm hover:shadow-md transition group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-900/20 text-orange-500 flex items-center justify-center text-xl group-hover:scale-110 transition">
                <Tag size={32} />
              </div>
              <span className="text-xs font-bold text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-lg">
                En vivo
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">
              Pedidos Activos
            </p>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats?.activeOrders || 0}
            </h3>
          </div>

          <div className="glass-panel p-6 rounded-2xl shadow-sm hover:shadow-md transition group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-500 flex items-center justify-center text-xl group-hover:scale-110 transition">
                <Users size={32} />
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">
              Staff Activo
            </p>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats?.staff.active || 0}{" "}
              <span className="text-sm font-normal text-gray-400">
                / {stats?.staff.total || 0}
              </span>
            </h3>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            Tus Sucursales
            <span className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-0.5 rounded-full">
              {restaurants.length}
            </span>
          </h2>
          <div className="relative hidden sm:block">
            <SearchIcon
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
              size={20}
            />
            <input
              type="text"
              placeholder="Buscar..."
              className="pl-10 pr-4 py-2 rounded-xl border-none bg-white dark:bg-dark-card shadow-sm text-sm w-64 focus:ring-2 focus:ring-keleo-500 transition placeholder-gray-400 dark:text-white"
            />
          </div>
        </div>

        {renderRestaurants()}
      </Container>
    </>
  );
}
