import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { subscriptionService, type Subscription } from '../services/subscription.service';
import { useAuth } from '@/modules/auth/hooks/useAuth';

interface SubscriptionContextValue {
  subscription: Subscription | null;
  plan: 'free' | 'basic' | 'pro';
  isLoading: boolean;
  refetch: () => Promise<void>;
  canAddRestaurant: (currentCount: number) => boolean;
  canAddTable: (currentCount: number) => boolean;
  canAddProduct: (currentCount: number) => boolean;
  canAddEmployee: (currentCount: number) => boolean;
  hasKitchen: boolean;
  hasAdvancedRoles: boolean;
}

const SubscriptionContext = createContext<SubscriptionContextValue>({
  subscription: null,
  plan: 'free',
  isLoading: true,
  refetch: async () => {},
  canAddRestaurant: () => false,
  canAddTable: () => false,
  canAddProduct: () => false,
  canAddEmployee: () => false,
  hasKitchen: false,
  hasAdvancedRoles: false,
});

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSubscription = useCallback(async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      const data = await subscriptionService.getMySubscription();
      setSubscription(data);
    } catch {
      // Silently fail — user stays on Free
      setSubscription(null);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  const plan = subscription?.plan ?? 'free';
  const limits = subscription?.limits;

  const value: SubscriptionContextValue = {
    subscription,
    plan,
    isLoading,
    refetch: fetchSubscription,
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

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscriptionContext() {
  return useContext(SubscriptionContext);
}

export default SubscriptionContext;
