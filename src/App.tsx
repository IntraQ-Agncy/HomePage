import React from 'react';
import { ThemeContext, useThemeState } from './hooks/useTheme';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import Benefits from './components/Benefits/Benefits';
import Reviews from './components/Reviews/Reviews';
import Pricing from './components/Pricing/Pricing';

import FAQ from './components/FAQ/FAQ';
import Footer from './components/Footer/Footer';

function App() {
  const themeState = useThemeState();

  return (
    <ThemeContext.Provider value={themeState}>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Header />
        <main>
          <Hero />
          <Features />
          <Benefits />
          <Reviews />
          <Pricing />

          <FAQ />
        </main>
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;