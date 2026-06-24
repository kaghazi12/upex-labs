import React from 'react';

const TickerItem = ({ text }) => (
  <>
    <span className="text-[12px] md:text-[14px] uppercase tracking-[0.08em] font-semibold whitespace-nowrap text-light-crimson/80 dark:text-white/70">
      {text}
    </span>
    <span className="text-[10px] select-none text-light-accent dark:text-accent">♦</span>
  </>
);

export const Ticker = () => {
  const items = [
    "Google Business",
    "Webflow",
    "Calendly",
    "GoHighLevel",
    "OpenAI",
    "Bland AI",
    "Mailchimp",
    "Stripe",
    "Cal.com",
    "Zapier"
  ];

  return (
    <div className="w-full overflow-hidden py-4 md:py-5 relative z-10 bg-light-crimson/5 dark:bg-[#0a0a19]/40 border-y border-light-crimson/10 dark:border-white/10">
      <div className="flex w-max animate-tickerScroll">
        <div className="flex items-center gap-8 md:gap-12 pr-8 md:pr-12">
          {items.map((item, i) => (
            <TickerItem key={`ticker-1-${i}`} text={item} />
          ))}
        </div>
        <div className="flex items-center gap-8 md:gap-12 pr-8 md:pr-12" aria-hidden="true">
          {items.map((item, i) => (
            <TickerItem key={`ticker-2-${i}`} text={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
