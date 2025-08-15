import React, { useState, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { FAQItem } from '../../types';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(faqRef, { threshold: 0.2 });

  const faqItems: FAQItem[] = [
    {
      question: 'What data do you provide?',
      answer: 'Business name, category, address, phone number, email (if available), website, and Google rating.'
    },
    {
      question: 'Where do the leads come from?',
      answer: 'We use AI + automation to scrape public business listings on Google Maps and then validate the data.'
    },
    {
      question: 'How fast is delivery?',
      answer: 'Within 24 hours of placing an order. Files are delivered in CSV or Excel format.'
    },
    {
      question: 'Do you cover India and international markets?',
      answer: 'Yes. We prioritize India and can deliver global leads on demand.'
    },
    {
      question: 'Which niches can you target?',
      answer: 'Common niches include restaurants, dentists, marketing agencies, real estate agents, salons, and gyms. Custom niches are welcome.'
    },
    {
      question: 'Can I see a sample?',
      answer: 'Yes, contact us and we will share a sample CSV to review before you order.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={faqRef} className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Frequently Asked Questions
          </h2>
          <p
            className={`text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Everything you need to know about IntraQ Google Maps Lead Generation.
          </p>
        </div>

        <div className="space-y-6">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className={`bg-gray-50 dark:bg-gray-800 rounded-2xl transition-all duration-300 hover:shadow-lg border border-gray-200 dark:border-gray-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-2xl"
                aria-expanded={openIndex === index}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-8">
                  {item.question}
                </h3>
                <div className="flex-shrink-0 transition-transform duration-300">
                  {openIndex === index ? (
                    <ChevronUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <ChevronDown className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                  )}
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-8 pb-6">
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div
          className={`mt-16 text-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800 transition-all duration-1000 delay-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Our team is here to help. Get in touch and we'll respond within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
              Contact Support
            </button>
            <button className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
              Book a Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;