import React, { useRef } from 'react';
import { CheckCircle, TrendingUp, Users, Shield, MapPin, Phone, Mail, Globe, Star, Download } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { Benefit } from '../../types';

const Benefits: React.FC = () => {
  const benefitsRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(benefitsRef, { threshold: 0.2 });
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const benefits: Benefit[] = [
    {
      title: 'Boost Productivity by 85%',
      description: 'Eliminate manual tasks and focus on strategic initiatives that drive real business value.'
    },
    {
      title: 'Reduce Operational Costs',
      description: 'Save thousands monthly by automating processes that traditionally require multiple team members.'
    },
    {
      title: 'Scale Without Limits',
      description: 'Handle increased workload seamlessly without proportional increase in resources or staffing.'
    },
    {
      title: 'Enhanced Data Security',
      description: 'Enterprise-grade security with encrypted data processing and compliance with industry standards.'
    },
    {
      title: 'Real-time Decision Making',
      description: 'Get instant insights and automated responses to changing business conditions and opportunities.'
    },
    {
      title: 'Seamless Team Collaboration',
      description: 'Improve team efficiency with automated workflows that keep everyone aligned and informed.'
    }
  ];

  return (
    <section id="about" ref={benefitsRef} className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          {/* Visual Side - Product-themed illustration */}
          <div
            className={`mb-16 lg:mb-0 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="relative">
              {/* Product-aligned card */}
              <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6">
                  {/* Title row */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-bold text-gray-900 dark:text-white">What You Get</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-blue-600 dark:text-blue-400">
                      <Download className="h-4 w-4" />
                      <span>CSV / Excel</span>
                    </div>
                  </div>

                  {/* Icon grid representing data fields */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center">
                      <Phone className="h-6 w-6 mx-auto text-blue-600" />
                      <div className="mt-2 text-xs text-gray-700 dark:text-gray-300">Phone</div>
                    </div>
                    <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center">
                      <Mail className="h-6 w-6 mx-auto text-blue-600" />
                      <div className="mt-2 text-xs text-gray-700 dark:text-gray-300">Email*</div>
                    </div>
                    <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center">
                      <Globe className="h-6 w-6 mx-auto text-blue-600" />
                      <div className="mt-2 text-xs text-gray-700 dark:text-gray-300">Website</div>
                    </div>
                    <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center">
                      <MapPin className="h-6 w-6 mx-auto text-blue-600" />
                      <div className="mt-2 text-xs text-gray-700 dark:text-gray-300">Address</div>
                    </div>
                    <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center">
                      <Star className="h-6 w-6 mx-auto text-yellow-500" />
                      <div className="mt-2 text-xs text-gray-700 dark:text-gray-300">Rating</div>
                    </div>
                    <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center">
                      <Users className="h-6 w-6 mx-auto text-blue-600" />
                      <div className="mt-2 text-xs text-gray-700 dark:text-gray-300">Category</div>
                    </div>
                  </div>

                  {/* Footnote */}
                  <div className="mt-4 text-[11px] text-gray-500 dark:text-gray-400">* Email included when publicly available</div>
                </div>
              </div>

              {/* Floating element */}
              <div className="absolute -top-6 -right-6 bg-yellow-400 rounded-full p-4 shadow-lg animate-pulse">
                <Shield className="h-6 w-6 text-gray-900" />
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              What You Get with IntraQ
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              AI-powered, instant, verified leads from Google Maps. Built for sales teams who want results fast.
            </p>

            <div className="space-y-6">
              {[
                { title: 'Data Fields', description: 'Business name, category, address, phone number, email (if available), website, Google rating.' },
                { title: 'Target Markets', description: 'India first, with ability to deliver global leads.' },
                { title: 'Output Format', description: 'Delivered in CSV or Excel within 24 hours of order.' },
                { title: 'Use Cases', description: 'Great for restaurants, dentists, marketing agencies, real estate agents, salons, gyms, and more.' }
              ].map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="h-6 w-6 text-green-500 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <button onClick={() => scrollToSection('#pricing')} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105">
                Explore Packages
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;