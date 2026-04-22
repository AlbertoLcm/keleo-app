import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { ROUTES } from "@/routes/paths";
import { CardEmptyAdded, Container, NavBar } from "@/modules/shared";
import type { DashboardStats, Restaurant } from "../types";
import api from "@/api/axios";
import { PlusIcon } from "@phosphor-icons/react";
import SkeletonCardRestaurant from "../components/SkeletonCardRestaurant";
import {
  ArrowDown,
  ArrowUp,
  Coins,
  Tag,
  Users,
} from "lucide-react";
import formatCurrency from "../utils/formatCurrency";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import CardRestaurant from "../components/CardRestaurant";

export default function RestaurantsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [ownerRestaurants, setOwnerRestaurants] = useState<Restaurant[]>([]);
  const [staffRestaurants, setStaffRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const isCollaboratorOnly = !loading && ownerRestaurants.length === 0 && staffRestaurants.length > 0;

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const [statsRes, restRes] = await Promise.all([
          api.get<DashboardStats>("restaurants/stats"),
          api.get<{ owner: Restaurant[], staff: Restaurant[] }>("restaurants"),
        ]);

        setStats(statsRes.data);
        setOwnerRestaurants(restRes.data.owner);
        setStaffRestaurants(restRes.data.staff);
      } catch (err: any) {
        console.error("Error al cargar datos", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const renderRestaurants = (data: Restaurant[], isOwner: boolean) => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonCardRestaurant key={i} />
          ))}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((restaurant: Restaurant) => (
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
            myOrders={restaurant.my_orders}
            activeStaff={restaurant.active_staff}
            onClick={() => navigate(ROUTES.RESTAURANTS.PANEL(restaurant.id))}
            role={restaurant.role}
            isOwner={isOwner}
          />
        ))}
        {isOwner && (
          <CardEmptyAdded
            onAction={() => navigate(ROUTES.RESTAURANTS.NEW)}
            title="Añadir Restaurante"
            description="Registra un nuevo restaurante"
          />
        )}
      </div>
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
        {/* HEADER ADAPTATIVO */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 mt-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              ¡Hola de nuevo, {user?.name}! <span className="inline-block animate-wave origin-[70%_70%]">👋</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {isCollaboratorOnly ? "Selecciona un espacio de trabajo para comenzar." : "Selecciona un espacio de trabajo para comenzar."}
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-white font-bold rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 transition">
              <i className="fas fa-envelope"></i>
              <span className="hidden sm:inline">Invitaciones</span>
            </button>
            <button
              onClick={() => navigate(ROUTES.RESTAURANTS.NEW)}
              className="flex items-center gap-2 px-6 py-3 bg-keleo-600 text-white font-bold rounded-xl shadow-lg shadow-keleo-500/30 hover:bg-keleo-700 transition transform hover:-translate-y-0.5"
            >
              <PlusIcon weight="bold" size={20} />
              <span>Crear Negocio</span>
            </button>
          </div>
        </div>

        {/* Global Stats */}
        {loading ? "" : !isCollaboratorOnly && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Stat 1: Ventas Totales */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-white/50 dark:border-white/5 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-keleo-50 dark:bg-keleo-900/20 text-keleo-600 flex items-center justify-center text-xl group-hover:scale-110 transition">
                  <Coins size={24} />
                </div>
                {(stats?.sales.percentageComparation || 0) >= 0 ? (
                  <span className="text-xs font-bold text-green-500 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-lg flex items-center gap-1">
                    <ArrowUp size={14} /> {stats?.sales.percentageComparation || 0}%
                  </span>
                ) : (
                  <span className="text-xs font-bold text-red-500 bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-lg flex items-center gap-1">
                    <ArrowDown size={14} /> {stats?.sales.percentageComparation || 0}%
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-1">
                Ventas Consolidadas
              </p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(stats?.sales.total || 0)}
              </h3>
            </div>

            {/* Stat 2: Pedidos Activos */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-white/50 dark:border-white/5 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-900/20 text-orange-500 flex items-center justify-center text-xl group-hover:scale-110 transition">
                  <Tag size={24} />
                </div>
                <span className="flex items-center gap-1 text-[10px] font-bold text-orange-600 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span> EN VIVO
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-1">
                Órdenes Activas
              </p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats?.activeOrders || 0}
              </h3>
            </div>

            {/* Stat 3: Staff */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-white/50 dark:border-white/5 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-500 flex items-center justify-center text-xl group-hover:scale-110 transition">
                  <Users size={24} />
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mb-1">
                Equipo en Turno
              </p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats?.staff.active || 0} <span className="text-sm font-normal text-gray-400">/ {stats?.staff.total || 0}</span>
              </h3>
            </div>
          </div>
        )}

        {isCollaboratorOnly ? (
          <>
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Colaboraciones</h2>
                <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-xs px-2 py-0.5 rounded-full font-bold">STAFF</span>
              </div>
              {renderRestaurants(staffRestaurants, false)}
            </section>

            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6 mt-12">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Mis Restaurantes</h2>
                <span className="bg-keleo-100 dark:bg-keleo-900/40 text-keleo-600 dark:text-keleo-400 text-xs px-2 py-0.5 rounded-full font-bold">PROPIETARIO</span>
              </div>
              {renderRestaurants(ownerRestaurants, true)}
            </section>
          </>
        ) : (
          <>
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Mis Restaurantes</h2>
                <span className="bg-keleo-100 dark:bg-keleo-900/40 text-keleo-600 dark:text-keleo-400 text-xs px-2 py-0.5 rounded-full font-bold">PROPIETARIO</span>
              </div>
              {renderRestaurants(ownerRestaurants, true)}
            </section>

            {(!loading && staffRestaurants.length > 0) && (
              <section className="mb-12">
                <div className="flex items-center gap-3 mb-6 mt-12">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">Colaboraciones</h2>
                  <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-xs px-2 py-0.5 rounded-full font-bold">STAFF</span>
                </div>
                {renderRestaurants(staffRestaurants, false)}
              </section>
            )}
          </>
        )}
      </Container>
    </>
  );
}
