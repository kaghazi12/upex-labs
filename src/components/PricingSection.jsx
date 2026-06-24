import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export const PricingCard = ({ 
  title, 
  setupPrice, 
  retainerPrice, 
  features, 
  isFeatured = false, 
  delay = 0,
  btnText = "Get started",
  btnStyle = "outlined"
}) => {
  return (
    <div 
      className={cn(
        "flex flex-col justify-between p-10 md:px-10 md:pt-14 md:pb-12 rounded-[20px] relative transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.1)]",
        isFeatured 
          ? "border-2 border-light-accent dark:border-accent bg-light-glass dark:bg-glass-bg backdrop-blur-md shadow-[0_8px_32px_0_rgba(0,0,0,0.15),0_0_20px_rgba(128,44,110,0.2)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.35),0_0_20px_rgba(192,57,43,0.25)] hover:scale-105 hover:-translate-y-1 hover:shadow-[0_16px_45px_rgba(128,44,110,0.25)] dark:hover:shadow-[0_16px_45px_rgba(192,57,43,0.35)]" 
          : "glass-card hover:-translate-y-1"
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {isFeatured && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-light-accent dark:bg-accent text-white py-1.5 px-5 rounded-full text-[11px] font-bold uppercase tracking-[0.08em] shadow-[0_4px_12px_rgba(128,44,110,0.5)] dark:shadow-[0_4px_12px_rgba(192,57,43,0.5)] whitespace-nowrap">
          Most popular
        </span>
      )}
      
      <div className="flex flex-col">
        <h3 className="text-2xl font-bold text-light-crimson dark:text-white mb-6">{title}</h3>
        <div className="mb-8">
          <div className="text-4xl font-extrabold text-light-crimson dark:text-white leading-[1.1]">
            {setupPrice} <span className="text-sm font-normal text-light-muted dark:text-muted">one-time</span>
          </div>
          <div className="text-base text-light-muted dark:text-muted font-normal mt-1">
            + {retainerPrice} per month
          </div>
        </div>
        
        <hr className="h-[1px] bg-light-crimson/10 dark:bg-white/10 my-6 border-none" />
        
        <ul className="list-none m-0 p-0 flex flex-col gap-4 flex-grow mb-10">
          {features.map((feat, idx) => (
            <li key={idx} className="flex items-start gap-3 text-[0.95rem] text-light-muted dark:text-muted leading-[1.4] font-light">
              <Check className="flex-shrink-0 mt-0.5 text-light-accent dark:text-accent" size={18} />
              <span className={idx === 0 && isFeatured ? "text-light-crimson dark:text-white font-medium" : ""}>
                {feat}
              </span>
            </li>
          ))}
        </ul>
      </div>
      
      {btnStyle === 'outlined' ? (
        <a href="#contact" className="w-full block bg-transparent text-light-crimson dark:text-white border border-light-crimson/30 dark:border-white/30 py-3.5 px-6 rounded-lg text-sm font-semibold text-center cursor-pointer transition-all duration-300 hover:border-light-accent dark:hover:border-accent hover:bg-light-crimson dark:hover:bg-crimson hover:text-white shadow-none hover:shadow-[0_4px_15px_rgba(128,44,110,0.4)] dark:hover:shadow-[0_4px_15px_rgba(139,26,58,0.4)] hover:-translate-y-0.5">
          {btnText}
        </a>
      ) : (
        <a href="#contact" className="w-full text-center bg-light-crimson dark:bg-crimson text-white px-6 py-3.5 rounded-lg text-sm font-semibold border border-white/10 relative overflow-hidden inline-block cursor-pointer transition-all duration-300 shadow-[0_4px_15px_rgba(139,26,58,0.3)] hover:bg-light-accent dark:hover:bg-accent hover:shadow-[0_6px_20px_rgba(192,57,43,0.5)] hover:-translate-y-[2px] before:content-[''] before:absolute before:top-0 before:-left-[150%] before:w-1/2 before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent before:-skew-x-[25deg] hover:before:animate-shimmerSweep">
          {btnText}
        </a>
      )}
    </div>
  );
};

export const PricingSection = () => {
  return (
    <section className="py-[60px] md:py-[100px] px-6 max-w-[1200px] mx-auto relative z-10" id="pricing">
      <header className="mb-16 text-center reveal">
        <span className="text-light-accent dark:text-accent text-xs uppercase tracking-[0.1em] font-bold mb-2 block">Pricing</span>
        <h2 className="text-[clamp(28px,4.5vw,44px)] font-extrabold text-light-crimson dark:text-white leading-[1.15] mb-4">Simple pricing. No surprises.</h2>
        <p className="text-[clamp(16px,2.5vw,18px)] text-light-muted dark:text-muted max-w-[600px] mx-auto font-light leading-[1.6]">Every package includes full setup and a monthly retainer. No hidden fees.</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 items-stretch w-full max-w-[500px] lg:max-w-none mx-auto">
        
        <PricingCard 
          title="Launchpad"
          setupPrice="$1,500"
          retainerPrice="$199"
          delay={0}
          features={[
            "5-page professional website",
            "Mobile optimized and fast loading",
            "On-page SEO setup",
            "Google Business Profile setup",
            "Lead capture form",
            "30 days post-launch support"
          ]}
        />
        
        <PricingCard 
          title="Growth Engine"
          setupPrice="$3,500"
          retainerPrice="$499"
          isFeatured={true}
          delay={80}
          btnStyle="cta"
          features={[
            "Everything in Launchpad",
            "AI chat widget trained on your business",
            "Automated booking system",
            "Review request automation",
            "Advanced SEO with monthly reporting",
            "2 newsletters per month"
          ]}
        />
        
        <PricingCard 
          title="Full Stack AI"
          setupPrice="$7,500"
          retainerPrice="$999"
          delay={160}
          btnText="Book a strategy call"
          features={[
            "Everything in Growth Engine",
            "Full sales funnel with lead magnet",
            "AI voice receptionist",
            "LLM and AI search optimization",
            "Motion animations on key sections",
            "CRM setup and integration"
          ]}
        />
        
      </div>
      
      <div className="text-center text-light-muted dark:text-muted text-sm font-light mt-14 leading-[1.5] w-full reveal">
        <p>All packages require a 6-month minimum retainer. Cancel anytime after that.</p>
      </div>
    </section>
  );
};
