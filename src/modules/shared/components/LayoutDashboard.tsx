import { Outlet, useParams } from "react-router";
import SideBar from "./SideBar";
import { Container, HeaderDashboard, useHeaderAction, WebSocketProvider } from "..";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LayoutSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handdleSidebarOpen = (state: boolean) => setIsSidebarOpen(state);

  const { actionHeader } = useHeaderAction();
  const { restaurantId } = useParams();

  return (
    <WebSocketProvider restaurantId={restaurantId}>
      <div className="h-screen flex relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute z-[-10] -top-[20%] right-[10%] w-[40%] h-[40%] bg-keleo-500/30 dark:bg-keleo-900/30 rounded-full blur-[200px]"></div>
        <div className="absolute z-[-10] bottom-[10%] -left-[10%] w-[30%] h-[30%] bg-blue-300 dark:bg-blue-800/30 rounded-full blur-[200px]"></div>
      </div>

      {/* Overflow SideBar Open */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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

      <main className="flex-1 flex flex-col w-full">
        <HeaderDashboard toggleSidebar={toggleSidebar}>
          {actionHeader}
        </HeaderDashboard>

        <Container className="overflow-y-auto flex-1">
          <Outlet />
        </Container>
      </main>
    </div>
    </WebSocketProvider>
  );
}
