import { Users, Circle, Trophy, UserPlus } from "lucide-react";
import { FilterTabs, MetricCard } from "@/modules/shared";
import { EmployeeCard, NewEmployeeForm } from "../components";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { getEmployees } from "../services/employee.service";
import type { Employee } from "../models/employee.model";
import { useHeaderAction, CardEmptyAdded } from "@/modules/shared";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const EmployeesPage = () => {
  const { updateActionHeader } = useHeaderAction();
  const { restaurantId } = useParams();

  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const closeDrawer = () => setIsDrawerOpen(false);

  useEffect(() => {
    if (restaurantId) {
      loadEmployees(restaurantId);
    }
  }, [restaurantId]);

  const loadEmployees = async (id: string) => {
    setIsLoading(true);
    try {
      const data = await getEmployees(id);
      setEmployees(data);
    } catch (error) {
      console.error("Error loading employees:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const headerContent = useMemo(
    () => (
      <section className="flex justify-between w-full items-center">
        <div className="flex flex-col">
          <h1 className="text-base md:text-xl font-bold text-gray-900 dark:text-white">
            Equipo
          </h1>
          <p className="hidden md:block text-xs text-gray-500 dark:text-gray-400">
            Administra los accesos y roles de tu personal
          </p>
        </div>

        <div className="flex">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-keleo-600 hover:bg-keleo-700 text-white rounded-xl shadow-lg shadow-keleo-500/20 transition text-sm font-bold"
          >
            <UserPlus size={20} />
            <span className="hidden sm:inline">Nuevo Personal</span>
          </button>
        </div>
      </section>
    ),
    [setIsDrawerOpen]
  );

  useEffect(() => {
    updateActionHeader(headerContent);
    return () => updateActionHeader(null);
  }, [headerContent, updateActionHeader]);

  const filteredEmployees = employees.filter(e => activeTab === null || e.role === activeTab);

  return (
    <>
      <FilterTabs 
        options={[
          { id: null, label: "Todos" },
          { id: "meseros", label: "Meseros" },
          { id: "cocina", label: "Cocina" },
          { id: "gerencia", label: "Gerencia" },
        ]}
        activeId={activeTab}
        onChange={setActiveTab}
        className="mb-8 pb-2 w-full md:w-auto"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard
          className="bg-white dark:bg-dark-card"
          title="Total Personal"
          value={employees.length}
          icon={<Users />}
          color="blue"
        />
        <MetricCard
          className="bg-white dark:bg-dark-card"
          title="En Turno Ahora"
          value={<>{employees.filter(e => e.is_online).length} <span className="text-sm font-normal text-gray-400">/ {employees.length}</span></>}
          icon={<Circle size={10} className="fill-current" />}
          color="green"
          valueClassName="text-green-500"
          iconContainerClassName="animate-pulse"
        />
        <MetricCard
          className="bg-white dark:bg-dark-card overflow-hidden group"
          title="Empleado del Mes"
          value="Juan Pérez"
          icon={<Trophy />}
          color="yellow"
          valueClassName="text-lg text-gray-800 dark:text-white"
          iconContainerClassName="group-hover:rotate-12 transition"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-transparent"></div>
        </MetricCard>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-keleo-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEmployees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              name={`${employee.name} ${employee.lastname || ''}`.trim()}
              role={
                employee.role === 'meseros' ? 'Mesero' :
                employee.role === 'cocina' ? 'Cocina' :
                employee.role === 'gerencia' ? 'Gerencia' : employee.role
              }
              avatarUrl={employee.profile_image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=150"}
              status={employee.is_online ? "active" : "inactive"}
              statusText={employee.is_online ? "En Turno" : "Desconectado"}
              stats={[
                { label: "Rol", value: employee.role },
                { label: "Email", value: employee.email, valueClassName: "truncate max-w-[100px]" }
              ]}
            />
          ))}

          <CardEmptyAdded
            onAction={() => setIsDrawerOpen(true)}
            title="Registrar Empleado"
            description="Añade un nuevo miembro al equipo"
          />
        </div>
      )}

      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
              onClick={closeDrawer}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md shadow-2xl z-[101] flex flex-col border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
            >
              <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Agregar Empleado</h2>
                  <p className="text-xs text-gray-500">
                    Invita a un nuevo miembro a tu equipo
                  </p>
                </div>
                <button
                  onClick={closeDrawer}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                <NewEmployeeForm
                  onCancel={closeDrawer}
                  onUpdateEmployees={() => restaurantId && loadEmployees(restaurantId)}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default EmployeesPage;