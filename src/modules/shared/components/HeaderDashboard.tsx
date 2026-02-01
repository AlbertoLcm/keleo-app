import { Menu } from "lucide-react";
import ToggleDarkMode from "./ToggleDarkMode";
import MenuUser from "./MenuUser";

interface HeaderDashboardProps {
  toggleSidebar: () => void;
  children?: React.ReactNode; // Aquí irán los botones personalizados
}

const HeaderDashboard: React.FC<HeaderDashboardProps> = ({
  toggleSidebar,
  children,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      <section className="flex items-center justify-between glass-panel h-16 lg:h-20 px-6 z-20 border-b border-gray-200/50 dark:border-dark-border/50 bg-white/80 dark:bg-slate-900/80">
        <button
          onClick={toggleSidebar}
          className="p-2 text-gray-800 dark:text-white/80 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 lg:hidden focus:outline-none transition-colors"
        >
          <Menu size={24} />
        </button>
        {/* CENTRO O DERECHA: Acciones dinámicas (Aquí inyectamos el contenido) */}
        <div className="flex items-center gap-3 w-full justify-end">
          {/* Este contenedor renderiza lo que cada sección necesite */}
          {children && (
            <div className="flex items-center gap-2 border-r border-gray-200 dark:border-gray-700 pr-4 mr-2 w-full">
              {children}
            </div>
          )}

          <div className="flex items-center">
            {/* <ToggleDarkMode /> */}
            <MenuUser />
          </div>
        </div>
      </section>
    </header>
  );
};

export default HeaderDashboard;
