import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Wallet, 
  Settings, 
  Bell, 
  Search, 
  Activity,
  TrendingUp,
  CreditCard,
  MoreHorizontal,
  LogOut,
  ChevronRight
} from 'lucide-react';

// --- Componentes de UI Reutilizables ---

const GlassCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`backdrop-blur-xl bg-white/10 border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] rounded-2xl p-6 text-white ${className}`}>
    {children}
  </div>
);

const IconButton = ({ icon: Icon, onClick, active = false }: { icon: any; onClick?: () => void; active?: boolean }) => (
  <button 
    onClick={onClick}
    className={`p-3 rounded-xl transition-all duration-300 group
      ${active 
        ? 'bg-white/20 text-white shadow-lg shadow-purple-500/20' 
        : 'text-white/70 hover:bg-white/10 hover:text-white'
      }`}
  >
    <Icon size={24} className="transition-transform group-hover:scale-110" />
  </button>
);

// --- Datos Mock ---
const stats = [
  { title: 'Ingresos Totales', amount: '$54,230', trend: '+12%', icon: Wallet, color: 'from-pink-500 to-rose-500' },
  { title: 'Usuarios Activos', amount: '1,204', trend: '+5%', icon: Users, color: 'from-purple-500 to-indigo-500' },
  { title: 'Ventas del Mes', amount: '450', trend: '+24%', icon: TrendingUp, color: 'from-cyan-500 to-blue-500' },
];

const transactions = [
  { id: 1, name: 'Spotify Premium', date: 'Hace 2 min', amount: '-$12.99', icon: Activity },
  { id: 2, name: 'Transferencia Recibida', date: 'Hace 2 horas', amount: '+$450.00', icon: CreditCard },
  { id: 3, name: 'Apple Services', date: 'Ayer', amount: '-$4.99', icon: Activity },
  { id: 4, name: 'Freelance Pago', date: 'Hace 2 días', amount: '+$1,200.00', icon: Wallet },
];

