export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Benefit {
  title: string;
  description: string;
}

export interface Review {
  company: string;
  logo: string;
  review: string;
  author: string;
  role: string;
  rating: number;
  plan?: 'Starter' | 'Pro' | 'Enterprise';
  metrics?: {
    label: string;
    value: string;
  };
}