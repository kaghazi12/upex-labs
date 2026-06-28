import React from 'react';

export const PrivacyPolicySection = () => {
  return (
    <section id="privacy" className="py-24 md:py-32 relative z-10 bg-background/50 border-t border-border/30">
      <div className="max-w-[800px] mx-auto px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-16 md:mb-20 text-center flex flex-col items-center reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
            Legal
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            Privacy Policy
          </h2>
          <p className="text-muted-foreground font-medium">
            Last updated: June 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-12 shadow-xl reveal prose prose-invert prose-p:text-muted-foreground prose-li:text-muted-foreground max-w-none">
          
          <div className="mb-8">
            <h3 className="text-lg font-bold text-foreground mb-3">Your privacy matters to us.</h3>
            <p className="leading-relaxed">
              UPEX LABS collects only what we need to deliver your project — nothing more.
            </p>
          </div>

          <div className="w-full h-px bg-primary/20 my-8" />

          <div className="mb-8">
            <h3 className="text-lg font-bold text-foreground mb-3">What we collect</h3>
            <p className="leading-relaxed">
              Name, email, and phone number from forms. Business details from your questionnaire. Payment is handled entirely by Wise — we never see or store your card details.
            </p>
          </div>

          <div className="w-full h-px bg-primary/20 my-8" />

          <div className="mb-8">
            <h3 className="text-lg font-bold text-foreground mb-3">How we use it</h3>
            <p className="leading-relaxed">
              To build and manage your project, communicate updates, and process payments. We do not sell or share your data with anyone. Ever.
            </p>
          </div>

          <div className="w-full h-px bg-primary/20 my-8" />

          <div className="mb-8">
            <h3 className="text-lg font-bold text-foreground mb-3">Cookies</h3>
            <p className="leading-relaxed">
              We use essential cookies to keep the site running and basic analytics to understand how people use it. You can turn these off in your browser anytime.
            </p>
          </div>

          <div className="w-full h-px bg-primary/20 my-8" />

          <div>
            <h3 className="text-lg font-bold text-foreground mb-3">Questions?</h3>
            <p className="leading-relaxed">
              <a href="mailto:privacy@upexlabs.com" className="text-primary hover:text-primary/80 transition-colors no-underline">privacy@upexlabs.com</a>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
