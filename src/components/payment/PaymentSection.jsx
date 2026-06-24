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
        <h2 className="text-2xl font-bold text-foreground mb-2">Checkout</h2>
        <p className="text-muted-foreground flex justify-between items-center border-b border-border pb-4">
          <span>{selectedPlan} Plan Setup Fee</span>
          <span className="font-semibold text-foreground text-xl">{price}</span>
        </p>
      </div>

      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setPaymentMethod('stripe')}
          className={cn(
            "flex-1 py-3 rounded-lg text-sm font-semibold transition-colors border",
            paymentMethod === 'stripe' 
              ? "bg-primary/20 border-primary text-primary" 
              : "bg-transparent border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
          )}
        >
          Credit Card
        </button>
        <button
          onClick={() => setPaymentMethod('paypal')}
          className={cn(
            "flex-1 py-3 rounded-lg text-sm font-semibold transition-colors border",
            paymentMethod === 'paypal' 
              ? "bg-primary/20 border-primary text-primary" 
              : "bg-transparent border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
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
