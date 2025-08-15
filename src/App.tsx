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
  );
}

export default App;