export const PAYMENT_LINKS: Record<string, string> = {
  Starter: 'https://rzp.io/rzp/wOp3WpFG',
  Pro: 'https://rzp.io/rzp/WXgxNPyy',
  Enterprise: 'https://rzp.io/rzp/WR0xMgdR',
  ResumeAdvisor: 'https://rzp.io/rzp/pLXHZSr1'
  //'https://rzp.io/rzp/kcqduJjC'
};

export const isValidPlan = (plan: string | null): plan is keyof typeof PAYMENT_LINKS => {
  if (!plan) return false;
  return Object.prototype.hasOwnProperty.call(PAYMENT_LINKS, plan);
};


