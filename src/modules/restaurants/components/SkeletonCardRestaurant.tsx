export default function SkeletonCardRestaurant() {
  return (
    <div className="ring-1 ring-gray-200 rounded-xl p-4 flex flex-col gap-4 h-[250px] animate-pulse">
      <div className="w-16 h-16 bg-gray-200 rounded-full"></div>

      <div className="flex flex-col gap-2">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>

      <div className="h-5 bg-gray-200 rounded w-24"></div>

      <div className="absolute bottom-4 right-4 w-6 h-6 bg-gray-200 rounded-full"></div>
    </div>
  );
}
