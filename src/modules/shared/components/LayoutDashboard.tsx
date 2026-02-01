import { Outlet } from "react-router";
import SideBar from "./SideBar";
import { HeaderDashboard, useHeaderAction } from "..";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LayoutSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handdleSidebarOpen = (state: boolean) => setIsSidebarOpen(state);

  const { actionHeader } = useHeaderAction();

  return (
    <div className="h-screen flex relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[20%] right-[10%] w-[40%] h-[40%] bg-keleo-500/40 dark:bg-keleo-900/50 rounded-full blur-[200px]"></div>
        <div className="absolute bottom-[10%] -left-[10%] w-[30%] h-[30%] bg-blue-300 dark:bg-blue-800/50 rounded-full blur-[200px]"></div>
      </div>

      {/* Overflow SideBar Open */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            // Estado inicial (antes de aparecer)
            initial={{ opacity: 0 }}
            // Estado al que llega (animación de entrada)
            animate={{ opacity: 1 }}
            // Estado al desaparecer (animación de salida)
            exit={{ opacity: 0 }}
            // Configuración de la animación
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-45 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      <SideBar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={handdleSidebarOpen}
      />

      <main className="flex-1 flex flex-col w-full overflow-y-auto">
        <HeaderDashboard toggleSidebar={toggleSidebar}>
          {actionHeader}
        </HeaderDashboard>
          <Outlet />
      </main>
    </div>
  );
}
