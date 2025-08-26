import { useNavigate } from "react-router";
import TableCard from "../components/TableCard";
import { ROUTES } from "../../../routes/paths";

const mesas = [
  { id: 1, status: "Disponible", capacity: 4, name: "Mesa 1" },
  { id: 2, status: "Ocupada", capacity: 2, name: "Mesa 2" },
  { id: 3, status: "Reservada", capacity: 6, name: "Mesa 3" },
  { id: 4, status: "Disponible", capacity: 8, name: "Mesa 4" },
  { id: 5, status: "Ocupada", capacity: 4, name: "Mesa 5" },
  { id: 6, status: "Reservada", capacity: 2, name: "Mesa 6" },
];

export default function TablesPage() {
  const navigate = useNavigate();
  
  return (
    <div>
      <section className="py-14 bg-white">
        <div className="max-w-[1200px] mx-auto p-4">
          <p className="text-gray-500 text-xl font-medium tracking-wide mb-2" title="Ventas del día" aria-label="Ventas del día" role="status" aria-live="polite" aria-busy="false" aria-atomic="true" data-testid="ventas-del-dia">Ventas del día</p>
          <h1 className="text-5xl font-medium">Mesas del restaurante</h1>
        </div>
      </section>
      <section className="max-w-[1200px] mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mesas.map((mesa) => (
          <TableCard
            key={mesa.id}
            tableId={mesa.id}
            name={mesa.name}
            status={mesa.status as "Disponible" | "Ocupada" | "Reservada"}
            capacity={mesa.capacity}
            onClick={(id) => navigate(ROUTES.TABLES.DETAIL(id))}
          />
        ))}
      </section>
    </div>
  );
}
