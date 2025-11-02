import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import CardRestaurant from "../components/CardRestaurant";
import { ROUTES } from "@/routes/paths";
import { Button, Container, EmptyState, InputSearch } from "@/shared";
import type { Restaurant } from "../types";
import api from "@/api/axios";
import { PlusIcon, ShrimpIcon } from "@phosphor-icons/react";
import SkeletonCardRestaurant from "../components/SkeletonCardRestaurant";
import GridCardsRestaurants from "../components/GridCardsRestaurants";
import Header from "@/shared/components/Header";

export default function RestaurantsPage() {
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRestaurants = async (filters?: {
      search?: string;
      ownerId?: string;
    }) => {
      try {
        setLoading(true);
        const response = await api.get("/restaurants", {
          params: {
            search: filters?.search,
          },
        });
        setRestaurants(response.data);
      } catch (err) {
        console.error("Error al cargar restaurantes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants({});
  }, []);

  const renderRestaurants = () => {
    if (loading) {
      return (
        <GridCardsRestaurants>
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCardRestaurant key={i} />
          ))}
        </GridCardsRestaurants>
      );
    }

    if (restaurants.length === 0) {
      return (
        <EmptyState
          title="Aún no tienes restaurantes"
          description="Crea tu primer restaurante para comenzar a gestionar tus órdenes"
          icon={<ShrimpIcon size={80} weight="thin" />}
          onAction={() => navigate(ROUTES.RESTAURANTS.NEW)}
        />
      );
    }

    return (
      <GridCardsRestaurants>
        {restaurants.map((restaurant) => (
          <CardRestaurant
            key={restaurant.id}
            cardId={restaurant.id}
            name={restaurant.name}
            address={restaurant.address}
            logo={restaurant.logo_url}
            onClick={() => navigate(ROUTES.RESTAURANTS.DETAIL(restaurant.id))}
          />
        ))}
      </GridCardsRestaurants>
    );
  };

  return (
    <>
      <Header sidebarOpen={false} setSidebarOpen={() => {}} />
      <Container>
        <section className="pb-10 pt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Título */}
          <h1 className="text-3xl sm:text-4xl text-gray-800 sm:text-left">
            Restaurantes
          </h1>

          {/* Contenedor de búsqueda y botón */}
          <div className="flex flex-col sm:flex-row items-start gap-3 w-full sm:w-auto mt-6 sm:mt-0">
            <div className="w-full sm:w-64">
              <InputSearch
                onSearch={(query) => console.log("Buscando:", query)}
                placeholder="Buscar restaurante..."
                size="md"
                delay={500}
                className="w-full"
              />
            </div>
            <Button onClick={() => navigate(ROUTES.RESTAURANTS.NEW)}>
              <PlusIcon size={20} />
              <span className="ml-1">Añadir Restaurante</span>
            </Button>
          </div>
        </section>

        {renderRestaurants()}
      </Container>
    </>
  );
}
