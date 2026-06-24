import React from 'react';

const steps = [
  {
    title: "Discovery Call",
    desc: "30 minutes. No fluff. We learn your business, your gaps, and what a real result looks like for you.",
    points: ["Business analysis", "Gap identification", "Goal setting"]
  },
  {
    title: "We build. You watch.",
    desc: "Average delivery is 2 to 4 weeks. You get progress updates, not silence. You approve before anything goes live.",
    points: ["Weekly updates", "Iterative feedback", "Approval-based flow"]
  },
  {
    title: "You grow. We manage.",
    desc: "Monthly reports included. We monitor, update, and optimize your system every month after launch.",
    points: ["Performance reports", "System monitoring", "Continuous optimization"]
  }
];

export const ProcessSection = () => {
  return (
    <section className="py-[60px] md:py-[100px] px-6 max-w-[1200px] mx-auto relative z-10" id="how-it-works">
      <header className="mb-12 text-center reveal">
        <span className="text-primary text-xs uppercase tracking-[0.1em] font-bold mb-2 block">Our approach</span>
        <h2 className="text-[clamp(28px,4.5vw,44px)] font-extrabold text-foreground leading-[1.15]">How it works.</h2>
      </header>
      
      <div className="flex flex-col gap-12 w-full max-w-[900px] mx-auto relative">
        {/* Continuous vertical line for desktop timeline */}
        <div className="hidden md:block absolute left-[257px] top-4 bottom-4 w-0.5 bg-border z-0" />
        
        {steps.map((step, index) => (
          <div key={index} className="reveal relative flex flex-col md:flex-row gap-6 md:gap-10 group" style={{ transitionDelay: `${index * 150}ms` }}>
            <div className="md:w-[250px] shrink-0 text-left">
              <div className="text-[40px] font-black text-border mb-2 leading-none group-hover:text-primary transition-colors duration-300">0{index + 1}</div>
              <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
            </div>
            
            {/* Timeline dot */}
            <div className="hidden md:block absolute left-[250px] top-4 w-4 h-4 rounded-full bg-border border-4 border-background z-10 group-hover:bg-primary transition-colors duration-300" />
            
            <div className="flex-1 bg-card border border-border p-8 rounded-2xl md:ml-6 card-hover text-left">
              <p className="text-base text-muted-foreground font-light mb-6 leading-[1.6]">{step.desc}</p>
              
              <ul className="list-none p-0 m-0 flex flex-col gap-3">
                {step.points.map((p, i) => (
                  <li key={i} className="flex items-start text-sm text-foreground font-medium before:content-['✓'] before:text-primary before:mr-3 before:font-bold">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
