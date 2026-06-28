import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border pt-[60px] pb-[40px] px-6 relative z-10 w-full">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] gap-8 md:gap-10">
        
        {/* Col 1 */}
        <div className="flex flex-col">
          <img 
            src="/logo.png" 
            alt="Upex Labs Logo" 
            className="w-[100px] h-auto block mb-5 mix-blend-normal bg-white p-1 md:p-2 md:py-1 rounded-md shadow-[0_2px_8px_rgba(0,0,0,0.08)] dark:mix-blend-lighten dark:bg-transparent dark:shadow-none dark:p-0"
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <span style={{ display: 'none' }} className="font-bold text-xl tracking-tight text-foreground mb-5">UPEX LABS</span>
          <p className="text-muted-foreground text-sm font-light leading-[1.5]">
            AI-powered growth systems for businesses.
          </p>
        </div>

        {/* Col 2 */}
        <div className="flex flex-col">
          <h5 className="text-foreground text-[15px] font-bold mb-6 uppercase tracking-[0.08em]">Services</h5>
          <ul className="list-none p-0 m-0 flex flex-col gap-2">
            <li><a href="/#services" className="text-muted-foreground text-sm font-medium hover:text-primary hover:translate-x-1 transition-all duration-300 min-h-[44px] inline-flex items-center">Website Design</a></li>
            <li><a href="/#services" className="text-muted-foreground text-sm font-medium hover:text-primary hover:translate-x-1 transition-all duration-300 min-h-[44px] inline-flex items-center">AI Chat</a></li>
            <li><a href="/#services" className="text-muted-foreground text-sm font-medium hover:text-primary hover:translate-x-1 transition-all duration-300 min-h-[44px] inline-flex items-center">Automated Booking</a></li>
            <li><a href="/#services" className="text-muted-foreground text-sm font-medium hover:text-primary hover:translate-x-1 transition-all duration-300 min-h-[44px] inline-flex items-center">SEO</a></li>
            <li><a href="/#services" className="text-muted-foreground text-sm font-medium hover:text-primary hover:translate-x-1 transition-all duration-300 min-h-[44px] inline-flex items-center">Voice AI</a></li>
            <li><a href="/#services" className="text-muted-foreground text-sm font-medium hover:text-primary hover:translate-x-1 transition-all duration-300 min-h-[44px] inline-flex items-center">Newsletters</a></li>
          </ul>
        </div>

        {/* Col 3 */}
        <div className="flex flex-col">
          <h5 className="text-foreground text-[15px] font-bold mb-6 uppercase tracking-[0.08em]">Company</h5>
          <ul className="list-none p-0 m-0 flex flex-col gap-2">
            <li><a href="/#how-it-works" className="text-muted-foreground text-sm font-medium hover:text-primary hover:translate-x-1 transition-all duration-300 min-h-[44px] inline-flex items-center">How it works</a></li>
            <li><a href="/#pricing" className="text-muted-foreground text-sm font-medium hover:text-primary hover:translate-x-1 transition-all duration-300 min-h-[44px] inline-flex items-center">Pricing</a></li>
            <li><a href="/#results" className="text-muted-foreground text-sm font-medium hover:text-primary hover:translate-x-1 transition-all duration-300 min-h-[44px] inline-flex items-center">Results</a></li>
          </ul>
        </div>

        {/* Col 4 */}
        <div className="flex flex-col">
          <h5 className="text-foreground text-[15px] font-bold mb-6 uppercase tracking-[0.08em]">Get in touch</h5>
          <a href="mailto:upexlabs@gmail.com" className="pl-17 text-foreground text-[15px] font-semibold hover:text-primary transition-all duration-300 min-h-[44px] inline-flex items-center mb-4">
            upexlabs@gmail.com
          </a>
           {/* 
          <div className="flex gap-4 mt-2">
            <a href="#" aria-label="LinkedIn" className="text-foreground w-11 h-11 flex items-center justify-center rounded-lg bg-card border border-border transition-all duration-300 hover:text-primary-foreground hover:bg-primary hover:border-primary hover:-translate-y-[3px]">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            
            <a href="#" aria-label="Instagram" className="text-foreground w-11 h-11 flex items-center justify-center rounded-lg bg-card border border-border transition-all duration-300 hover:text-primary-foreground hover:bg-primary hover:border-primary hover:-translate-y-[3px]">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" aria-label="X" className="text-foreground w-11 h-11 flex items-center justify-center rounded-lg bg-card border border-border transition-all duration-300 hover:text-primary-foreground hover:bg-primary hover:border-primary hover:-translate-y-[3px]">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
                <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
              </svg>
            </a>
          </div>
          */}
        </div>
        
      </div>

      <div className="border-t border-border pt-8 mt-16 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <p className="text-muted-foreground text-xs font-light m-0">
          Upex Labs. Built for businesses, powered by AI.
        </p>
        <p className="text-muted-foreground text-xs font-light m-0">
          &copy; 2026 Upex Labs. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
export const MobileStickyBar = () => {
  return (
    <div >
      {/*
      className="fixed bottom-0 left-0 w-full h-[52px] bg-primary z-[1050] shadow-[0_-4px_15px_rgba(0,0,0,0.3)] block md:hidden">
      <a href="/#contact" className="w-full h-full flex items-center justify-center text-primary-foreground no-underline text-[15px] font-bold uppercase tracking-[0.08em] text-center min-h-[44px]">
        Book a free call
      </a>
      */}
    </div>
  );

};