import { Container, NavBar } from "@/modules/shared";
import { Check, CreditCard, Sparkles, Zap } from "lucide-react";

export default function SubscriptionPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-200 pb-12">
      <NavBar />
      <Container>
        <div className="max-w-5xl mx-auto mt-8 md:mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-keleo-100 dark:bg-keleo-900/30 text-keleo-600 dark:text-keleo-400 text-sm font-bold mb-6">
            <Sparkles size={16} />
            Planes de Suscripción
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            Impulsa el crecimiento de tu restaurante
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Elige el plan ideal para llevar tu negocio al siguiente nivel. Cancelación en cualquier momento.
          </p>
        </div>

        <div className="max-w-5xl mx-auto mt-12 grid md:grid-cols-2 gap-8 items-center cursor-default">
          
          {/* Plan Pro */}
          <div className="bg-white dark:bg-dark-card rounded-3xl p-8 border border-gray-200 dark:border-white/5 shadow-sm relative overflow-hidden group hover:border-keleo-300 dark:hover:border-keleo-700 transition-colors">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Pro</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 hidden sm:block">Ideal para restaurantes en crecimiento buscando mejorar su flujo.</p>
            <div className="mb-6">
              <span className="text-4xl font-extrabold text-gray-900 dark:text-white">$49</span>
              <span className="text-gray-500 dark:text-gray-400"> /mes</span>
            </div>
            
            <ul className="space-y-4 mb-8">
              {[
                "Hasta 3 sucursales",
                "Gestión de mesas en tiempo real",
                "Soporte por correo electrónico",
                "Menú digital QR básico"
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center shrink-0">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
            
            <button className="w-full py-3.5 rounded-xl border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white font-bold hover:bg-gray-50 dark:hover:bg-white/5 transition flex items-center justify-center gap-2">
              <CreditCard size={18} />
              Seleccionar Plan Pro
            </button>
          </div>

          {/* Plan Premium */}
          <div className="bg-gradient-to-b from-keleo-600 to-indigo-700 rounded-3xl p-8 border border-keleo-500 shadow-xl relative overflow-hidden text-white scale-[1.02] md:scale-[1.05] z-10">
            <div className="absolute top-0 right-0 p-4">
              <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <Zap size={14} className="text-yellow-300" />
                Más Popular
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-2">Premium</h3>
            <p className="text-keleo-100 mb-6 hidden sm:block">La solución completa para tu cadena de restaurantes.</p>
            <div className="mb-6">
              <span className="text-4xl font-extrabold">$99</span>
              <span className="text-keleo-200"> /mes</span>
            </div>
            
            <ul className="space-y-4 mb-8">
              {[
                "Sucursales ilimitadas",
                "Funciones Pro completas",
                "Soporte prioritario 24/7 (WhatsApp)",
                "Analíticas avanzadas y reportes",
                "Integración con delivery"
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-white">
                  <div className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center shrink-0">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
            
            <button className="w-full py-3.5 rounded-xl bg-white text-keleo-600 font-bold hover:bg-gray-50 transition shadow-lg flex items-center justify-center gap-2">
              <Sparkles size={18} />
              Actualizar a Premium
            </button>
          </div>
          
        </div>
      </Container>
    </div>
  );
}
