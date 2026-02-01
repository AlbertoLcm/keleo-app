export default function SkeletonCardRestaurant() {
  return (
    <div className="glass-panel rounded-2xl p-6 border border-gray-200 dark:border-dark-border animate-pulse">
      {/* Cabecera */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-4">
          {/* Icono Skeleton */}
          <div className="w-16 h-16 rounded-2xl bg-gray-200 dark:bg-gray-700"></div>
          
          <div className="space-y-2">
            {/* Nombre Skeleton */}
            <div className="h-5 w-32 bg-gray-300 dark:bg-gray-600 rounded"></div>
            {/* Ciudad Skeleton */}
            <div className="flex gap-1 items-center">
              <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
        {/* Botón opciones Skeleton */}
        <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>

      {/* Grid de Stats Skeleton */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-100 dark:bg-gray-700/30 p-3 rounded-xl space-y-2">
          <div className="h-3 w-12 bg-gray-200 dark:bg-gray-600 rounded"></div>
          <div className="h-4 w-16 bg-gray-300 dark:bg-gray-500 rounded"></div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700/30 p-3 rounded-xl space-y-2">
          <div className="h-3 w-10 bg-gray-200 dark:bg-gray-600 rounded"></div>
          <div className="h-4 w-14 bg-gray-300 dark:bg-gray-500 rounded"></div>
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="flex items-center justify-between mt-auto">
        {/* Badge Status Skeleton */}
        <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        
        {/* Link Skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
}