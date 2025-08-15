import React, { useRef } from 'react';
import { Check, Star } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { PricingTier } from '../../types';

// Component to render payment buttons that redirect to the signup form
const PaymentButton: React.FC<{ planName: string }> = ({ planName }) => {
  const handleButtonClick = () => {
    window.location.href = `/signup?plan=${encodeURIComponent(planName)}`;
  };

  return (
    <button
      onClick={handleButtonClick}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
    >
      Get {planName} - ₹{planName === 'Starter' ? '899' : planName === 'Pro' ? '1,999' : '3,499'}
    </button>
  );
};

const Pricing: React.FC = () => {
  const pricingRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(pricingRef, { threshold: 0.2 });

  const pricingTiers: PricingTier[] = [
    {
      name: 'Starter',
      price: '₹899',
      period: '',
      description: 'Perfect to test the waters with focused outreach',
      features: [
        '100 verified leads',
        'Google Maps source',
        'CSV/Excel delivery in 24 hours',
        'India-first targeting'
      ]
    },
    {
      name: 'Pro',
      price: '₹1,999',
      period: '',
      description: 'Best value for growing teams ramping up outreach',
      features: [
        '250 verified leads',
        'Google Maps source',
        'CSV/Excel delivery in 24 hours',
        'India + Global targeting'
      ],
      isPopular: true
    },
    {
      name: 'Enterprise',
      price: '₹3,499',
      period: '',
      description: 'High-volume lead generation at scale',
      features: [
        '500 verified leads',
        'Google Maps source',
        'CSV/Excel delivery in 24 hours',
        'Priority support'
      ]
    }
  ];

  // Remove the handleSelectPlan function as we're using Razorpay buttons now

  return (
    <section id="pricing" ref={pricingRef} className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Choose Your Package
          </h2>
          <p
            className={`text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Start with our 14-day free trial. No credit card required. Scale as you grow with
            transparent pricing that grows with your success.
          </p>

          {/* Intro blurb */}
          <div
            className={`text-gray-600 dark:text-gray-400 max-w-3xl mx-auto transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Delivered in 24 hours • CSV/Excel • Google Maps source • India + International
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl border ${
                tier.isPopular
                  ? 'border-blue-500 shadow-xl scale-105'
                  : 'border-gray-200 dark:border-gray-700 shadow-lg'
              } p-8 transition-all duration-300 hover:shadow-xl ${
                !tier.isPopular ? 'hover:scale-105' : ''
              } ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Popular Badge */}
              {tier.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Star className="h-4 w-4" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {tier.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {tier.description}
                </p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    {tier.price}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400 ml-2">
                    {tier.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

                              <PaymentButton planName={tier.name} />
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div
          className={`mt-16 text-center transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Data fields: name, category, address, phone, email (if available), website, rating
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
            <div className="flex items-center space-x-2">
              <Check className="h-5 w-5 text-green-500" />
              <span className="text-gray-700 dark:text-gray-300">99.9% Uptime SLA</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-5 w-5 text-green-500" />
              <span className="text-gray-700 dark:text-gray-300">24/7 Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-5 w-5 text-green-500" />
              <span className="text-gray-700 dark:text-gray-300">SOC 2 Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;