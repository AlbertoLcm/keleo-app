import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axiosInstance from "@/api/axios";
import { useParams } from "react-router";
import { LoadingScreen } from "@/modules/shared";

interface RestaurantDetails {
  id: string;
  name: string;
  role: string;
  logo_url?: string;
}

interface RestaurantContextType {
  restaurant: RestaurantDetails | null;
  role: string | null;
  isLoading: boolean;
}

const RestaurantContext = createContext<RestaurantContextType>({
  restaurant: null,
  role: null,
  isLoading: true,
});

export const RestaurantProvider = ({ children }: { children: ReactNode }) => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const [restaurant, setRestaurant] = useState<RestaurantDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!restaurantId) {
      setIsLoading(false);
      return;
    }

    const fetchRestaurant = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(`/restaurants/${restaurantId}`);
        setRestaurant(response.data);
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestaurant();
  }, [restaurantId]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <RestaurantContext.Provider value={{ restaurant, role: restaurant?.role || null, isLoading }}>
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurantRole = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error("useRestaurantRole must be used within a RestaurantProvider");
  }
  return context;
};
