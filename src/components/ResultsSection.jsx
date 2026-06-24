import React from 'react';
import { Star } from 'lucide-react';

const ResultCard = ({ author, role, quote, image, delay = 0 }) => (
  <div 
    className="bg-card border border-border p-8 rounded-2xl flex flex-col gap-6 relative overflow-hidden transition-all duration-300 card-hover reveal"
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className="flex gap-1 text-[#f59e0b]">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={16} fill="currentColor" stroke="none" />
      ))}
    </div>
    
    <p className="text-[15px] leading-[1.7] text-foreground font-medium italic flex-1 relative z-10">"{quote}"</p>
    
    <div className="flex items-center gap-4 mt-auto border-t border-border pt-6">
      <div className="flex flex-col">
        <span className="text-foreground text-[15px] font-bold tracking-tight">{author}</span>
        <span className="text-primary text-xs font-semibold tracking-wider uppercase">{role}</span>
      </div>
    </div>
    
    <div className="absolute top-4 right-4 text-[60px] font-serif text-primary/10 leading-none select-none z-0">"</div>
  </div>
);

export const ResultsSection = () => {
  return (
    <section className="py-[60px] md:py-[100px] px-6 max-w-[1200px] mx-auto relative z-10" id="results">
      <header className="mb-12 text-center reveal">
        <span className="text-primary text-xs uppercase tracking-[0.1em] font-bold mb-2 block">The results</span>
        <h2 className="text-[clamp(28px,4.5vw,44px)] font-extrabold text-foreground leading-[1.15]">Don't just take our word for it.</h2>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 w-full max-w-[500px] lg:max-w-none mx-auto">
        <ResultCard 
          delay={0}
          author="Sarah Jenkins"
          role="Home Services"
          quote="We were missing calls every day. Upex Labs built a system that catches every lead and books them directly onto my calendar. We've seen a 40% increase in booked jobs."
        />
        <ResultCard 
          delay={150}
          author="David Chen"
          role="Law Firm"
          quote="The AI chat bot they installed acts like a full-time receptionist. It answers client questions accurately and schedules consultations while I'm in court."
        />
        <ResultCard 
          delay={300}
          author="Marcus Thorne"
          role="Dental Clinic"
          quote="Our Google presence was non-existent. Within 60 days of launching with Upex Labs, we're consistently ranking in the top 3 and our inbound calls have tripled."
        />
      </div>
    </section>
  );
};
