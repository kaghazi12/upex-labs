import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';

const FaqItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className={cn(
      "rounded-2xl border transition-all duration-300 overflow-hidden",
      isOpen 
        ? "border-light-crimson/20 dark:border-white/20 bg-light-glass dark:bg-glass-bg backdrop-blur-md" 
        : "border-light-glass-border dark:border-glass-border bg-light-glass dark:bg-glass-bg backdrop-blur-md hover:border-light-crimson/20 dark:hover:border-white/20"
    )}>
      <button 
        className="w-full py-7 px-8 md:p-7 flex items-center justify-between bg-transparent border-none cursor-pointer text-left transition-all duration-300 outline-none"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <h4 className="text-[1.15rem] font-semibold text-light-crimson dark:text-white pr-6 leading-[1.4] m-0">{question}</h4>
        <div className={cn(
          "flex-shrink-0 text-light-accent dark:text-accent transition-transform duration-300",
          isOpen ? "rotate-45" : "rotate-0"
        )}>
          <Plus size={24} strokeWidth={2.5} />
        </div>
      </button>
      
      <div 
        className={cn(
          "overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]",
          isOpen ? "max-h-[500px]" : "max-h-0"
        )}
      >
        <div className="px-6 pb-6 md:px-8 md:pb-7 pt-0">
          <p className="text-light-muted dark:text-muted text-base leading-[1.6] font-light m-0">
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
      q: "Where is Upex Labs based and does that affect quality?",
      a: "We operate remotely and serve US clients full time. Our team works on US business hours overlap and you get a dedicated point of contact. Location has never been a concern for any of our clients."
    },
    {
      q: "How long does setup actually take?",
      a: "Most projects go live in 2 to 4 weeks from the discovery call. Full Stack AI projects can take up to 6 weeks depending on integrations."
    },
    {
      q: "What if I want to cancel?",
      a: "All retainers require a 6-month minimum commitment. After that you can cancel with 30 days notice. We keep it simple."
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
      a: "US-based local service businesses with real revenue and no real digital infrastructure. Dentists, contractors, law firms, med spas, real estate agents. If you have a phone and clients, we can build a system around it."
    }
  ];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-[60px] md:py-[100px] px-6 max-w-[800px] mx-auto relative z-10" id="faq">
      <header className="mb-14 text-center reveal">
        <h2 className="text-[clamp(26px,4vw,40px)] font-extrabold text-light-crimson dark:text-white leading-[1.2]">Questions we actually get asked.</h2>
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
