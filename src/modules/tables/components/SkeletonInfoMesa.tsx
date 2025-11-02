export default function SkeletonInfoMesa() {
  return (
    <section className="mb-6 animate-pulse">
      <div className="flex items-center gap-4">
        {/* Botón de regresar */}
        <div className="w-10 h-10 bg-gray-200 rounded-lg" />

        {/* Título */}
        <div className="h-6 w-40 bg-gray-200 rounded-md" />

        {/* Estado */}
        <div className="h-5 w-16 bg-gray-200 rounded-full" />
      </div>

      {/* Descripción */}
      <div className="mt-4 mb-10">
        <div className="h-4 w-64 bg-gray-200 rounded-md mb-2" />
        <div className="h-4 w-48 bg-gray-200 rounded-md" />
      </div>

      {/* Botón de agregar */}
      <div className="flex items-center gap-2 w-40 h-10 bg-gray-200 rounded-xl" />
    </section>
  );
}
