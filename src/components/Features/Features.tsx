import React, { useRef } from 'react';
import { Zap, BarChart3, Share2, Clock } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { Feature } from '../../types';

const Features: React.FC = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(featuresRef, { threshold: 0.2 });

  const features: Feature[] = [
    {
      icon: 'zap',
      title: 'Google Maps Scraping',
      description: 'We extract business details directly from Google Maps using AI + automation for speed and scale.'
    },
    {
      icon: 'share',
      title: 'Verified Contacts',
      description: 'Business name, category, address, phone, email (if available), website, and Google rating.'
    },
    {
      icon: 'clock',
      title: '24-Hour Delivery',
      description: 'Get clean, ready-to-use leads delivered in CSV or Excel within 24 hours of your order.'
    },
    {
      icon: 'chart',
      title: 'India + Global',
      description: 'India-first targeting with the ability to deliver leads in international markets on demand.'
    }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'zap':
        return <Zap className="h-8 w-8" />;
      case 'chart':
        return <BarChart3 className="h-8 w-8" />;
      case 'share':
        return <Share2 className="h-8 w-8" />;
      case 'clock':
        return <Clock className="h-8 w-8" />;
      default:
        return <Zap className="h-8 w-8" />;
    }
  };

  return (
    <section id="features" ref={featuresRef} className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Google Maps Lead Generation
          </h2>
          <p
            className={`text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            IntraQ delivers instant, verified business leads so your sales team can focus on outreach,
            not research.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 border border-transparent hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                {getIcon(feature.icon)}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Niche examples */}
        <div className="mt-16 text-center">
          <div className="text-gray-600 dark:text-gray-400">
            Niche examples: Restaurants, dentists, marketing agencies, real estate agents, salons, gyms, and more.
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;