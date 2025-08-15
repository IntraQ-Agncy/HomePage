import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play, CheckCircle, MapPin, Phone, Mail, Globe, Star, Download } from 'lucide-react';
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

          {/* Visual Element - Product-aligned lead preview */}
          <div
            className={`mt-16 lg:mt-0 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 shadow-2xl">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">Google Maps Leads</span>
                    </div>
                    <button className="flex items-center space-x-2 text-xs font-medium text-blue-600 dark:text-blue-400">
                      <Download className="h-4 w-4" />
                      <span>CSV / Excel</span>
                    </button>
                  </div>

                  {/* Lead list */}
                  <div className="space-y-4">
                    {[{
                      name: 'Green Leaf Restaurant',
                      category: 'Restaurant • North Indian',
                      rating: 4.6,
                      phone: '+91 98765 43210',
                      website: 'greenleaf.in'
                    }, {
                      name: 'SmileCare Dental Clinic',
                      category: 'Dentist • Healthcare',
                      rating: 4.8,
                      phone: '+91 99887 77665',
                      website: 'smilecare.co'
                    }, {
                      name: 'GrowthMark Agency',
                      category: 'Marketing Agency',
                      rating: 4.5,
                      phone: '+91 90123 45678',
                      website: 'growthmark.agency'
                    }].map((lead, idx) => (
                      <div key={idx} className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold text-gray-900 dark:text-white">{lead.name}</span>
                              <span className="inline-flex items-center text-xs text-yellow-600 dark:text-yellow-400">
                                <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" /> {lead.rating}
                              </span>
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">{lead.category}</div>
                            <div className="flex items-center space-x-4 mt-3 text-xs text-gray-700 dark:text-gray-300">
                              <span className="inline-flex items-center"><Phone className="h-3.5 w-3.5 mr-1" /> {lead.phone}</span>
                              <span className="inline-flex items-center"><Mail className="h-3.5 w-3.5 mr-1" /> available if public</span>
                              <span className="inline-flex items-center"><Globe className="h-3.5 w-3.5 mr-1" /> {lead.website}</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end text-[10px] text-gray-500 dark:text-gray-400">
                            <span className="inline-flex items-center"><MapPin className="h-3 w-3 mr-1" /> Delhi NCR</span>
                            <span className="mt-1">Google Maps</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating captions */}
              <div className="absolute -top-4 -right-4 bg-yellow-400 rounded-lg p-3 shadow-lg animate-bounce">
                <div className="text-xs font-bold text-gray-900">24h Delivery</div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-green-400 rounded-lg p-3 shadow-lg animate-bounce delay-700">
                <div className="text-xs font-bold text-gray-900">CSV / Excel</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;