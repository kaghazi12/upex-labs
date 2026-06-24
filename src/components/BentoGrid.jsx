import React, { useState, useEffect } from 'react';
import { BentoCard } from './BentoCard';
import { MessageSquare, Calendar, Globe, Mic } from 'lucide-react';
import { useCountUp } from '@/hooks/useCountUp';

const ChatPreview = () => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Stage 0: initial user message
    // Stage 1: typing
    // Stage 2: bot response
    const t1 = setTimeout(() => setStage(1), 800);
    const t2 = setTimeout(() => setStage(2), 2000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="bg-background rounded-2xl p-6 mt-6 border border-border flex flex-col w-full">
      <p className="text-[10px] uppercase tracking-[0.12em] text-primary font-bold mb-3">Live chat preview</p>
      <div className="flex flex-col gap-2 w-full">
        <div className="py-2 px-3 rounded-xl text-xs max-w-[85%] leading-[1.4] animate-fade-in bg-primary/10 border border-primary/20 text-foreground self-end rounded-br-sm">
          Do you offer emergency slots?
        </div>
        
        {stage === 1 && (
          <div className="py-2.5 px-3.5 rounded-xl text-xs max-w-[85%] leading-[1.4] animate-fade-in bg-border/50 border border-border text-foreground self-start rounded-bl-sm flex gap-1 items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-subtle"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-subtle" style={{ animationDelay: '0.2s' }}></span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-subtle" style={{ animationDelay: '0.4s' }}></span>
          </div>
        )}
        
        {stage === 2 && (
          <div className="py-2 px-3 rounded-xl text-xs max-w-[85%] leading-[1.4] animate-fade-in bg-border/50 border border-border text-foreground self-start rounded-bl-sm">
            Yes! We have openings tomorrow at 10am and 2pm. Want me to book one for you?
          </div>
        )}
      </div>
    </div>
  );
};

const CalendarPreview = () => {
  const [selectedDay, setSelectedDay] = useState(9);
  const bookedDays = [3, 7, 10, 14, 17, 21, 24];
  
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="bg-background rounded-2xl p-6 mt-6 border border-border flex flex-col w-full">
      <p className="text-[10px] uppercase tracking-[0.12em] text-primary font-bold mb-3">Booking calendar</p>
      <div className="w-full">
        <div className="flex justify-between items-center text-xs text-foreground font-semibold">
          <span>June 2025</span>
          <span className="text-muted-foreground text-[11px] font-normal">Click a day to book</span>
        </div>
        <div className="grid grid-cols-7 gap-1 mt-2">
          {days.map(d => {
            const isBooked = bookedDays.includes(d);
            const isToday = d === selectedDay;
            
            return (
              <div 
                key={d}
                onClick={() => !isBooked && setSelectedDay(d)}
                className={`aspect-square rounded-md flex items-center justify-center text-[11px] font-medium transition-all duration-150
                  ${isBooked ? 'bg-primary/15 text-primary border border-primary/25 cursor-default' : 
                    isToday ? 'bg-foreground text-background font-bold cursor-default' : 
                    'bg-border/50 text-muted-foreground cursor-pointer hover:bg-border hover:text-foreground'
                  }
                `}
              >
                {d}
              </div>
            );
          })}
        </div>
        <div className="flex gap-3 mt-3 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary"></span>Booked</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-border"></span>Available</span>
        </div>
      </div>
    </div>
  );
};

