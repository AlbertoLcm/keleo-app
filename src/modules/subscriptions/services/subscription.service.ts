import api from '@/services/api';

export interface Subscription {
  id: string;
  user_id: string;
  plan: 'free' | 'basic' | 'pro';
  status: 'active' | 'past_due' | 'canceled' | 'trialing' | 'incomplete';
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  created_at: string;
  updated_at: string;
  limits: {
    restaurants: number;
    tables: number;
    products: number;
    employees: number;
    kitchen: boolean;
    advancedRoles: boolean;
  };
}

export const subscriptionService = {
  async getMySubscription(): Promise<Subscription> {
    const res = await api.get('/api/v1/subscriptions/me');
    return res.data;
  },

  async createCheckout(plan: 'basic' | 'pro'): Promise<{ url: string }> {
    const res = await api.post('/api/v1/subscriptions/checkout', { plan });
    return res.data;
  },

  async createBillingPortal(): Promise<{ url: string }> {
    const res = await api.post('/api/v1/subscriptions/portal');
    return res.data;
  },
};
