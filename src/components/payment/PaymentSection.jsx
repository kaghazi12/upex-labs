import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CheckoutForm } from './CheckoutForm';
import { PaypalCheckout } from './PaypalCheckout';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// Replace with your real publishable key
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

export const PaymentSection = ({ selectedPlan = 'Growth Engine', price = '$3,500' }) => {
  const [paymentMethod, setPaymentMethod] = useState('stripe'); // 'stripe' or 'paypal'
  const [paymentStatus, setPaymentStatus] = useState('idle'); // 'idle', 'success'

  const handleSuccess = () => {
    setPaymentStatus('success');
  };

  if (paymentStatus === 'success') {
    return (
      <div className="glass-card flex flex-col items-center justify-center py-16 text-center max-w-[600px] mx-auto">
        <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-3xl font-bold text-light-crimson dark:text-white mb-4">Payment Successful!</h2>
        <p className="text-light-muted dark:text-muted mb-8 max-w-[400px]">
          Welcome to Upex Labs. Your {selectedPlan} package is confirmed. Our team will reach out to you shortly to begin onboarding.
        </p>
        <a href="/" className="bg-light-crimson dark:bg-crimson text-white px-8 py-3 rounded-lg font-semibold hover:bg-light-accent dark:hover:bg-accent transition-colors">
          Return Home
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-[600px] w-full mx-auto glass-card flex flex-col p-8 md:p-10">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-light-crimson dark:text-white mb-2">Checkout</h2>
        <p className="text-light-muted dark:text-muted flex justify-between items-center border-b border-light-crimson/10 dark:border-white/10 pb-4">
          <span>{selectedPlan} Plan Setup Fee</span>
          <span className="font-semibold text-light-crimson dark:text-white text-xl">{price}</span>
        </p>
      </div>

      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setPaymentMethod('stripe')}
          className={cn(
            "flex-1 py-3 rounded-lg text-sm font-semibold transition-colors border",
            paymentMethod === 'stripe' 
              ? "bg-light-accent/10 dark:bg-accent/20 border-light-accent dark:border-accent text-light-accent dark:text-white" 
              : "bg-transparent border-light-crimson/20 dark:border-white/10 text-light-muted dark:text-muted hover:border-light-crimson/50 dark:hover:border-white/30"
          )}
        >
          Credit Card
        </button>
        <button
          onClick={() => setPaymentMethod('paypal')}
          className={cn(
            "flex-1 py-3 rounded-lg text-sm font-semibold transition-colors border",
            paymentMethod === 'paypal' 
              ? "bg-light-accent/10 dark:bg-accent/20 border-light-accent dark:border-accent text-light-accent dark:text-white" 
              : "bg-transparent border-light-crimson/20 dark:border-white/10 text-light-muted dark:text-muted hover:border-light-crimson/50 dark:hover:border-white/30"
          )}
        >
          PayPal
        </button>
      </div>

      <div className="min-h-[250px]">
        {paymentMethod === 'stripe' ? (
          <Elements stripe={stripePromise}>
            <CheckoutForm planName={selectedPlan} price={price} onSuccessfulPayment={handleSuccess} />
          </Elements>
        ) : (
          <PaypalCheckout planName={selectedPlan} price={price} onSuccessfulPayment={handleSuccess} />
        )}
      </div>
    </div>
  );
};
