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
              question: "How quickly can we implement intraQ in our existing workflow?",
      answer: "Most clients see their first automated processes running within 24-48 hours. Our team provides dedicated onboarding support, and our platform integrates with 200+ existing tools through our universal API connectors. The average full deployment takes 1-2 weeks, depending on complexity."
    },
    {
      question: "What's the learning curve for our team to start using the platform?",
      answer: "intraQ is designed for non-technical users. Most team members are productive within their first day. We provide comprehensive training materials, video tutorials, and dedicated support during your first month. Our drag-and-drop interface requires no coding knowledge."
    },
    {
      question: "How secure is our data with intraQ?",
      answer: "Security is our top priority. We're SOC 2 Type II compliant, use end-to-end encryption, and maintain 99.9% uptime. Your data is processed in secure, isolated environments and we never access your confidential information. We also support on-premise deployments for enterprise clients."
    },
    {
      question: "Can intraQ integrate with our current software stack?",
      answer: "Yes, we support integrations with over 200 popular business applications including CRMs, ERPs, marketing tools, and custom APIs. Our universal connectors work with Salesforce, HubSpot, Microsoft 365, Google Workspace, Slack, and many more. Custom integrations are also available."
    },
    {
      question: "What happens if we need to scale up or down our usage?",
      answer: "Our platform scales instantly with your needs. You can upgrade or downgrade your plan at any time with no long-term commitments. Usage-based billing ensures you only pay for what you use, and our enterprise plans offer unlimited automation for high-volume operations."
    },
    {
      question: "What kind of support do you provide?",
      answer: "We offer 24/7 support across all plans. Starter plans include email support with same-day response, Professional plans get priority support with video calls, and Enterprise clients have dedicated success managers. We also provide implementation assistance and ongoing optimization recommendations."
    },
    {
      question: "How do you measure ROI and success?",
      answer: "Our platform provides detailed analytics showing time saved, cost reduction, error elimination, and productivity gains. Most clients see 3-5x ROI within the first quarter. We also provide monthly reports and work with you to identify new automation opportunities for continued optimization."
    },
    {
      question: "What if intraQ doesn't work for our specific use case?",
      answer: "We offer a 14-day free trial with full access to all features, so you can test everything risk-free. If you're not satisfied within the first 30 days, we provide a full refund. Our success team also works with you during the trial to ensure optimal configuration for your specific needs."
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
            Get answers to common questions about our AI automation platform and how it can
            transform your business operations.
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