const OrdersPage = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto no-scrollbar pb-2 md:pb-0">
          <div className="relative">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
            <input
              type="text"
              placeholder="Buscar orden o mesa..."
              className="pl-8 pr-4 py-2 rounded-xl border-none bg-white/60 dark:bg-dark-card/60 shadow-sm text-sm w-56 focus:ring-2 focus:ring-keleo-500 placeholder-gray-400 dark:text-white"
            />
          </div>
          <select className="px-3 py-2 rounded-xl bg-white/60 dark:bg-dark-card/60 border-none text-sm text-gray-600 dark:text-gray-300 shadow-sm focus:ring-2 focus:ring-keleo-500">
            <option>Todos los meseros</option>
            <option>Juan Pérez</option>
            <option>Maria R.</option>
          </select>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>{" "}
          Prioridad Alta
        </div>
      </div>

      <div className="flex gap-6 h-full pb-4 min-w-[1000px]">
        <div className="flex-1 flex flex-col min-w-[280px]">
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="font-bold text-gray-700 dark:text-gray-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-400"></span>{" "}
              Nuevos
            </h3>
            <span className="bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full text-xs font-bold">
              2
            </span>
          </div>
          <div className="kanban-col space-y-4 pr-2">
            <div className="bg-white/80 dark:bg-dark-card/80 backdrop-blur-md p-4 rounded-xl shadow-sm border border-l-4 border-l-yellow-400 border-t-white/50 border-r-white/50 border-b-white/50 dark:border-t-white/5 dark:border-r-white/5 dark:border-b-white/5 hover:shadow-md transition cursor-pointer group">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-lg text-gray-800 dark:text-white">
                  Mesa 4
                </span>
                <span className="text-xs font-mono text-gray-400">#1025</span>
              </div>
              <div className="space-y-1 mb-3">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                  <span>2x Tacos Pastor</span>
                  <span className="font-bold">x2</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                  <span>1x Coca Cola</span>
                  <span className="font-bold">x1</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <i className="far fa-clock"></i> 2 min
                </div>
                <button className="px-3 py-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded-lg text-xs font-bold transition">
                  A Cocina
                </button>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-dark-card/80 backdrop-blur-md p-4 rounded-xl shadow-sm border border-l-4 border-l-yellow-400 border-t-white/50 border-r-white/50 border-b-white/50 dark:border-t-white/5 dark:border-r-white/5 dark:border-b-white/5 hover:shadow-md transition cursor-pointer group">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-lg text-gray-800 dark:text-white">
                  Mesa 1
                </span>
                <span className="text-xs font-mono text-gray-400">#1026</span>
              </div>
              <div className="space-y-1 mb-3">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                  <span>1x Guacamole</span>
                  <span className="font-bold">x1</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <i className="far fa-clock"></i> 1 min
                </div>
                <button className="px-3 py-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded-lg text-xs font-bold transition">
                  A Cocina
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col min-w-[280px]">
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="font-bold text-gray-700 dark:text-gray-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>{" "}
              En Cocina
            </h3>
            <span className="bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full text-xs font-bold">
              2
            </span>
          </div>
          <div className="kanban-col space-y-4 pr-2">
            <div className="bg-white/80 dark:bg-dark-card/80 backdrop-blur-md p-4 rounded-xl shadow-sm border border-l-4 border-l-red-500 border-t-white/50 border-r-white/50 border-b-white/50 dark:border-t-white/5 dark:border-r-white/5 dark:border-b-white/5 hover:shadow-md transition cursor-pointer group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-1 bg-red-100 rounded-bl-lg">
                <i className="fas fa-exclamation-circle text-red-500 text-xs"></i>
              </div>

              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-lg text-gray-800 dark:text-white">
                  Mesa 5
                </span>
                <span className="text-xs font-mono text-gray-400 pr-4">
                  #1024
                </span>
              </div>
              <div className="space-y-1 mb-3">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                  <span>3x Enchiladas</span>
                  <span className="font-bold">x3</span>
                </div>
                <p className="text-xs text-red-400 italic mt-1">
                  Nota: Sin cebolla
                </p>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-1 text-xs text-red-500 font-bold">
                  <i className="far fa-clock"></i> 18 min
                </div>
                <button className="px-3 py-1 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-lg text-xs font-bold transition">
                  Marcar Listo
                </button>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-dark-card/80 backdrop-blur-md p-4 rounded-xl shadow-sm border border-l-4 border-l-orange-500 border-t-white/50 border-r-white/50 border-b-white/50 dark:border-t-white/5 dark:border-r-white/5 dark:border-b-white/5 hover:shadow-md transition cursor-pointer group">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-lg text-gray-800 dark:text-white">
                  Barra
                </span>
                <span className="text-xs font-mono text-gray-400">#1027</span>
              </div>
              <div className="space-y-1 mb-3">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                  <span>1x Nachos Supreme</span>
                  <span className="font-bold">x1</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <i className="far fa-clock"></i> 5 min
                </div>
                <button className="px-3 py-1 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-lg text-xs font-bold transition">
                  Marcar Listo
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col min-w-[280px]">
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="font-bold text-gray-700 dark:text-gray-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>{" "}
              Listos
            </h3>
            <span className="bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full text-xs font-bold">
              1
            </span>
          </div>
          <div className="kanban-col space-y-4 pr-2">
            <div className="bg-white/80 dark:bg-dark-card/80 backdrop-blur-md p-4 rounded-xl shadow-sm border border-l-4 border-l-emerald-500 border-t-white/50 border-r-white/50 border-b-white/50 dark:border-t-white/5 dark:border-r-white/5 dark:border-b-white/5 hover:shadow-md transition cursor-pointer group">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-lg text-gray-800 dark:text-white">
                  Mesa 2
                </span>
                <span className="text-xs font-mono text-gray-400">#1022</span>
              </div>
              <div className="space-y-1 mb-3">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                  <span>2x Cafés Americanos</span>
                  <span className="font-bold">x2</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                  <span>1x Pastel Chocolate</span>
                  <span className="font-bold">x1</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600">
                    MR
                  </div>
                  <span className="text-xs text-gray-400">Mesero</span>
                </div>
                <button className="px-3 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-lg text-xs font-bold transition">
                  Entregar
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col min-w-[280px] opacity-70 hover:opacity-100 transition">
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="font-bold text-gray-700 dark:text-gray-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>{" "}
              Entregados
            </h3>
            <span className="bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full text-xs font-bold">
              5
            </span>
          </div>
          <div className="kanban-col space-y-4 pr-2">
            <div className="bg-white/50 dark:bg-dark-card/50 backdrop-blur-sm p-4 rounded-xl border border-gray-200 dark:border-white/5 hover:bg-white/80 dark:hover:bg-dark-card/80 transition cursor-pointer">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-md text-gray-600 dark:text-gray-400 line-through">
                  Mesa 3
                </span>
                <i className="fas fa-check-circle text-blue-500"></i>
              </div>
              <p className="text-xs text-gray-400">Entregado hace 10m</p>
            </div>
            <div className="bg-white/50 dark:bg-dark-card/50 backdrop-blur-sm p-4 rounded-xl border border-gray-200 dark:border-white/5 hover:bg-white/80 dark:hover:bg-dark-card/80 transition cursor-pointer">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-md text-gray-600 dark:text-gray-400 line-through">
                  Mesa 6
                </span>
                <i className="fas fa-check-circle text-blue-500"></i>
              </div>
              <p className="text-xs text-gray-400">Entregado hace 25m</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrdersPage