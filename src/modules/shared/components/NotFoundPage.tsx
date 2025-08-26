import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import KeleoLogo from './LogoKeleo';

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.6, staggerChildren: 0.12 },
  },
};

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-dark-bg px-6">

      {/* Fondo decorativo — blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-keleo-500/10 blur-3xl dark:bg-keleo-700/15" />
        <div className="absolute -bottom-24 -right-24 w-[400px] h-[400px] rounded-full bg-keleo-600/10 blur-3xl dark:bg-keleo-900/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-keleo-500/5 blur-[80px]" />
      </div>

      {/* Contenido principal */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center max-w-lg w-full"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >

        {/* Logo flotante */}
        <motion.div
          className="relative mb-10"
          animate="animate"
        >
          {/* Glow detrás del logo */}
          <motion.div
            className="absolute inset-0 rounded-full bg-keleo-500/30 blur-2xl"
            animate="animate"
          />
          <KeleoLogo size={80} className="relative drop-shadow-2xl" />
        </motion.div>

        {/* 404 grande */}
        <motion.div
          className="relative select-none mb-2"
        >
          <span
            className="text-[9rem] md:text-[11rem] font-black leading-none tracking-tighter text-transparent bg-clip-text"
            style={{
              backgroundImage:
                'linear-gradient(135deg, oklch(60.56% 0.219 292.72) 0%, oklch(49.07% 0.241 292.58) 60%, oklch(37.96% 0.178 293.74) 100%)',
            }}
          >
            404
          </span>
        </motion.div>

        {/* Título */}
        <motion.h1
          className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-dark-text mb-3"
        >
          Página no encontrada
        </motion.h1>

        {/* Descripción */}
        <motion.p
          className="text-gray-500 dark:text-gray-400 text-base md:text-lg leading-relaxed mb-10 max-w-sm"
        >
          La ruta que buscas no existe o fue movida. No te preocupes, puedes
          volver al inicio con un solo clic.
        </motion.p>

        {/* Botones */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
        >
          <button
            id="not-found-go-back"
            onClick={() => navigate(-1)}
            className="
              px-6 py-3.5 rounded-xl font-bold text-sm md:text-base
              bg-white text-keleo-700 border-2 border-keleo-100
              hover:border-keleo-300 hover:bg-gray-50
              dark:bg-transparent dark:text-white dark:border-gray-600 dark:hover:bg-white/5
              transition-all duration-200 active:scale-95
            "
          >
            ← Volver atrás
          </button>

          <button
            id="not-found-go-home"
            onClick={() => navigate('/')}
            className="
              px-6 py-3.5 rounded-xl font-bold text-sm md:text-base
              bg-keleo-600 text-white
              hover:bg-keleo-700
              shadow-lg shadow-keleo-500/30
              dark:bg-keleo-700 dark:hover:bg-keleo-600
              transition-all duration-200 active:scale-95
            "
          >
            Ir al inicio
          </button>
        </motion.div>

        {/* Decoración inferior — línea sutil */}
        <motion.div
          className="mt-16 flex items-center gap-3 text-gray-300 dark:text-gray-700"
        >
          <div className="h-px w-16 bg-current" />
          <span className="text-xs font-medium tracking-widest opacity-60">
            Keleo App
          </span>
          <div className="h-px w-16 bg-current" />
        </motion.div>
      </motion.div>
    </div>
  );
}
