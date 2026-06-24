import React from 'react';
import { PaymentSection } from '../components/payment/PaymentSection';

export const CheckoutPage = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 relative z-10 flex flex-col items-center">
      <header className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-light-crimson dark:text-white mb-4">Complete your purchase</h1>
        <p className="text-light-muted dark:text-muted max-w-[500px] mx-auto">
          Secure your spot and start your transformation with Upex Labs today.
        </p>
      </header>
      
      <PaymentSection selectedPlan="Growth Engine" price="$3,500" />
      
      <div className="mt-12 flex items-center justify-center gap-4 opacity-60">
        {/* Placeholder trust badges */}
        <span className="text-xs uppercase font-bold tracking-wider text-light-muted dark:text-muted flex items-center gap-1.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          256-Bit Encryption
        </span>
        <span className="text-xs uppercase font-bold tracking-wider text-light-muted dark:text-muted flex items-center gap-1.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          Secure Checkout
        </span>
      </div>
    </div>
  );
};
