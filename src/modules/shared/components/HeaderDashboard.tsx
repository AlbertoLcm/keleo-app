import { Menu } from "lucide-react";
import MenuUser from "./MenuUser";

interface HeaderDashboardProps {
  toggleSidebar: () => void;
  children?: React.ReactNode;
}

const HeaderDashboard: React.FC<HeaderDashboardProps> = ({
  toggleSidebar,
  children,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      <section className="flex bg-white dark:bg-dark-bg items-center justify-between h-16 lg:h-20 px-4 md:px-6 z-20 border-b border-gray-200/50 dark:border-dark-border/50">
        <button
          onClick={toggleSidebar}
          className="pr-2 text-gray-800 dark:text-white/80 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 lg:hidden focus:outline-none transition-colors"
        >
          <Menu size={24} />
        </button>
        <div className="flex items-center gap-3 w-full justify-end">
          {children && (
            <div className="flex items-center gap-2 w-full">
              {children}
            </div>
          )}

          <div className="flex items-center border-l pl-4 ml-2 border-gray-200 dark:border-gray-700">
            <MenuUser />
          </div>
        </div>
      </section>
    </header>
  );
};

export default HeaderDashboard;
