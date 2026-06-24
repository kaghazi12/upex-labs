import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';

export const PaypalCheckout = ({ planName, price, onSuccessfulPayment }) => {
  // Convert formatted price string (e.g., "$1,500") to numeric for PayPal (e.g., "1500.00")
  const numericPrice = price.replace(/[^0-9.]/g, '');

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: `Upex Labs - ${planName} Plan`,
          amount: {
            value: numericPrice,
          },
        },
      ],
    });
  };

  const onApprove = async (data, actions) => {
    try {
      const order = await actions.order.capture();
      console.log('Capture result', order);
      // In a real app, you would send `order.id` or `order` to your backend to verify
      onSuccessfulPayment();
    } catch (error) {
      console.error('Payment failed', error);
      alert('Payment could not be captured. Please try again.');
    }
  };

  const onError = (err) => {
    console.error('PayPal Error', err);
  };

  return (
    <div className="w-full relative z-0">
      <PayPalButtons
        style={{
          layout: 'vertical',
          shape: 'rect',
          color: 'blue',
        }}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
      />
    </div>
  );
};
