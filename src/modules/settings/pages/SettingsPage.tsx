const SettingsPage = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
      <div className="hidden lg:block lg:col-span-1">
        <nav className="space-y-1 sticky top-0">
          <a
            href="#perfil"
            className="flex items-center gap-3 px-4 py-3 bg-white/60 dark:bg-white/10 backdrop-blur-md rounded-xl text-sm font-bold text-keleo-700 dark:text-white border-l-4 border-keleo-600 shadow-sm transition"
          >
            Perfl y Marca
          </a>
          <a
            href="#horarios"
            className="flex items-center gap-3 px-4 py-3 text-gray-500 dark:text-gray-400 hover:bg-white/40 dark:hover:bg-white/5 rounded-xl text-sm font-medium transition"
          >
            Horarios de Atención
          </a>
          <a
            href="#cocina"
            className="flex items-center gap-3 px-4 py-3 text-gray-500 dark:text-gray-400 hover:bg-white/40 dark:hover:bg-white/5 rounded-xl text-sm font-medium transition"
          >
            Operación y Cocina
          </a>
          <a
            href="#cuenta"
            className="flex items-center gap-3 px-4 py-3 text-gray-500 dark:text-gray-400 hover:bg-white/40 dark:hover:bg-white/5 rounded-xl text-sm font-medium transition"
          >
            Cuenta y Pagos
          </a>
        </nav>
      </div>

      <div className="lg:col-span-3 space-y-8">
        <section
          id="perfil"
          className="bg-white/60 dark:bg-dark-card/60 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 dark:border-white/5 p-6"
        >
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-white/5 pb-4">
            <i className="fas fa-store text-keleo-500 mr-2"></i> Perfil del
            Restaurante
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 flex items-center gap-6">
              <div className="w-24 h-24 rounded-2xl bg-gray-100 dark:bg-white/5 border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-400">
                <i className="fas fa-image text-3xl"></i>
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-800 dark:text-white">
                  Logo del Restaurante
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  Recomendado: 500x500px, PNG o JPG
                </p>
                <button className="px-4 py-2 bg-white dark:bg-white/10 border border-gray-200 dark:border-transparent rounded-lg text-xs font-bold hover:bg-gray-50 dark:hover:bg-white/20 transition">
                  Subir Imagen
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">
                Nombre del Negocio
              </label>
              <input
                type="text"
                value="Cafetería Central"
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-gray-700 focus:border-keleo-500 focus:ring-2 focus:ring-keleo-500/20 outline-none transition text-sm dark:text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">
                Teléfono de Contacto
              </label>
              <input
                type="text"
                value="+52 55 1234 5678"
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-gray-700 focus:border-keleo-500 focus:ring-2 focus:ring-keleo-500/20 outline-none transition text-sm dark:text-white"
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">
                Dirección
              </label>
              <input
                type="text"
                value="Av. Juárez 102, Centro Histórico, CDMX"
                className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-gray-700 focus:border-keleo-500 focus:ring-2 focus:ring-keleo-500/20 outline-none transition text-sm dark:text-white"
              />
            </div>
          </div>
        </section>

        <section
          id="horarios"
          className="bg-white/60 dark:bg-dark-card/60 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 dark:border-white/5 p-6"
        >
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-white/5 pb-4">
            <i className="fas fa-clock text-keleo-500 mr-2"></i> Horarios de
            Atención
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/50 dark:hover:bg-white/5 transition">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked
                  className="w-4 h-4 text-keleo-600 rounded focus:ring-keleo-500"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Lunes - Viernes
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  value="08:00"
                  className="bg-gray-50 dark:bg-white/10 border-none rounded-lg text-xs px-2 py-1 text-gray-600 dark:text-white"
                />
                <span className="text-gray-400">-</span>
                <input
                  type="time"
                  value="22:00"
                  className="bg-gray-50 dark:bg-white/10 border-none rounded-lg text-xs px-2 py-1 text-gray-600 dark:text-white"
                />
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/50 dark:hover:bg-white/5 transition">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked
                  className="w-4 h-4 text-keleo-600 rounded focus:ring-keleo-500"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Sábado
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  value="09:00"
                  className="bg-gray-50 dark:bg-white/10 border-none rounded-lg text-xs px-2 py-1 text-gray-600 dark:text-white"
                />
                <span className="text-gray-400">-</span>
                <input
                  type="time"
                  value="23:00"
                  className="bg-gray-50 dark:bg-white/10 border-none rounded-lg text-xs px-2 py-1 text-gray-600 dark:text-white"
                />
              </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/50 dark:hover:bg-white/5 transition opacity-60">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-keleo-600 rounded focus:ring-keleo-500"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Domingo
                </span>
              </div>
              <span className="text-xs font-bold text-gray-400">CERRADO</span>
            </div>
          </div>
        </section>

        <section
          id="cocina"
          className="bg-white/60 dark:bg-dark-card/60 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 dark:border-white/5 p-6"
        >
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-white/5 pb-4">
            <i className="fas fa-cogs text-keleo-500 mr-2"></i> Operación
          </h2>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-800 dark:text-white">
                  Notificaciones de Cocina
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Sonido de alerta al recibir nueva comanda
                </p>
              </div>
              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input
                  type="checkbox"
                  name="toggle"
                  id="toggle_sound"
                  className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300 checked:right-0 checked:border-keleo-600 transition-all duration-300"
                  checked
                />
                <label className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">
                  IP Impresora Cocina
                </label>
                <input
                  type="text"
                  value="192.168.1.50"
                  className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-gray-700 focus:border-keleo-500 outline-none text-sm dark:text-white font-mono"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">
                  Tiempo Alerta Retraso (min)
                </label>
                <input
                  type="number"
                  value="15"
                  className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-gray-700 focus:border-keleo-500 outline-none text-sm dark:text-white"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-red-50/50 dark:bg-red-900/10 backdrop-blur-md rounded-2xl shadow-sm border border-red-100 dark:border-red-900/20 p-6">
          <h2 className="text-lg font-bold text-red-600 dark:text-red-400 mb-4">
            Zona de Peligro
          </h2>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Eliminar este restaurante borrará todos los datos de ventas,
              empleados y menús permanentemente.
            </p>
            <button className="px-5 py-2 bg-white dark:bg-transparent border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs font-bold rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition whitespace-nowrap">
              Eliminar Restaurante
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;