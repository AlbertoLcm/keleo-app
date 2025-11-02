export default function SkeletonOrders() {
  return (
    <div className="bg-white rounded-2xl p-4 ring-1 ring-gray-100 animate-pulse">
      {/* Título */}
      <div className="h-6 w-32 bg-gray-200 rounded-md mb-4" />

      {/* Tabla */}
      <div className="w-full">
        {/* Encabezados */}
        <div className="flex justify-between border-b border-gray-200 pb-3 mb-3">
          <div className="h-4 w-12 bg-gray-200 rounded-md" />
          <div className="h-4 w-10 bg-gray-200 rounded-md" />
          <div className="h-4 w-10 bg-gray-200 rounded-md" />
          <div className="h-4 w-10 bg-gray-200 rounded-md" />
          <div className="h-4 w-6 bg-gray-200 rounded-md" />
        </div>

        {/* Filas (simulamos varias) */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="flex justify-between items-center border-b border-gray-100 py-3"
          >
            <div className="h-4 w-24 bg-gray-200 rounded-md" />
            <div className="h-4 w-10 bg-gray-200 rounded-md" />
            <div className="h-4 w-12 bg-gray-200 rounded-md" />
            <div className="h-4 w-14 bg-gray-200 rounded-md" />
            <div className="h-4 w-12 bg-gray-200 rounded-md" />
          </div>
        ))}

        {/* Total */}
        <div className="flex justify-between items-center pt-4">
          <div className="h-4 w-20 bg-gray-200 rounded-md" />
          <div className="h-4 w-16 bg-gray-200 rounded-md" />
        </div>
      </div>

      {/* Botón */}
      <div className="flex justify-end mt-6">
        <div className="h-10 w-44 bg-gray-200 rounded-xl" />
      </div>
    </div>
  );
}
