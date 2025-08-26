import { Container, NavBar } from "@/modules/shared";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { User, Mail, Calendar, Edit3, Shield } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-200">
      <NavBar />
      <Container>
        <div className="max-w-4xl mx-auto mt-8 md:mt-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mi Perfil</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Gestiona tu información personal y datos de contacto.</p>
          </div>

          <div className="bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 overflow-hidden">
            {/* Cabecera del perfil */}
            <div className="relative h-32 md:h-48 bg-gradient-to-r from-keleo-500 to-indigo-600">
              <div className="absolute -bottom-12 left-8">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white dark:border-dark-card bg-white dark:bg-dark-bg flex items-center justify-center overflow-hidden shadow-md">
                  {user?.profile_image ? (
                    <img src={user.profile_image} alt={user?.name} className="w-full h-full object-cover" />
                  ) : (
                    <User size={48} className="text-gray-300 dark:text-gray-600" />
                  )}
                </div>
              </div>
              <div className="absolute top-4 right-4">
                <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-xl text-sm font-medium transition flex items-center gap-2">
                  <Edit3 size={16} />
                  Editar Portada
                </button>
              </div>
            </div>

            <div className="pt-16 pb-8 px-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user?.name} {user?.lastname}</h2>
                  <p className="text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
                    <Shield size={16} className="text-keleo-500" />
                    Propietario
                  </p>
                </div>
                <button className="bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200 px-5 py-2.5 rounded-xl font-medium transition flex items-center gap-2 justify-center">
                  <Edit3 size={18} />
                  Editar Perfil
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-white/[0.02] p-5 rounded-2xl border border-gray-100 dark:border-white/5">
                  <div className="flex items-center gap-3 mb-2 text-gray-500 dark:text-gray-400">
                    <Mail size={18} />
                    <span className="text-sm font-medium">Correo Electrónico</span>
                  </div>
                  <p className="text-gray-900 dark:text-white font-medium ml-8">{user?.email}</p>
                </div>
                
                <div className="bg-gray-50 dark:bg-white/[0.02] p-5 rounded-2xl border border-gray-100 dark:border-white/5">
                  <div className="flex items-center gap-3 mb-2 text-gray-500 dark:text-gray-400">
                    <Calendar size={18} />
                    <span className="text-sm font-medium">Miembro desde</span>
                  </div>
                  <p className="text-gray-900 dark:text-white font-medium ml-8">Abril 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
