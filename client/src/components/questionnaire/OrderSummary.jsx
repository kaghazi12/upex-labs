import React from 'react';
import { useQuestionnaire, ADDON_PRICING, computeTotals } from '@/context/QuestionnaireContext';

export const OrderSummary = () => {
  const { data } = useQuestionnaire();
  const totals = computeTotals(data);

  const activeAddons = Object.entries(data.addons)
    .filter(([, enabled]) => enabled)
    .map(([key]) => ({ key, ...ADDON_PRICING[key] }));

  return (
    <div className="bg-card border border-border rounded-xl p-5 text-left">
      <h3 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wide">Order Summary</h3>

      {/* Base plan */}
      <div className="flex justify-between items-center py-2 border-b border-border/50">
        <span className="text-sm text-foreground font-medium">{data.plan.name} Plan</span>
        <div className="text-right">
          <span className="text-sm font-semibold text-foreground">{data.plan.setupPrice}</span>
        </div>
      </div>

      {/* Add-ons */}
      {activeAddons.length > 0 && (
        <div className="mt-2">
          {activeAddons.map(({ key, label, oneTime }) => (
            <div key={key} className="flex justify-between items-center py-1.5">
              <span className="text-xs text-muted-foreground">+ {label}</span>
              <span className="text-xs font-medium text-primary">
                {oneTime > 0 && `$${oneTime}`}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Totals */}
      <div className="mt-3 pt-3 border-t border-border">
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium text-muted-foreground">Total</span>
          <span className="text-base font-bold text-foreground">${totals.totalOneTime.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};
