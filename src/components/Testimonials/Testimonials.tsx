import React, { useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { Testimonial } from '../../types';

const Testimonials: React.FC = () => {
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(testimonialsRef, { threshold: 0.2 });

  const testimonials: Testimonial[] = [
    {
      quote: "AutomateAI transformed our customer service operations completely. We've seen a 90% reduction in response time and our customer satisfaction scores have never been higher. The ROI was evident within the first month.",
      author: "Sarah Johnson",
      role: "Head of Operations",
      company: "TechFlow Solutions",
      rating: 5
    },
    {
      quote: "The integration capabilities are phenomenal. We connected all our systems in just 2 days and started seeing immediate benefits. Our team can now focus on strategic initiatives instead of manual data entry.",
      author: "Michael Chen",
      role: "CTO",
      company: "DataSync Corp",
      rating: 5
    },
    {
      quote: "What impressed me most was the ease of implementation and the ongoing support. The AI learns our processes and continuously improves. We've saved over 200 hours per month in operational tasks.",
      author: "Emily Rodriguez",
      role: "VP of Engineering",
      company: "SmartOps Inc",
      rating: 5
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  return (
    <section ref={testimonialsRef} className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Trusted by Industry Leaders
          </h2>
          <p
            className={`text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            See how companies like yours are transforming their operations and achieving
            exceptional results with our AI automation platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-700 relative ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8">
                <div className="bg-blue-600 rounded-full p-3 shadow-lg">
                  <Quote className="h-6 w-6 text-white" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-6 pt-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 dark:text-gray-300 mb-6 italic leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="flex items-center space-x-4">
                  {/* Avatar placeholder */}
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      {testimonial.author.split(' ').map(name => name[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                    <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className={`mt-16 text-center transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Join 500+ companies already transforming with AI
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start your free trial today and see the difference automation can make for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                Start Free Trial
              </button>
              <button className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                Book a Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;