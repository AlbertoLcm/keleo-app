import { ROUTES } from "@/routes/paths";
import {
  BookOpenText,
  ChefHat,
  Grid2x2,
  House,
  LogOutIcon,
  Settings,
  Users,
  X,
} from "lucide-react";
import { Link, NavLink } from "react-router";
import KeleoLogo from "./LogoKeleo";

interface SideBarProps {
  isSidebarOpen: Boolean;
  setIsSidebarOpen: (state: boolean) => void;
}

const navLinkClasses = ({ isActive }: { isActive: Boolean }): string =>
  `flex items-center gap-3 px-3 py-2.5 border-keleo-100 dark:border-transparent ${
    isActive
      ? "bg-keleo-50/80 dark:bg-keleo-900/30 text-keleo-700 dark:text-keleo-300 rounded-xl transition font-medium border"
      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white rounded-xl transition font-medium group"
  }`;

const SideBar: React.FC<SideBarProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <aside
      className={`
        fixed inset-y-0 eft-0 z-50 w-76 lg:w-64 h-full flex flex-col
        transform transition-transform duration-300 ease-in-out
        bg-white dark:bg-dark-bg md:flex border-r border-gray-200/50 dark:border-white/5
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:flex
      `}
    >
      <div className="h-16 lg:h-20 flex items-center px-6 border-b border-gray-200/50 dark:border-white/5">
        <Link
          to={ROUTES.RESTAURANTS.INDEX}
          className="flex items-center gap-2 group"
        >
          <KeleoLogo size={38} />
          <span className="text-xl font-bold text-gray-800 dark:text-white tracking-tight">
            Keleo<span className="text-keleo-600">App</span>
          </span>
        </Link>
        <span className="absolute right-3 lg:hidden text-gray-800/50 dark:text-white/50" onClick={() => setIsSidebarOpen(false)}>
          <X />
        </span>
      </div>

      <div className="flex-grow overflow-y-auto py-6 px-3 space-y-1">
        <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 pl-4">
          Principal
        </p>

        <NavLink to={ROUTES.DASHBOARD.INDEX} className={navLinkClasses} onClick={() => setIsSidebarOpen(false)}>
          <House />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to={ROUTES.TABLES.INDEX} className={navLinkClasses} onClick={() => setIsSidebarOpen(false)}>
         <Grid2x2 />
          <span>Mesas</span>
        </NavLink>

        <NavLink to={ROUTES.KITCHEN.INDEX} className={navLinkClasses} onClick={() => setIsSidebarOpen(false)}>
          <ChefHat />
          <span>Cocina</span>
        </NavLink>

        <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mt-6 mb-2 pl-4">
          Gestión
        </p>

        <NavLink to={ROUTES.MENU.INDEX} className={navLinkClasses} onClick={() => setIsSidebarOpen(false)}>
          <BookOpenText />
          <span>Menú y Platillos</span>
        </NavLink>

        <NavLink to={ROUTES.EMPLOYEES.INDEX} className={navLinkClasses} onClick={() => setIsSidebarOpen(false)}>
          <Users />
          <span>Empleados</span>
        </NavLink>

        <NavLink to={ROUTES.SETTINGS.INDEX} className={navLinkClasses} onClick={() => setIsSidebarOpen(false)}>
          <Settings />
          <span>Configuración</span>
        </NavLink>
      </div>

      <div className="p-4 border-t border-gray-200/50 dark:border-white/5">
        <Link
          to={ROUTES.RESTAURANTS.INDEX}
          className="flex items-center gap-3 px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg"
        >
          <LogOutIcon />
          <span>Cambiar Restaurante</span>
        </Link>
      </div>
    </aside>
  );
};

export default SideBar;
