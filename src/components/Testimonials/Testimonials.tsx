import React, { useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { Testimonial } from '../../types';

const Testimonials: React.FC = () => {
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(testimonialsRef, { threshold: 0.2 });

  const testimonials: Testimonial[] = [
    {
              quote: "intraQ transformed our customer service operations completely. We've seen a 90% reduction in response time and our customer satisfaction scores have never been higher. The ROI was evident within the first month.",
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



      </div>
    </section>
  );
};

export default Testimonials;