import api from "@/api/axios";

export interface RestaurantHour {
  day_of_week: number;
  open_time: string;
  close_time: string;
  is_closed: boolean;
}

export interface RestaurantSetting {
  key_name: string;
  value_text: string;
}

export interface RestaurantSettingsResponse {
  id: string;

  name: string;
  address: string | null;
  phone: string | null;
  logo_url: string | null;
  city: string | null;
  postal_code: string | null;
  restaurant_hours: RestaurantHour[];
  restaurant_settings: RestaurantSetting[];
}

export interface UpdateRestaurantSettingsDto {
  name?: string;
  phone?: string;
  address?: string;
  logo_url?: string;
  restaurant_hours?: RestaurantHour[];
  restaurant_settings?: RestaurantSetting[];
}

export const getRestaurantSettings = async (id: string): Promise<RestaurantSettingsResponse> => {
  const { data } = await api.get<RestaurantSettingsResponse>(`/restaurants/${id}`);
  return data;
};

export const updateRestaurantSettings = async (id: string, updateData: UpdateRestaurantSettingsDto): Promise<RestaurantSettingsResponse> => {
  const { data } = await api.patch<RestaurantSettingsResponse>(`/restaurants/${id}`, updateData);
  return data;
};

export const deleteRestaurant = async (id: string): Promise<void> => {
  await api.delete(`/restaurants/${id}`);
};
