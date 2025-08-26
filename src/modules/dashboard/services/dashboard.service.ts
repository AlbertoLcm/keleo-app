import api from '@/api/axios';

export interface DashboardStats {
  sales: {
    total: number;
    yesterdayTotal: number;
    percentageComparation: number;
  };
  activeTables: {
    total: number;
    occupied: number;
  };
  kitchenOrders: number;
  staff: {
    active: number;
    total: number;
  };
  recentOrders: {
    id: string;
    table: string;
    status: 'pending' | 'served' | 'ready';
    total: number;
  }[];
  topItems: {
    name: string;
    count: number;
    revenue: number;
    image: string;
  }[];
  chartData: {
    time: string;
    value: number;
    amount: string;
  }[];
}

export const getDashboardStats = async (restaurantId: string): Promise<DashboardStats> => {
  const { data } = await api.get(`/restaurants/${restaurantId}/dashboard-stats`);
  return data;
};
