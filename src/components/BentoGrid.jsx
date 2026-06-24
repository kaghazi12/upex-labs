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
    <div className="bg-white/95 dark:bg-white/95 rounded-2xl p-6 mt-6 border border-light-crimson/10 flex flex-col w-full">
      <p className="text-[10px] uppercase tracking-[0.12em] text-light-accent dark:text-accent font-bold mb-3">Live chat preview</p>
      <div className="flex flex-col gap-2 w-full">
        <div className="py-2 px-3 rounded-xl text-xs max-w-[85%] leading-[1.4] animate-bubbleIn bg-light-accent/15 border border-light-accent/25 text-light-crimson self-end rounded-br-sm">
          Do you offer emergency slots?
        </div>
        
        {stage === 1 && (
          <div className="py-2.5 px-3.5 rounded-xl text-xs max-w-[85%] leading-[1.4] animate-bubbleIn bg-light-crimson/5 border border-light-crimson/10 text-light-crimson self-start rounded-bl-sm flex gap-1 items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-light-accent animate-typingDot"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-light-accent animate-typingDot" style={{ animationDelay: '0.2s' }}></span>
            <span className="w-1.5 h-1.5 rounded-full bg-light-accent animate-typingDot" style={{ animationDelay: '0.4s' }}></span>
          </div>
        )}
        
        {stage === 2 && (
          <div className="py-2 px-3 rounded-xl text-xs max-w-[85%] leading-[1.4] animate-bubbleIn bg-light-crimson/5 border border-light-crimson/10 text-light-crimson self-start rounded-bl-sm">
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
    <div className="bg-white/95 dark:bg-white/95 rounded-2xl p-6 mt-6 border border-light-crimson/10 flex flex-col w-full">
      <p className="text-[10px] uppercase tracking-[0.12em] text-light-accent dark:text-accent font-bold mb-3">Booking calendar</p>
      <div className="w-full">
        <div className="flex justify-between items-center text-xs text-light-crimson font-semibold">
          <span>June 2025</span>
          <span className="text-light-muted/60 text-[11px] font-normal">Click a day to book</span>
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
                  ${isBooked ? 'bg-light-accent/15 text-light-accent border border-light-accent/25 cursor-default' : 
                    isToday ? 'bg-light-crimson text-white font-bold cursor-default' : 
                    'bg-light-crimson/5 text-light-muted cursor-pointer hover:bg-light-crimson/10 hover:text-light-crimson'
                  }
                `}
              >
                {d}
              </div>
            );
          })}
        </div>
        <div className="flex gap-3 mt-3 text-[10px] text-light-muted">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-light-accent"></span>Booked</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-light-crimson/15"></span>Available</span>
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
        <span className="text-light-accent dark:text-accent text-xs uppercase tracking-[0.1em] font-bold mb-2 block">Why us</span>
        <h2 className="text-[clamp(28px,4.5vw,44px)] font-extrabold text-light-crimson dark:text-white leading-[1.15]">Built different. Priced right.</h2>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        
        {/* Card 1 */}
        <BentoCard colSpan2 tall delay={0}>
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold mb-4 text-light-crimson dark:text-white tracking-tight">We build systems, not just websites.</h3>
            <p className="text-base leading-[1.6] text-light-muted dark:text-muted font-light">Every Upex Labs project is wired for automation from day one. Your site captures leads, books appointments, and follows up while you focus on the work.</p>
          </div>
          
          <div className="mt-8 w-full bg-black/20 border border-white/5 rounded-xl p-4 max-w-[550px] mx-auto">
            <svg width="100%" height="180" viewBox="0 0 400 180" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 70 90 L 150 40" stroke="rgba(43,20,48,0.15)" strokeWidth="1.5" strokeDasharray="5 5" className="dark:stroke-white/20" />
              <path d="M 70 90 L 150 140" stroke="rgba(43,20,48,0.15)" strokeWidth="1.5" strokeDasharray="5 5" className="dark:stroke-white/20" />
              <path d="M 150 40 L 330 90" stroke="rgba(43,20,48,0.15)" strokeWidth="1.5" strokeDasharray="5 5" className="dark:stroke-white/20" />
              <path d="M 150 140 L 330 90" stroke="rgba(43,20,48,0.15)" strokeWidth="1.5" strokeDasharray="5 5" className="dark:stroke-white/20" />

              <circle r="4" fill="#c0392b">
                <animateMotion dur="3s" repeatCount="indefinite" path="M 70 90 L 150 40" />
              </circle>
              <circle r="4" fill="#c0392b">
                <animateMotion dur="3.5s" repeatCount="indefinite" path="M 70 90 L 150 140" />
              </circle>
              <circle r="4" fill="#c0392b">
                <animateMotion dur="4s" repeatCount="indefinite" path="M 150 40 L 330 90" />
              </circle>
              <circle r="4" fill="#c0392b">
                <animateMotion dur="3.2s" repeatCount="indefinite" path="M 150 140 L 330 90" />
              </circle>

              <circle cx="70" cy="90" r="12" fill="#8b1a3a" stroke="#c0392b" strokeWidth="2" />
              <circle cx="150" cy="40" r="12" fill="#8b1a3a" stroke="#c0392b" strokeWidth="2" />
              <circle cx="150" cy="140" r="12" fill="#8b1a3a" stroke="#c0392b" strokeWidth="2" />
              <circle cx="330" cy="90" r="12" fill="#8b1a3a" stroke="#c0392b" strokeWidth="2" />

              <text x="70" y="122" fill="currentColor" fontSize="11" fontWeight="700" textAnchor="middle" className="font-jakarta text-light-crimson dark:text-white">WEBSITE</text>
              <text x="150" y="20" fill="currentColor" fontSize="11" fontWeight="700" textAnchor="middle" className="font-jakarta text-light-crimson dark:text-white">CHAT BOT</text>
              <text x="150" y="172" fill="currentColor" fontSize="11" fontWeight="700" textAnchor="middle" className="font-jakarta text-light-crimson dark:text-white">BOOKING</text>
              <text x="330" y="122" fill="currentColor" fontSize="11" fontWeight="700" textAnchor="middle" className="font-jakarta text-light-crimson dark:text-white">CRM</text>
            </svg>
          </div>
        </BentoCard>
        
        {/* Card 2 */}
        <BentoCard delay={80} className="group-hover:trigger-chat">
          <div>
            <div className="w-14 h-14 rounded-xl bg-light-accent/10 dark:bg-accent/10 border border-light-accent/20 dark:border-accent/25 flex items-center justify-center mb-6 text-light-accent dark:text-accent transition-all duration-300 group-hover:bg-light-accent/20 group-hover:border-light-accent group-hover:rotate-6 group-hover:scale-105">
              <MessageSquare size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-light-crimson dark:text-white tracking-tight">AI chat, always on.</h3>
            <p className="text-base leading-[1.6] text-light-muted dark:text-muted font-light">Every site we build includes an AI chat widget trained on your business. It answers questions and captures leads at any hour.</p>
          </div>
          <ChatPreview />
        </BentoCard>

        {/* Card 3 */}
        <BentoCard delay={160}>
          <div>
            <div className="w-14 h-14 rounded-xl bg-light-accent/10 dark:bg-accent/10 border border-light-accent/20 dark:border-accent/25 flex items-center justify-center mb-6 text-light-accent dark:text-accent transition-all duration-300 group-hover:bg-light-accent/20 group-hover:border-light-accent group-hover:rotate-6 group-hover:scale-105">
              <Calendar size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-light-crimson dark:text-white tracking-tight">Bookings on autopilot.</h3>
            <p className="text-base leading-[1.6] text-light-muted dark:text-muted font-light">Automated calendar integration means clients book themselves. No phone tag, no lost appointments.</p>
          </div>
          <CalendarPreview />
        </BentoCard>

        {/* Card 4 */}
        <BentoCard delay={240}>
          <div>
            <div className="w-14 h-14 rounded-xl bg-light-accent/10 dark:bg-accent/10 border border-light-accent/20 dark:border-accent/25 flex items-center justify-center mb-6 text-light-accent dark:text-accent transition-all duration-300 group-hover:bg-light-accent/20 group-hover:border-light-accent group-hover:rotate-6 group-hover:scale-105">
              <Globe size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-light-crimson dark:text-white tracking-tight">Google presence, managed.</h3>
            <p className="text-base leading-[1.6] text-light-muted dark:text-muted font-light">We set up and manage your Google Business Profile including review strategy and local citation building.</p>
          </div>
        </BentoCard>

        {/* Card 5 */}
        <BentoCard delay={320}>
          <div>
            <div className="w-14 h-14 rounded-xl bg-light-accent/10 dark:bg-accent/10 border border-light-accent/20 dark:border-accent/25 flex items-center justify-center mb-6 text-light-accent dark:text-accent transition-all duration-300 group-hover:bg-light-accent/20 group-hover:border-light-accent group-hover:rotate-6 group-hover:scale-105">
              <Mic size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-light-crimson dark:text-white tracking-tight">Voice AI that picks up.</h3>
            <p className="text-base leading-[1.6] text-light-muted dark:text-muted font-light">Our voice AI handles inbound calls, answers FAQs, and books appointments without a human receptionist.</p>
          </div>
        </BentoCard>

        {/* Card 6 */}
        <BentoCard delay={400} colSpan2>
          <div className="flex flex-col h-full justify-between">
            <div>
              <div ref={ref} className="text-[80px] font-extrabold text-light-crimson dark:text-white leading-none tracking-tight mb-4">
                {count}
              </div>
              <p className="text-base text-light-muted dark:text-muted leading-[1.5] font-light">Average increase in inbound leads reported by clients in the first 60 days.</p>
            </div>
            
            <div className="bg-white/95 dark:bg-white/95 rounded-2xl p-6 mt-6 border border-light-crimson/10 flex flex-col gap-2.5 w-full">
              <p className="text-[10px] uppercase tracking-[0.12em] text-light-accent dark:text-accent font-bold mb-1">Avg client metrics after 60 days</p>
              
              <div className="flex flex-col gap-1 group/stat">
                <div className="flex justify-between text-[11px] text-light-muted font-medium"><span>Inbound leads</span><span>+43%</span></div>
                <div className="h-1.5 bg-light-crimson/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-light-accent to-light-crimson w-0 transition-all duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover/stat:w-[43%]"></div>
                </div>
              </div>
              
              <div className="flex flex-col gap-1 group/stat">
                <div className="flex justify-between text-[11px] text-light-muted font-medium"><span>Booked appointments</span><span>+61%</span></div>
                <div className="h-1.5 bg-light-crimson/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-light-accent to-light-crimson w-0 transition-all duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover/stat:w-[61%]"></div>
                </div>
              </div>
              
              <div className="flex flex-col gap-1 group/stat">
                <div className="flex justify-between text-[11px] text-light-muted font-medium"><span>5-star reviews</span><span>+3x</span></div>
                <div className="h-1.5 bg-light-crimson/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-light-accent to-light-crimson w-0 transition-all duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover/stat:w-[75%]"></div>
                </div>
              </div>
              
              <div className="flex flex-col gap-1 group/stat">
                <div className="flex justify-between text-[11px] text-light-muted font-medium"><span>Response rate</span><span>100%</span></div>
                <div className="h-1.5 bg-light-crimson/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-light-accent to-light-crimson w-0 transition-all duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover/stat:w-[100%]"></div>
                </div>
              </div>
            </div>
          </div>
        </BentoCard>

      </div>
    </section>
  );
};
