export const PAYMENT_LINKS: Record<string, string> = {
  Starter: 'https://rzp.io/rzp/M0lZUz6',
  Pro: 'https://rzp.io/rzp/Bcjd6xI',
  Enterprise: 'https://rzp.io/rzp/2nNX9hu'
};

export const PLAN_PRICES: Record<string, number> = {
  Starter: 899,
  Pro: 1999,
  Enterprise: 3499 // Can be updated later if needed
};

export const isValidPlan = (plan: string | null): plan is keyof typeof PAYMENT_LINKS => {
  if (!plan) return false;
  return Object.prototype.hasOwnProperty.call(PAYMENT_LINKS, plan);
};

export const isDemoPlan = (plan: string | null) => plan === 'Demo';


