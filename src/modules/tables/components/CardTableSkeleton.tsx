const CardTableSkeleton: React.FC = () => {
  return (
    <div className="relative glass-panel rounded-2xl p-5 border border-white/50 dark:border-white/5 bg-white/5 dark:bg-gray-800/20 animate-pulse">
      
      {/* Header: Nombre y Status */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col gap-2">
          {/* Nombre de la mesa */}
          <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
          {/* Área */}
          <div className="h-3 w-16 bg-gray-100 dark:bg-gray-800 rounded-md"></div>
        </div>
        {/* Badge de Status */}
        <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      </div>

      {/* Body: Imitamos el estado 'occupied' que es el más común/complejo */}
      <div className="flex items-center justify-between mb-4">
        {/* Avatares de clientes */}
        <div className="flex -space-x-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800"
            ></div>
          ))}
        </div>
        
        {/* Tiempo / Info derecha */}
        <div className="flex flex-col items-end gap-1">
          <div className="h-3 w-10 bg-gray-100 dark:bg-gray-800 rounded"></div>
          <div className="h-4 w-14 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>

      {/* Footer: Totales y Botón */}
      <div className="pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          {/* Label total */}
          <div className="h-3 w-16 bg-gray-100 dark:bg-gray-800 rounded"></div>
          {/* Monto */}
          <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
        </div>

        {/* Botón de acción */}
        <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </div>
  );
};

export default CardTableSkeleton;