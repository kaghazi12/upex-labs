import React from 'react';

export const Hero = () => {
  return (
    <main className="relative w-full min-h-[90vh] md:min-h-screen flex items-center justify-center pt-28 pb-12 md:py-32 px-8 overflow-hidden z-10">
      <div className="max-w-[1200px] w-full mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] items-center gap-8 lg:gap-16 relative z-10">
        
        {/* Left Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left mx-auto lg:mx-0">
          <h1 className="reveal text-[clamp(36px,6vw,68px)] font-extrabold leading-[1.1] text-light-crimson dark:text-white mb-6">
            Your competitors are booking leads at 2am. Are you?
          </h1>
          <p className="reveal delay-150 text-[clamp(16px,2.5vw,20px)] font-light text-light-muted dark:text-muted max-w-[560px] leading-[1.6] mb-10">
            Upex Labs builds AI-powered websites, automation systems, and lead machines for US businesses that refuse to stay small.
          </p>
          
          <div className="reveal delay-300 flex flex-col md:flex-row gap-5 items-center w-full max-w-[300px] md:max-w-none mx-auto lg:mx-0 mb-8">
            <a href="#pricing" className="w-full md:w-auto text-center bg-light-crimson dark:bg-crimson text-white px-6 py-3 rounded-lg text-sm font-semibold border border-white/10 relative overflow-hidden inline-block cursor-pointer transition-all duration-300 shadow-[0_4px_15px_rgba(139,26,58,0.3)] hover:bg-light-accent dark:hover:bg-accent hover:shadow-[0_6px_20px_rgba(192,57,43,0.5)] hover:-translate-y-[2px] before:content-[''] before:absolute before:top-0 before:-left-[150%] before:w-1/2 before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:-skew-x-[25deg] hover:before:animate-shimmerSweep">
              See our packages
            </a>
            <a href="#contact" className="w-full md:w-auto text-center bg-transparent text-light-crimson dark:text-white px-6 py-3 rounded-lg text-sm font-semibold border border-light-crimson dark:border-white/30 cursor-pointer inline-block transition-all duration-300 hover:bg-light-crimson dark:hover:bg-white/5 hover:text-white hover:border-light-crimson dark:hover:border-white/90 hover:-translate-y-[2px]">
              Book a call
            </a>
          </div>
          
          <div className="reveal delay-300 flex justify-center lg:justify-start items-center gap-3 text-[13px] text-light-muted dark:text-muted flex-wrap">
            <span className="flex items-center after:content-['•'] after:ml-3 after:text-light-muted/30 dark:after:text-white/20">US-focused clients</span>
            <span className="flex items-center after:content-['•'] after:ml-3 after:text-light-muted/30 dark:after:text-white/20">Fully managed</span>
            <span className="flex items-center">Results in 30 days</span>
          </div>
        </div>

        {/* Right SVG Visual (Hidden on mobile) */}
        <div className="hidden lg:flex justify-center items-center relative">
          <svg className="animate-floatAnimation max-w-full h-auto" width="450" height="450" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                {/* We use currentColor for the stop colors and apply CSS classes to control it if needed, or stick to the brand colors */}
                <stop offset="0%" stopColor="currentColor" className="text-light-accent dark:text-[#3d1a5e]" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="currentColor" className="text-light-bg dark:text-[#1a1a3e]" stopOpacity="0"/>
              </radialGradient>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="currentColor" className="text-light-crimson dark:text-[#8b1a3a]" stopOpacity="0.25" />
                <stop offset="100%" stopColor="currentColor" className="text-light-bg dark:text-[#1a1a3e]" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="currentColor" className="text-light-accent dark:text-[#3d1a5e]" stopOpacity="0.25" />
                <stop offset="100%" stopColor="currentColor" className="text-light-crimson dark:text-[#c0392b]" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <circle cx="250" cy="250" r="220" fill="url(#glow)" />
            <circle cx="200" cy="220" r="120" fill="url(#gradient1)" stroke="currentColor" className="text-light-crimson/25 dark:text-[#8b1a3a]/25" strokeWidth="1.5" />
            <circle cx="300" cy="280" r="130" fill="url(#gradient2)" stroke="currentColor" className="text-light-accent/25 dark:text-[#3d1a5e]/25" strokeWidth="1.5" />
            <circle cx="250" cy="250" r="80" stroke="currentColor" className="text-light-crimson/20 dark:text-white/10" strokeWidth="1" strokeDasharray="8, 4" />
            
            {/* Animated Dots */}
            <circle cx="200" cy="220" r="4" fill="currentColor" className="text-light-accent dark:text-[#c0392b]" opacity="0.6" />
            <circle cx="300" cy="280" r="4" fill="currentColor" className="text-light-crimson dark:text-[#ffffff]" opacity="0.4" />
            <circle cx="250" cy="170" r="3" fill="currentColor" className="text-light-crimson dark:text-[#ffffff]" opacity="0.5" />
            <circle cx="170" cy="310" r="3" fill="currentColor" className="text-light-accent dark:text-[#8b1a3a]" opacity="0.6" />
            
            <path d="M 120 250 A 130 130 0 1 0 380 250" stroke="currentColor" className="text-light-crimson/10 dark:text-white/5" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </main>
  );
};
