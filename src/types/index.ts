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
  buttonText: string;
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
  metrics?: {
    label: string;
    value: string;
  };
}