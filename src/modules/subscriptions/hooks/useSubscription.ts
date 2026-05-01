import { useState, useEffect, useCallback } from 'react';
import { subscriptionService, type Subscription } from '../services/subscription.service';

export function useSubscription() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscription = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await subscriptionService.getMySubscription();
      setSubscription(data);
    } catch (err) {
      setError('No se pudo cargar la suscripción');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  const plan = subscription?.plan ?? 'free';
  const limits = subscription?.limits;

  return {
    subscription,
    plan,
    isLoading,
    error,
    refetch: fetchSubscription,
    // Computed limits
    canAddRestaurant: (currentCount: number) =>
      limits ? currentCount < (limits.restaurants === Infinity ? 999 : limits.restaurants) : false,
    canAddTable: (currentCount: number) =>
      limits ? (limits.tables === Infinity || currentCount < limits.tables) : false,
    canAddProduct: (currentCount: number) =>
      limits ? (limits.products === Infinity || currentCount < limits.products) : false,
    canAddEmployee: (currentCount: number) =>
      limits ? (limits.employees === Infinity || currentCount < limits.employees) : false,
    hasKitchen: limits?.kitchen ?? false,
    hasAdvancedRoles: limits?.advancedRoles ?? false,
  };
}
