import React from 'react';
import { motion, type Variants } from 'framer-motion';

// 1. Variantes para el contenedor principal
// Cambiamos "hidden/visible" a "initial/animate" para unificar el árbol de herencia.
const containerVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: "beforeChildren", 
    },
  },
};

// 2. Variantes para el Vapor
const steamVariants: Variants = {
  initial: {
    y: 10,
    opacity: 0,
    scaleX: 1,
  },
  animate: (customDelay: number) => ({
    y: [-10, -60], // Aumentamos un poco la subida para que se desvanezca más alto
    opacity: [0, 0.7, 0],
    scaleX: [1, 1.4, 1.8],
    transition: {
      duration: 2.2,
      repeat: Infinity,
      ease: [0.4, 0, 0.6, 1],
      delay: customDelay,
    },
  }),
};

// 3. Variantes para la Campana
const clocheVariants: Variants = {
  initial: { y: 0, rotate: 0 }, // Añadido estado inicial para evitar saltos
  animate: {
    y: [0, -8, 0], // Movimiento un poco más sutil
    rotate: [0, 1.5, -1.5, 0], 
    transition: {
      duration: 3, // Ligeramente más rápido para que parezca que hierve
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// 4. Contenedor para orquestar los puntos
const dotContainerVariants: Variants = {
  initial: {}, // Necesario para que el padre propague el estado
  animate: {
    transition: {
      staggerChildren: 0.2, // Aumentado ligeramente para que el rebote sea más legible
    },
  },
};

// 5. Variantes para los puntos suspensivos
const dotVariants: Variants = {
  initial: { y: 0 },
  animate: {
    y: [0, -6, 0], // Usar un array de 3 pasos es más estable que usar "repeatType: reverse" en versiones recientes
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const LoadingScreen: React.FC = () => {
  return (
    <motion.div
      // Se agregó min-h-screen para garantizar que ocupe espacio si no está en un contenedor absoluto
      className="flex flex-col justify-center items-center h-full min-h-[300px] w-full bg-violet-50/50" 
      variants={containerVariants}
      initial="initial" // Unificado
      animate="animate" // Unificado
    >
      <div className="relative w-48 h-48 flex justify-center items-center mb-2">
        
        {/* --- Sección del Vapor --- */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex space-x-3 z-0">
          {[
            { h: 'h-14', d: 0, w: 'w-1.5' },
            { h: 'h-20', d: 0.5, w: 'w-2' },
            { h: 'h-12', d: 0.25, w: 'w-1.5' },
          ].map((steam, index) => (
            <motion.div
              key={index}
              className={`${steam.w} ${steam.h} bg-gradient-to-t from-violet-300/80 to-transparent rounded-full blur-[1px]`} // Añadido un ligero blur para efecto de vapor real
              variants={steamVariants}
              custom={steam.d}
              // NOTA: Eliminados initial y animate aquí porque se heredan automáticamente del padre
            />
          ))}
        </div>

        {/* --- Sección de la Campana (Cloche) --- */}
        <motion.div
          className="relative z-10 text-violet-600 mt-8"
          variants={clocheVariants}
          // Hereda initial y animate automáticamente
          style={{
            filter: 'drop-shadow(0 15px 20px rgba(124, 58, 237, 0.25))',
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2 19h20v2H2z" className="text-gray-400" fill="currentColor" /> {/* Tailwind clases para la base */}
            <path d="M12 3c-4.97 0-9 4.03-9 9v5h18v-5c0-4.97-4.03-9-9-9zm0-2c1.1 0 2 .9 2 2H10c0-1.1.9-2 2-2z" />
          </svg>
        </motion.div>
      </div>

      {/* --- Sección del Texto y Puntos --- */}
      <div className="flex items-center space-x-1.5 text-violet-700 font-bold tracking-widest text-sm uppercase">
        <span className="opacity-80">Preparando Cocina</span>
        
        <motion.div 
            className="flex space-x-0.5 w-6" // Ancho fijo para evitar que el texto salte cuando los puntos suben
            variants={dotContainerVariants} 
        >
          {[0, 1, 2].map((index) => (
            <motion.span
              key={index}
              variants={dotVariants}
              className="inline-block"
            >
              .
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;