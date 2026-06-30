import React, { createContext, useContext, useState } from 'react';

const QuestionnaireContext = createContext();

export const useQuestionnaire = () => {
  const context = useContext(QuestionnaireContext);
  if (!context) {
    throw new Error('useQuestionnaire must be used within a QuestionnaireProvider');
  }
  return context;
};

const initialData = {
  // Plan info (set when user clicks "Get Started")
  plan: { name: '', setupPrice: '', retainerPrice: '' },

  // Submission tracking
  submissionId: null,

  // Step 1 — Business Basics
  businessName: '',
  industry: '',
  businessDescription: '',
  targetAudience: '',
  websiteGoals: [], // array of strings
  websiteGoalOther: '',

  // Step 2 — Design Preferences
  logoFile: null,       // File object
  logoPreview: '',      // data URL for preview
  brandColors: ['#6366f1', '#ffffff', '#0f172a'],
  designStyle: '',
  referenceWebsites: [''],

  // Step 3 — Website Content
  numberOfPages: 5,
  pageNames: ['Home', 'About', 'Services', 'Contact'],
  hasExistingContent: false,
  contentFile: null,
  needsBlog: false,
  needsEcommerce: false,

  // Step 4 — Features & Integrations
  wantsAIChatbot: false,
  wantsVoiceAI: false,
  wantsContactForm: true,
  wantsBookingSystem: false,
  wantsSocialLinks: false,
  socialLinks: { facebook: '', instagram: '', twitter: '', linkedin: '', tiktok: '' },
  wantsAnalytics: false,
  otherRequests: '',

  // Add-ons
  addons: {
    chatWidgetOnWebsite: false,    // +$200/mo
    trainOnCustomDocs: false,      // +$150 one-time
    voiceAIBasic: false,           // +$200/mo (100 mins)
    voiceAIPro: false,             // +$400/mo (500 mins)
  },

  // Step 5 — Timeline & Final Details
  desiredLaunchDate: '',
  budgetFlexibility: '',
  howDidYouHear: '',
  additionalNotes: '',
};

// Add-on pricing constants — exported for use in components
export const ADDON_PRICING = {
  chatWidgetOnWebsite: { label: 'Chat Widget on Website', monthly: 200, oneTime: 0 },
  trainOnCustomDocs: { label: 'Train on Custom Docs/FAQs', monthly: 0, oneTime: 150 },
  voiceAIBasic: { label: 'Basic Voice AI (100 mins/mo)', monthly: 200, oneTime: 0 },
  voiceAIPro: { label: 'Pro Voice AI (500 mins/mo)', monthly: 400, oneTime: 0 },
};

// Helper: parse "$1,500" → 1500
export const parsePriceToNumber = (priceStr) => {
  if (!priceStr) return 0;
  return Number(priceStr.replace(/[^0-9.-]+/g, '')) || 0;
};

// Helper: compute totals from data
export const computeTotals = (data) => {
  const baseSetup = parsePriceToNumber(data.plan.setupPrice);
  const baseMonthly = parsePriceToNumber(data.plan.retainerPrice);

  let addonsOneTime = 0;
  let addonsMonthly = 0;

  Object.entries(data.addons).forEach(([key, enabled]) => {
    if (enabled && ADDON_PRICING[key]) {
      addonsOneTime += ADDON_PRICING[key].oneTime;
      addonsMonthly += ADDON_PRICING[key].monthly;
    }
  });

  return {
    baseSetup,
    baseMonthly,
    addonsOneTime,
    addonsMonthly,
    totalOneTime: baseSetup + addonsOneTime,
    totalMonthly: baseMonthly + addonsMonthly,
  };
};

export const QuestionnaireProvider = ({ children }) => {
  const [data, setData] = useState(initialData);

  const updateData = (updates) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const updateAddon = (key, enabled) => {
    setData((prev) => {
      const newAddons = { ...prev.addons, [key]: enabled };
      
      // Mutual exclusion for Voice AI tiers
      if (key === 'voiceAIBasic' && enabled) {
        newAddons.voiceAIPro = false;
      }
      if (key === 'voiceAIPro' && enabled) {
        newAddons.voiceAIBasic = false;
      }

      return {
        ...prev,
        addons: newAddons,
      };
    });
  };

  const resetData = () => {
    setData(initialData);
  };

  return (
    <QuestionnaireContext.Provider value={{ data, updateData, updateAddon, resetData }}>
      {children}
    </QuestionnaireContext.Provider>
  );
};
