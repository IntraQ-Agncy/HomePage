import React, { useState } from 'react';
import { FileText, Upload, Mail, CheckCircle, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const ResumeAdvisor: React.FC = () => {
  const navigate = useNavigate();

  const howItWorks = [
    {
      icon: <FileText className="h-8 w-8 text-blue-600" />,
      title: 'Upload Resume',
      description: 'Upload your resume in PDF or DOCX format'
    },
    {
      icon: <Upload className="h-8 w-8 text-blue-600" />,
      title: 'Complete Payment',
      description: 'Pay ₹20 to access our AI analysis tool'
    },
    {
      icon: <Mail className="h-8 w-8 text-blue-600" />,
      title: 'Get Feedback',
      description: 'Receive detailed improvement suggestions via email'
    }
  ];

  const benefits = [
    {
      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
      title: 'ATS-Friendly',
      description: 'Optimize for Applicant Tracking Systems'
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
      title: 'Save Time',
      description: 'Get professional feedback in minutes, not days'
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
      title: 'Just ₹20',
      description: 'Professional resume advice at an unbeatable price'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Software Engineer',
      content: 'The AI suggestions helped me land my dream job!',
      rating: 5
    },
    {
      name: 'Rahul Patel',
      role: 'Marketing Manager',
      content: 'Quick, affordable, and incredibly helpful feedback.',
      rating: 5
    },
    {
      name: 'Anjali Singh',
      role: 'Data Analyst',
      content: 'Professional quality advice at a fraction of the cost.',
      rating: 5
    }
  ];

  const faqs = [
    {
      question: 'How long does it take to get feedback?',
      answer: 'You\'ll receive your AI-generated feedback within 5 minutes via email.'
    },
    {
      question: 'What file formats are supported?',
      answer: 'We support PDF and DOCX formats for resume uploads.'
    },
    {
      question: 'Is my resume data secure?',
      answer: 'Yes, we use industry-standard encryption and never store your personal data.'
    },
    {
      question: 'Can I get a refund?',
      answer: 'We offer a 100% satisfaction guarantee. If you\'re not happy, we\'ll refund your payment.'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            AI Resume Improvement Advisor
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Get professional resume feedback powered by AI in under 5 minutes for just ₹20. 
            Upload your resume and complete payment to access our AI analysis tool and optimize your CV for ATS systems.
          </p>
          <button
            onClick={() => navigate('/resume-advisor/upload')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Upload Resume & Continue - ₹20
          </button>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Why Choose Our AI Resume Advisor?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Improve Your Resume?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Upload your resume and complete payment to access our AI-powered resume analysis tool for just ₹20
          </p>
          <button
            onClick={() => navigate('/resume-advisor/upload')}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg flex items-center mx-auto space-x-2"
          >
            <Upload className="h-5 w-5 mr-2" />
            <span>Upload Resume & Continue - ₹20</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Developer Test Link */}
      <div className="py-8 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            🧪 Developer: <a 
              href="/resume-advisor/test" 
              className="text-blue-500 hover:text-blue-600 underline"
            >
              Test Backend Services
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResumeAdvisor;
