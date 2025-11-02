import { useNavigate, useParams } from "react-router";
import TableCard from "../components/TableCard";
import { Button, EmptyState, InputSearch } from "@/shared";
import { DeviceTabletSpeakerIcon, PlusIcon } from "@phosphor-icons/react";
import { ROUTES } from "@/routes/paths";
import { useEffect, useState } from "react";
import type { InfoMesa } from "../types";
import api from "@/api/axios";
import type { UUID } from "crypto";
import SkeletonTableCard from "../components/SkeletonTable";
import GridTables from "../components/GridTables";

export default function TablesPage() {
  const navigate = useNavigate();
  const { id_restaurante } = useParams<{ id_restaurante: UUID }>();

  const [mesas, setMesas] = useState<InfoMesa[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchMesas() {
      try {
        const { data } = await api.get(`/restaurants/${id_restaurante}/tables`);
        setMesas(data);
      } catch (error) {
        console.error("Error al obtener mesas:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id_restaurante) {
      setLoading(true);
      fetchMesas();
    }
  }, [id_restaurante]);

  const renderTables = () => {
    if (loading) {
      return (
        <GridTables>
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonTableCard key={i} />
          ))}
        </GridTables>
      );
    }

    if (mesas.length === 0) {
      return (
        <EmptyState
          title="Aún no tienes mesas"
          description="Crea tu primer mesa para comenzar a gestionar tus órdenes"
          actionLabel="Crear la primera"
          icon={<DeviceTabletSpeakerIcon size={80} weight="thin" />}
          onAction={() => navigate(ROUTES.TABLES.NEW)}
        />
      );
    }

    return (
      <GridTables>
        {mesas.map((mesa) => (
          <TableCard
            key={mesa.id}
            tableId={mesa.id}
            name={mesa.name}
            status={mesa.status as "Disponible" | "Ocupada" | "Reservada"}
            capacity={mesa.capacity}
            onClick={(id) => navigate(`${id}`)}
          />
        ))}
      </GridTables>
    );
  };

  return (
    <div>
      <section className="pb-16 flex flex-col gap-4">
        <h1 className="flex text-2xl sm:text-3xl text-gray-800">
          Todas las mesas
        </h1>
        {/* Contenedor de búsqueda y botón */}
        <div className="flex mt-4 flex-col sm:flex-row items-start gap-4 w-full sm:w-auto">
          <div className="w-full sm:w-64">
            <InputSearch
              onSearch={(query) => console.log("Buscando:", query)}
              placeholder="Buscar Mesa..."
              size="md"
              delay={500}
              className="w-full"
            />
          </div>
          <Button onClick={() => navigate(ROUTES.TABLES.NEW)}>
            <PlusIcon size={20} />
            <span className="ml-1">Añadir Mesa</span>
          </Button>
        </div>
      </section>

      {renderTables()}
    </div>
  );
}
