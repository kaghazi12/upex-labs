import React, { useState } from 'react';
import { useQuestionnaire, ADDON_PRICING } from '@/context/QuestionnaireContext';
import { AlertCircle, Check, ArrowLeft, ArrowRight } from 'lucide-react';
import { OrderSummary } from './OrderSummary';

const HOW_OPTIONS = ['Google Search', 'Social Media', 'Referral', 'Other'];
const BUDGET_OPTIONS = [
  { value: 'fixed', label: 'Fixed', desc: "I want exactly what's in my plan" },
  { value: 'flexible', label: 'Flexible', desc: "I'm open to add-ons if needed" },
];

export const StepTimelineDetails = ({ onBack, onSubmit }) => {
  const { data, updateData } = useQuestionnaire();
  const [errors, setErrors] = useState({});
  const [showReview, setShowReview] = useState(false);

  const validate = () => {
    const e = {};
    if (!data.budgetFlexibility) e.budgetFlexibility = 'Please select your budget preference';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleShowReview = () => {
    if (validate()) setShowReview(true);
  };

  const inputClass = "w-full p-3 bg-background border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground";

  const activeAddons = Object.entries(data.addons)
    .filter(([, enabled]) => enabled)
    .map(([key]) => ({ key, ...ADDON_PRICING[key] }));

  // Review Summary
  if (showReview) {
    const SummaryRow = ({ label, value }) => (
      value ? (
        <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-border/50 last:border-b-0">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</span>
          <span className="text-sm text-foreground mt-0.5 sm:mt-0 sm:text-right max-w-[60%]">{value}</span>
        </div>
      ) : null
    );

    return (
      <div className="flex flex-col gap-4 animate-fade-in">
        <h3 className="text-lg font-bold text-foreground mb-2">Review Your Answers</h3>
        <div className="bg-card border border-border rounded-xl p-5 flex flex-col gap-1 text-left">
          <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Business Basics</p>
          <SummaryRow label="Business Name" value={data.businessName} />
          <SummaryRow label="Industry" value={data.industry} />
          <SummaryRow label="Description" value={data.businessDescription} />
          <SummaryRow label="Target Audience" value={data.targetAudience} />
          <SummaryRow label="Website Goals" value={data.websiteGoals.join(', ')} />
          
          <p className="text-xs font-bold text-primary uppercase tracking-wider mt-4 mb-2">Design</p>
          <SummaryRow label="Design Style" value={data.designStyle} />
          <SummaryRow label="Brand Colors" value={data.brandColors.join(', ')} />
          <SummaryRow label="Logo" value={data.logoFile ? data.logoFile.name : 'Not uploaded'} />

          <p className="text-xs font-bold text-primary uppercase tracking-wider mt-4 mb-2">Content & Pages</p>
          <SummaryRow label="Pages" value={data.pageNames.filter(Boolean).join(', ')} />
          <SummaryRow label="Has Content" value={data.hasExistingContent ? 'Yes' : 'No'} />
          <SummaryRow label="Blog" value={data.needsBlog ? 'Yes' : 'No'} />
          <SummaryRow label="E-commerce" value={data.needsEcommerce ? 'Yes' : 'No'} />

          <p className="text-xs font-bold text-primary uppercase tracking-wider mt-4 mb-2">Features</p>
          <SummaryRow label="Contact Form" value={data.wantsContactForm ? 'Yes' : 'No'} />
          <SummaryRow label="Booking System" value={data.wantsBookingSystem ? 'Yes' : 'No'} />
          <SummaryRow label="AI Chatbot" value={data.wantsAIChatbot ? 'Yes' : 'No'} />
          <SummaryRow label="Voice AI" value={data.wantsVoiceAI ? 'Yes' : 'No'} />
          <SummaryRow label="Analytics" value={data.wantsAnalytics ? 'Yes' : 'No'} />
          {data.otherRequests && <SummaryRow label="Other Requests" value={data.otherRequests} />}

          {activeAddons.length > 0 && (
            <>
              <p className="text-xs font-bold text-primary uppercase tracking-wider mt-4 mb-2">Selected Add-ons</p>
              {activeAddons.map(({ key, label, monthly, oneTime }) => (
                <SummaryRow
                  key={key}
                  label={label}
                  value={oneTime > 0 ? `$${oneTime} one-time` : `$${monthly}/mo`}
                />
              ))}
            </>
          )}

          <p className="text-xs font-bold text-primary uppercase tracking-wider mt-4 mb-2">Timeline</p>
          <SummaryRow label="Launch Date" value={data.desiredLaunchDate || 'Not specified'} />
          <SummaryRow label="Budget" value={data.budgetFlexibility === 'fixed' ? 'Fixed' : 'Flexible'} />
          <SummaryRow label="How Did You Hear" value={data.howDidYouHear || 'Not specified'} />
        </div>

        {/* Order Summary */}
        <OrderSummary />

        <div className="flex justify-between mt-4">
          <button onClick={() => setShowReview(false)} className="px-8 py-3 rounded-lg text-sm font-semibold border border-border text-foreground hover:border-primary transition-colors cursor-pointer flex items-center gap-2">
            <ArrowLeft size={16} /> Edit Answers
          </button>
          <button onClick={onSubmit} className="cosmic-button px-8 py-3 rounded-lg text-sm font-semibold flex items-center gap-2">
            <Check size={16} /> Proceed to Checkout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Launch Date */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">Desired Launch Date</label>
        <input
          type="date"
          value={data.desiredLaunchDate}
          onChange={(e) => updateData({ desiredLaunchDate: e.target.value })}
          className={inputClass + " max-w-[250px]"}
        />
      </div>

      {/* Budget Flexibility */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">Budget Flexibility *</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {BUDGET_OPTIONS.map(({ value, label, desc }) => (
            <button
              key={value}
              type="button"
              onClick={() => updateData({ budgetFlexibility: value })}
              className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                data.budgetFlexibility === value
                  ? 'bg-primary/15 border-primary'
                  : 'bg-card border-border hover:border-primary/40'
              }`}
            >
              <span className={`text-sm font-semibold block ${data.budgetFlexibility === value ? 'text-primary' : 'text-foreground'}`}>
                {label}
              </span>
              <span className="text-xs text-muted-foreground">{desc}</span>
            </button>
          ))}
        </div>
        {errors.budgetFlexibility && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.budgetFlexibility}</p>}
      </div>

      {/* How Did You Hear */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">How did you hear about us?</label>
        <select
          value={data.howDidYouHear}
          onChange={(e) => updateData({ howDidYouHear: e.target.value })}
          className={inputClass + " max-w-[300px] cursor-pointer"}
        >
          <option value="">Select an option</option>
          {HOW_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* Additional Notes */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">Anything else you'd like us to know?</label>
        <textarea
          rows={3}
          value={data.additionalNotes}
          onChange={(e) => updateData({ additionalNotes: e.target.value })}
          className={inputClass + " resize-none"}
          placeholder="Any other details, preferences, or requirements..."
        />
      </div>

      {/* Order Summary */}
      <OrderSummary />

      {/* Navigation */}
      <div className="flex justify-between mt-4">
        <button onClick={onBack} className="px-8 py-3 rounded-lg text-sm font-semibold border border-border text-foreground hover:border-primary transition-colors cursor-pointer flex items-center gap-2">
          <ArrowLeft size={16} /> Back
        </button>
        <button onClick={handleShowReview} className="cosmic-button px-8 py-3 rounded-lg text-sm font-semibold flex items-center gap-2">
          Review & Submit <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
