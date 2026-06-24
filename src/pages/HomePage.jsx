import React from 'react';
import { Hero } from '../components/Hero';
import { Ticker } from '../components/Ticker';
import { BentoGrid } from '../components/BentoGrid';
import { ProcessSection } from '../components/ProcessSection';
import { PricingSection } from '../components/PricingSection';
import { ResultsSection } from '../components/ResultsSection';
import { FaqSection } from '../components/FaqSection';
import { FinalCta } from '../components/FinalCta';
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
      <ResultsSection />
      <FaqSection />
      <FinalCta />
    </>
  );
};
