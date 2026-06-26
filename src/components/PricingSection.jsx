import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PricingCard = ({ 
  title, 
  setupPrice, 
  retainerPrice, 
  features, 
  isFeatured = false, 
  delay = 0,
  btnText = "Get started",
  btnStyle = "outlined",
  linkTo,
}) => {
  // Default link: questionnaire with plan info. Override with linkTo prop.
  const href = linkTo || `/questionnaire?plan=${encodeURIComponent(title)}&setup=${encodeURIComponent(setupPrice)}&retainer=${encodeURIComponent(retainerPrice)}`;
  const isExternal = href.startsWith('#');

  const ButtonTag = isExternal ? 'a' : Link;
  const buttonProps = isExternal ? { href } : { to: href };

  return (
    <div 
      className={cn(
        "flex flex-col justify-between p-10 md:px-10 md:pt-14 md:pb-12 rounded-[20px] relative transition-all duration-300",
        isFeatured 
          ? "border-2 border-primary bg-card/80 backdrop-blur-md shadow-lg hover:scale-105 hover:-translate-y-1 hover:shadow-xl" 
          : "bg-card border border-border shadow-sm hover:-translate-y-1 hover:shadow-md"
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {isFeatured && (
        <span className="absolute -top-0 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground py-1.5 px-5 rounded-full text-[11px] font-bold uppercase tracking-[0.08em] shadow-md whitespace-nowrap">
          Most popular
        </span>
      )}
      
      <div className="flex flex-col">
        <h3 className="text-2xl font-bold text-foreground mb-6">{title}</h3>
        <div className="mb-8">
          <div className="text-4xl font-extrabold text-foreground leading-[1.1]">
            {setupPrice} <span className="text-sm font-normal text-muted-foreground">one-time</span>
          </div>
          <div className="text-base text-muted-foreground font-normal mt-1">
            + {retainerPrice} per month
          </div>
        </div>
        
        <hr className="h-[1px] bg-border my-6 border-none" />
        
        <ul className="list-none m-0 p-0 flex flex-col gap-4 flex-grow mb-10">
          {features.map((feat, idx) => (
            <li key={idx} className="flex items-start gap-3 text-[0.95rem] text-muted-foreground leading-[1.4] font-light">
              <Check className="flex-shrink-0 mt-0.5 text-primary" size={18} />
              <span className={idx === 0 && isFeatured ? "text-primary font-medium" : ""}>
                {feat}
              </span>
            </li>
          ))}
        </ul>
      </div>
      
      {btnStyle === 'outlined' ? (
        <ButtonTag {...buttonProps} className="w-full block bg-transparent text-foreground border border-foreground/30 py-3.5 px-6 rounded-lg text-sm font-semibold text-center cursor-pointer transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground shadow-none hover:shadow-md hover:-translate-y-0.5">
          {btnText}
        </ButtonTag>
      ) : (
        <ButtonTag {...buttonProps} className="w-full text-center bg-primary text-primary-foreground px-6 py-3.5 rounded-lg text-sm font-semibold border border-white/10 relative overflow-hidden inline-block cursor-pointer transition-all duration-300 shadow-md hover:brightness-110 hover:shadow-lg hover:-translate-y-[2px]">
          {btnText}
        </ButtonTag>
      )}
    </div>
  );
};

export const PricingSection = () => {
  return (
    <section className="py-[60px] md:py-[100px] px-6 max-w-[1200px] mx-auto relative z-10" id="pricing">
      <header className="mb-12 text-center reveal">
        <span className="text-primary text-xs uppercase tracking-[0.1em] font-bold mb-2 block">Pricing</span>
        <h2 className="text-[clamp(28px,4.5vw,44px)] font-extrabold text-foreground leading-[1.15] mb-4">No hidden fees.</h2>
        <p className="text-muted-foreground max-w-[500px] mx-auto text-base">We build your entire system and manage it for a flat monthly rate.</p>
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
            "Personalised AI chat widget",
            "Automated booking system",
            "Review request automation",
            "Advanced SEO",
            "2 newsletters per month"
          ]}
        />
        
        <PricingCard 
          title="Full Stack AI"
          setupPrice="$7,500"
          retainerPrice="$999"
          delay={160}
          btnText="Book a strategy call"
          linkTo="#contact"
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
      
      <div className="text-center text-muted-foreground text-sm font-light mt-14 leading-[1.5] w-full reveal">
        <p>All packages require a 6-month minimum retainer. Cancel anytime after that.</p>
      </div>
    </section>
  );
};
