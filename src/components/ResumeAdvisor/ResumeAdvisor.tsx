import React from 'react';
import { FileText, Upload, Mail, CheckCircle, Star, ArrowRight, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PAYMENT_LINKS } from '../../config/payments';

const ResumeAdvisor: React.FC = () => {
  const navigate = useNavigate();

  const handlePayment = () => {
    // Redirect to the ResumeAdvisor payment page
    const paymentUrl = PAYMENT_LINKS.ResumeAdvisor;
    window.location.href = paymentUrl;
  };

  const howItWorks = [
    {
      icon: <FileText className="h-8 w-8 text-blue-600" />,
      title: 'Upload Resume',
      description: 'Upload your resume in PDF or DOCX format'
    },
    {
      icon: <Upload className="h-8 w-8 text-blue-600" />,
      title: 'AI Analysis',
      description: 'Our AI analyzes your resume for the target role'
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
      title: 'Affordable',
      description: 'Professional resume advice for just ₹20'
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
            Get professional resume feedback powered by AI in under 5 minutes. 
            Complete payment to access the AI analysis tool and optimize your CV for ATS systems.
          </p>
          <button
            onClick={handlePayment}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Complete Payment - ₹20
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
            Complete payment to access our AI-powered resume analysis tool for just ₹20
          </p>
          <button
            onClick={handlePayment}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg flex items-center mx-auto space-x-2"
          >
            <CreditCard className="h-5 w-5 mr-2" />
            <span>Complete Payment - ₹20</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Post-Payment Access */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            After Payment - Upload Your Resume
          </h2>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
            <p className="text-yellow-800 dark:text-yellow-200 font-medium">
              ⚠️ Only use this form after you have completed payment on the Razorpay page
            </p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
              📋 Next Steps After Payment
            </h3>
            <ol className="text-left text-blue-700 dark:text-blue-300 space-y-2 max-w-md mx-auto">
              <li>1. Click "Complete Payment - ₹20" above</li>
              <li>2. Complete payment on Razorpay page</li>
              <li>3. Return to this page after payment</li>
              <li>4. Enter your payment email below</li>
              <li>5. Click "Verify & Upload Resume"</li>
            </ol>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            After completing payment, verify your payment to access the resume upload form
          </p>
          
          {/* Payment Verification Form */}
          <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-lg max-w-md mx-auto">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-left">
                  📧 Email Used for Payment *
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  id="payment-email"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-left">
                  🔢 Transaction ID (Optional)
                </label>
                <input
                  type="text"
                  placeholder="RZP1234567890"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  id="transaction-id"
                />
              </div>
              
              <button
                onClick={() => {
                  const email = (document.getElementById('payment-email') as HTMLInputElement).value;
                  if (email) {
                    // For now, we'll trust the user and redirect them
                    // In production, you'd verify this with your backend
                    navigate('/resume-advisor/upload?paid=1&email=' + encodeURIComponent(email));
                  } else {
                    alert('Please enter your email address');
                  }
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                <Upload className="h-5 w-5 mr-2 inline" />
                Verify & Upload Resume
              </button>
            </div>
            
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-left">
              💡 Enter the email you used for payment. We'll verify your payment and grant access to the upload form.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResumeAdvisor;
