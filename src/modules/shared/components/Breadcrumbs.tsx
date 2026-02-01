import { Link, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { CaretRightIcon } from "@phosphor-icons/react";
import api from "@/api/axios";
import Avatar from "./Avatar";
import logoUrl from '@/assets/keleo.png';
import { ROUTES } from "@/routes/paths";

interface Crumb {
  label: string;
  path: string;
  isCurrent: boolean;
  logo?: string;
  icon: boolean;
}

interface RestaurantInfo {
  name: string;
  logo_url?: string;
}

interface TableInfo {
  name: string;
}

/* 💬 Mapeo de rutas legibles */
const routeLabels: Record<string, string> = {
  dashboard: "Dashboard",
  restaurants: "Restaurantes",
  menu: "Menú",
  orders: "Pedidos",
  settings: "Configuración",
  new: "Nuevo",
  edit: "Editar",
  detail: "Detalle",
  tables: "Mesas",
  employees: "Empleados",
};

const UUID_REGEX =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

export default function Breadcrumbs() {
  const location = useLocation();
  const [restaurantInfo, setRestaurantInfo] = useState<RestaurantInfo | null>(null);
  const [tableInfo, setTableInfo] = useState<TableInfo | null>(null);

  const segments = location.pathname.split("/").filter(Boolean);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let restaurantId: string | null = null;
        let tableId: string | null = null;

        // buscar IDs basados en su posición en la URL
        segments.forEach((seg, i) => {
          if (seg === "restaurants" && UUID_REGEX.test(segments[i + 1])) {
            restaurantId = segments[i + 1];
          }
          if (seg === "tables" && UUID_REGEX.test(segments[i + 1])) {
            tableId = segments[i + 1];
          }
        });

        if (restaurantId) {
          const { data } = await api.get(`/restaurants/${restaurantId}`);
          setRestaurantInfo({ name: data.name, logo_url: data.logo_url });
        } else {
          setRestaurantInfo(null);
        }

        if (tableId) {
          const { data } = await api.get(`/tables/${tableId}`);
          setTableInfo({ name: data.name });
        } else {
          setTableInfo(null);
        }
      } catch (err) {
        console.error("Error al cargar información del breadcrumb:", err);
      }
    };

    fetchData();
  }, [location.pathname]);

  const crumbs: Crumb[] = segments.map((segment, i) => {
    const path = "/" + segments.slice(0, i + 1).join("/");
    const isCurrent = i === segments.length - 1;

    let label = routeLabels[segment] || segment;
    let logo = "";
    let icon = false;

    if (restaurantInfo && UUID_REGEX.test(segment) && path.includes("restaurants")) {
      label = restaurantInfo.name;
      logo = restaurantInfo.logo_url || "";
      icon = true;
    }

    if (tableInfo && UUID_REGEX.test(segment) && path.includes("tables")) {
      label = tableInfo.name;
      icon = false;
    }

    return { label, path, isCurrent, logo, icon };
  });

  return (
    <nav className="flex items-center text-sm text-gray-500">
      <img src={logoUrl} alt="Logo" width={25} className="cursor-pointer" onClick={() => navigate(ROUTES.INDEX)} />

      {crumbs.map((crumb) => (
        <div key={crumb.path} className="flex items-center">
          <span className="text-gray-400 mx-1">
            <CaretRightIcon size={14} />
          </span>

          {crumb.isCurrent ? (
            <div className="flex items-center gap-2 cursor-default">
              <span className="text-gray-800 font-semibold truncate max-w-[160px]">
                {crumb.label}
              </span>
            </div>
          ) : (
            <Link to={crumb.path} className="hover:text-black transition-colors">
              <div className="flex items-center gap-2 whitespace-nowrap">
                {crumb.icon && <Avatar src={crumb.logo || ""} name={crumb.label} size={30} />}
                {crumb.label}
              </div>
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
