import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Loader2 } from 'lucide-react';

export const CheckoutForm = ({ planName, price, onSuccessfulPayment }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock function to simulate creating a payment intent on the backend
  const createPaymentIntent = async () => {
    // In a real app, this would be:
    // const response = await fetch('/api/create-payment-intent', { method: 'POST', body: JSON.stringify({ plan: planName }) });
    // const data = await response.json();
    // return data.clientSecret;
    
    return new Promise((resolve) => {
      setTimeout(() => resolve("mock_client_secret_12345"), 1000);
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // 1. Get client secret from backend (simulated)
      const clientSecret = await createPaymentIntent();

      // 2. In a real app, we would use stripe.confirmCardPayment with the real clientSecret
      // Since we don't have a real backend, we will simulate the success/failure here.
      // 
      // REAL CODE:
      // const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      //   payment_method: {
      //     card: elements.getElement(CardElement),
      //   }
      // });
      //
      // if (stripeError) { setError(stripeError.message); } 
      // else if (paymentIntent.status === 'succeeded') { onSuccessfulPayment(); }

      // MOCK BEHAVIOR: Simulate a 1 second delay then succeed
      setTimeout(() => {
        setIsProcessing(false);
        onSuccessfulPayment();
      }, 1500);

    } catch (err) {
      setError("An unexpected error occurred.");
      setIsProcessing(false);
    }
  };

  // Tailwind classes for the Stripe CardElement container
  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
        iconColor: '#802c6e',
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-light-crimson dark:text-white">Card Details</label>
        <div className="p-4 rounded-lg bg-white dark:bg-white/5 border border-light-crimson/20 dark:border-white/10 focus-within:border-light-accent dark:focus-within:border-accent transition-colors">
          <CardElement options={cardElementOptions} />
        </div>
      </div>
      
      {error && (
        <div className="text-red-500 text-sm font-medium bg-red-50 dark:bg-red-500/10 p-3 rounded-md border border-red-200 dark:border-red-500/20">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-light-crimson dark:bg-crimson text-white py-3.5 px-6 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:bg-light-accent dark:hover:bg-accent disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_4px_15px_rgba(139,26,58,0.3)]"
      >
        {isProcessing ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            Processing...
          </>
        ) : (
          `Pay ${price}`
        )}
      </button>
    </form>
  );
};
