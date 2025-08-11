import React, { useRef } from 'react';
import { Star, TrendingUp, Clock, DollarSign, Users } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { Review } from '../../types';

const Reviews: React.FC = () => {
  const reviewsRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(reviewsRef, { threshold: 0.2 });

  const reviews: Review[] = [
    {
      company: "TechFlow Solutions",
      logo: "TF",
      review: "intraQ completely transformed our workflow efficiency. We've automated 90% of our repetitive tasks and our team productivity has skyrocketed. The implementation was seamless and the support team is exceptional.",
      author: "David Chen",
      role: "CTO",
      rating: 5,
      metrics: {
        label: "Time Saved",
        value: "40hrs/week"
      }
    },
    {
      company: "DataSync Corp",
      logo: "DS",
      review: "The ROI we've seen from intraQ is incredible. Within 3 months, we reduced operational costs by 60% and improved our data processing speed by 300%. It's been a game-changer for our business.",
      author: "Sarah Martinez",
      role: "Operations Director",
      rating: 5,
      metrics: {
        label: "Cost Reduction",
        value: "60%"
      }
    },
    {
      company: "SmartOps Inc",
      logo: "SO",
      review: "We were skeptical about AI automation, but intraQ proved us wrong. The platform is intuitive, powerful, and has helped us scale our operations without hiring additional staff. Highly recommended!",
      author: "Michael Johnson",
      role: "CEO",
      rating: 5,
      metrics: {
        label: "Efficiency Gain",
        value: "85%"
      }
    },
    {
      company: "InnovateTech",
      logo: "IT",
      review: "intraQ's integration capabilities are outstanding. We connected all our systems in just 2 days and started seeing results immediately. The analytics dashboard gives us insights we never had before.",
      author: "Lisa Wang",
      role: "Head of Technology",
      rating: 5,
      metrics: {
        label: "Setup Time",
        value: "2 days"
      }
    },
    {
      company: "GrowthLabs",
      logo: "GL",
      review: "The customer support is phenomenal. Whenever we had questions during implementation, their team was there to help. The platform has helped us automate our entire customer onboarding process.",
      author: "Robert Kim",
      role: "VP of Customer Success",
      rating: 5,
      metrics: {
        label: "Response Time",
        value: "< 2hrs"
      }
    },
    {
      company: "ScaleUp Ventures",
      logo: "SV",
      review: "As a growing startup, intraQ has been crucial for our scaling efforts. We can handle 10x more customers with the same team size. The automation workflows are incredibly flexible and powerful.",
      author: "Amanda Foster",
      role: "Founder",
      rating: 5,
      metrics: {
        label: "Customer Growth",
        value: "10x"
      }
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  const getMetricIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case 'time saved':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'cost reduction':
        return <DollarSign className="h-4 w-4 text-green-600" />;
      case 'efficiency gain':
        return <TrendingUp className="h-4 w-4 text-purple-600" />;
      case 'customer growth':
        return <Users className="h-4 w-4 text-orange-600" />;
      default:
        return <TrendingUp className="h-4 w-4 text-blue-600" />;
    }
  };

  return (
    <section ref={reviewsRef} className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            What Our Customers Say
          </h2>
          <p
            className={`text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Join hundreds of companies that have transformed their operations with our AI automation platform.
            See real results from real businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className={`bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Company Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{review.logo}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                      {review.company}
                    </h3>
                    <div className="flex items-center space-x-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                </div>
                {review.metrics && (
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-400">
                      {getMetricIcon(review.metrics.label)}
                      <span>{review.metrics.label}</span>
                    </div>
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {review.metrics.value}
                    </div>
                  </div>
                )}
              </div>

              {/* Review Text */}
              <blockquote className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed text-sm">
                "{review.review}"
              </blockquote>

              {/* Author */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-xs">
                      {review.author.split(' ').map(name => name[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white text-sm">
                      {review.author}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {review.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div
          className={`mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 delay-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">500+</div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">4.9/5</div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">85%</div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">Efficiency Increase</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">24/7</div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;