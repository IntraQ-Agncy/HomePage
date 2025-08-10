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
      title: 'Process Automation',
      description: 'Automate repetitive tasks and workflows with our intelligent AI system. Reduce manual work by 85% and eliminate human errors completely.'
    },
    {
      icon: 'chart',
      title: 'Data Analytics',
      description: 'Get actionable insights from your data with real-time analytics and AI-powered predictions. Make data-driven decisions with confidence.'
    },
    {
      icon: 'share',
      title: 'Smart Integrations',
      description: 'Connect all your existing tools seamlessly with our universal API integrations. Works with 200+ popular business applications.'
    },
    {
      icon: 'clock',
      title: '24/7 Monitoring',
      description: 'Round-the-clock system monitoring with proactive alerts and automatic issue resolution. 99.9% uptime guaranteed with instant notifications.'
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
            Powerful AI Features That Drive Results
          </h2>
          <p
            className={`text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Our comprehensive suite of AI automation tools helps businesses streamline operations,
            reduce costs, and accelerate growth with cutting-edge technology.
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

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { number: '500+', label: 'Companies Trust Us' },
            { number: '85%', label: 'Productivity Increase' },
            { number: '24/7', label: 'Support Available' },
            { number: '99.9%', label: 'Uptime Guarantee' }
          ].map((stat, index) => (
            <div
              key={index}
              className={`text-center transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${600 + index * 150}ms` }}
            >
              <div className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;