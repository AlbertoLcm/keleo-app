import { ListIcon } from "@phosphor-icons/react";
import Avatar from "./Avatar";
import Breadcrumbs from "./Breadcrumbs";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import logoUrl from '@/assets/keleo.png';

type HeaderProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (val: boolean) => void;
};

export default function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
  const { user } = useAuth();

  return (
    <header className="flex flex-col md:flex-row md:items-center md:justify-between bg-white border-b border-gray-200 md:gap-0">
      {/* 🔹 Fila superior en móvil / izquierda en desktop */}
      <div className="flex items-center justify-between md:justify-start w-full md:w-auto px-4 md:px-8 py-2">
        <img src={logoUrl} alt="Logo" height={25} width={25} className="mr-5 object-cover" />
        {/* Botón menú móvil */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden p-1 text-gray-600 hover:text-blue-600 transition-colors rounded-sm ring-1 ring-gray-200 cursor-pointer"
          aria-label="Abrir menú lateral"
        >
          <ListIcon size={24} weight="bold" />
        </button>

        <div className="hidden md:flex items-center">
          <Breadcrumbs />
        </div>

        <div className="md:hidden items-center gap-2">
          <Avatar name={user?.name || ""} size={40} />
          <span className="hidden md:block text-sm text-gray-700 truncate max-w-[140px]">
            {user?.name} {user?.lastname}
          </span>
        </div>
      </div>

      {/* 🔹 Breadcrumbs debajo en móvil */}
      <div className="flex md:hidden justify-start overflow-auto px-4 min-h-14 border-y border-gray-200 ">
        <Breadcrumbs />
      </div>

      {/* 🔹 Usuario — siempre a la derecha en desktop */}
      <div className="hidden md:flex items-center gap-2 px-4 md:px-8 py-2 md:ml-auto">
        <Avatar name={user?.name || ""} />
        <span className="hidden md:block text-sm text-gray-700 truncate max-w-[140px]">
          {user?.name} {user?.lastname}
        </span>
      </div>
    </header>
  );
}
