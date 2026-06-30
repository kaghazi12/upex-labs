import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar as CalendarIcon, Clock, User, CheckCircle2, Phone, Mail, FileText } from 'lucide-react';

const SERVICES = [
  { id: 'consultation', title: 'Consultation Call', duration: '30 mins', price: 'Free', icon: <Phone size={20} /> },
  { id: 'strategy', title: 'Strategy Session', duration: '60 mins', price: '$150', icon: <Clock size={20} /> },
  { id: 'audit', title: 'Full Audit', duration: '90 mins', price: '$300', icon: <FileText size={20} /> },
];

const TIME_SLOTS = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM'];
const UNAVAILABLE_SLOTS = ['10:00 AM', '2:00 PM'];

export const BookingPreviewPage = () => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', note: '' });

  // Calendar logic
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const handleNextStep = () => setStep(prev => prev + 1);
  const handlePrevStep = () => setStep(prev => prev - 1);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 relative z-10">
      <div className="max-w-4xl mx-auto flex flex-col gap-12">
        
        {/* Header */}
        <div className="text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-semibold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Live Preview
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            See Your Booking System in Action
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            This is exactly what your clients will experience when booking with you. Seamless, professional, and automated.
          </p>
        </div>

        {/* Booking Widget Container */}
        <div className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden relative">
          
          {/* Progress Bar */}
          <div className="flex border-b border-border bg-background/50">
            {['Service', 'Date & Time', 'Confirm'].map((label, idx) => (
              <div key={label} className={`flex-1 py-4 text-center text-sm font-medium border-b-2 transition-colors ${step === idx + 1 ? 'border-primary text-primary' : step > idx + 1 ? 'border-primary/30 text-foreground' : 'border-transparent text-muted-foreground'}`}>
                <span className="hidden sm:inline">Step {idx + 1}: </span>{label}
              </div>
            ))}
          </div>

          <div className="p-6 md:p-10 min-h-[500px]">
            {/* STEP 1: Select Service */}
            {step === 1 && (
              <div className="animate-fade-in flex flex-col h-full">
                <h2 className="text-2xl font-bold text-foreground mb-6">Select a Service</h2>
                <div className="flex flex-col gap-4 flex-grow">
                  {SERVICES.map(service => (
                    <button
                      key={service.id}
                      onClick={() => setSelectedService(service.id)}
                      className={`flex items-center justify-between p-5 rounded-xl border-2 transition-all duration-200 text-left ${selectedService === service.id ? 'border-primary bg-primary/10' : 'border-border bg-background hover:border-primary/50'}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${selectedService === service.id ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-foreground'}`}>
                          {service.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground text-lg">{service.title}</h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5">
                            <Clock size={14} /> {service.duration}
                          </p>
                        </div>
                      </div>
                      <div className="font-semibold text-primary">{service.price}</div>
                    </button>
                  ))}
                </div>
                <div className="mt-8 flex justify-end">
                  <button onClick={handleNextStep} disabled={!selectedService} className="cosmic-button px-8 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Pick Date & Time */}
            {step === 2 && (
              <div className="animate-fade-in flex flex-col h-full">
                <h2 className="text-2xl font-bold text-foreground mb-6">Pick a Date & Time</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  {/* Calendar */}
                  <div>
                    <div className="text-center font-bold text-lg mb-4 text-foreground">
                      {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center mb-2">
                      {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                        <div key={day} className="text-xs font-semibold text-muted-foreground py-2">{day}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center">
                      {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                        <div key={`empty-${i}`} className="p-2"></div>
                      ))}
                      {Array.from({ length: daysInMonth }).map((_, i) => {
                        const date = i + 1;
                        const isToday = date === today.getDate();
                        const isPast = date < today.getDate();
                        // Make every 3rd day "booked" for demo purposes
                        const isBooked = !isPast && (date % 3 === 0);
                        const isAvailable = !isPast && !isBooked;
                        const isSelected = selectedDate === date;

                        return (
                          <button
                            key={date}
                            onClick={() => isAvailable && setSelectedDate(date)}
                            disabled={!isAvailable}
                            className={`relative p-2 h-10 w-full flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200
                              ${isSelected ? 'bg-primary text-white' : 
                                isAvailable ? 'hover:bg-primary/20 text-foreground cursor-pointer' : 
                                'text-muted-foreground/50 cursor-not-allowed'
                              }
                              ${isToday && !isSelected ? 'border border-primary text-primary' : ''}
                            `}
                          >
                            {date}
                            {/* Dot indicator */}
                            {!isSelected && !isPast && (
                              <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${isBooked ? 'bg-muted-foreground/30' : 'bg-primary'}`}></span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div className="flex flex-col">
                    <h3 className="font-semibold text-foreground mb-4 text-center md:text-left">
                      {selectedDate ? `Available slots for ${new Date(currentYear, currentMonth, selectedDate).toLocaleDateString('default', { month: 'short', day: 'numeric' })}` : 'Select a date first'}
                    </h3>
                    
                    {selectedDate ? (
                      <div className="grid grid-cols-2 gap-3">
                        {TIME_SLOTS.map(time => {
                          const isUnavailable = UNAVAILABLE_SLOTS.includes(time);
                          const isSelected = selectedTime === time;
                          
                          return (
                            <button
                              key={time}
                              onClick={() => !isUnavailable && setSelectedTime(time)}
                              disabled={isUnavailable}
                              className={`py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 border text-center
                                ${isSelected ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-[1.02]' : 
                                  isUnavailable ? 'bg-card border-border text-muted-foreground/50 cursor-not-allowed' : 
                                  'bg-background border-border text-foreground hover:border-primary/50 cursor-pointer'
                                }
                              `}
                            >
                              {time}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="flex-grow flex items-center justify-center text-muted-foreground text-sm border-2 border-dashed border-border rounded-xl bg-card/50">
                        Choose a date on the calendar
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8 flex justify-between pt-6 border-t border-border">
                  <button onClick={handlePrevStep} className="px-6 py-2 rounded-lg font-medium text-foreground hover:bg-white/5 transition-colors">
                    ← Back
                  </button>
                  <button onClick={handleNextStep} disabled={!selectedDate || !selectedTime} className="cosmic-button px-8 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Enter Details & Confirm */}
            {step === 3 && (
              <div className="animate-fade-in flex flex-col h-full">
                <h2 className="text-2xl font-bold text-foreground mb-6">Enter Your Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                  <div className="md:col-span-3 flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-foreground">Full Name</label>
                        <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="p-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-foreground" placeholder="John Doe" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-foreground">Email Address</label>
                        <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="p-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-foreground" placeholder="john@example.com" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-foreground">Phone Number</label>
                      <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="p-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-foreground" placeholder="+1 (555) 000-0000" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-foreground">Anything we should know? (Optional)</label>
                      <textarea value={formData.note} onChange={e => setFormData({...formData, note: e.target.value})} className="p-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-foreground min-h-[100px] resize-none" placeholder="Brief details about your project..."></textarea>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <div className="p-6 rounded-xl bg-primary/5 border border-primary/20 h-full">
                      <h3 className="font-bold text-foreground mb-4 border-b border-primary/10 pb-4">Booking Summary</h3>
                      <div className="flex flex-col gap-4 text-sm">
                        <div className="flex justify-between items-start">
                          <span className="text-muted-foreground">Service</span>
                          <span className="font-semibold text-foreground text-right">{SERVICES.find(s => s.id === selectedService)?.title}</span>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-muted-foreground">Date</span>
                          <span className="font-semibold text-foreground text-right">{new Date(currentYear, currentMonth, selectedDate).toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-muted-foreground">Time</span>
                          <span className="font-semibold text-foreground text-right">{selectedTime}</span>
                        </div>
                        <div className="flex justify-between items-start mt-4 pt-4 border-t border-primary/10">
                          <span className="text-foreground font-semibold">Total</span>
                          <span className="font-bold text-primary text-lg">{SERVICES.find(s => s.id === selectedService)?.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-between pt-6 border-t border-border">
                  <button onClick={handlePrevStep} className="px-6 py-2 rounded-lg font-medium text-foreground hover:bg-white/5 transition-colors">
                    ← Back
                  </button>
                  <button onClick={handleNextStep} disabled={!formData.name || !formData.email} className="cosmic-button px-8 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
                    Confirm Booking
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Success */}
            {step === 4 && (
              <div className="animate-fade-in flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-20 h-20 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(34,197,94,0.3)]">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">Booking Confirmed!</h2>
                <p className="text-lg text-muted-foreground max-w-md mx-auto mb-8">
                  Your <span className="font-semibold text-foreground">{SERVICES.find(s => s.id === selectedService)?.title}</span> is scheduled for <span className="font-semibold text-foreground">{new Date(currentYear, currentMonth, selectedDate).toLocaleDateString('default', { month: 'long', day: 'numeric' })} at {selectedTime}</span>.
                </p>
                <p className="text-sm text-muted-foreground mb-8 p-4 bg-card border border-border rounded-lg inline-block">
                  You'll receive a calendar invitation and confirmation email shortly.
                </p>
                <Link to="/" className="px-8 py-3 rounded-lg font-semibold bg-white text-black hover:bg-white/90 transition-colors">
                  Back to Home
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-12 text-center flex flex-col items-center p-12 bg-primary/5 border border-primary/20 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          <h2 className="text-3xl font-bold text-foreground mb-4">Want this on your website?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl">
            We'll set up, design, and automate your entire booking system as part of your web package.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link to="/#pricing" className="cosmic-button px-8 py-3 rounded-lg font-bold text-center">
              Get Started
            </Link>
            <a href="https://cal.com/gulraiz/strategy" target="_blank" rel="noreferrer" className="px-8 py-3 rounded-lg font-bold border border-border bg-card text-foreground hover:border-primary/50 transition-colors text-center">
              Book a Free Call
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
