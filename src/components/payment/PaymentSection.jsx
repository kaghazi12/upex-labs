import React, { useState } from 'react';
import { WiseCheckoutForm } from './WiseCheckoutForm';
import { CheckCircle2 } from 'lucide-react';

export const PaymentSection = ({ selectedPlan = 'Growth Engine', setupPrice = '$3,500', retainerPrice = '$499' }) => {
  const [paymentStatus, setPaymentStatus] = useState('idle'); // 'idle', 'success'

  const handleSuccess = () => {
    setPaymentStatus('success');
  };

  if (paymentStatus === 'success') {
    return (
      <div className="bg-card border border-border flex flex-col items-center justify-center py-16 text-center max-w-[600px] mx-auto rounded-2xl shadow-lg">
        <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-4">Payment Successful!</h2>
        <p className="text-muted-foreground mb-8 max-w-[400px]">
          Welcome to Upex Labs. Your {selectedPlan} package is confirmed. Our team will reach out to you shortly to begin onboarding.
        </p>
        <a href="/" className="cosmic-button px-8 py-3 rounded-lg font-semibold transition-colors">
          Return Home
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-[600px] w-full mx-auto bg-card border border-border flex flex-col p-8 md:p-10 rounded-2xl shadow-lg">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">Checkout</h2>
        <div className="flex flex-col gap-2 border-b border-border pb-4">
          <div className="flex justify-between items-center text-muted-foreground">
            <span>{selectedPlan} Plan — Setup Fee</span>
            <span className="font-semibold text-foreground text-xl">{setupPrice}</span>
          </div>
          <div className="flex justify-between items-center text-muted-foreground text-sm">
            <span>Monthly Retainer</span>
            <span className="font-medium text-foreground">{retainerPrice}/mo</span>
          </div>
        </div>
      </div>

      <div className="min-h-[250px]">
        <WiseCheckoutForm planName={selectedPlan} price={setupPrice} onSuccessfulPayment={handleSuccess} />
      </div>
    </div>
  );
};
