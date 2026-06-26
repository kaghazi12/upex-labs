import React from 'react';
import { useQuestionnaire } from '@/context/QuestionnaireContext';
import { OrderSummary } from './OrderSummary';
import { Bot, Sparkles, PhoneCall, ArrowLeft, ArrowRight } from 'lucide-react';

const SOCIAL_PLATFORMS = [
  { key: 'facebook', label: 'Facebook' },
  { key: 'instagram', label: 'Instagram' },
  { key: 'twitter', label: 'X (Twitter)' },
  { key: 'linkedin', label: 'LinkedIn' },
  { key: 'tiktok', label: 'TikTok' },
];

export const StepFeaturesIntegrations = ({ onNext, onBack }) => {
  const { data, updateData, updateAddon } = useQuestionnaire();

  const planName = data.plan.name;
  const showAIOptions = planName === 'Growth Engine' || planName === 'Full Stack AI';

  const updateSocialLink = (platform, value) => {
    updateData({ socialLinks: { ...data.socialLinks, [platform]: value } });
  };

  const inputClass = "w-full p-3 bg-background border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground";

  const ToggleRow = ({ label, description, checked, onChange }) => (
    <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
      <div className="pr-4">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
      </div>
      <button
        type="button"
        onClick={onChange}
        className={`relative w-12 h-6 rounded-full transition-colors duration-200 cursor-pointer shrink-0 ${checked ? 'bg-primary' : 'bg-border'}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200 ${checked ? 'translate-x-6' : ''}`} />
      </button>
    </div>
  );

  const AddonCheckbox = ({ addonKey, label, price, description, checked }) => (
    <label className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
      checked ? 'bg-primary/10 border-primary/40' : 'bg-background border-border hover:border-primary/30'
    }`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => updateAddon(addonKey, e.target.checked)}
        className="mt-0.5 accent-primary w-4 h-4 shrink-0"
      />
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <span className="text-sm font-medium text-foreground">{label}</span>
          <span className="text-xs font-semibold text-primary shrink-0 ml-2">{price}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
    </label>
  );

  return (
    <div className="flex flex-col gap-4 animate-fade-in">
      {/* AI Chatbot — only for Growth Engine / Full Stack AI */}
      {showAIOptions && (
        <>
          <div className={`p-4 rounded-lg border transition-all duration-200 flex items-center justify-between ${
            data.wantsAIChatbot ? 'bg-primary/10 border-primary' : 'bg-card border-border'
          }`}>
            <div className="pr-4">
              <p className="text-sm font-medium text-foreground flex items-center gap-2">
                <Bot size={20} className="text-primary" /> AI Chatbot
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                An AI assistant trained on your business to handle customer queries 24/7
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const next = !data.wantsAIChatbot;
                updateData({ wantsAIChatbot: next });
                if (!next) {
                  updateAddon('chatWidgetOnWebsite', false);
                  updateAddon('trainOnCustomDocs', false);
                }
              }}
              className={`relative w-12 h-6 rounded-full transition-colors duration-200 cursor-pointer shrink-0 ${data.wantsAIChatbot ? 'bg-primary' : 'bg-border'}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200 ${data.wantsAIChatbot ? 'translate-x-6' : ''}`} />
            </button>
          </div>

          {/* AI Chatbot Add-ons */}
          {data.wantsAIChatbot && (
            <div className="flex flex-col gap-2 pl-2 border-l-2 border-primary/30 ml-2 animate-fade-in">
              <p className="text-xs text-muted-foreground mb-1"><Sparkles size={14} className="text-primary inline mr-1" /> AI Chatbot is included in your plan. Upgrade with add-ons:</p>
              <AddonCheckbox
                addonKey="chatWidgetOnWebsite"
                label="Chat Widget on Website"
                price="+$200/mo"
                description="Embed the chatbot directly on your website as a live chat widget"
                checked={data.addons.chatWidgetOnWebsite}
              />
              <AddonCheckbox
                addonKey="trainOnCustomDocs"
                label="Train on Custom Docs/FAQs"
                price="+$150 one-time"
                description="Upload your own docs, FAQs, or SOPs to train the chatbot on your business"
                checked={data.addons.trainOnCustomDocs}
              />
            </div>
          )}

          {/* Voice AI Receptionist */}
          <div className={`p-4 rounded-lg border transition-all duration-200 flex items-center justify-between ${
            data.wantsVoiceAI ? 'bg-primary/10 border-primary' : 'bg-card border-border'
          }`}>
            <div className="pr-4">
              <p className="text-sm font-medium text-foreground flex items-center gap-2">
                <PhoneCall size={20} className="text-primary" /> Voice AI Receptionist
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Our Voice AI handles inbound calls, answers FAQs, and books appointments — 24/7, without a human receptionist
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const next = !data.wantsVoiceAI;
                updateData({ wantsVoiceAI: next });
                if (!next) {
                  updateAddon('voiceAIBasic', false);
                  updateAddon('voiceAIPro', false);
                }
              }}
              className={`relative w-12 h-6 rounded-full transition-colors duration-200 cursor-pointer shrink-0 ${data.wantsVoiceAI ? 'bg-primary' : 'bg-border'}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200 ${data.wantsVoiceAI ? 'translate-x-6' : ''}`} />
            </button>
          </div>

          {/* Voice AI Pricing Tiers */}
          {data.wantsVoiceAI && (
            <div className="flex flex-col gap-2 pl-2 border-l-2 border-primary/30 ml-2 animate-fade-in">
              <p className="text-xs text-muted-foreground mb-1">Select your Voice AI tier:</p>
              <AddonCheckbox
                addonKey="voiceAIBasic"
                label="Basic Voice AI (100 mins/mo)"
                price="+$200/mo"
                description="Handles inbound calls, answers FAQs, books appointments"
                checked={data.addons.voiceAIBasic}
              />
              <AddonCheckbox
                addonKey="voiceAIPro"
                label="Pro Voice AI (500 mins/mo)"
                price="+$400/mo"
                description="Everything in Basic plus custom call scripts and escalation flows"
                checked={data.addons.voiceAIPro}
              />
            </div>
          )}
        </>
      )}

      <ToggleRow
        label="Contact Form"
        description="Let visitors send inquiries directly from your site"
        checked={data.wantsContactForm}
        onChange={() => updateData({ wantsContactForm: !data.wantsContactForm })}
      />

      <ToggleRow
        label="Booking / Appointment System"
        description="Allow clients to schedule appointments online"
        checked={data.wantsBookingSystem}
        onChange={() => updateData({ wantsBookingSystem: !data.wantsBookingSystem })}
      />

      <ToggleRow
        label="Google Analytics / Tracking"
        description="Track visitors, traffic sources, and conversions"
        checked={data.wantsAnalytics}
        onChange={() => updateData({ wantsAnalytics: !data.wantsAnalytics })}
      />

      {/* Social Media Links */}
      <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
        <div className="pr-4">
          <p className="text-sm font-medium text-foreground">Social Media Links</p>
          <p className="text-xs text-muted-foreground mt-0.5">Display links to your social profiles</p>
        </div>
        <button
          type="button"
          onClick={() => updateData({ wantsSocialLinks: !data.wantsSocialLinks })}
          className={`relative w-12 h-6 rounded-full transition-colors duration-200 cursor-pointer shrink-0 ${data.wantsSocialLinks ? 'bg-primary' : 'bg-border'}`}
        >
          <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200 ${data.wantsSocialLinks ? 'translate-x-6' : ''}`} />
        </button>
      </div>

      {data.wantsSocialLinks && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-2 border-l-2 border-primary/30 ml-2">
          {SOCIAL_PLATFORMS.map(({ key, label }) => (
            <div key={key}>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">{label}</label>
              <input
                type="url"
                value={data.socialLinks[key]}
                onChange={(e) => updateSocialLink(key, e.target.value)}
                className={inputClass + " text-sm"}
                placeholder={`https://${key}.com/yourpage`}
              />
            </div>
          ))}
        </div>
      )}

      {/* Other Requests */}
      <div className="mt-2">
        <label className="block text-sm font-medium text-foreground mb-1.5">Any other integrations or special requests?</label>
        <textarea
          rows={3}
          value={data.otherRequests}
          onChange={(e) => updateData({ otherRequests: e.target.value })}
          className={inputClass + " resize-none"}
          placeholder="e.g. CRM integration, custom animations, specific API..."
        />
      </div>

      {/* Order Summary */}
      <div className="mt-4">
        <OrderSummary />
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-4">
        <button onClick={onBack} className="px-8 py-3 rounded-lg text-sm font-semibold border border-border text-foreground hover:border-primary transition-colors cursor-pointer flex items-center gap-2">
          <ArrowLeft size={16} /> Back
        </button>
        <button onClick={onNext} className="cosmic-button px-8 py-3 rounded-lg text-sm font-semibold flex items-center gap-2">
          Next <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
