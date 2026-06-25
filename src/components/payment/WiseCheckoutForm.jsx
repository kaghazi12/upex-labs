import React, { useState } from 'react';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import axios from 'axios';

const API_BASE = 'http://localhost:3001/api/wise';

export const WiseCheckoutForm = ({ planName, price, onSuccessfulPayment }) => {
  const [step, setStep] = useState(1); // 1: Quote, 2: Recipient, 3: Transfer & Fund
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  
  // Data State
  const [quoteData, setQuoteData] = useState(null);
  const [recipientData, setRecipientData] = useState({
    accountHolderName: '',
    iban: '',
  });

  // Calculate amount from price string (e.g., "$3,500" -> 3500)
  const amount = Number(price.replace(/[^0-9.-]+/g, ""));

  const handleCreateQuote = async () => {
    setIsProcessing(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE}/quote`, {
        sourceCurrency: 'USD',
        targetCurrency: 'EUR', // Example default target
        amount: amount,
      });
      setQuoteData(response.data);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to create quote');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCreateRecipientAndTransfer = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);
    try {
      // 1. Create Recipient
      const recipientRes = await axios.post(`${API_BASE}/recipient`, {
        accountHolderName: recipientData.accountHolderName,
        currency: 'EUR',
        iban: recipientData.iban,
      });
      const recipientId = recipientRes.data.recipientId;

      // 2. Create Transfer
      const transferRes = await axios.post(`${API_BASE}/transfer`, {
        quoteId: quoteData.id,
        recipientId: recipientId,
        reference: `Payment for ${planName}`,
      });
      const transferId = transferRes.data.transferId;

      // 3. Fund Transfer
      await axios.post(`${API_BASE}/fund`, {
        transferId: transferId,
      });

      // Show Success
      setStep(4); // 4: Success
      setTimeout(() => {
        onSuccessfulPayment();
      }, 2000);
      
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Transfer process failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 
              ${step === i ? 'border-primary bg-primary/20 text-primary' : 
                step > i ? 'border-green-500 bg-green-500/20 text-green-500' : 
                'border-border text-muted-foreground'}`}>
              {step > i ? <CheckCircle2 size={16} /> : i}
            </div>
            <span className="text-xs text-muted-foreground mt-2 hidden sm:block">
              {i === 1 ? 'Quote' : i === 2 ? 'Details' : 'Transfer'}
            </span>
          </div>
        ))}
      </div>

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3 text-red-500 text-sm">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <p>{typeof error === 'string' ? error : JSON.stringify(error)}</p>
        </div>
      )}

      {step === 1 && (
        <div className="flex flex-col gap-4 text-center">
          <p className="text-muted-foreground text-sm">
            You will be transferring <strong>${amount.toFixed(2)} USD</strong> via Wise.
            Click below to generate a real-time exchange quote.
          </p>
          <button 
            onClick={handleCreateQuote}
            disabled={isProcessing}
            className="w-full cosmic-button py-4 text-base mt-2 flex items-center justify-center"
          >
            {isProcessing ? <Loader2 className="animate-spin" /> : 'Get Wise Quote'}
          </button>
        </div>
      )}

      {step === 2 && (
        <form onSubmit={handleCreateRecipientAndTransfer} className="flex flex-col gap-4">
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg mb-2">
            <p className="text-sm text-foreground text-center">
              Quote generated! Rate: <strong>{quoteData?.rate}</strong>
            </p>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">Account Holder Name</label>
            <input 
              type="text" 
              required
              value={recipientData.accountHolderName}
              onChange={(e) => setRecipientData({ ...recipientData, accountHolderName: e.target.value })}
              className="w-full p-3 bg-background border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground"
              placeholder="e.g. John Doe"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">IBAN (EUR)</label>
            <input 
              type="text" 
              required
              value={recipientData.iban}
              onChange={(e) => setRecipientData({ ...recipientData, iban: e.target.value })}
              className="w-full p-3 bg-background border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground"
              placeholder="e.g. DE89370400440532013000"
            />
          </div>

          <button 
            type="submit"
            disabled={isProcessing}
            className="w-full cosmic-button py-4 text-base mt-4 flex items-center justify-center"
          >
            {isProcessing ? <Loader2 className="animate-spin" /> : 'Confirm & Transfer'}
          </button>
        </form>
      )}

      {step === 4 && (
        <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in zoom-in duration-300">
          <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">Transfer Initiated</h3>
          <p className="text-muted-foreground text-sm">
            Your Wise payment has been successfully processed.
          </p>
        </div>
      )}
    </div>
  );
};
