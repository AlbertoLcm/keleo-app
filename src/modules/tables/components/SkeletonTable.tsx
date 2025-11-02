export default function SkeletonTableCard() {
  return (
    <div className="bg-white ring-1 ring-gray-200 rounded-xl p-4 h-[200px] relative animate-pulse">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-10 h-10 bg-gray-200 rounded-md" />
        <div className="h-6 bg-gray-200 rounded w-1/2" />
      </div>

      <div className="w-20 h-5 bg-gray-200 rounded-full mb-4" />

      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-2/5 mb-6" />

      <div className="absolute bottom-4 right-4 w-6 h-6 bg-gray-200 rounded-full" />
    </div>
  );
}
