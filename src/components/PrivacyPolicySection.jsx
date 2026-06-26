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
          
          <div className="mb-10">
            <h3 className="text-xl font-bold text-foreground mb-4">1. Introduction</h3>
            <p className="leading-relaxed">
              UPEX LABS is committed to protecting your personal information. 
              This Privacy Policy explains how we collect, use, and safeguard your data when you 
              use our website and services.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold text-foreground mb-4">2. Information We Collect</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Contact information (name, email, phone number) submitted via forms</li>
              <li>Business information submitted through our client questionnaire</li>
              <li>Payment information processed securely through Wise (we do not store card details)</li>
              <li>Usage data and cookies for analytics purposes</li>
            </ul>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold text-foreground mb-4">3. How We Use Your Information</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>To deliver and manage the services you've purchased</li>
              <li>To communicate with you about your project</li>
              <li>To process payments securely</li>
              <li>To improve our website and services</li>
              <li>We do not sell, rent, or share your personal data with third parties for marketing</li>
            </ul>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold text-foreground mb-4">4. Data Storage & Security</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Client data is stored securely on encrypted servers</li>
              <li>Payment transactions are handled by Wise and are subject to their privacy policy</li>
              <li>We retain client project data for up to 2 years after project completion</li>
              <li>You may request deletion of your data at any time by contacting us</li>
            </ul>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold text-foreground mb-4">5. Cookies</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>We use essential cookies for site functionality</li>
              <li>We use analytics cookies (e.g. Google Analytics) to understand site usage</li>
              <li>You can disable cookies in your browser settings at any time</li>
            </ul>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold text-foreground mb-4">6. Your Rights</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>You have the right to access, correct, or delete your personal data</li>
              <li>You may opt out of marketing communications at any time</li>
              <li>To exercise your rights, contact us at: <a href="mailto:privacy@upexlabs.com" className="text-primary hover:underline">privacy@upexlabs.com</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">7. Contact</h3>
            <p className="leading-relaxed mb-1">For any privacy-related questions:</p>
            <p className="leading-relaxed mb-1">Email: <a href="mailto:privacy@upexlabs.com" className="text-primary hover:underline">privacy@upexlabs.com</a></p>
            <p className="leading-relaxed">Website: <a href="https://upexlabs.com" className="text-primary hover:underline">upexlabs.com</a></p>
          </div>

        </div>
      </div>
    </section>
  );
};
