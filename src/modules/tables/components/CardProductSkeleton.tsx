const CardProductSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-dark-card p-2 rounded-xl flex sm:flex-col gap-3 relative overflow-hidden">
      <div className="w-24 h-24 sm:w-full sm:h-36 flex-shrink-0 rounded-lg bg-gray-200 dark:bg-gray-700/50 animate-pulse" />

      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          <div className="flex justify-between items-start mb-2 gap-2">
            <div className="h-5 w-2/3 bg-gray-200 dark:bg-gray-700/50 rounded animate-pulse" />
            <div className="h-5 w-12 bg-gray-200 dark:bg-gray-700/50 rounded-md animate-pulse flex-shrink-0" />
          </div>

          <div className="flex flex-col gap-1.5 mt-2">
            <div className="h-3 w-full bg-gray-200 dark:bg-gray-700/50 rounded animate-pulse" />
            <div className="h-3 w-4/5 bg-gray-200 dark:bg-gray-700/50 rounded animate-pulse" />
          </div>
        </div>

        <div className="mt-4 w-full h-9 bg-gray-200 dark:bg-gray-700/50 rounded-lg animate-pulse" />
      </div>
    </div>
  );
};

export default CardProductSkeleton;
