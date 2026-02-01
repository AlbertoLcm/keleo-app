import React, { useState } from 'react';
import { 
  Home, 
  Users, 
  Settings, 
  BarChart2, 
  Menu, 
  X, 
  Bell, 
  Search, 
  ChevronRight,
  HelpCircle
} from 'lucide-react';

// --- Tipos e Interfaces ---

interface SidebarItem {
  title: string;
  icon: React.ElementType;
  active?: boolean;
  badge?: number;
}

// --- Componentes ---

// Componente de botón de navegación individual
const NavItem: React.FC<SidebarItem> = ({ title, icon: Icon, active, badge }) => {
  return (
    <button
      className={`
        flex items-center w-full px-4 py-3 text-sm font-medium transition-all duration-200 rounded-xl group relative overflow-hidden
        ${active 
          ? 'bg-white/20 text-white shadow-lg border border-white/20 backdrop-blur-sm' 
          : 'text-white/70 hover:bg-white/10 hover:text-white hover:shadow-md border border-transparent'}
      `}
    >
      <Icon className={`w-5 h-5 mr-3 ${active ? 'text-white' : 'text-white/70 group-hover:text-white'}`} />
      <span className="flex-1 text-left">{title}</span>
      {badge && (
        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${active ? 'bg-white text-purple-600' : 'bg-white/20 text-white'}`}>
          {badge}
        </span>
      )}
      {!badge && active && <ChevronRight className="w-4 h-4 ml-auto text-white/80" />}
      
      {/* Brillo sutil al hacer hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </button>
  );
};

// Componente Principal de la Aplicación
export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    // Fondo principal con degradado vibrante para resaltar el efecto glass
    <div className="flex h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden font-sans text-slate-100 selection:bg-pink-500 selection:text-white">
      
      {/* Elementos decorativos de fondo (Orbes brillantes) */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-600/30 rounded-full blur-[120px] pointer-events-none" />

      {/* Overlay Móvil */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Component (Glassmorphism) */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:static lg:translate-x-0 lg:flex lg:flex-col
          
          /* Estilos Glass */
          bg-white/10 backdrop-blur-xl border-r border-white/20 shadow-2xl
        `}
      >
        {/* Header Sidebar */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-white/10">
          <div className="flex items-center gap-3 font-bold text-xl text-white tracking-wide">
             <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 to-violet-500 rounded-xl blur-sm opacity-70"></div>
                <div className="relative w-10 h-10 bg-gradient-to-tr from-pink-500 to-violet-500 rounded-xl flex items-center justify-center text-white shadow-inner border border-white/20">
                  <span className="text-lg">⚡</span>
                </div>
             </div>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">GlassUI</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-white/70 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          <p className="px-4 text-xs font-bold text-white/40 uppercase tracking-widest mb-2 mt-2">
              Menu Principal
          </p>
          <NavItem title="Inicio" icon={Home} active={true} />
          <NavItem title="Usuarios" icon={Users} badge={5} />
          <NavItem title="Analíticas" icon={BarChart2} />
          
          <div className="my-6 border-t border-white/10 mx-2"></div>
          
          <p className="px-4 text-xs font-bold text-white/40 uppercase tracking-widest mb-2">
              Sistema
          </p>
          <NavItem title="Ajustes" icon={Settings} />
        </nav>

        {/* Footer Sidebar */}
        <div className="p-4 border-t border-white/10 bg-black/10 backdrop-blur-md">
           <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
             <div className="w-10 h-10 rounded-full border-2 border-white/30 overflow-hidden shadow-lg">
                <img src="https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff" alt="User" />
             </div>
             <div>
               <p className="text-sm font-semibold text-white">Admin User</p>
               <p className="text-xs text-white/50">admin@glass.com</p>
             </div>
           </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        
        {/* Top Header Glass */}
        <header className="h-20 flex items-center justify-between px-4 lg:px-8 border-b border-white/10 bg-white/5 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-4">
            {/* Botón Hamburguesa */}
            <button 
              onClick={toggleSidebar}
              className="p-2 text-white/80 rounded-lg hover:bg-white/10 lg:hidden focus:outline-none transition-colors"
            >
              <Menu size={24} />
            </button>
            
            {/* Barra de búsqueda Glass */}
            <div className="hidden md:flex items-center relative max-w-md w-full group">
              <Search className="absolute left-3 text-white/50 w-5 h-5 group-focus-within:text-white/80 transition-colors" />
              <input 
                type="text" 
                placeholder="Buscar..." 
                className="pl-10 pr-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-sm text-white placeholder-white/40 focus:outline-none focus:bg-black/30 focus:border-white/30 w-64 transition-all focus:w-80 shadow-inner"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2.5 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200">
              <Bell size={20} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-pink-500 rounded-full shadow-[0_0_8px_rgba(236,72,153,0.8)]"></span>
            </button>
          </div>
        </header>

        {/* Main Content Scrollable Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb / Title */}
            <div className="mb-10 mt-2">
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70 drop-shadow-sm">Panel de Control</h1>
              <p className="text-white/60 mt-1 font-light">Bienvenido de nuevo a tu espacio de trabajo.</p>
            </div>

            {/* Grid de Stats Glass */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {[
                { label: 'Usuarios Totales', val: '2,543', change: '+12.5%', color: 'blue' },
                { label: 'Ingresos', val: '$45,200', change: '+5.2%', color: 'emerald' },
                { label: 'Tasa de Rebote', val: '42%', change: '-2.1%', color: 'rose' }
              ].map((stat, i) => (
                <div key={i} className="group relative bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-lg hover:bg-white/15 transition-all duration-300 hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl pointer-events-none" />
                  <p className="text-sm font-medium text-white/60">{stat.label}</p>
                  <div className="flex items-baseline gap-3 mt-3">
                    <span className="text-3xl font-bold text-white tracking-tight">{stat.val}</span>
                    <span 
                      className={`text-xs font-bold px-2.5 py-1 rounded-lg backdrop-blur-md border border-white/10 
                      ${stat.color === 'emerald' ? 'bg-emerald-500/20 text-emerald-300' : 
                        stat.color === 'rose' ? 'bg-rose-500/20 text-rose-300' : 
                        'bg-blue-500/20 text-blue-300'}`}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Tarjeta de Contenido Glass */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden relative">
               {/* Decoración interna sutil */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none" />
              
              <div className="p-8 border-b border-white/10 flex justify-between items-center relative z-10">
                <h3 className="text-lg font-semibold text-white">Actividad Reciente</h3>
                <button className="text-sm text-pink-300 hover:text-pink-200 font-medium transition-colors">Ver todo</button>
              </div>
              <div className="p-8 relative z-10">
                <div className="space-y-6">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center shrink-0 border border-white/10 shadow-inner">
                        <Users size={20} className="text-white/80" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">Nuevo usuario registrado</p>
                        <p className="text-sm text-white/50 mt-0.5">El usuario ID #{2020 + item} se ha unido al equipo.</p>
                        <span className="text-xs text-white/30 mt-2 block font-medium">Hace {item * 5} minutos</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}