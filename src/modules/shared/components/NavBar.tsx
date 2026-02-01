import { Link } from "react-router";
import { ROUTES } from "@/routes/paths";
import ToggleDarkMode from "./ToggleDarkMode";
import type { ReactNode } from "react";
import MenuUser from "./MenuUser";
import KeleoLogo from "./LogoKeleo";

interface NavbarProps {
  children?: ReactNode;
}

const NavBar: React.FC<NavbarProps> = ({ children }) => {
  return (
    <nav className="sticky top-0 z-40 glass-panel border-b border-gray-200/50 dark:border-dark-border/50">
      <div className="container mx-auto px-6 h-20 flex justify-between items-center">
        <div className="flex items-center">
          {/* Logo */}
          <Link to={ROUTES.INDEX} className="flex items-center gap-2 group">
            <KeleoLogo size={38} />
            <span className="text-xl font-bold text-gray-800 dark:text-white tracking-tight">
              Keleo<span className="text-keleo-600">App</span>
            </span>
          </Link>

          <div className="ml-4">{children}</div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <ToggleDarkMode />
          <MenuUser />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
