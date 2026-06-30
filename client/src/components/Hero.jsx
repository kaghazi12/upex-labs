import React from 'react';

export const Hero = () => {
  return (
    <main className="relative w-full min-h-[90vh] md:min-h-screen flex items-center justify-center pt-28 pb-12 md:py-32 px-8 overflow-hidden z-10">
      <div className="max-w-[1200px] w-full mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] items-center gap-8 lg:gap-16 relative z-10">
        
        {/* Left Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left mx-auto lg:mx-0">
          <h1 className="reveal text-[clamp(36px,6vw,68px)] font-extrabold leading-[1.1] text-glow text-foreground mb-6">
            Your competitors are booking leads at 2am. Are you?
          </h1>
          <p className="reveal delay-150 text-[clamp(16px,2.5vw,20px)] font-light text-muted-foreground max-w-[560px] leading-[1.6] mb-10 opacity-80">
            Upex Labs builds AI-powered websites, automation systems, and lead machines for businesses that refuse to stay small.
          </p>
          
          <div className="reveal delay-300 flex flex-col md:flex-row gap-5 items-center w-full max-w-[300px] md:max-w-none mx-auto lg:mx-0 mb-8">
            <a href="#pricing" className="w-full md:w-auto text-center cosmic-button">
              See our packages
            </a>
            {/*
            <a href="#contact" className="w-full md:w-auto text-center bg-transparent text-foreground px-6 py-2 rounded-full font-semibold border border-border cursor-pointer inline-block transition-all duration-300 hover:bg-card hover:border-primary/50 hover:-translate-y-[2px]">
              Book a call
            </a>
            */}
          </div>
          
          <div className="reveal delay-300 flex justify-center lg:justify-start items-center gap-3 text-[13px] text-muted-foreground flex-wrap opacity-70">
            {/* <span className="flex items-center after:content-['•'] after:ml-3 after:opacity-50">US-focused clients</span>
            */}
            <span className="flex items-center after:content-['•'] after:ml-3 after:opacity-50">Fully managed</span>
            <span className="flex items-center">Results in 30 days</span>
          </div>
        </div>

        {/* Right SVG Visual (Hidden on mobile) */}
        <div className="hidden lg:flex justify-center items-center relative">
          <svg className="animate-float max-w-full h-auto" width="450" height="450" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="currentColor" className="text-primary" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="currentColor" className="text-background" stopOpacity="0"/>
              </radialGradient>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="currentColor" className="text-primary" stopOpacity="0.25" />
                <stop offset="100%" stopColor="currentColor" className="text-background" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="currentColor" className="text-foreground" stopOpacity="0.25" />
                <stop offset="100%" stopColor="currentColor" className="text-primary" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <circle cx="250" cy="250" r="220" fill="url(#glow)" />
            <circle cx="200" cy="220" r="120" fill="url(#gradient1)" stroke="currentColor" className="text-primary/25" strokeWidth="1.5" />
            <circle cx="300" cy="280" r="130" fill="url(#gradient2)" stroke="currentColor" className="text-foreground/25" strokeWidth="1.5" />
            <circle cx="250" cy="250" r="80" stroke="currentColor" className="text-border/40" strokeWidth="1" strokeDasharray="8, 4" />
            
            {/* Animated Dots */}
            <circle cx="200" cy="220" r="4" fill="currentColor" className="text-primary" opacity="0.6" />
            <circle cx="300" cy="280" r="4" fill="currentColor" className="text-foreground" opacity="0.4" />
            <circle cx="250" cy="170" r="3" fill="currentColor" className="text-foreground" opacity="0.5" />
            <circle cx="170" cy="310" r="3" fill="currentColor" className="text-primary" opacity="0.6" />
            
            <path d="M 120 250 A 130 130 0 1 0 380 250" stroke="currentColor" className="text-border/30" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </main>
  );
};
