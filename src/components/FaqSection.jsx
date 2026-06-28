import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';

const FaqItem = ({ question, answer, isOpen, onClick, delay }) => {
  return (
    <div 
      className={cn(
        "rounded-xl border transition-all duration-300 overflow-hidden bg-card card-hover",
        isOpen ? "border-primary" : "border-border"
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <button 
        className="w-full flex justify-between items-center p-6 bg-transparent border-none cursor-pointer text-left focus:outline-none"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className={cn(
          "font-bold text-[17px] pr-4 transition-colors duration-300",
          isOpen ? "text-primary" : "text-foreground"
        )}>
          {question}
        </span>
        <span className={cn(
          "text-2xl font-light transition-transform duration-300 flex-shrink-0",
          isOpen ? "rotate-45 text-primary" : "text-foreground"
        )}>
          <Plus size={24} strokeWidth={2.5} />
        </span>
      </button>
      
      <div 
        className={cn(
          "overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
          isOpen ? "max-h-[500px]" : "max-h-0"
        )}
      >
        <div className="p-6 pt-0 border-t border-border">
          <p className="text-muted-foreground leading-[1.6] text-[15px] font-light m-0 pt-4">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "How long does setup actually take?",
      a: "Most projects go live in 1 to 3 weeks. Full Stack AI projects can take up to 4 weeks depending on integrations."
    },
    {
      q: "Do I need any technical knowledge?",
      a: "None. We handle everything. You approve the design, we build and manage it. Your job is to show up for the discovery call and give us feedback."
    },
    {
      q: "Can I start with one package and upgrade later?",
      a: "Yes. Most clients start with Launchpad and upgrade to Growth Engine within 3 months once they see results."
    },
    {
      q: "What types of businesses do you work best with?",
      a: "Local service businesses with real revenue and no real digital infrastructure. Dentists, contractors, law firms, med spas, real estate agents. If you have a phone and clients, we can build a system around it."
    }
  ];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-[60px] md:py-[100px] px-6 max-w-[800px] mx-auto relative z-10" id="faq">
      <header className="mb-12 text-center reveal">
        <span className="text-primary text-xs uppercase tracking-[0.1em] font-bold mb-2 block">FAQ</span>
        <h2 className="text-[clamp(28px,4.5vw,44px)] font-extrabold text-foreground leading-[1.15]">Questions? Answered.</h2>
      </header>
      
      <div className="flex flex-col gap-4 w-full reveal">
        {faqs.map((faq, index) => (
          <FaqItem 
            key={index}
            question={faq.q}
            answer={faq.a}
            isOpen={openIndex === index}
            onClick={() => handleToggle(index)}
          />
        ))}
      </div>
    </section>
  );
};
