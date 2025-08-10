import React, { useRef } from 'react';
import { CheckCircle, TrendingUp, Users, Shield } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { Benefit } from '../../types';

const Benefits: React.FC = () => {
  const benefitsRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(benefitsRef, { threshold: 0.2 });

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
          {/* Image/Visual Side */}
          <div
            className={`mb-16 lg:mb-0 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="relative">
              {/* Main visual container */}
              <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6">
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        Automation Dashboard
                      </h3>
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      </div>
                    </div>

                    {/* Progress bars */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                          <span>Task Automation</span>
                          <span>85%</span>
                        </div>
                        <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full w-4/5"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                          <span>Cost Reduction</span>
                          <span>92%</span>
                        </div>
                        <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full w-11/12"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                          <span>Team Efficiency</span>
                          <span>78%</span>
                        </div>
                        <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full w-3/4"></div>
                        </div>
                      </div>
                    </div>

                    {/* Stats grid */}
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center">
                        <TrendingUp className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                        <div className="text-lg font-bold text-blue-600">↑ 185%</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">ROI Increase</div>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center">
                        <Users className="h-6 w-6 text-green-600 mx-auto mb-1" />
                        <div className="text-lg font-bold text-green-600">500+</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Happy Clients</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
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
              Why Leading Companies Choose Our AI Automation Platform
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Transform your business operations with intelligent automation that adapts to your
              unique needs and scales with your growth ambitions.
            </p>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
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
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105">
                Learn More About Our Solutions
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;