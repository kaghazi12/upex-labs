import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useQuestionnaire, ADDON_PRICING, computeTotals } from '@/context/QuestionnaireContext';
import { StepBusinessBasics } from '@/components/questionnaire/StepBusinessBasics';
import { StepDesignPreferences } from '@/components/questionnaire/StepDesignPreferences';
import { StepWebsiteContent } from '@/components/questionnaire/StepWebsiteContent';
import { StepFeaturesIntegrations } from '@/components/questionnaire/StepFeaturesIntegrations';
import { StepTimelineDetails } from '@/components/questionnaire/StepTimelineDetails';
import { AlertCircle } from 'lucide-react';

const STEPS = [
  { label: 'Business', component: 'business' },
  { label: 'Design', component: 'design' },
  { label: 'Content', component: 'content' },
  { label: 'Features', component: 'features' },
  { label: 'Timeline', component: 'timeline' },
];

export const QuestionnairePage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submittedCustom, setSubmittedCustom] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data, updateData } = useQuestionnaire();

  // Read plan from URL params and store in context on first render
  const planName = searchParams.get('plan') || data.plan.name || 'Growth Engine';
  const setupPrice = searchParams.get('setup') || data.plan.setupPrice || '$999';

  useEffect(() => {
    // Sync plan info into context if not already set
    if (data.plan.name !== planName || data.plan.setupPrice !== setupPrice) {
      updateData({ plan: { name: planName, setupPrice } });
    }
  }, [planName, setupPrice, data.plan.name, data.plan.setupPrice, updateData]);

  const goNext = () => setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1));
  const goBack = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError('');

    try {
      // Build payload — file metadata only (no binary)
      const totals = computeTotals(data);
      const activeAddons = Object.entries(data.addons)
        .filter(([, enabled]) => enabled)
        .map(([key]) => ({ key, ...ADDON_PRICING[key] }));

      const payload = {
        plan: data.plan,
        businessName: data.businessName,
        industry: data.industry,
        businessDescription: data.businessDescription,
        targetAudience: data.targetAudience,
        websiteGoals: data.websiteGoals,
        websiteGoalOther: data.websiteGoalOther,
        brandColors: data.brandColors,
        designStyle: data.designStyle,
        referenceWebsites: data.referenceWebsites.filter(Boolean),
        logoFile: data.logoFile ? { name: data.logoFile.name, size: data.logoFile.size, type: data.logoFile.type } : null,
        numberOfPages: data.numberOfPages,
        pageNames: data.pageNames.filter(Boolean),
        hasExistingContent: data.hasExistingContent,
        contentFile: data.contentFile ? { name: data.contentFile.name, size: data.contentFile.size, type: data.contentFile.type } : null,
        needsBlog: data.needsBlog,
        needsEcommerce: data.needsEcommerce,
        wantsAIChatbot: data.wantsAIChatbot,
        wantsVoiceAI: data.wantsVoiceAI,
        wantsContactForm: data.wantsContactForm,
        wantsBookingSystem: data.wantsBookingSystem,
        wantsSocialLinks: data.wantsSocialLinks,
        socialLinks: data.wantsSocialLinks ? data.socialLinks : null,
        wantsAnalytics: data.wantsAnalytics,
        otherRequests: data.otherRequests,
        addons: data.addons,
        activeAddons,
        desiredLaunchDate: data.desiredLaunchDate,
        budgetFlexibility: data.budgetFlexibility,
        howDidYouHear: data.howDidYouHear,
        additionalNotes: data.additionalNotes,
        totals,
        timestamp: new Date().toISOString(),
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/questionnaire/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error (${response.status})`);
      }

      const result = await response.json();
      updateData({ submissionId: result.submissionId });

      if (planName === 'Custom') {
        setSubmittedCustom(true);
      } else {
        // Navigate to checkout with plan + totals
        navigate(
          `/checkout?plan=${encodeURIComponent(planName)}&setup=${encodeURIComponent(`$${totals.totalOneTime.toLocaleString()}`)}`
        );
      }
    } catch (err) {
      console.error('Submission failed:', err);
      setSubmitError(err.message || 'Failed to save questionnaire. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 md:px-6 relative z-10 flex flex-col items-center">
      {/* Error toast */}
      {submitError && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-red-500/95 text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-2 animate-fade-in max-w-[90vw]">
          <AlertCircle size={18} />
          <span className="text-sm font-medium">{submitError}</span>
          <button onClick={() => setSubmitError('')} className="ml-3 text-white/80 hover:text-white cursor-pointer text-lg leading-none">&times;</button>
        </div>
      )}

      {/* Plan header and Progress Bar - only show if not submitted Custom */}
      {!submittedCustom && (
        <>
          <div className="w-full max-w-[700px] mb-8 text-center">
            <h1 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">Tell us about your project</h1>
            <div className="inline-flex items-center gap-3 bg-card border border-border rounded-full px-5 py-2 mt-2">
              <span className="text-sm font-semibold text-primary">{planName}</span>
              <span className="text-xs text-muted-foreground">|</span>
              {planName === 'Custom' ? (
                <span className="text-sm text-foreground font-medium">Custom Pricing</span>
              ) : (
                <>
                  <span className="text-sm text-foreground font-medium">{setupPrice}</span>
                </>
              )}
            </div>
          </div>

          <div className="w-full max-w-[700px] mb-10">
            <div className="flex items-center justify-between">
              {STEPS.map((step, i) => (
                <div key={i} className="flex flex-col items-center flex-1">
                  <div className="flex items-center w-full">
                    <div className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 mx-auto
                      ${i < currentStep ? 'bg-primary border-primary text-primary-foreground' :
                        i === currentStep ? 'bg-primary/20 border-primary text-primary' :
                        'bg-card border-border text-muted-foreground'}`}
                    >
                      {i < currentStep ? '✓' : i + 1}
                    </div>
                  </div>
                  <span className={`text-[10px] md:text-xs mt-1.5 font-medium transition-colors duration-300
                    ${i <= currentStep ? 'text-primary' : 'text-muted-foreground'}`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="relative h-1 bg-border rounded-full mt-3 overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
              />
            </div>
          </div>
        </>
      )}

      {/* Submitting overlay */}
      {submitting && (
        <div className="fixed inset-0 z-[9999] bg-background/80 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-card border border-border rounded-2xl p-8 flex flex-col items-center gap-4 shadow-xl">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-foreground font-medium">Saving your questionnaire...</p>
          </div>
        </div>
      )}

      {submittedCustom ? (
        <div className="w-full max-w-[700px] bg-card border border-border rounded-2xl p-10 shadow-lg text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-6">
            <span className="text-3xl">✓</span>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Request Submitted</h2>
          <p className="text-muted-foreground text-base">
            Thanks! We've received your project details. Our team will review your requirements and reach out within 24 hours with a custom quote.
          </p>
        </div>
      ) : (
        <div className="w-full max-w-[700px] bg-card border border-border rounded-2xl p-6 md:p-10 shadow-lg text-left">
          <h2 className="text-lg font-bold text-foreground mb-1">
            {STEPS[currentStep].label}
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            {currentStep === 0 && 'Tell us about your business so we can build the right system for you.'}
            {currentStep === 1 && 'Help us understand the look and feel you want for your brand.'}
            {currentStep === 2 && "Let's figure out the structure and content of your website."}
            {currentStep === 3 && 'Choose the features and integrations you need.'}
            {currentStep === 4 && 'Almost done — just a few final details.'}
          </p>

          {currentStep === 0 && <StepBusinessBasics onNext={goNext} />}
          {currentStep === 1 && <StepDesignPreferences onNext={goNext} onBack={goBack} />}
          {currentStep === 2 && <StepWebsiteContent onNext={goNext} onBack={goBack} />}
          {currentStep === 3 && <StepFeaturesIntegrations onNext={goNext} onBack={goBack} />}
          {currentStep === 4 && <StepTimelineDetails onBack={goBack} onSubmit={handleSubmit} />}
        </div>
      )}
    </div>
  );
};
