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
      
      <div className="max-w-[800px] w-full mx-auto text-center flex flex-col items-center relative z-10">
        <h2 className="reveal text-[clamp(30px,5vw,52px)] font-extrabold text-light-crimson dark:text-white leading-[1.15] mb-6 drop-shadow-[0_4px_20px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_4px_20px_rgba(0,0,0,0.35)]">
          Your next client is already searching. Will they find you?
        </h2>
        <p className="reveal delay-150 text-[18px] text-light-muted dark:text-muted max-w-[540px] mx-auto mb-10 leading-[1.6] font-light">
          Most businesses wait too long to build the system that grows them. Book a free 30-minute call and get a clear plan for what we would build for you, at no cost.
        </p>
        <div className="reveal delay-300">
          <a href="#contact" className="bg-light-crimson dark:bg-crimson text-white py-4 px-10 rounded-lg text-base font-semibold border border-white/15 relative overflow-hidden inline-block cursor-pointer transition-all duration-300 animate-breathPulse hover:animate-none hover:scale-105 hover:-translate-y-0.5 hover:bg-light-accent dark:hover:bg-accent hover:shadow-[0_8px_30px_rgba(128,44,110,0.4)] dark:hover:shadow-[0_8px_30px_rgba(192,57,43,0.6)] before:content-[''] before:absolute before:top-0 before:-left-[150%] before:w-1/2 before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:-skew-x-[25deg] hover:before:animate-shimmerSweepLarge">
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
