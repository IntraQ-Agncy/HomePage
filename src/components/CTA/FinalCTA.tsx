import React, { useRef } from 'react';
import { ArrowRight, CheckCircle, Users, Zap, Shield } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const FinalCTA: React.FC = () => {
  const ctaRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ctaRef, { threshold: 0.3 });

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={ctaRef}
      className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Ready to Transform Your Business?
          </h2>
          <p
            className={`text-xl text-blue-100 max-w-3xl mx-auto mb-12 leading-relaxed transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Join the AI automation revolution. Start your free trial today and discover how
            intelligent automation can boost productivity, reduce costs, and accelerate your growth.
          </p>

          {/* Key Benefits Grid */}
          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Users className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">500+ Companies</h3>
                <p className="text-blue-100 text-sm">Already transforming with our platform</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Zap className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">85% Efficiency</h3>
                <p className="text-blue-100 text-sm">Average productivity increase</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Shield className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">99.9% Uptime</h3>
                <p className="text-blue-100 text-sm">Enterprise-grade reliability</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-6 justify-center mb-12 transition-all duration-1000 delay-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <button
              onClick={() => scrollToSection('#contact')}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-10 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 group shadow-lg"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button
              onClick={() => scrollToSection('#contact')}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/20 hover:border-white/40 px-10 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105"
            >
              Book a Demo
            </button>
          </div>

          {/* Trust Indicators */}
          <div
            className={`border-t border-white/20 pt-8 transition-all duration-1000 delay-800 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-blue-100">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>Setup in 24 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-pulse opacity-20">
        <div className="w-32 h-32 bg-white/10 rounded-full"></div>
      </div>
      <div className="absolute bottom-20 right-10 animate-pulse opacity-20 delay-1000">
        <div className="w-24 h-24 bg-yellow-400/20 rounded-full"></div>
      </div>
    </section>
  );
};

export default FinalCTA;