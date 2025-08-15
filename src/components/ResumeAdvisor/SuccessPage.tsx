import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Mail, ArrowRight, Star, Clock, Shield, Zap, FileText, Target } from 'lucide-react';

interface ResumeAnalysis {
  email: string;
  targetRole: string;
  analysisId: string;
  message: string;
}

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);

  useEffect(() => {
    // Get analysis data from session storage
    const analysisData = sessionStorage.getItem('resumeAnalysis');
    if (analysisData) {
      try {
        setAnalysis(JSON.parse(analysisData));
      } catch (error) {
        console.error('Failed to parse analysis data:', error);
      }
    }
  }, []);

  const handleUpsell = () => {
    // In production, this would integrate with payment gateway
    alert('Premium service coming soon! This would redirect to payment for ₹299 resume rewriting service.');
  };

  const premiumFeatures = [
    {
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
      title: 'AI-Powered Rewriting',
      description: 'Complete resume rewrite optimized for your target role'
    },
    {
      icon: <Star className="h-6 w-6 text-yellow-500" />,
      title: 'ATS Optimization',
      description: 'Guaranteed to pass Applicant Tracking Systems'
    },
    {
      icon: <Clock className="h-6 w-6 text-yellow-500" />,
      title: '24-Hour Delivery',
      description: 'Get your rewritten resume within 24 hours'
    },
    {
      icon: <Shield className="h-6 w-6 text-yellow-500" />,
      title: 'Professional Quality',
      description: 'Resume written by AI trained on HR best practices'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-16">
            <div className="bg-green-100 dark:bg-green-900 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Analysis Complete!
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Your resume has been successfully analyzed by our AI. Check your email for detailed 
              improvement suggestions and optimization tips.
            </p>
            
            {/* Analysis Details */}
            {analysis && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6 max-w-md mx-auto">
                <div className="space-y-3 text-left">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-blue-800 dark:text-blue-200">
                      Analysis ID: {analysis.analysisId}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-blue-800 dark:text-blue-200">
                      Target Role: {analysis.targetRole}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-blue-800 dark:text-blue-200">
                      Email: {analysis.email}
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-center space-x-2 text-blue-600 dark:text-blue-400">
              <Mail className="h-5 w-5" />
              <span className="font-medium">Check your email for feedback</span>
            </div>
          </div>

          {/* Upsell Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Want a Complete Resume Makeover?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                While you wait for your feedback, consider upgrading to our premium service
              </p>
              <div className="inline-flex items-center bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 px-4 py-2 rounded-full text-sm font-medium">
                <Star className="h-4 w-4 mr-2 fill-current" />
                Premium Service
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {premiumFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">₹299</span>
                <span className="text-lg text-gray-600 dark:text-gray-300 ml-2">one-time</span>
              </div>
              <button
                onClick={handleUpsell}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg flex items-center mx-auto space-x-2"
              >
                <span>Upgrade to Premium</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                No subscription • Cancel anytime • 30-day money-back guarantee
              </p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              What to Do Next
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Check Your Email
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Look for our email with detailed feedback and improvement suggestions
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">2</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Apply the Feedback
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Use our AI suggestions to improve your resume and make it ATS-friendly
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">3</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Land More Interviews
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Submit your improved resume and start getting more interview calls
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center mt-12 space-y-4">
            <button
              onClick={() => navigate('/resume-advisor')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300 mr-4"
            >
              Back to Resume Advisor
            </button>
            <button
              onClick={() => navigate('/')}
              className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