export const BentoGrid = () => {
  const { count, ref } = useCountUp(43, 2000, '%');

  return (
    <section className="py-[60px] md:py-[100px] px-6 max-w-[1200px] mx-auto relative z-10" id="services">
      <header className="mb-12 text-center md:text-left reveal">
        <span className="text-primary text-xs uppercase tracking-[0.1em] font-bold mb-2 block">Why us</span>
        <h2 className="text-[clamp(28px,4.5vw,44px)] font-extrabold text-foreground leading-[1.15]">Built different. Priced right.</h2>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        
        {/* Card 1 */}
        <BentoCard colSpan2 tall delay={0}>
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold mb-4 text-foreground tracking-tight">We build systems, not just websites.</h3>
            <p className="text-base leading-[1.6] text-muted-foreground font-light">Every Upex Labs project is wired for automation from day one. Your site captures leads, books appointments, and follows up while you focus on the work.</p>
          </div>
          
          <div className="mt-8 w-full bg-black/20 border border-white/5 rounded-xl p-4 max-w-[550px] mx-auto">
            <svg width="100%" height="180" viewBox="0 0 400 180" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 70 90 L 150 40" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 5" className="text-border" />
              <path d="M 70 90 L 150 140" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 5" className="text-border" />
              <path d="M 150 40 L 330 90" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 5" className="text-border" />
              <path d="M 150 140 L 330 90" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 5" className="text-border" />

              <circle r="4" fill="hsl(var(--primary))">
                <animateMotion dur="3s" repeatCount="indefinite" path="M 70 90 L 150 40" />
              </circle>
              <circle r="4" fill="hsl(var(--primary))">
                <animateMotion dur="3.5s" repeatCount="indefinite" path="M 70 90 L 150 140" />
              </circle>
              <circle r="4" fill="hsl(var(--primary))">
                <animateMotion dur="4s" repeatCount="indefinite" path="M 150 40 L 330 90" />
              </circle>
              <circle r="4" fill="hsl(var(--primary))">
                <animateMotion dur="3.2s" repeatCount="indefinite" path="M 150 140 L 330 90" />
              </circle>

              <circle cx="70" cy="90" r="12" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" />
              <circle cx="150" cy="40" r="12" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" />
              <circle cx="150" cy="140" r="12" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" />
              <circle cx="330" cy="90" r="12" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" />

              <text x="70" y="122" fill="currentColor" fontSize="11" fontWeight="700" textAnchor="middle" className="text-foreground">WEBSITE</text>
              <text x="150" y="20" fill="currentColor" fontSize="11" fontWeight="700" textAnchor="middle" className="text-foreground">CHAT BOT</text>
              <text x="150" y="172" fill="currentColor" fontSize="11" fontWeight="700" textAnchor="middle" className="text-foreground">BOOKING</text>
              <text x="330" y="122" fill="currentColor" fontSize="11" fontWeight="700" textAnchor="middle" className="text-foreground">CRM</text>
            </svg>
          </div>
        </BentoCard>
        
        {/* Card 2 */}
        <BentoCard delay={80} className="group-hover:trigger-chat">
          <div>
            <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 text-primary transition-all duration-300 group-hover:bg-primary/20 group-hover:border-primary group-hover:rotate-6 group-hover:scale-105">
              <MessageSquare size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-foreground tracking-tight">AI chat, always on.</h3>
            <p className="text-base leading-[1.6] text-muted-foreground font-light">Every site we build includes an AI chat widget trained on your business. It answers questions and captures leads at any hour.</p>
          </div>
          <ChatPreview />
        </BentoCard>

        {/* Card 3 */}
        <BentoCard delay={160}>
          <div>
            <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 text-primary transition-all duration-300 group-hover:bg-primary/20 group-hover:border-primary group-hover:rotate-6 group-hover:scale-105">
              <Calendar size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-foreground tracking-tight">Bookings on autopilot.</h3>
            <p className="text-base leading-[1.6] text-muted-foreground font-light">Automated calendar integration means clients book themselves. No phone tag, no lost appointments.</p>
          </div>
          <CalendarPreview />
        </BentoCard>

        {/* Card 4 */}
        <BentoCard delay={240}>
          <div>
            <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 text-primary transition-all duration-300 group-hover:bg-primary/20 group-hover:border-primary group-hover:rotate-6 group-hover:scale-105">
              <Globe size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-foreground tracking-tight">Google presence, managed.</h3>
            <p className="text-base leading-[1.6] text-muted-foreground font-light">We set up and manage your Google Business Profile including review strategy and local citation building.</p>
          </div>
        </BentoCard>

        {/* Card 5 */}
        <BentoCard delay={320}>
          <div>
            <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 text-primary transition-all duration-300 group-hover:bg-primary/20 group-hover:border-primary group-hover:rotate-6 group-hover:scale-105">
              <Mic size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-foreground tracking-tight">Voice AI that picks up.</h3>
            <p className="text-base leading-[1.6] text-muted-foreground font-light">Our voice AI handles inbound calls, answers FAQs, and books appointments without a human receptionist.</p>
          </div>
        </BentoCard>

        {/* Card 6 */}
        <BentoCard delay={400} colSpan2>
          <div className="flex flex-col h-full justify-between">
            <div>
              <div ref={ref} className="text-[80px] font-extrabold text-foreground leading-none tracking-tight mb-4">
                {count}
              </div>
              <p className="text-base text-muted-foreground leading-[1.5] font-light">Average increase in inbound leads reported by clients in the first 60 days.</p>
            </div>
            
            <div className="bg-background rounded-2xl p-6 mt-6 border border-border flex flex-col gap-2.5 w-full">
              <p className="text-[10px] uppercase tracking-[0.12em] text-primary font-bold mb-1">Avg client metrics after 60 days</p>
              
              <div className="flex flex-col gap-1 group/stat">
                <div className="flex justify-between text-[11px] text-muted-foreground font-medium"><span>Inbound leads</span><span>+43%</span></div>
                <div className="h-1.5 bg-border/50 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-0 transition-all duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover/stat:w-[43%]"></div>
                </div>
              </div>
              
              <div className="flex flex-col gap-1 group/stat">
                <div className="flex justify-between text-[11px] text-muted-foreground font-medium"><span>Booked appointments</span><span>+61%</span></div>
                <div className="h-1.5 bg-border/50 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-0 transition-all duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover/stat:w-[61%]"></div>
                </div>
              </div>
              
              <div className="flex flex-col gap-1 group/stat">
                <div className="flex justify-between text-[11px] text-muted-foreground font-medium"><span>5-star reviews</span><span>+3x</span></div>
                <div className="h-1.5 bg-border/50 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-0 transition-all duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover/stat:w-[75%]"></div>
                </div>
              </div>
              
              <div className="flex flex-col gap-1 group/stat">
                <div className="flex justify-between text-[11px] text-muted-foreground font-medium"><span>Response rate</span><span>100%</span></div>
                <div className="h-1.5 bg-border/50 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-0 transition-all duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover/stat:w-[100%]"></div>
                </div>
              </div>
            </div>
          </div>
        </BentoCard>

      </div>
    </section>
  );
};
