import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Upload, FileText, Mail, Target } from 'lucide-react';

const UploadForm: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    resume: null as File | null,
    targetRole: '',
    email: ''
  });

  useEffect(() => {
    // Get email from URL if provided
    const email = searchParams.get('email');
    if (email) {
      setFormData(prev => ({ ...prev, email }));
    }
    
    // Simple check: if they don't have the paid parameter, show payment reminder
    const paid = searchParams.get('paid');
    if (paid !== '1') {
      // Don't redirect, just show a friendly reminder
      console.log('Payment verification required');
    }
  }, [searchParams]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, resume: file }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.resume) {
      alert('Please select a resume file');
      return;
    }
    
    if (!formData.targetRole || !formData.email) {
      alert('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    
    try {
      // Import and use the actual resume analysis API
      const { analyzeResume } = await import('../../api/resumeAdvisor');
      
      const result = await analyzeResume({
        resume: formData.resume,
        targetRole: formData.targetRole,
        email: formData.email
      });
      
      if (result.success) {
        // Store analysis result in session storage for success page
        sessionStorage.setItem('resumeAnalysis', JSON.stringify({
          email: formData.email,
          targetRole: formData.targetRole,
          analysisId: result.analysisId,
          message: result.message
        }));
        navigate('/resume-advisor/success');
      } else {
        alert(`Analysis failed: ${result.message}`);
      }
    } catch (error) {
      console.error('Resume analysis error:', error);
      alert('Failed to analyze resume. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const paid = searchParams.get('paid') === '1';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/resume-advisor')}
            className="flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Resume Advisor
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Upload Your Resume
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Get AI-powered feedback to improve your resume
          </p>
          
          {/* Payment Status */}
          {paid ? (
            <div className="mt-4 space-y-2">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                ✅ Payment Confirmed - Ready to Upload
              </div>
              {formData.email && (
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  📧 Verified Email: {formData.email}
                </div>
              )}
            </div>
          ) : (
            <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
              ⚠️ Payment Required - Please complete payment first
            </div>
          )}
        </div>

        {/* Payment Reminder */}
        {!paid && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-yellow-100 dark:bg-yellow-800 rounded-full p-2">
                <Target className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">
                  Payment Required
                </h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Please complete your ₹20 payment to access the resume analysis service.
                </p>
                <button
                  onClick={() => navigate('/resume-advisor')}
                  className="mt-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded text-sm font-medium"
                >
                  Go to Payment
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Resume File (PDF or DOCX) *
            </label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileChange}
                className="hidden"
                id="resume-upload"
                required
              />
              <label htmlFor="resume-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  {formData.resume ? formData.resume.name : 'Click to select file or drag and drop'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                  PDF or DOCX files only
                </p>
              </label>
            </div>
            {formData.resume && (
              <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                ✓ Selected: {formData.resume.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Target Role *
            </label>
            <input
              type="text"
              name="targetRole"
              value={formData.targetRole}
              onChange={handleInputChange}
              placeholder="e.g., Software Engineer, Marketing Manager"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !paid}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-300 ${
              isLoading || !paid
                ? 'bg-gray-400 cursor-not-allowed text-gray-200'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Analyzing Resume...
              </span>
            ) : (
              'Analyze Resume'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadForm;