export default function AppTest() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isScrolled, setIsScrolled] = useState(false);

  // Detectar scroll para efectos visuales en el header
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Layout Principal ---
  return (
    <div className="min-h-screen bg-[#0f0c29] text-white font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden relative">
      
      {/* Fondo Animado/Gradiente */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[128px] opacity-40 animate-pulse"></div>
        <div className="absolute top-[20%] right-[-5%] w-96 h-96 bg-cyan-600 rounded-full mix-blend-screen filter blur-[128px] opacity-30"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-pink-600 rounded-full mix-blend-screen filter blur-[128px] opacity-30"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      <div className="flex h-screen overflow-hidden">
        
        {/* --- Sidebar (Desktop) --- */}
        <aside className="hidden md:flex w-24 lg:w-72 flex-col justify-between p-4 relative z-20">
          <div className="flex flex-col gap-8 h-full">
            {/* Logo */}
            <div className="h-20 flex items-center justify-center lg:justify-start lg:px-4">
              <div className="w-10 h-10 bg-gradient-to-tr from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                <span className="font-bold text-lg">G</span>
              </div>
              <span className="hidden lg:block ml-3 font-bold text-xl tracking-wide">GlassUI</span>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 flex flex-col gap-4">
              {[
                { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                { id: 'wallet', icon: Wallet, label: 'Billetera' },
                { id: 'users', icon: Users, label: 'Comunidad' },
                { id: 'analytics', icon: Activity, label: 'Análisis' },
                { id: 'settings', icon: Settings, label: 'Ajustes' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center p-4 rounded-2xl transition-all duration-300 group relative overflow-hidden
                    ${activeTab === item.id 
                      ? 'bg-white/10 text-white shadow-lg border border-white/10' 
                      : 'text-white/60 hover:bg-white/5 hover:text-white'
                    }`}
                >
                  <item.icon size={22} className={`${activeTab === item.id ? 'text-cyan-400' : ''}`} />
                  <span className="hidden lg:block ml-4 font-medium">{item.label}</span>
                  {activeTab === item.id && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-cyan-400 rounded-r-full shadow-[0_0_10px_cyan]"></div>
                  )}
                </button>
              ))}
            </nav>

            {/* Bottom Action */}
            <button className="flex items-center justify-center lg:justify-start p-4 text-white/50 hover:text-red-400 transition-colors">
              <LogOut size={22} />
              <span className="hidden lg:block ml-4 font-medium">Cerrar Sesión</span>
            </button>
          </div>
        </aside>

        {/* --- Main Content --- */}
        <main className="flex-1 relative overflow-y-auto h-full scrollbar-hide">
          
          {/* Header Responsivo */}
          <header className={`sticky top-0 z-30 px-6 py-4 transition-all duration-300 ${isScrolled ? 'backdrop-blur-md bg-[#0f0c29]/70 border-b border-white/5' : ''}`}>
            <div className="flex items-center justify-between">
              
              {/* Mobile Logo */}
              <div className="md:hidden flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-tr from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="font-bold text-sm">G</span>
                </div>
                <span className="font-bold text-lg">GlassUI</span>
              </div>

              {/* Título Desktop */}
              <h1 className="hidden md:block text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                Resumen General
              </h1>

              {/* Actions Right */}
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 focus-within:bg-white/10 transition-colors">
                  <Search size={18} className="text-white/50" />
                  <input 
                    type="text" 
                    placeholder="Buscar..." 
                    className="bg-transparent border-none outline-none text-sm ml-2 w-32 focus:w-48 transition-all text-white placeholder-white/50"
                  />
                </div>
                
                <button className="relative p-2 rounded-full hover:bg-white/10 transition-colors">
                  <Bell size={20} />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 p-[2px] cursor-pointer hover:scale-105 transition-transform shadow-lg shadow-orange-500/20">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100" 
                    alt="User" 
                    className="w-full h-full rounded-full object-cover border-2 border-[#0f0c29]" 
                  />
                </div>
              </div>
            </div>
          </header>

          <div className="p-6 pb-32 md:pb-10 max-w-7xl mx-auto space-y-8">
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stats.map((stat, i) => (
                <GlassCard key={i} className="relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110`}></div>
                  <div className="flex items-start justify-between mb-4 relative z-10">
                    <div>
                      <p className="text-white/60 text-sm font-medium">{stat.title}</p>
                      <h3 className="text-3xl font-bold mt-1">{stat.amount}</h3>
                    </div>
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                      <stat.icon size={24} className="text-white" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-400 bg-green-400/10 w-fit px-2 py-1 rounded-lg">
                    <TrendingUp size={14} />
                    <span>{stat.trend} este mes</span>
                  </div>
                </GlassCard>
              ))}
            </div>

            {/* Dashboard Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Chart Section (Mock Visual) */}
              <GlassCard className="lg:col-span-2 flex flex-col justify-between min-h-[300px]">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold">Rendimiento Semanal</h3>
                  <button className="p-2 hover:bg-white/10 rounded-lg">
                    <MoreHorizontal size={20} className="text-white/60" />
                  </button>
                </div>
                
                {/* Mock Graph Bars */}
                <div className="flex items-end justify-between gap-2 h-48 px-2">
                  {[40, 65, 30, 85, 55, 90, 45].map((height, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                      <div className="relative w-full max-w-[40px] h-full bg-white/5 rounded-t-lg overflow-hidden">
                         <div 
                           style={{ height: `${height}%` }} 
                           className="absolute bottom-0 w-full bg-gradient-to-t from-cyan-500/50 to-purple-500/50 hover:from-cyan-400 hover:to-purple-400 transition-all duration-500 rounded-t-lg shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                         ></div>
                      </div>
                      <span className="text-xs text-white/40 font-medium group-hover:text-white transition-colors">
                        {['L', 'M', 'M', 'J', 'V', 'S', 'D'][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Recent Transactions */}
              <GlassCard className="lg:col-span-1">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold">Actividad Reciente</h3>
                  <button className="text-xs text-cyan-400 hover:text-cyan-300 font-medium">Ver todo</button>
                </div>
                
                <div className="space-y-4">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-xl transition-colors cursor-pointer group">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-full bg-white/10 group-hover:bg-cyan-500/20 transition-colors">
                          <tx.icon size={18} className="text-cyan-300" />
                        </div>
                        <div>
                          <p className="font-medium text-sm text-white group-hover:text-cyan-200 transition-colors">{tx.name}</p>
                          <p className="text-xs text-white/40">{tx.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-bold ${tx.amount.startsWith('+') ? 'text-green-400' : 'text-white'}`}>
                          {tx.amount}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="w-full mt-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition-all flex items-center justify-center gap-2 group">
                  Ver reporte completo
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </GlassCard>
            </div>

            {/* Banner Section */}
            <div className="relative rounded-2xl overflow-hidden p-8 backdrop-blur-md bg-gradient-to-r from-indigo-600/40 to-purple-600/40 border border-white/20">
               <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                 <div>
                   <h2 className="text-2xl font-bold mb-2">¡Desbloquea las funciones Pro!</h2>
                   <p className="text-white/70 max-w-md">Obtén análisis avanzados, exportación de datos ilimitada y soporte prioritario.</p>
                 </div>
                 <button className="px-6 py-3 bg-white text-indigo-900 font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                   Mejorar Plan
                 </button>
               </div>
               {/* Decoracion */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/30 blur-3xl rounded-full -mr-16 -mt-16"></div>
            </div>

          </div>
        </main>
      </div>

      {/* --- Mobile Bottom Navigation (Moderno) --- */}
      {/* Flota sobre el contenido en la parte inferior */}
      <div className="md:hidden fixed bottom-6 left-4 right-4 z-50">
        <div className="backdrop-blur-xl bg-black/40 border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] rounded-2xl px-6 py-4 flex justify-between items-center">
          <IconButton 
            icon={LayoutDashboard} 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
          />
          <IconButton 
            icon={Wallet} 
            active={activeTab === 'wallet'} 
            onClick={() => setActiveTab('wallet')} 
          />
          <div className="relative -top-8">
             <button className="w-14 h-14 bg-gradient-to-tr from-cyan-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/40 hover:scale-110 transition-transform">
               <span className="text-2xl font-light text-white">+</span>
             </button>
          </div>
          <IconButton 
            icon={Activity} 
            active={activeTab === 'analytics'} 
            onClick={() => setActiveTab('analytics')} 
          />
          <IconButton 
            icon={Settings} 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')} 
          />
        </div>
      </div>

    </div>
  );
}