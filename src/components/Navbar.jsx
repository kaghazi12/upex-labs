import React, { useState, useEffect } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-[1000] transition-all duration-300 border-b border-transparent bg-transparent",
          scrolled && "bg-background/85 backdrop-blur-md border-border shadow-sm"
        )}
      >
        <div className={cn(
          "max-w-[1200px] mx-auto px-8 flex items-center justify-between transition-all duration-300",
          scrolled ? "py-4" : "py-6"
        )}>
          <Link to="/" className="flex items-center text-decoration-none">
            {/* Reusing the logo if available, or text fallback */}
            <img 
              src="/logo.png" 
              alt="Upex Labs Logo" 
              className="w-[120px] h-auto block object-contain mix-blend-multiply dark:mix-blend-lighten dark:filter-none"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <span style={{ display: 'none' }} className="font-bold text-xl tracking-tight text-foreground">UPEX LABS</span>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="/#services" className="text-foreground text-sm font-medium relative py-2 transition-all duration-300 hover:opacity-90 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-foreground after:transition-all after:duration-300 hover:after:w-full">Services</a>
            <a href="/#how-it-works" className="text-foreground text-sm font-medium relative py-2 transition-all duration-300 hover:opacity-90 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-foreground after:transition-all after:duration-300 hover:after:w-full">How it works</a>
            <a href="/#results" className="text-foreground text-sm font-medium relative py-2 transition-all duration-300 hover:opacity-90 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-foreground after:transition-all after:duration-300 hover:after:w-full">Results</a>
            <a href="/#pricing" className="text-foreground text-sm font-medium relative py-2 transition-all duration-300 hover:opacity-90 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-foreground after:transition-all after:duration-300 hover:after:w-full">Pricing</a>
            <a href="/#contact" className="text-foreground text-sm font-medium relative py-2 transition-all duration-300 hover:opacity-90 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-foreground after:transition-all after:duration-300 hover:after:w-full">Contact</a>
          </nav>
          
          {/* Actions */}
          <div className="hidden md:flex items-center gap-6">
            <ThemeToggle />
            <Link 
              to="/checkout" 
              className="cosmic-button"
            >
              Checkout Flow
            </Link>
            <a 
              href="#contact" 
              className="cosmic-button"
            >
              Book a free call
            </a>
          </div>

          <div className="flex md:hidden items-center gap-4">
            <ThemeToggle />
            <button 
              className="flex flex-col justify-between w-6 h-[18px] bg-transparent border-none cursor-pointer z-[1200] p-0"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Toggle navigation"
            >
              <span className="w-full h-[2px] bg-foreground rounded-sm transition-all duration-300"></span>
              <span className="w-full h-[2px] bg-foreground rounded-sm transition-all duration-300"></span>
              <span className="w-full h-[2px] bg-foreground rounded-sm transition-all duration-300"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <div className={cn(
        "fixed top-0 w-full h-[100vh] bg-background/98 backdrop-blur-2xl z-[1100] transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col justify-center items-center p-8",
        mobileMenuOpen ? "right-0" : "-right-[100%]"
      )}>
        <button 
          className="absolute top-8 right-8 text-5xl bg-transparent border-none text-foreground cursor-pointer leading-none w-11 h-11 flex items-center justify-center transition-all duration-300 hover:text-primary"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close navigation"
        >
          &times;
        </button>
        <nav className="flex flex-col items-center gap-10 w-full">
          <a href="/#services" onClick={() => setMobileMenuOpen(false)} className="text-foreground no-underline text-2xl font-semibold tracking-tight transition-all duration-300 hover:text-primary">Services</a>
          <a href="/#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-foreground no-underline text-2xl font-semibold tracking-tight transition-all duration-300 hover:text-primary">How it works</a>
          <a href="/#results" onClick={() => setMobileMenuOpen(false)} className="text-foreground no-underline text-2xl font-semibold tracking-tight transition-all duration-300 hover:text-primary">Results</a>
          <a href="/#pricing" onClick={() => setMobileMenuOpen(false)} className="text-foreground no-underline text-2xl font-semibold tracking-tight transition-all duration-300 hover:text-primary">Pricing</a>
          <a href="/#contact" onClick={() => setMobileMenuOpen(false)} className="text-foreground no-underline text-2xl font-semibold tracking-tight transition-all duration-300 hover:text-primary">Contact</a>
          <Link to="/checkout" onClick={() => setMobileMenuOpen(false)} className="cosmic-button mt-6 text-lg py-4 px-10 w-[80%] max-w-[300px]">
            Checkout
          </Link>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="cosmic-button mt-2 text-lg py-4 px-10 w-[80%] max-w-[300px]">
            Book a free call
          </a>
        </nav>
      </div>
    </>
  );
};
