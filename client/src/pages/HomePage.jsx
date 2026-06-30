import React from 'react';
import { Hero } from '../components/Hero';
import { Ticker } from '../components/Ticker';
import { BentoGrid } from '../components/BentoGrid';
import { ProcessSection } from '../components/ProcessSection';
import { PricingSection } from '../components/PricingSection';
import { DemoProjectsSection } from '../components/DemoProjectsSection';
import { PrivacyPolicySection } from '../components/PrivacyPolicySection';
import { FaqSection } from '../components/FaqSection';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export const HomePage = () => {
  // Initialize scroll reveal observer
  useScrollReveal();

  return (
    <>
      <Hero />
      <Ticker />
      <BentoGrid />
      <ProcessSection />
      <PricingSection />
      <DemoProjectsSection />
      <PrivacyPolicySection />
      <FaqSection />
    </>
  );
};
