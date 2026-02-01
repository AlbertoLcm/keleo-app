const MenuPage = () => {
  return (
    <>
      <div className="flex items-center gap-4 mb-8 overflow-x-auto no-scrollbar pb-2">
        <button className="px-5 py-2.5 bg-keleo-600 text-white rounded-xl shadow-md shadow-keleo-500/30 text-sm font-bold whitespace-nowrap transition transform hover:-translate-y-0.5">
          🍔 Todos
        </button>
        <button className="px-5 py-2.5 bg-white/60 dark:bg-dark-card/60 backdrop-blur-md hover:bg-white dark:hover:bg-dark-card text-gray-600 dark:text-gray-300 rounded-xl border border-white/50 dark:border-white/5 text-sm font-medium whitespace-nowrap transition hover:shadow-md">
          🌮 Entradas
        </button>
        <button className="px-5 py-2.5 bg-white/60 dark:bg-dark-card/60 backdrop-blur-md hover:bg-white dark:hover:bg-dark-card text-gray-600 dark:text-gray-300 rounded-xl border border-white/50 dark:border-white/5 text-sm font-medium whitespace-nowrap transition hover:shadow-md">
          🥩 Platos Fuertes
        </button>
        <button className="px-5 py-2.5 bg-white/60 dark:bg-dark-card/60 backdrop-blur-md hover:bg-white dark:hover:bg-dark-card text-gray-600 dark:text-gray-300 rounded-xl border border-white/50 dark:border-white/5 text-sm font-medium whitespace-nowrap transition hover:shadow-md">
          🍹 Bebidas
        </button>
        <button className="px-5 py-2.5 bg-white/60 dark:bg-dark-card/60 backdrop-blur-md hover:bg-white dark:hover:bg-dark-card text-gray-600 dark:text-gray-300 rounded-xl border border-white/50 dark:border-white/5 text-sm font-medium whitespace-nowrap transition hover:shadow-md">
          🍰 Postres
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-panel p-4 rounded-xl border border-white/50 dark:border-white/5 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              Total Platillos
            </p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">
              45
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-500 flex items-center justify-center">
            <i className="fas fa-utensils"></i>
          </div>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-white/50 dark:border-white/5 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              Más Vendido
            </p>
            <p className="text-lg font-bold text-gray-800 dark:text-white truncate max-w-[120px]">
              Hamburguesa Clásica
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-500 flex items-center justify-center">
            <i className="fas fa-star"></i>
          </div>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-white/50 dark:border-white/5 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              Agotados
            </p>
            <p className="text-2xl font-bold text-red-500">2</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-500 flex items-center justify-center">
            <i className="fas fa-ban"></i>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div className="bg-white/80 dark:bg-dark-card/80 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 dark:border-white/5 overflow-hidden hover:shadow-xl hover:shadow-keleo-500/5 transition duration-300 group">
          <div className="h-40 bg-gray-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400"
              alt="Burger"
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />
            <div className="absolute top-3 right-3 z-20">
              <span className="bg-white/90 dark:bg-black/70 backdrop-blur text-gray-800 dark:text-white text-xs font-bold px-2 py-1 rounded-lg shadow-sm">
                $155.00
              </span>
            </div>
          </div>
          <div className="p-5">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg text-gray-800 dark:text-white leading-tight">
                Hamburguesa Clásica
              </h3>
              <button className="text-gray-400 hover:text-keleo-600 transition">
                <i className="fas fa-edit"></i>
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
              Carne angus 200g, queso cheddar, lechuga, tomate y aderezo
              especial.
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-white/5">
              <span className="text-xs font-semibold text-green-600 dark:text-green-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>{" "}
                Disponible
              </span>
              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input
                  type="checkbox"
                  name="toggle"
                  id="toggle1"
                  className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300 checked:right-0 checked:border-keleo-600 transition-all duration-300"
                  checked
                />
                <label className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-dark-card/80 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 dark:border-white/5 overflow-hidden hover:shadow-xl hover:shadow-keleo-500/5 transition duration-300 group">
          <div className="h-40 bg-gray-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1579306194872-64d3b7bac4c2?q=80&w=400"
              alt="Cake"
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />
            <div className="absolute top-3 right-3 z-20">
              <span className="bg-white/90 dark:bg-black/70 backdrop-blur text-gray-800 dark:text-white text-xs font-bold px-2 py-1 rounded-lg shadow-sm">
                $85.00
              </span>
            </div>
          </div>
          <div className="p-5">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg text-gray-800 dark:text-white leading-tight">
                Cheesecake Fresa
              </h3>
              <button className="text-gray-400 hover:text-keleo-600 transition">
                <i className="fas fa-edit"></i>
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
              Pay de queso estilo New York con mermelada de fresa natural.
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-white/5">
              <span className="text-xs font-semibold text-green-600 dark:text-green-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>{" "}
                Disponible
              </span>
              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input
                  type="checkbox"
                  name="toggle"
                  id="toggle2"
                  className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300 checked:right-0 checked:border-keleo-600 transition-all duration-300"
                  checked
                />
                <label className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-dark-card/80 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 dark:border-white/5 overflow-hidden hover:shadow-xl transition duration-300 group opacity-75 hover:opacity-100">
          <div className="h-40 bg-gray-200 relative overflow-hidden grayscale group-hover:grayscale-0 transition duration-500">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400"
              alt="Salad"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3 z-20">
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-sm">
                Agotado
              </span>
            </div>
          </div>
          <div className="p-5">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg text-gray-800 dark:text-white leading-tight">
                Ensalada César
              </h3>
              <button className="text-gray-400 hover:text-keleo-600 transition">
                <i className="fas fa-edit"></i>
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
              Lechuga romana, crutones, queso parmesano y aderezo césar casero.
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-white/5">
              <span className="text-xs font-semibold text-red-500 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500"></span> No
                Disponible
              </span>
              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input
                  type="checkbox"
                  name="toggle"
                  id="toggle3"
                  className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300 transition-all duration-300"
                />
                <label className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
              </div>
            </div>
          </div>
        </div>

        <button className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl flex flex-col items-center justify-center p-6 text-gray-400 hover:text-keleo-600 hover:border-keleo-500 hover:bg-keleo-50/50 dark:hover:bg-keleo-900/10 transition duration-300 group h-full min-h-[300px]">
          <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition shadow-inner">
            <i className="fas fa-plus text-2xl"></i>
          </div>
          <h3 className="font-bold text-gray-600 dark:text-gray-300">
            Añadir Platillo
          </h3>
          <p className="text-xs mt-1 text-center">
            Agrega un nuevo producto a esta categoría
          </p>
        </button>
      </div>
    </>
  );
};

export default MenuPage;