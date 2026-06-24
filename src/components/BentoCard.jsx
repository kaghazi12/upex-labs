import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';

export const BentoCard = ({ 
  children, 
  className, 
  colSpan2 = false, 
  tall = false, 
  delay = 0 
}) => {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({});

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const tiltX = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    const tiltY = ((e.clientX - rect.left) / rect.width - 0.5) * 8;

    setStyle({
      '--mx': `${x}%`,
      '--my': `${y}%`,
      transform: `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`,
      transition: 'none'
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: '',
      transition: 'transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), border-color 0.3s ease, box-shadow 0.3s ease'
    });
  };

  return (
    <div 
      ref={cardRef}
      className={cn(
        "glass-card bento-card-hover reveal flex flex-col justify-between cursor-default min-h-[220px] md:min-h-[250px] relative overflow-hidden group",
        colSpan2 ? "md:col-span-2 w-full" : "w-full",
        tall && "md:min-h-[380px]",
        className
      )}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Spotlight effect via after pseudo element logic moved to inline styles or CSS class */}
      <div 
        className="absolute inset-0 rounded-[inherit] pointer-events-none z-[1] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 240px at var(--mx, 50%) var(--my, 50%), rgba(128, 44, 110, 0.16), transparent 70%)`
        }}
      />
      <div className="relative z-[2] h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};
