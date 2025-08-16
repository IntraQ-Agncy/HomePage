import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeContext, useThemeState } from './hooks/useTheme';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import Benefits from './components/Benefits/Benefits';
import Reviews from './components/Reviews/Reviews';
import Pricing from './components/Pricing/Pricing';
import FAQ from './components/FAQ/FAQ';
import Footer from './components/Footer/Footer';
import ResumeAdvisor from './components/ResumeAdvisor/ResumeAdvisor';
import UploadForm from './components/ResumeAdvisor/UploadForm';
import SuccessPage from './components/ResumeAdvisor/SuccessPage';
import SignupForm from './components/Form/SignupForm';

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Something went wrong
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Home Page Component
const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Features />
      <Benefits />
      <Reviews />
      <Pricing />
      <FAQ />
    </>
  );
};



function App() {
  const themeState = useThemeState();

  return (
    <ErrorBoundary>
      <ThemeContext.Provider value={themeState}>
        <Router>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/resume-advisor" element={<ResumeAdvisor />} />
                <Route path="/resume-advisor/upload" element={<UploadForm />} />
                <Route path="/resume-advisor/success" element={<SuccessPage />} />
                <Route path="/signup" element={<SignupForm />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ThemeContext.Provider>
    </ErrorBoundary>
  );
}

export default App;