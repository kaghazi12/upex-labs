import React from 'react';

export const ProcessSection = () => {
  return (
    <section className="py-[60px] md:py-[100px] px-6 max-w-[1200px] mx-auto relative z-10" id="how-it-works">
      <header className="mb-16 text-center reveal">
        <span className="text-light-accent dark:text-accent text-xs uppercase tracking-[0.1em] font-bold mb-2 block">The process</span>
        <h2 className="text-[clamp(28px,4.5vw,44px)] font-extrabold text-light-crimson dark:text-white leading-[1.15]">From zero to running in 3 steps.</h2>
      </header>
      
      <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-between w-full gap-8 lg:gap-0">
        
        {/* Step 1 */}
        <div className="glass-card reveal flex-1 max-w-full lg:max-w-[32%] flex flex-col p-10 min-h-[280px] w-full" style={{ transitionDelay: '0ms' }}>
          <span className="text-[48px] font-extrabold text-light-accent dark:text-accent leading-none mb-6 font-jakarta">01</span>
          <h3 className="text-2xl font-bold text-light-crimson dark:text-white mb-4">Discovery call.</h3>
          <p className="text-base leading-[1.6] text-light-muted dark:text-muted font-light">30 minutes. No fluff. We learn your business, your gaps, and what a real result looks like for you.</p>
        </div>
        
        {/* Connecting Line 1 */}
        <div className="reveal hidden lg:block flex-1 h-[2px] relative overflow-hidden mx-2 min-w-[30px]" style={{ transitionDelay: '150ms' }}>
          <div className="w-full h-full bg-[length:14px_100%] bg-repeat-x transition-all duration-[1.5s]" 
               style={{ backgroundImage: 'repeating-linear-gradient(90deg, var(--color-light-accent) 0, var(--color-light-accent) 4px, transparent 4px, transparent 8px)' }}></div>
        </div>
        <div className="reveal block lg:hidden w-[2px] h-[50px] relative overflow-hidden my-2 mx-auto" style={{ transitionDelay: '150ms' }}>
          <div className="w-full h-full bg-[length:100%_14px] bg-repeat-y transition-all duration-[1.5s]"
               style={{ backgroundImage: 'repeating-linear-gradient(180deg, var(--color-light-accent) 0, var(--color-light-accent) 4px, transparent 4px, transparent 8px)' }}></div>
        </div>
        
        {/* Step 2 */}
        <div className="glass-card reveal flex-1 max-w-full lg:max-w-[32%] flex flex-col p-10 min-h-[280px] w-full" style={{ transitionDelay: '300ms' }}>
          <span className="text-[48px] font-extrabold text-light-accent dark:text-accent leading-none mb-6 font-jakarta">02</span>
          <h3 className="text-2xl font-bold text-light-crimson dark:text-white mb-4">We build. You watch.</h3>
          <p className="text-base leading-[1.6] text-light-muted dark:text-muted font-light">Average delivery is 2 to 4 weeks. You get progress updates, not silence. You approve before anything goes live.</p>
        </div>
        
        {/* Connecting Line 2 */}
        <div className="reveal hidden lg:block flex-1 h-[2px] relative overflow-hidden mx-2 min-w-[30px]" style={{ transitionDelay: '450ms' }}>
          <div className="w-full h-full bg-[length:14px_100%] bg-repeat-x transition-all duration-[1.5s]" 
               style={{ backgroundImage: 'repeating-linear-gradient(90deg, var(--color-light-accent) 0, var(--color-light-accent) 4px, transparent 4px, transparent 8px)' }}></div>
        </div>
        <div className="reveal block lg:hidden w-[2px] h-[50px] relative overflow-hidden my-2 mx-auto" style={{ transitionDelay: '450ms' }}>
          <div className="w-full h-full bg-[length:100%_14px] bg-repeat-y transition-all duration-[1.5s]"
               style={{ backgroundImage: 'repeating-linear-gradient(180deg, var(--color-light-accent) 0, var(--color-light-accent) 4px, transparent 4px, transparent 8px)' }}></div>
        </div>
        
        {/* Step 3 */}
        <div className="glass-card reveal flex-1 max-w-full lg:max-w-[32%] flex flex-col p-10 min-h-[280px] w-full" style={{ transitionDelay: '600ms' }}>
          <span className="text-[48px] font-extrabold text-light-accent dark:text-accent leading-none mb-6 font-jakarta">03</span>
          <h3 className="text-2xl font-bold text-light-crimson dark:text-white mb-4">You grow. We manage.</h3>
          <p className="text-base leading-[1.6] text-light-muted dark:text-muted font-light">Monthly reports included. We monitor, update, and optimize your system every month after launch.</p>
        </div>
        
      </div>
    </section>
  );
};
