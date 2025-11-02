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
    <div className="flex flex-col h-dvh">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-1 overflow-auto">
        <SideBar />
        <main className="flex-1 w-full overflow-y-auto">
          <Container>
            <Outlet />
          </Container>
        </main>
      </div>
    </div>
  );
}
