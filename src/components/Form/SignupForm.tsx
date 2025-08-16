import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PAYMENT_LINKS, isValidPlan } from '../../config/payments';

const SignupForm: React.FC = () => {
  const query = new URLSearchParams(useLocation().search);
  const navigate = useNavigate();

  const selectedPlan = query.get('plan') && isValidPlan(query.get('plan')) ? query.get('plan')! : 'Starter';

  const [email, setEmail] = useState('');
  const [niche, setNiche] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState<'India' | 'International' | ''>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!niche) newErrors.niche = 'Please enter your niche';
    if (!location) newErrors.location = 'Please enter your location';
    if (!phone || !/^\+?[0-9\-()\s]{7,15}$/.test(phone)) newErrors.phone = 'Please enter a valid phone number';
    if (!country) newErrors.country = 'Please select a country option';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    const orderId = `ORD-${Date.now()}`;

    // Persist locally
    sessionStorage.setItem(
      'signupLead',
      JSON.stringify({ email, niche, location, phone, country, plan: selectedPlan, orderId })
    );

    // Log the submission locally
    console.log('Signup submitted:', { email, niche, location, phone, country, plan: selectedPlan, orderId });

    // Immediately redirect to payment
    const paymentUrl = PAYMENT_LINKS[selectedPlan as keyof typeof PAYMENT_LINKS];
    if (paymentUrl) {
      window.open(paymentUrl, '_blank');
    }
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-600 dark:text-gray-300 hover:underline"
          >
            ← Back
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Complete Your Details
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Selected plan: <span className="font-semibold">{selectedPlan}</span>
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Niche
              </label>
              <input
                type="text"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Real Estate, SaaS, Ecommerce"
              />
              {errors.niche && (
                <p className="mt-2 text-sm text-red-600">{errors.niche}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="City / Region"
              />
              {errors.location && (
                <p className="mt-2 text-sm text-red-600">{errors.location}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., +91 98765 43210"
              />
              {errors.phone && (
                <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Country
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setCountry('India')}
                  className={`px-4 py-3 rounded-lg border text-left ${
                    country === 'India'
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200'
                      : 'border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white'
                  }`}
                >
                  India
                </button>
                <button
                  type="button"
                  onClick={() => setCountry('International')}
                  className={`px-4 py-3 rounded-lg border text-left ${
                    country === 'International'
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200'
                      : 'border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white'
                  }`}
                >
                  International
                </button>
              </div>
              {errors.country && (
                <p className="mt-2 text-sm text-red-600">{errors.country}</p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:scale-[1.01] bg-blue-600 hover:bg-blue-700 text-white ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {submitting ? 'Processing…' : 'Submit'}
              </button>
            </div>
          </form>


        </div>
      </div>
    </section>
  );
};

export default SignupForm;


