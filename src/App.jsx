import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer, MobileStickyBar } from './components/Footer';
import { CosmicBackground } from './components/CosmicBackground';
import { HomePage } from './pages/HomePage';
import { CheckoutPage } from './pages/CheckoutPage';

// Component to handle scrolling to hash links on route change
const ScrollToHash = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToHash />
        <CosmicBackground />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
          </div>
          <Footer />
          <MobileStickyBar />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
