// Simple localStorage-based storage for MVP
// Will be replaced with Supabase in production

export interface Subscription {
  id: string;
  name: string;
  cost: number;
  billing_cycle: 'monthly' | 'yearly';
  renewal_date: string;
  category: string;
  notes: string;
}

const STORAGE_KEY = 'subtrackr_subscriptions';

export const storage = {
  getSubscriptions: (): Subscription[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveSubscriptions: (subscriptions: Subscription[]): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subscriptions));
  },

  addSubscription: (subscription: Omit<Subscription, 'id'>): Subscription => {
    const subscriptions = storage.getSubscriptions();
    const newSubscription = {
      ...subscription,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    };
    subscriptions.push(newSubscription);
    storage.saveSubscriptions(subscriptions);
    return newSubscription;
  },

  updateSubscription: (id: string, updates: Partial<Subscription>): Subscription | null => {
    const subscriptions = storage.getSubscriptions();
    const index = subscriptions.findIndex(sub => sub.id === id);
    if (index === -1) return null;
    subscriptions[index] = { ...subscriptions[index], ...updates };
    storage.saveSubscriptions(subscriptions);
    return subscriptions[index];
  },

  deleteSubscription: (id: string): boolean => {
    const subscriptions = storage.getSubscriptions();
    const filtered = subscriptions.filter(sub => sub.id !== id);
    if (filtered.length === subscriptions.length) return false;
    storage.saveSubscriptions(filtered);
    return true;
  }
};
