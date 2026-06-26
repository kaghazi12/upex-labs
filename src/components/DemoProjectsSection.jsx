import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, X, ExternalLink } from 'lucide-react';
import { CosmicBackground } from './CosmicBackground'; // if we want the starfield inside, or just rely on global

const DEMO_PROJECTS = [
  {
    id: 'trimbox',
    name: 'TrimBox Barbershop',
    industry: 'LOCAL BUSINESS',
    features: ['Online booking system', 'Google Business setup', 'Lead capture form'],
    description: 'A complete digital presence for a local barbershop including automated booking integration that syncs with their calendar, reducing phone calls and missed appointments. We also optimized their Google Business Profile for local SEO.',
  },
  {
    id: 'nexlaw',
    name: 'Nexlaw Legal Group',
    industry: 'LAW FIRM',
    features: ['AI chat receptionist', 'Case inquiry form', 'Mobile optimized site'],
    description: 'A highly professional, fast-loading website for a legal practice. We integrated a custom-trained AI receptionist to qualify leads 24/7, answering basic legal queries and routing high-value cases to the attorneys instantly.',
  },
  {
    id: 'puresmile',
    name: 'PureSmile Dental',
    industry: 'DENTAL CLINIC',
    features: ['Voice AI receptionist', 'Appointment automation', 'Review request system'],
    description: 'A comprehensive patient acquisition engine. Features include a Voice AI that handles overflow inbound calls, fully automated appointment scheduling, and an automated SMS system requesting reviews from happy patients post-visit.',
  }
];

// Reusable mock browser frame component
const BrowserFrame = ({ children }) => (
  <div className="w-full h-48 md:h-56 bg-background/50 border-b border-border/50 relative overflow-hidden flex flex-col group-hover:bg-background/80 transition-colors">
    <div className="flex items-center gap-1.5 px-3 py-2 bg-card border-b border-border/50">
      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
    </div>
    <div className="flex-grow flex items-center justify-center relative overflow-hidden p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
      {children}
    </div>
  </div>
);

export const DemoProjectsSection = () => {
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModal]);

  return (
    <section id="work" className="py-24 md:py-32 relative z-10">
      <div className="max-w-[1200px] mx-auto px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24 flex flex-col items-center reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Our Work
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 tracking-tight">
            Projects that speak for themselves.
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl">
            A look at what we build for our clients
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DEMO_PROJECTS.map((project, idx) => (
            <div 
              key={project.id} 
              className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg group hover:border-primary/50 transition-all duration-300 reveal flex flex-col"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <BrowserFrame>
                <div className="w-full h-full rounded border border-border/50 bg-background flex flex-col items-center justify-center p-4 gap-3 shadow-sm transform group-hover:scale-[1.02] transition-transform duration-500">
                  <div className="w-16 h-4 bg-muted/30 rounded-full"></div>
                  <div className="w-full h-24 bg-muted/10 rounded-lg"></div>
                </div>
              </BrowserFrame>
              
              <div className="p-8 flex flex-col flex-grow">
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold tracking-widest rounded-full mb-4 w-fit">
                  {project.industry}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{project.name}</h3>
                
                <ul className="flex flex-col gap-2 mb-8 flex-grow">
                  {project.features.map((feature, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={() => setActiveModal(project)}
                  className="text-primary font-medium flex items-center gap-2 group/btn hover:text-primary/80 transition-colors w-fit"
                >
                  View Demo <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Overlay via Portal */}
      {activeModal && createPortal(
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-6" style={{ isolation: 'isolate' }}>
          <div 
            className="absolute inset-0 bg-background/90 backdrop-blur-sm cursor-pointer animate-fade-in"
            onClick={() => setActiveModal(null)}
          ></div>
          <div className="bg-card border border-border rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl animate-scale-in flex flex-col">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-background border border-border text-foreground hover:bg-primary/10 hover:text-primary transition-colors z-20"
            >
              <X size={18} />
            </button>
            
            <div className="p-8 pb-0 border-b border-border">
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold tracking-widest rounded-full mb-4">
                {activeModal.industry}
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-6">{activeModal.name}</h3>
            </div>

            <div className="p-8 bg-background/30 flex-grow">
              <div className="w-full h-64 sm:h-80 bg-background border border-border rounded-xl mb-8 relative overflow-hidden flex flex-col shadow-inner">
                <div className="flex items-center gap-1.5 px-4 py-3 bg-card border-b border-border">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  <div className="mx-auto px-4 py-1 bg-background rounded-md border border-border text-xs text-muted-foreground font-mono flex items-center gap-2 max-w-[200px] sm:max-w-xs w-full truncate">
                    <span className="opacity-50">https://</span>{activeModal.name.toLowerCase().replace(/\s+/g, '')}.com
                  </div>
                </div>
                <div className="flex-grow flex flex-col items-center justify-center p-8 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent"></div>
                  <div className="w-full max-w-md h-full border border-border/30 rounded-lg bg-card/50 p-6 flex flex-col gap-4 shadow-sm relative z-10">
                    <div className="w-32 h-6 bg-muted/20 rounded-md"></div>
                    <div className="w-full h-24 bg-muted/10 rounded-md"></div>
                    <div className="w-2/3 h-4 bg-muted/20 rounded-md mt-auto"></div>
                  </div>
                </div>
              </div>

              <div className="prose prose-invert max-w-none mb-8">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {activeModal.description}
                </p>
              </div>

              <div className="flex justify-end pt-6 border-t border-border group/visit relative">
                <button 
                  disabled
                  className="cosmic-button px-6 py-3 rounded-lg font-semibold flex items-center gap-2 opacity-50 cursor-not-allowed"
                >
                  Visit Site <ExternalLink size={16} />
                </button>
                <div className="absolute bottom-full right-0 mb-2 whitespace-nowrap bg-foreground text-background text-xs px-3 py-1.5 rounded opacity-0 group-hover/visit:opacity-100 transition-opacity pointer-events-none">
                  Client site — not publicly listed
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};
