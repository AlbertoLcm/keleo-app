import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/routes/paths";

import { Settings, LogOut } from "lucide-react";
import { getInitialsString } from "@/utils/getInitialsString";

interface MenuItemProps {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
  isDanger?: boolean;
}

const MenuOption: React.FC<MenuItemProps> = ({
  icon: Icon,
  label,
  onClick,
  isDanger,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors duration-200 cursor-pointer 
        ${isDanger
          ? "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white"
        }
      `}
    >
      <Icon size={18} />
      <span>{label}</span>
    </button>
  );
};

const MenuUser: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);

  }, []);

  const fullName = `${user?.name || ""} ${user?.lastname || ""}`.trim();

  return (
    <div className="relative z-50" ref={menuRef}>
      <button
        onClick={() => setMenuOpen(!isMenuOpen)}
        className="
        transition-transform duration-150 active:scale-95
        select-none w-9 h-9 rounded-full bg-gradient-to-br
        border-none outline-none focus:ring-2 focus:ring-keleo-500/50 focus:ring-offset-2 dark:focus:ring-offset-dark-bg
        from-keleo-500 to-indigo-500 p-[2px] cursor-pointer shadow-md shadow-keleo-500/20"
      >
        {user?.profile_image ? (
          <img
            src={user.profile_image}
            alt={fullName}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-white dark:bg-dark-card flex items-center justify-center text-xs font-bold text-keleo-600 dark:text-keleo-400">
            {getInitialsString(fullName)}
          </div>
        )}
      </button>

      {isMenuOpen && (
        <div
          className="
            absolute right-0 mt-3 w-64 origin-top-right rounded-2xl overflow-hidden shadow-xl
            bg-white dark:bg-dark-card border border-gray-100 dark:border-white/5
            animate-in fade-in zoom-in-95 duration-200
          "
        >
          {/* Encabezado del menú */}
          <div className="px-5 py-4 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02]">
            <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
              {fullName}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">{user?.email}</p>
          </div>

          {/* Opciones */}
          <div className="py-2">
            <MenuOption icon={Settings} label="Preferencias de la cuenta" onClick={() => { navigate(ROUTES.GLOBAL_SETTINGS); setMenuOpen(false); }} />
          </div>

          <div className="h-px bg-gray-100 mx-3 dark:bg-white/5"></div>

          {/* Cerrar Sesión */}
          <div className="py-2">
            <MenuOption
              icon={LogOut}
              label="Cerrar sesión"
              isDanger
              onClick={logout}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuUser;
