import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";

import { User, Settings, LogOut, CreditCard } from "lucide-react";
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
        w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors duration-200 cursor-pointer 
        ${
          isDanger
            ? "text-red-800 dark:text-red-300 hover:bg-red-400 dark:hover:bg-red-500/20 hover:text-red-100"
            : "text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white"
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

  return (
    <div className="relative z-50">
      <button
        onClick={() => setMenuOpen(!isMenuOpen)}
        className="
        transition-transform duration-150 active:scale-90
        select-none w-9 h-9 rounded-full bg-gradient-to-br
        border-none
        from-keleo-500 to-indigo-500 p-[2px] cursor-pointer shadow-md shadow-keleo-500/20"
      >
        <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center text-xs font-bold text-keleo-600 dark:text-keleo-400">
          {getInitialsString(user?.name || "" + " " + user?.lastname || "")}
        </div>
      </button>

      {isMenuOpen &&
        createPortal(
          <div
            style={{
              top: 50,
              right: 25,
            }}
            ref={menuRef}
            className="
              bg-white dark:bg-dark-card absolute right-0 mt-3 w-64 origin-top-right rounded-xl overflow-hidden border shadow-2xl z-46
             border-white/50 dark:border-white/5
            "
          >
            {/* Encabezado del menú */}
            <div className="px-5 py-4 border-b border-gray-200/50 bg-gray-200/50 dark:border-white/10 dark:bg-white/5">
              <p className="text-sm font-medium text-gray-800 dark:text-white">
                {user?.name || "" + " " + user?.lastname || ""}
              </p>
              <p className="text-xs text-gray-500 dark:text-white/50 truncate">{user?.email}</p>
            </div>

            {/* Opciones */}
            <div className="py-2">
              <MenuOption icon={User} label="Mi Perfil" />
              <MenuOption icon={CreditCard} label="Suscripción" />
              <MenuOption icon={Settings} label="Configuración" />
            </div>

            <div className="h-px bg-white/10 mx-2"></div>

            {/* Cerrar Sesión */}
            <div className="py-2">
              <MenuOption
                icon={LogOut}
                label="Cerrar sesión"
                isDanger
                onClick={logout}
              />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default MenuUser;
