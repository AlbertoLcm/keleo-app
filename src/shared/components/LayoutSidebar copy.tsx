import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router";
import SideBar from "./SideBar";
import Header from "./Header";
import { XIcon } from "@phosphor-icons/react";
import Container from "./Container";

export default function LayoutSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Cerrar sidebar al hacer clic fuera (solo mobile)
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node) &&
        sidebarOpen
      ) {
        setSidebarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  // Si la pantalla es grande (>=1024px), forzamos a cerrar el menú "móvil"
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-dvh">
      <aside className="hidden md:flex flex-col justify-between bg-blue-950 text-white w-68 p-4">
        <SideBar />
      </aside>

      {/* Sidebar mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Fondo oscuro */}
          <div
            className="fixed inset-0 bg-blue-950/80"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Sidebar deslizante */}
          <aside
            ref={sidebarRef}
            className={`
              flex flex-col justify-between bg-blue-950 text-white w-80 p-4
              transform transition-transform duration-300
              border-r border-gray-200/30
              ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            `}
          >
            <button
              className="absolute top-6 right-[-46px] text-white text-2xl"
              onClick={() => setSidebarOpen(false)}
            >
              <XIcon size={22} weight="bold" />
            </button>
            <SideBar />
          </aside>
        </div>
      )}

      <div className="flex flex-col flex-1">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-auto">
          <Container>
            <Outlet />
          </Container>
        </main>
      </div>
    </div>
  );
}
