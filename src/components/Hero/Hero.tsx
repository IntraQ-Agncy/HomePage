import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play, CheckCircle } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const isVisible = useIntersectionObserver(heroRef, { threshold: 0.3 });

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-br from-blue-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Instant, Verified Leads with{' '}
              <span className="text-blue-600 dark:text-blue-400">AI + Automation</span>
            </h1>
            <p className="mt-6 text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              IntraQ delivers ready-to-use business leads fast. Our flagship service, Google Maps Lead
              Generation, finds and verifies contacts so you can focus on selling, not searching.
            </p>
            
            {/* Key Benefits */}
            <div className="mt-8 space-y-3">
              {[
                'Verified contact data (name, phone, email if available, website)',
                'Delivery within 24 hours in CSV or Excel',
                'India-first targeting with global capability'
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection('#pricing')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 group"
              >
                <span>Get Leads Now</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button
                onClick={() => navigate('/signup?plan=Demo')}
                className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:border-blue-600 dark:hover:border-blue-400 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 group"
              >
                <Play className="h-5 w-5" />
                <span>Get a Demo</span>
              </button>
            </div>

          </div>

          {/* Visual Element */}
          <div
            className={`mt-16 lg:mt-0 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 shadow-2xl">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      AI Process Running
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg h-4 animate-pulse"></div>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg h-4 w-3/4 animate-pulse"></div>
                    <div className="bg-green-100 dark:bg-green-900 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-800 dark:text-green-300 font-medium">
                          Task Completed Successfully
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-yellow-400 rounded-lg p-3 shadow-lg animate-bounce">
                <div className="text-xs font-bold text-gray-900">+85% Efficiency</div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-green-400 rounded-lg p-3 shadow-lg animate-bounce delay-700">
                <div className="text-xs font-bold text-gray-900">$50k Saved</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;