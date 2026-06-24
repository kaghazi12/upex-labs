import React from 'react';

export const FinalCta = () => {
  return (
    <section className="py-[120px] px-6 relative overflow-hidden flex items-center justify-center w-full z-10 bg-[length:300%_300%] animate-gradientShiftBrighter" id="contact" style={{
      background: 'radial-gradient(circle at center, rgba(192, 57, 43, 0.18) 0%, rgba(26, 26, 62, 0) 65%), linear-gradient(135deg, #dfdedf, #eae9ea, #e4d8e2)',
    }}>
      {/* Dark theme overriding style, Tailwind v4 variables might be easier but inline style for dynamic gradient helps */}
      <div className="absolute inset-0 bg-[length:300%_300%] animate-gradientShiftBrighter hidden dark:block" style={{
        background: 'radial-gradient(circle at center, rgba(192, 57, 43, 0.18) 0%, rgba(26, 26, 62, 0) 65%), linear-gradient(135deg, #242456, #4e227a, #a82046, #242456)',
      }}></div>
      
      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center text-center px-6">
        <h2 className="text-[clamp(36px,5vw,56px)] font-extrabold text-foreground leading-[1.1] mb-6 max-w-[800px] text-glow">
          Stop losing business while you sleep.
        </h2>
        <p className="text-[clamp(16px,2.5vw,20px)] text-muted-foreground font-light mb-10 max-w-[600px] leading-[1.6]">
          Book a quick strategy call and we'll show you exactly how we'd build your automated growth system.
        </p>
        
        <div className="flex flex-col md:flex-row gap-5 items-center justify-center w-full max-w-[300px] md:max-w-none mb-10">
          <a href="#contact" className="w-full md:w-auto cosmic-button">
            Book your free call
          </a>
        </div>
        <p className="reveal delay-300 text-[13px] text-light-muted dark:text-muted mt-5 opacity-80 font-light">
          No contracts to sign on the call. No pressure. Just a clear plan.
        </p>
      </div>
    </section>
  );
};
