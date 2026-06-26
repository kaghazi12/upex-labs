import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { QuestionnaireProvider } from './context/QuestionnaireContext';
import { Navbar } from './components/Navbar';
import { Footer, MobileStickyBar } from './components/Footer';
import { CosmicBackground } from './components/CosmicBackground';
import { HomePage } from './pages/HomePage';
import { QuestionnairePage } from './pages/QuestionnairePage';
import { CheckoutPage } from './pages/CheckoutPage';
import { BookingPreviewPage } from './pages/BookingPreviewPage';

import { ChatWidget } from './components/ChatWidget';
import { ChatProvider } from './context/ChatContext';

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
      <ChatProvider>
        <QuestionnaireProvider>
          <BrowserRouter>
            <ScrollToHash />
          <CosmicBackground />
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/questionnaire" element={<QuestionnairePage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/booking-preview" element={<BookingPreviewPage />} />
              </Routes>
            </div>
            <ChatWidget />
            <Footer />
            <MobileStickyBar />
          </div>
        </BrowserRouter>
      </QuestionnaireProvider>
      </ChatProvider>
    </ThemeProvider>
  );
};

export default App;
