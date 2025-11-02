import { ROUTES } from "@/routes/paths";
import {
  DeviceTabletSpeakerIcon,
  GearSixIcon,
  HamburgerIcon,
  HouseIcon,
  UsersIcon,
} from "@phosphor-icons/react";
import { useRef, useState, type ReactNode } from "react";
import { NavLink } from "react-router";
import DropdownRestaurant from "./DropdownRestaurant";

type MenuItem = {
  to: string;
  label: string;
  icon: ReactNode;
};

export default function SideBar() {
  const defaultItems: MenuItem[] = [
    {
      to: ROUTES.DASHBOARD.INDEX,
      label: "Inicio",
      icon: <HouseIcon size={24} />,
    },
    {
      to: ROUTES.TABLES.LIST,
      label: "Mesas",
      icon: <DeviceTabletSpeakerIcon size={24} />,
    },
    {
      to: ROUTES.EMPLOYEES.LIST,
      label: "Empleados",
      icon: <UsersIcon size={24} />,
    },
    {
      to: ROUTES.MENU.INDEX,
      label: "Menú y Platillos",
      icon: <HamburgerIcon size={24} />,
    },
    {
      to: ROUTES.CONFIG,
      label: "Configuración",
      icon: <GearSixIcon size={24} />,
    }
  ];

  const [selectRestaurant, setSelectRestaurant] = useState<boolean>(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  const menu = defaultItems;

  return (
    <aside className="hidden md:flex flex-col justify-between bg-white w-68 p-4 border-r border-gray-200">
      <nav className="h-full overflow-y-auto flex flex-col justify-between relative">
        {selectRestaurant && (
          <DropdownRestaurant
            open={selectRestaurant}
            onClose={() => setSelectRestaurant(false)}
            buttonRef={buttonRef}
          />
        )}
        <ul className="space-y-1">
          {menu.map((m) => (
            <li key={m.to}>
              <NavLink
                to={m.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-md transition-colors hover:bg-blue-950/3 ${
                    isActive
                      ? "bg-blue-950/3 text-blue-600 font-semibold"
                      : "text-gray-800"
                  }`
                }
              >
                <span className="shrink-0">{m.icon}</span>
                <span className={`truncate block text-sm`}>{m.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

      </nav>
    </aside>
  );
}
