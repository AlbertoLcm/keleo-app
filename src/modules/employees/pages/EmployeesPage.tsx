const EmployeesPage = () => {
  return (
    <>
      <div className="flex items-center gap-4 mb-8 overflow-x-auto no-scrollbar pb-2">
        <button className="px-5 py-2.5 bg-keleo-600 text-white rounded-xl shadow-md shadow-keleo-500/30 text-sm font-bold whitespace-nowrap transition transform hover:-translate-y-0.5">
          Todos
        </button>
        <button className="px-5 py-2.5 bg-white/60 dark:bg-dark-card/60 backdrop-blur-md hover:bg-white dark:hover:bg-dark-card text-gray-600 dark:text-gray-300 rounded-xl border border-white/50 dark:border-white/5 text-sm font-medium whitespace-nowrap transition hover:shadow-md">
          Meseros
        </button>
        <button className="px-5 py-2.5 bg-white/60 dark:bg-dark-card/60 backdrop-blur-md hover:bg-white dark:hover:bg-dark-card text-gray-600 dark:text-gray-300 rounded-xl border border-white/50 dark:border-white/5 text-sm font-medium whitespace-nowrap transition hover:shadow-md">
          Cocina
        </button>
        <button className="px-5 py-2.5 bg-white/60 dark:bg-dark-card/60 backdrop-blur-md hover:bg-white dark:hover:bg-dark-card text-gray-600 dark:text-gray-300 rounded-xl border border-white/50 dark:border-white/5 text-sm font-medium whitespace-nowrap transition hover:shadow-md">
          Gerencia
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-panel p-4 rounded-xl border border-white/50 dark:border-white/5 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              Total Personal
            </p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">
              18
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-500 flex items-center justify-center">
            <i className="fas fa-users"></i>
          </div>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-white/50 dark:border-white/5 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              En Turno Ahora
            </p>
            <p className="text-2xl font-bold text-green-500">
              8 <span className="text-sm font-normal text-gray-400">/ 18</span>
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-500 flex items-center justify-center animate-pulse">
            <i className="fas fa-circle text-[10px]"></i>
          </div>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-white/50 dark:border-white/5 flex items-center justify-between relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-transparent"></div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              Empleado del Mes
            </p>
            <p className="text-lg font-bold text-gray-800 dark:text-white">
              Juan Pérez
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 text-yellow-500 flex items-center justify-center group-hover:rotate-12 transition">
            <i className="fas fa-trophy"></i>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div className="bg-white/80 dark:bg-dark-card/80 backdrop-blur-md rounded-2xl shadow-sm border border-l-4 border-l-green-500 border-t-white/50 border-r-white/50 border-b-white/50 dark:border-t-white/5 dark:border-r-white/5 dark:border-b-white/5 overflow-hidden hover:shadow-xl hover:shadow-keleo-500/5 transition duration-300 group">
          <div className="p-5">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150"
                  alt="Avatar"
                  className="w-14 h-14 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm"
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-dark-card rounded-full"></span>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white leading-tight">
                  Juan Pérez
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Mesero Senior
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4 bg-gray-50 dark:bg-white/5 rounded-xl p-2">
              <div className="text-center border-r border-gray-200 dark:border-white/10">
                <p className="text-[10px] text-gray-400 uppercase">
                  Ventas Hoy
                </p>
                <p className="text-sm font-bold text-gray-700 dark:text-gray-200">
                  $2,450
                </p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-gray-400 uppercase">Mesas</p>
                <p className="text-sm font-bold text-gray-700 dark:text-gray-200">
                  4 Activas
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-xs font-bold">
                En Turno
              </span>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 hover:text-keleo-600 transition flex items-center justify-center">
                  <i className="fas fa-comment-alt"></i>
                </button>
                <button className="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 hover:text-keleo-600 transition flex items-center justify-center">
                  <i className="fas fa-ellipsis-v"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-dark-card/80 backdrop-blur-md rounded-2xl shadow-sm border border-l-4 border-l-green-500 border-t-white/50 border-r-white/50 border-b-white/50 dark:border-t-white/5 dark:border-r-white/5 dark:border-b-white/5 overflow-hidden hover:shadow-xl hover:shadow-keleo-500/5 transition duration-300 group">
          <div className="p-5">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=150"
                  alt="Avatar"
                  className="w-14 h-14 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm"
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-dark-card rounded-full"></span>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white leading-tight">
                  Carlos Ruiz
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Jefe de Cocina
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4 bg-gray-50 dark:bg-white/5 rounded-xl p-2">
              <div className="text-center border-r border-gray-200 dark:border-white/10">
                <p className="text-[10px] text-gray-400 uppercase">Pedidos</p>
                <p className="text-sm font-bold text-gray-700 dark:text-gray-200">
                  45 Hoy
                </p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-gray-400 uppercase">
                  Tiempo Prom.
                </p>
                <p className="text-sm font-bold text-green-500">12 min</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-xs font-bold">
                En Turno
              </span>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 hover:text-keleo-600 transition flex items-center justify-center">
                  <i className="fas fa-comment-alt"></i>
                </button>
                <button className="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 hover:text-keleo-600 transition flex items-center justify-center">
                  <i className="fas fa-ellipsis-v"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-dark-card/80 backdrop-blur-md rounded-2xl shadow-sm border border-l-4 border-l-gray-300 dark:border-l-gray-600 border-t-white/50 border-r-white/50 border-b-white/50 dark:border-t-white/5 dark:border-r-white/5 dark:border-b-white/5 overflow-hidden hover:shadow-md transition duration-300 group opacity-75 hover:opacity-100">
          <div className="p-5">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150"
                  alt="Avatar"
                  className="w-14 h-14 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm grayscale"
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-gray-400 border-2 border-white dark:border-dark-card rounded-full"></span>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white leading-tight">
                  Ana García
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Mesera
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4 bg-gray-50 dark:bg-white/5 rounded-xl p-2">
              <div className="text-center border-r border-gray-200 dark:border-white/10">
                <p className="text-[10px] text-gray-400 uppercase">
                  Ventas Hoy
                </p>
                <p className="text-sm font-bold text-gray-500">$0</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-gray-400 uppercase">Turno</p>
                <p className="text-sm font-bold text-gray-500">Mañana</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="px-2 py-1 bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400 rounded-lg text-xs font-bold">
                Desconectado
              </span>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 hover:text-keleo-600 transition flex items-center justify-center">
                  <i className="fas fa-comment-alt"></i>
                </button>
                <button className="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 hover:text-keleo-600 transition flex items-center justify-center">
                  <i className="fas fa-ellipsis-v"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <button className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl flex flex-col items-center justify-center p-6 text-gray-400 hover:text-keleo-600 hover:border-keleo-500 hover:bg-keleo-50/50 dark:hover:bg-keleo-900/10 transition duration-300 group h-full min-h-[220px]">
          <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition shadow-inner">
            <i className="fas fa-user-plus text-2xl"></i>
          </div>
          <h3 className="font-bold text-gray-600 dark:text-gray-300">
            Registrar Empleado
          </h3>
          <p className="text-xs mt-1 text-center">
            Añade un nuevo miembro al equipo
          </p>
        </button>
      </div>
    </>
  );
};

export default EmployeesPage;