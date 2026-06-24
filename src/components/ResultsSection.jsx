import React from 'react';

const ResultCard = ({ badge, problem, solution, result, quote, delay = 0 }) => (
  <div 
    className="glass-card reveal flex flex-col justify-between p-10 min-h-[360px] md:min-h-[auto] hover:-translate-y-[5px]"
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className="flex flex-col h-full">
      <span className="self-start bg-light-accent/15 dark:bg-accent text-light-accent dark:text-white py-1.5 px-5 rounded-full text-[11px] font-bold uppercase tracking-[0.05em] mb-6 shadow-[0_4px_10px_rgba(128,44,110,0.2)] dark:shadow-[0_4px_10px_rgba(192,57,43,0.3)] whitespace-nowrap">
        {badge}
      </span>
      
      <div className="mb-6 flex-grow flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <span className="text-xs uppercase text-light-accent dark:text-accent font-bold tracking-[0.05em]">Problem:</span>
          <p className="text-[1.05rem] font-medium text-light-crimson dark:text-white leading-[1.45]">{problem}</p>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs uppercase text-light-accent dark:text-accent font-bold tracking-[0.05em]">Solution:</span>
          <p className="text-[1.05rem] font-medium text-light-crimson dark:text-white leading-[1.45]">{solution}</p>
        </div>
      </div>
      
      <div className="bg-light-accent/15 dark:bg-accent text-light-accent dark:text-white border border-light-accent/30 dark:border-transparent py-2.5 px-5 rounded-full text-[0.95rem] font-semibold text-center mb-7 tracking-[0.02em]">
        {result}
      </div>
      
      <p className="italic text-light-muted dark:text-muted text-[0.95rem] leading-[1.5] font-light border-l-2 border-light-crimson/15 dark:border-white/15 pl-3 mt-auto">
        "{quote}"
      </p>
    </div>
  </div>
);

export const ResultsSection = () => {
  return (
    <section className="py-[60px] md:py-[100px] px-6 max-w-[1200px] mx-auto relative z-10" id="results">
      <header className="mb-16 text-left reveal">
        <span className="text-light-accent dark:text-accent text-xs uppercase tracking-[0.1em] font-bold mb-2 block">Results</span>
        <h2 className="text-[clamp(28px,4.5vw,44px)] font-extrabold text-light-crimson dark:text-white leading-[1.15]">Real systems. Real results.</h2>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 w-full max-w-[500px] lg:max-w-none mx-auto">
        <ResultCard 
          badge="Dental practice"
          problem="Losing after-hours leads with no response system."
          solution="AI chat widget plus automated booking flow."
          result="40% more appointments in 45 days"
          quote="We stopped losing calls the moment the system went live. It just works."
          delay={0}
        />
        <ResultCard 
          badge="HVAC contractor"
          problem="No online presence. Invisible on Google."
          solution="Launchpad package plus GBP optimization."
          result="Page 1 Google ranking in 6 weeks"
          quote="I used to rely on word of mouth. Now leads come in without me lifting a finger."
          delay={80}
        />
        <ResultCard 
          badge="Personal injury law firm"
          problem="Leads coming in but no follow-up system."
          solution="Growth Engine with review automation."
          result="3x more 5-star reviews in 60 days"
          quote="The review system alone paid for the retainer in the first month."
          delay={160}
        />
      </div>
    </section>
  );
};
