import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useTheme } from '@/context/ThemeContext';

export const CheckoutForm = ({ planName, price, onSuccessfulPayment }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { isDarkMode } = useTheme();
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock function to simulate creating a payment intent on the backend
  const createPaymentIntent = async () => {
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
      const clientSecret = await createPaymentIntent();

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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">Card Details</label>
        <div className="p-4 border border-border bg-background rounded-lg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
          <CardElement 
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: isDarkMode ? '#f8fafc' : '#0f172a',
                  '::placeholder': {
                    color: isDarkMode ? '#64748b' : '#94a3b8',
                  },
                  iconColor: isDarkMode ? '#a78bfa' : '#6366f1',
                },
                invalid: {
                  color: '#ef4444',
                  iconColor: '#ef4444',
                },
              },
            }}
          />
        </div>
      </div>
      
      {error && (
        <div className="text-red-500 text-sm mt-2">{error}</div>
      )}

      <button 
        type="submit" 
        disabled={!stripe || isProcessing}
        className="w-full cosmic-button py-4 text-base mt-2 flex items-center justify-center"
      >
        {isProcessing ? (
          <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
        ) : (
          `Pay ${price}`
        )}
      </button>
    </form>
  );
};
