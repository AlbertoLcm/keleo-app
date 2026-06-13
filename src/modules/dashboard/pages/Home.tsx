import { ChevronRight } from "lucide-react";
import { LoadingScreen, StatusBadge, useHeaderAction } from "@/modules/shared";
import { useEffect } from "react";

// Hook
import { useDashboard } from "../hooks/useDashboard";

// Components
import DashboardStatsRow from "../components/DashboardStatsRow";
import QuickActionsPanel from "../components/QuickActionsPanel";
import SalesChart from "../components/SalesChart";
import RecentOrdersTable from "../components/RecentOrdersTable";
import TopItemsList from "../components/TopItemsList";
import ReserveModal from "../components/ReserveModal";

const Dashboard: React.FC = () => {
  const { updateActionHeader } = useHeaderAction();

  const {
    stats,
    isLoading,
    // Modals
    isReserveModalOpen,
    setIsReserveModalOpen,
    // Reserve
    reserveForm,
    setReserveForm,
    isReserving,
    tablesList,
    handleSubmitReserve,
    // Quick actions
    handleNewOrder,
    handleCloseBox,
    handleZReport,
  } = useDashboard();

  useEffect(() => {
    updateActionHeader(
      <section className="flex justify-between w-full items-center">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <div className="hidden md:flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <a
                href="dashboard.html"
                className="hover:text-keleo-600 transition"
              >
                Mis Restaurantes
              </a>
              <ChevronRight size={14} />
              <span className="text-gray-800 dark:text-white font-medium bg-gray-100 dark:bg-white/10 px-2 py-0.5 rounded-md">
                Cafetería Central
              </span>
            </div>
            <h1 className="text-base md:text-xl font-bold text-gray-900 dark:text-white mt-1">
              Panel de Control
            </h1>
          </div>
        </div>

        <StatusBadge
          color="green"
          text={
            <>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-1"></span>
              Abierto
            </>
          }
        />
      </section>,
    );

    return () => updateActionHeader(null);
  }, [updateActionHeader]);

  if (isLoading || !stats) {
    return <LoadingScreen />;
  }

  return (
    <>
      <DashboardStatsRow stats={stats} />

      {/* ROW 2: Graph & Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <QuickActionsPanel
          onNewOrder={handleNewOrder}
          onReserve={() => setIsReserveModalOpen(true)}
          onCloseBox={handleCloseBox}
          onZReport={handleZReport}
        />
        <SalesChart chartData={stats.chartData} />
      </div>

      {/* ROW 3: Tables & Top Selling */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <RecentOrdersTable orders={stats.recentOrders} />
        <TopItemsList items={stats.topItems} />
      </div>

      <ReserveModal
        isOpen={isReserveModalOpen}
        onClose={() => setIsReserveModalOpen(false)}
        form={reserveForm}
        onChange={setReserveForm}
        tablesList={tablesList}
        isSubmitting={isReserving}
        onSubmit={handleSubmitReserve}
      />
    </>
  );
};

export default Dashboard;
